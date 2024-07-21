from flask import Flask, request, jsonify, send_file, abort
from flask_sqlalchemy import SQLAlchemy
from geoalchemy2 import Geometry
from flask_mail import Mail, Message
from werkzeug.security import generate_password_hash, check_password_hash
import pandas as pd
import os
from datetime import datetime, timedelta
import jwt
from functools import wraps
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# SQLAlchemy configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:shresthpost@localhost/geodb1'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Flask-Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'shresthdev93@gmail.com'
app.config['MAIL_PASSWORD'] = 'ffdd ilbd xrhh jzwr'
app.config['MAIL_DEFAULT_SENDER'] = 'amodpandey@gmail.com'

# JWT configuration
app.config['SECRET_KEY'] = 'XQres-f7rW5dDg_vewI19MUKR6P2proGAzsB32r8Gaw'

# Initialize extensions
db = SQLAlchemy(app)
mail = Mail(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    phone_number = db.Column(db.String(50))
    latitude = db.Column(db.Float) 
    longitude = db.Column(db.Float) 


# GeoDB model
class GeoDB(db.Model):
    __tablename__ = 'geodb1'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    geom = db.Column(Geometry(geometry_type='POINT', srid=4326))

    def __repr__(self):
        return f"<GeoDB(id={self.id}, name={self.name}, geom={self.geom})>"

# JWT token decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-token')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['user_id']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

# User registration route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    email = data['email']
    phone_number = data.get('phone_number', '')
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({'message': 'User already exists'}), 400

    new_user = User(username=username, email=email, phone_number=phone_number,
                    latitude=latitude, longitude=longitude)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

# User login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        return jsonify({'message': 'Login failed. Check your username and password.'}), 401

    token = jwt.encode({'user_id': user.id, 'exp': datetime.utcnow() + timedelta(hours=1)}, app.config['SECRET_KEY'])
    return jsonify({'access_token': token})



# Route for submitting the stationery order form
@app.route('/submit_stationery_order', methods=['POST'])
def submit_stationery_order():
    data = request.get_json()
    items_and_quantities = data.get('items_and_quantities')

    # Save order details (example)
    try:
        for item_name, quantity in items_and_quantities.items():
            # Process each item and quantity
            print(f"Item: {item_name}, Quantity: {quantity}")

        # Example: Send email notification
        send_email_notification(items_and_quantities)

        return jsonify({'message': 'Order submitted successfully.'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to process order: {str(e)}'}), 500

# Function to send email notification
def send_email_notification(order_data):
    try:
        message_body = "New stationery order received from Sandeep Mittal:\n\n"
        for item_name, quantity in order_data.items():
            message_body += f"{item_name}: {quantity}\n"

        # Send email to admin
        msg = Message(subject='New Stationery Order received', recipients=['shresthwwe@gmail.com'])  # Update with admin's email
        msg.body = message_body
        mail.send(msg)

    except Exception as e:
        print(f"Error sending email: {str(e)}")


class StationeryOrder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('orders', lazy=True))


# Route to serve the Excel file
@app.route('/download_excel', methods=['GET'])
@token_required
def download_excel(current_user):
    file_path = r'C:\Users\shres\OneDrive\Desktop\havabaazi\geofencing\geofencing_backend\static\downloads\geofence_results.xlsx'
    try:
        return send_file(file_path, as_attachment=True)
    except FileNotFoundError:
        abort(404)

# Function to check if a point is within a geofence
def check_geofence(latitude, longitude):
    if 28.585355 <= latitude <= 28.585379 and 77.211471 <= longitude <= 77.211799:
        return True
    else:
        return False

# Route for checking geofence based on Excel data
@app.route('/check_geofence_excel', methods=['POST'])
@token_required
def check_geofence_excel(current_user):
    try:
        file_path = r'C:\Users\shres\OneDrive\Desktop\havabaazi\geofencing\geofencing_backend\static\downloads\geofence.xlsx'
        df = pd.read_excel(file_path)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    results = []
    for index, row in df.iterrows():
        latitude = row['latitude']
        longitude = row['longitude']
        email = row['email']

        within_geofence = check_geofence(latitude, longitude)

        # Get current date and time
        now = datetime.now()
        date = now.strftime("%Y/%m/%d")
        time = now.strftime("%H:%M:%S")

        # Prepare the result for each row
        result = {
            'date': date,
            'time': time,
            'latitude': latitude,
            'longitude': longitude,
            'email': email,
            'within_geofence': within_geofence
        }
        results.append(result)

    try:
        file_path_result = os.path.join(r'C:\Users\shres\OneDrive\Desktop\havabaazi\geofencing\geofencing_backend\static\downloads', 'geofence_results.xlsx')
        df_result = pd.DataFrame(results)
        df_result.to_excel(file_path_result, index=False)
    except Exception as e:
        return jsonify({'error': f'Error saving results: {str(e)}'}), 500

    return send_file(file_path_result, as_attachment=True)

# Function to send emails
def send_emails_from_excel(file_path):
    try:
        # Read Excel file
        df = pd.read_excel(file_path)

        for index, row in df.iterrows():
            user_email = row['email']
            user_lat = row['latitude']
            user_lon = row['longitude']
            
            # Example geofence check (replace with your logic)
            if 28.585355 <= user_lat <= 28.585379 and 77.211471 <= user_lon <= 77.211799:
                within_geofence = True
                message = 'You are within the geofence area.'
            else:
                within_geofence = False
                message = 'You are outside the geofence area.'

            # Send email based on geofence check
            msg = Message(subject='Geofence Notification', recipients=[user_email])
            msg.body = message
            mail.send(msg)

        return True
    except Exception as e:
        print(f"Error sending emails: {str(e)}")
        return False

# Route to send emails to all recipients in the Excel file
@app.route('/send_geofence_emails', methods=['GET'])
# def send_geofence_emails():
#     file_path =  r'C:\Users\shres\OneDrive\Desktop\havabaazi\geofencing\geofencing_backend\static\downloads\geofence.xlsx'  
#     if send_emails_from_excel(file_path):
#         return jsonify({'message': 'Emails sent successfully to all recipients.'}), 200
#     else:
#         return jsonify({'error': 'Failed to send emails.'}), 500
    
# Function to send geofence email notification
def send_geofence_email(user_email, within_geofence):
    message = 'You are within the geofence area.' if within_geofence else 'You are outside the geofence area.'
    msg = Message(subject='Geofence Notification', recipients=[user_email])
    msg.body = message
    try:
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Error sending geofence email: {str(e)}")
        return False




if __name__ == '__main__':
    with app.app_context():
        # Drop all tables and recreate them
        db.drop_all()
        db.create_all()
    app.run(debug=True)
