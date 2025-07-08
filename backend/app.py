from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Load the common passwords list
with open('password.txt', 'r') as file:
    common_passwords = set(line.strip() for line in file)

# Password verification function
def is_valid_password(password):
    # Minimum length of 8, requires at least one number, one uppercase letter, and one special character
    if len(password) < 8:
        return False
    if not any(char.isdigit() for char in password):
        return False
    if not any(char.isupper() for char in password):
        return False
    if not any(char in "!@#$%^&*()_+" for char in password):
        return False
    if password in common_passwords:
        return False
    return True

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        password = request.form['password']
        if is_valid_password(password):
            return redirect(url_for('welcome', password=password))
        else:
            return render_template('home.html', error="Password does not meet the requirements!")
    return render_template('home.html')

@app.route('/welcome')
def welcome():
    password = request.args.get('password')
    return render_template('welcome.html', password=password)

@app.route('/logout')
def logout():
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
