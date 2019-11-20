from flask import Flask, jsonify
app = Flask(__name__)

data = [
  {
    'id': '1',
    'name': 'Trip to Sunderland',
    'date': '12/11/2019',
    'status': 'pending',

  },
  {
    'id': '2',
    'name': 'Trip to London',
    'date': '09/11/2019',
    'status': 'approved',
  },
  {
    'id': '3',
    'name': 'Trip to Manchester',
    'date': '09/11/2019',
    'status': 'denied',
  },
  {
    'id': '4',
    'name': 'Trip to Sunderland',
    'date': '12/11/2019',
    'status': 'pending',
  },
  {
    'id': '5',
    'name': 'Trip to London',
    'date': '09/11/2019',
    'status': 'approved',
  },
  {
    'id': '6',
    'name': 'Trip to Manchester',
    'date': '09/11/2019',
    'status': 'denied',
  },
  {
    'id': '7',
    'name': 'Trip to London',
    'date':  '09/11/2019',
    'status': 'approved',
  },
  {
    'id': '8 ',
    'name': 'Trip to Manchester',
    'date': '09/11/2019',
    'status': 'denied',
  },
  {
    'id': '9',
    'name': 'Trip to Sunderland',
    'date': '12/11/2019',
    'status': 'pending',
  },
  {
    'id': '10',
    'name': 'Trip to London',
    'date': '09/11/2019',
    'status': 'approved',
  },
  {
    'id': '11',
    'name': 'Trip to Manchester',
    'date': '09/11/2019',
    'status': 'denied',
  },
]

@app.route('/requests')
def hello():
  return jsonify(data)

if __name__ == '__main__':
  app.run()