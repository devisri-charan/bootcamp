from flask import Flask, request, jsonify
import cms
app = Flask(__name__)
claims_management_system = cms.ClaimsManagementSystem()

@app.route('/', methods=['POST','GET'])
def home():
    if(request.method == 'GET'): 
        data = "Hello World"
        return jsonify({'data': data}) 

@app.route('/policyholders',methods=['POST','GET'])
def policyholders():
    if request.method == 'POST':
        data = request.json
        try:
            ph = cms.Policyholder(data['policyholder_id'], data['name'], data['date_of_birth'], data['address'], data['phone'])
            claims_management_system.add_policyholder(ph)
            print(claims_management_system.policyholders)
            return jsonify({'message': 'Policyholder added successfully'}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    
    elif request.method == 'GET':
        policyholder_id = request.args.get('policyholder_id')
        policyholder = claims_management_system.get_policyholder(policyholder_id)
        if policyholder:
            return jsonify(policyholder.__dict__), 200
        return jsonify({'message': 'Policyholder not found'}), 404

@app.route('/policyholders/<policyholder_id>', methods=['PUT', 'DELETE'])
def manage_policyholder(policyholder_id):
    if request.method == 'PUT':
        data = request.json
        updated = claims_management_system.update_policyholder(policyholder_id, **data)
        return jsonify({'message': 'Policyholder updated successfully'}) if updated else jsonify({'error': 'Policyholder not found'}), 404 if not updated else 200

    elif request.method == 'DELETE':
        deleted = claims_management_system.delete_policyholder(policyholder_id)
        return jsonify({'message': 'Policyholder deleted successfully'}) if deleted else jsonify({'error': 'Policyholder not found'}), 404 if not deleted else 200
    
@app.route('/policies',methods=['POST', 'GET'])
def policies():
    if request.method == 'POST':
        data = request.json
        try:
            p = cms.Policy(data['policy_id'], data['policyholder_id'], data['start_date'], data['end_date'], data['premium'])
            claims_management_system.add_policy(p)
            print(claims_management_system.policies)
            return jsonify({'message': 'Policy added successfully'}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    
    elif request.method == 'GET':
        policy_id = request.args.get('policy_id')
        policy = claims_management_system.get_policy(policy_id)
        if policy:
            return jsonify(policy.__dict__), 200
        return jsonify({'message': 'Policy not found'}), 404

@app.route('/policies/<policy_id>', methods=['PUT', 'DELETE'])
def manage_policy(policy_id):
    if request.method == 'PUT':
        data = request.json
        updated = claims_management_system.update_policy(policy_id, **data)
        return jsonify({'message': 'Policy updated successfully'}) if updated else jsonify({'error': 'Policy not found'}), 404 if not updated else 200

    elif request.method == 'DELETE':
        deleted = claims_management_system.delete_policy(policy_id)
        return jsonify({'message': 'Policy deleted successfully'}) if deleted else jsonify({'error': 'Policy not found'}), 404 if not deleted else 200
    
@app.route('/claims',methods=['POST','GET'])
def claims():
    if request.method == 'POST':
        data = request.json
        try:
            c = cms.Claim(data['claim_id'], data['policy_id'], data['date_of_claim'], data['claim_amount'],data['status'])
            claims_management_system.add_claim(c)
            return jsonify({'message': 'Claim added successfully'}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    
    elif request.method == 'GET':
        claim_id = request.args.get('claim_id')
        claim = claims_management_system.get_claim(claim_id)
        if claim:
            return jsonify(claim.__dict__), 200
        return jsonify({'message': 'Claim not found'}), 404

@app.route('/claims/<claim_id>', methods=['PUT', 'DELETE'])
def manage_claim(claim_id):
    if request.method == 'PUT':
        data = request.json
        updated = claims_management_system.update_claim(claim_id, **data)
        return jsonify({'message': 'Claim updated successfully'}) if updated else jsonify({'error': 'Claim not found'}), 404 if not updated else 200

    elif request.method == 'DELETE':
        deleted = claims_management_system.delete_claim(claim_id)
        return jsonify({'message': 'Claim deleted successfully'}) if deleted else jsonify({'error': 'Claim not found'}), 404 if not deleted else 200

if __name__ == '__main__':
    app.run(debug=True)