from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime,  timedelta
from pymongo import MongoClient
from cryptography.fernet import Fernet
import json
import os
import pandas as pd

client = MongoClient("mongodb+srv://charan522003:BdN6yRGAv1kQdz0h@cluster0.o4fmxl4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['test']

key = Fernet.generate_key()
cipher_suite = Fernet(key)

def get_last_run_date():
    try:
        if os.path.exists('./tmp/last_run_date.json'):
            with open('./tmp/last_run_date.json', 'r') as file:
                data = json.load(file)
                return datetime.fromisoformat(data['last_run_date'])
        else:
            return datetime.min
    except Exception as e:
        print(f"Error reading last run date: {e}")
        return datetime.min

def update_last_run_date():
    try:
        with open('./tmp/last_run_date.json', 'w') as file:
            json.dump({'last_run_date': datetime.now().isoformat()}, file)
    except Exception as e:
        print(f"Error updating last run date: {e}")

def extract_incremental_updates():
    last_run_date = get_last_run_date()
    print("Last Run Date", last_run_date)
    claims = list(db.claims.find({'updatedAt': {'$gt': last_run_date}}))
    policies = list(db.policies.find({'updatedAt': {'$gt': last_run_date}}))
    policyholders = list(db.policyholders.find({'updatedAt': {'$gt': last_run_date}}))
    
    # Convert to DataFrame for easier manipulation
    claims_df = pd.DataFrame(claims)
    policies_df = pd.DataFrame(policies)
    policyholders_df = pd.DataFrame(policyholders)
    
    # Ensure the tmp directory exists
    os.makedirs('./tmp', exist_ok=True)
    
    # Save to JSON for the next steps
    claims_df.to_json('./tmp/claims.json', default_handler=str)
    policies_df.to_json('./tmp/policies.json', default_handler=str)
    policyholders_df.to_json('./tmp/policyholders.json',default_handler=str)
    
    update_last_run_date()
    print("Extracted Incremental Updates")

def save_data_formats():
    claims_df = pd.read_json('./tmp/claims.json')
    policies_df = pd.read_json('./tmp/policies.json')
    policyholders_df = pd.read_json('./tmp/policyholders.json')
    
    # Save as CSV
    claims_df.to_csv('./tmp/claims.csv', index=False)
    policies_df.to_csv('./tmp/policies.csv', index=False)
    policyholders_df.to_csv('./tmp/policyholders.csv', index=False)
    
    # Save as Parquet
    claims_df.to_parquet('./tmp/claims.parquet', index=False)
    policies_df.to_parquet('./tmp/policies.parquet', index=False)
    policyholders_df.to_parquet('./tmp/policyholders.parquet', index=False)
    print("Saved to CSV and Parquet Formats")

def check_null_values(df, columns):
    null_counts = df[columns].isnull().sum()
    return null_counts

def check_date_ranges(df, start_column, end_column):
    invalid_dates = df[df[start_column] > df[end_column]]
    return invalid_dates

def check_unique_values(df, columns):
    duplicates = df[df.duplicated(subset=columns)]
    return duplicates

def check_valid_references(df, reference_df, column, reference_column):
    invalid_references = df[~df[column].isin(reference_df[reference_column])]
    return invalid_references

def check_claim_amounts(df, policy_df):
    merged_df = df.merge(policy_df, on='policy_id')
    invalid_claims = merged_df[merged_df['claim_amount'] > merged_df['coverage']]
    return invalid_claims
    
def data_quality_checks():
    claims_df = pd.read_json('./tmp/claims.json')
    policies_df = pd.read_json('./tmp/policies.json')
    
    # Define the expected columns
    claim_columns = ['claim_id', 'policy_id', 'policyholder_id', 'date_of_claim', 'claim_amount']
    policy_columns = ['policy_id', 'policyholder_id', 'start_date', 'end_date', 'coverage']
    
    # Check if the expected columns exist in the DataFrame
    for column in claim_columns:
        if column not in claims_df.columns:
            raise ValueError(f"Missing expected column in claims DataFrame: {column}")
    
    for column in policy_columns:
        if column not in policies_df.columns:
            raise ValueError(f"Missing expected column in policies DataFrame: {column}")
    
    # Perform data quality checks
    null_checks = check_null_values(claims_df, ['claim_id', 'policy_id', 'policyholder_id', 'date_of_claim', 'claim_amount'])
    date_checks = check_date_ranges(policies_df, 'start_date', 'end_date')
    unique_checks = check_unique_values(claims_df, ['claim_id'])
    reference_checks_policy = check_valid_references(claims_df, policies_df, 'policy_id', 'policy_id')
    reference_checks_policyholder = check_valid_references(claims_df, policies_df, 'policyholder_id', 'policyholder_id')
    claim_amount_checks = check_claim_amounts(claims_df, policies_df)
    
    # Raise errors if any checks fail
    if null_checks.sum() > 0:
        raise ValueError(f"Null value check failed: {null_checks}")
    if not date_checks.empty:
        raise ValueError(f"Invalid date ranges found: {date_checks}")
    if not unique_checks.empty:
        raise ValueError(f"Duplicate values found: {unique_checks}")
    if not reference_checks_policy.empty:
        raise ValueError(f"Invalid policy references found: {reference_checks_policy}")
    if not reference_checks_policyholder.empty:
        raise ValueError(f"Invalid policyholder references found: {reference_checks_policyholder}")
    if not claim_amount_checks.empty:
        raise ValueError(f"Invalid claim amounts found: {claim_amount_checks}")
    
    print("Data quality checks passed.")

def transform_data():
    claims_df = pd.read_json('./tmp/claims.json')
    policies_df = pd.read_json('./tmp/policies.json')
    policyholders_df = pd.read_json('./tmp/policyholders.json')
    # Ensure policyholder_id is in the correct DataFrames
    assert 'policyholder_id' in claims_df.columns, "policyholder_id missing in claims_df"
    assert 'policyholder_id' in policies_df.columns, "policyholder_id missing in policies_df"
    assert 'policyholder_id' in policyholders_df.columns, "policyholder_id missing in policyholders_df"
    # Merge the data to get policy information along with claims
    merged_df = claims_df.merge(policies_df, on='policy_id')
    merged_df.to_csv('./tmp/merged_df.csv')
    # merged_df = merged_df.merge(policyholders_df, on='policyholder_id')
    
    # Calculate the number of open and closed claims
    open_claims = merged_df[merged_df['status'] == 'Pending'].groupby('policy_id').size().reset_index(name='open_claims')
    closed_claims = merged_df[merged_df['status'] == 'Accepted'].groupby('policy_id').size().reset_index(name='closed_claims')
    
    # Merge these counts back into the policies DataFrame
    policies_df = policies_df.merge(open_claims, on='policy_id', how='left').merge(closed_claims, on='policy_id', how='left')
    
    # Merge with policyholders to include PII data
    policies_df = policies_df.merge(policyholders_df, on='policyholder_id')
    
    # Save the transformed data
    policies_df.to_json('./tmp/transformed_policies.json')
    print("Transformed Data Successfully")
    
def encrypt_pii():
    policies_df = pd.read_json('./tmp/transformed_policies.json')
    
    # Encrypt PII data
    pii_columns = ['policyholder_id', 'name', 'date_of_birth', 'address', 'phone']
    for col in pii_columns:
        policies_df[col] = policies_df[col].apply(lambda x: cipher_suite.encrypt(str(x).encode()).decode())
    
    # Save the encrypted data
    policies_df.to_json('./tmp/encrypted_policies.json')
    print("Encrypted PII Successfully")

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2024, 7, 11),
    'email': ['goslingryan009@gmail.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG('claims-management', default_args=default_args, schedule_interval='@daily')

extract_task = PythonOperator(task_id='extract_incremental_updates', python_callable=extract_incremental_updates,dag=dag)
save_task = PythonOperator(task_id='save_data_formats', python_callable=save_data_formats, dag=dag)
quality_task = PythonOperator(task_id='data_quality_checks', python_callable=data_quality_checks, dag=dag)
transform_task = PythonOperator(task_id='transform_data', python_callable=transform_data, dag=dag)
encrypt_task = PythonOperator(task_id='encrypt_pii', python_callable=encrypt_pii, dag=dag)

extract_task >> save_task >> quality_task >> transform_task >> encrypt_task