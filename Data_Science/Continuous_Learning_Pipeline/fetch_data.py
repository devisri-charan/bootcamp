import pandas as pd
import joblib
from sklearn.preprocessing import LabelEncoder
from sklearn.impute import SimpleImputer

def fetch_and_preprocess_data():
    # Load new data
    new_data = pd.read_csv('new_health_claims.csv')
    # Select relevant columns
    selected_columns = ['Gender', 'Race', 'ChronicCond_Alzheimer', 'ChronicCond_Heartfailure', 'ChronicCond_KidneyDisease', 'ChronicCond_Cancer', 'ChronicCond_ObstrPulmonary', 'ChronicCond_Depression', 'ChronicCond_Diabetes', 'ChronicCond_IschemicHeart', 'ChronicCond_Osteoporasis', 'ChronicCond_rheumatoidarthritis', 'ChronicCond_stroke', 'IPAnnualReimbursementAmt', 'IPAnnualDeductibleAmt', 'OPAnnualReimbursementAmt', 'OPAnnualDeductibleAmt', 'PotentialFraud']
    # Subset the new data with the selected columns
    new_data_relevant = new_data[selected_columns]
    # Handle missing values
    imputer = SimpleImputer(strategy='most_frequent')
    new_data_imputed = pd.DataFrame(imputer.fit_transform(new_data_relevant), columns=new_data_relevant.columns)
    # Encode categorical variables
    label_encoder = LabelEncoder()
    new_data_imputed['Gender'] = label_encoder.fit_transform(new_data_imputed['Gender'])
    new_data_imputed['Race'] = label_encoder.fit_transform(new_data_imputed['Race'])
    new_data_imputed['PotentialFraud'] = label_encoder.fit_transform(new_data_imputed['PotentialFraud'])
    pd.DataFrame(new_data, columns=['InscClaimAmtReimbursed']).to_csv('new_labels.csv', index=False)
    # Load existing scaler
    scaler = joblib.load('../Model_Deployment_And_API/scaler.joblib')
    # Standardize new data
    new_data_scaled = scaler.transform(new_data_imputed)
    return new_data_scaled

if __name__ == '__main__':
    new_data_scaled = fetch_and_preprocess_data()
    # Save the preprocessed data for model retraining
    pd.DataFrame(new_data_scaled, columns=[
        'Gender', 'Race', 'ChronicCond_Alzheimer', 'ChronicCond_Heartfailure', 'ChronicCond_KidneyDisease', 'ChronicCond_Cancer', 'ChronicCond_ObstrPulmonary','ChronicCond_Depression', 'ChronicCond_Diabetes', 'ChronicCond_IschemicHeart','ChronicCond_Osteoporasis', 'ChronicCond_rheumatoidarthritis', 'ChronicCond_stroke','IPAnnualReimbursementAmt', 'IPAnnualDeductibleAmt', 'OPAnnualReimbursementAmt', 'OPAnnualDeductibleAmt', 'PotentialFraud']).to_csv('new_data_scaled.csv', index=False)