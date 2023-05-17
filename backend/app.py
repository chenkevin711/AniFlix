from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:7668314@localhost:6796/Accounts'
db = SQLAlchemy(app)
CORS(app)


class Accounts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f'Account: {self.email}'
    
    def __init__(self, email, username, password):
        self.email = email
        self.username = username
        self.password = password

    def __meta__(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'created_at': self.created_at
        }

if __name__ == '__main__':
    app.run(debug=True)

@app.get('/')
def home():
    return "Hello World!"

@app.route('/create_account', methods = ['POST'])
def create_account():
    print('hit')
    email = request.json['email']
    username = request.json['username']
    password = request.json['password']
    print(email, username, password)
    account = Accounts(email, username, password)
    print(account)
    db.session.add(account)
    print('added')
    db.session.commit()
    print('committed')
    res = {
        'email': account.email,
        'username': account.username,
    }
    print(res)
    return res, 200

@app.route('/get_accounts', methods = ['GET'])
def get_accounts():
    accounts = Accounts.query.all()
    res = []

    for account in accounts:
        res.append(account.username)

    return res, 200

@app.route('/get_account', methods = ['POST'])
def get_account():
    email = request.json['email']
    account = Accounts.query.filter(Accounts.email == email).first()
    
    res = account.__meta__()

    return res, 200

@app.route('/sign_in', methods = ['POST'])
def sign_in():
    email = request.json['email']
    password = request.json['password']
    account = Accounts.query.filter(Accounts.email == email).first()

    if not account:
        return jsonify('This email is not associated with an existing account'), 400

    if account.password == password:
        return account.__meta__(), 200
    else:
        return jsonify('Incorrect Password'), 400

@app.route('/delete_account', methods = ['POST'])
def delete_account():
    email = request.json['email']
    password = request.json['password']
    account = Accounts.query.filter(Accounts.email == email).first()

    if not account:
        return jsonify('Incorrect Email'), 400

    if account.password == password:
        db.session.delete(account)
        db.session.commit()
        return jsonify(f'Success! {email} has been deleted!'), 200
    else:
        return jsonify('Incorrect Password'), 400
    
