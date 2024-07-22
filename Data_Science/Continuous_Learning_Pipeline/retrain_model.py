import pandas as pd
import joblib
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, root_mean_squared_error

def retrain_model(new_data_scaled, new_labels):
    # Load the existing model
    model = joblib.load('../Model_Deployment_And_API/gradient_boosting_model.joblib')
    
    # Retrain the model with new data
    X_train, X_test, y_train, y_test = train_test_split(new_data_scaled, new_labels, test_size=0.2, random_state=42)
    
    model.fit(X_train, y_train.values.ravel())
    
    # Evaluate the model
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    rmse = root_mean_squared_error(y_test, y_pred)
    
    print(f'MAE: {mae}, MSE: {mse}, RMSE: {rmse}')
    
    # Save the retrained model
    joblib.dump(model, '../Model_Deployment_And_API/gradient_boosting_model.joblib')

if __name__ == '__main__':
    new_data_scaled = pd.read_csv('./new_data_scaled.csv')
    new_labels = pd.read_csv('./new_labels.csv')
    
    retrain_model(new_data_scaled, new_labels)