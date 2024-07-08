import datetime

class Policyholder:
    def __init__(self, policyholder_id, name, date_of_birth, address, phone) -> None:
        self.policyholder_id = policyholder_id
        self.name = name
        self.date_of_birth = date_of_birth
        self.address = address
        self.phone = phone

class Policy:
    def __init__(self,policy_id, policyholder_id, policy_type, start_date, end_date, premium, coverage, payments) -> None:
        self.policy_id = policy_id
        self.policyholder_id = policyholder_id
        self.policy_type = policy_type
        self.start_date = start_date
        self.end_date = end_date
        self.premium = premium
        self.coverage = coverage
        self.payments = payments
    
class Claim:
    def __init__(self, claim_id, policy_id, date_of_claim, claim_amount, status, reason_of_claim) -> None:
        self.claim_id = claim_id
        self.policy_id = policy_id
        self.date_of_claim = date_of_claim
        self.claim_amount = claim_amount
        self.status = status
        self.reason_of_claim = reason_of_claim

class ClaimsManagementSystem:
    def __init__(self):
        self.policyholders = {}
        self.policies = {}
        self.claims = {}
    
    def is_valid_date(self, date_str):
        """ Validate if the provided string is a valid date. """
        try:
            datetime.datetime.strptime(date_str, '%d-%m-%Y')
            return True
        except ValueError:
            return False
    
    def add_policyholder(self,policyholder):
        if not (policyholder.name and policyholder.address and policyholder.phone):
            raise ValueError("Policyholder's name, address, and phone are required.")
        self.policyholders[policyholder.policyholder_id] = policyholder
    
    def get_policyholder(self, policyholder_id):
        return self.policyholders.get(policyholder_id, None)
    
    def update_policyholder(self, policyholder_id, name=None, date_of_birth=None, address=None,phone=None):
        if policyholder_id in self.policyholders:
            if name:
                self.policyholders[policyholder_id].name = name
            if date_of_birth:
                self.policyholders[policyholder_id].date_of_birth = date_of_birth
            if address:
                self.policyholders[policyholder_id].address = address
            if phone:
                self.policyholders[policyholder_id].phone = phone
            return True
        return False
    
    def delete_policyholder(self, policyholder_id):
        if policyholder_id in self.policyholders:
            del self.policyholders[policyholder_id]
            return True
        return False
    
    def add_policy(self, policy):
        if not self.get_policyholder(policy.policyholder_id):
            raise ValueError("Policyholder does not exist.")
        if not (self.is_valid_date(policy.start_date) and self.is_valid_date(policy.end_date)):
            raise ValueError("Invalid date format. Use DD-MM-YYYY.")
        if datetime.datetime.strptime(policy.start_date, '%d-%m-%Y') > datetime.datetime.strptime(policy.end_date, '%d-%m-%Y'):
            raise ValueError("Start date cannot be after end date.")
        self.policies[policy.policy_id] = policy
    
    def get_policy(self, policy_id):
        return self.policies.get(policy_id, None)

    def update_policy(self, policy_id, start_date=None, end_date=None, premium=None):
        if policy_id in self.policies:
            if start_date:
                self.policies[policy_id].start_date = start_date
            if end_date:
                self.policies[policy_id].end_date = end_date
            if premium:
                self.policies[policy_id].premium = premium
            return True
        return False

    def delete_policy(self, policy_id):
        if policy_id in self.policies:
            del self.policies[policy_id]
            return True
        return False
    
    def add_claim(self, claim):
        policy = self.get_policy(claim.policy_id)
        if not policy:
            raise ValueError("Policy does not exist.")
        if claim.claim_amount > policy.premium:
            raise ValueError("Claim amount cannot exceed the policy premium.")
        if not self.is_valid_date(claim.date_of_claim):
            raise ValueError("Invalid date format for claim. Use DD-MM-YYYY.")
        self.claims[claim.claim_id] = claim
    
    def get_claim(self, claim_id):
        return self.claims.get(claim_id, None)

    def update_claim(self, claim_id, date_of_claim=None, claim_amount=None, status=None):
        if claim_id in self.claims:
            if date_of_claim:
                self.claims[claim_id].date_of_claim = date_of_claim
            if claim_amount:
                self.claims[claim_id].claim_amount = claim_amount
            if status:
                self.claims[claim_id].status = status
            return True
        return False

    def delete_claim(self, claim_id):
        if claim_id in self.claims:
            del self.claims[claim_id]
            return True
        return False