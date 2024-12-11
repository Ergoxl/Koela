from flask import Flask, render_template

# Flaski rakendus
app = Flask(__name__)

# Esilehe marsruut
@app.route('/')
def index():
    return render_template('index.html')  # Renderdab templates/index.html

# Serveri käivitamine
if __name__ == "__main__":
    app.run(debug=True)
