import streamlit as st
from streamlit_lottie import st_lottie
import requests

# Set page config
st.set_page_config(page_title="ObesiCHECK", layout="wide")

# ---- NAVIGATION ----
def navbar():
    st.markdown("""
        <style>
        .navbar {
            background-color: #eee;
            padding: 0.5rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .navbar-logo {
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 24px;
        }
        .navbar-logo img {
            height: 40px;
            margin-right: 10px;
        }
        .navbar-links {
            display: flex;
            gap: 2rem;
        }
        .navbar-links a {
            color: #176B87;
            font-weight: 600;
            text-decoration: none;
        }
        .upload-btn {
            background-color: #0dbfe3;
            color: white;
            padding: 0.4rem 1rem;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
        }
        </style>

        <div class="navbar">
            <div class="navbar-logo">
                <img src="https://cdn-icons-png.flaticon.com/512/706/706797.png" alt="Logo">
                ObesiCHECK
            </div>
            <div class="navbar-links">
                <a href="#home">Home</a>
                <a href="#predict">Prediction</a>
                <a class="upload-btn" href="#upload">Upload & Retrain</a>
            </div>
        </div>
    """, unsafe_allow_html=True)

# ---- ANIMATION ----
def load_lottieurl(url: str):
    r = requests.get(url)
    if r.status_code != 200:
        return None
    return r.json()

# ---- PAGES ----
def home():
    st.markdown("<h2 id='home'>Welcome to ObesiCHECK</h2>", unsafe_allow_html=True)
    lottie_url = "https://assets2.lottiefiles.com/packages/lf20_wnqlfojb.json"  # animated doctor
    lottie_json = load_lottieurl(lottie_url)
    st_lottie(lottie_json, height=300)
    st.write("Track obesity risks with ease. Navigate to 'Prediction' or 'Upload & Retrain' above.")

def prediction():
    st.markdown("<h2 id='predict'>Obesity Prediction</h2>", unsafe_allow_html=True)
    st.write("Upload patient data or fill in the form below for predictions.")
    # You can replace this with your actual ML prediction code
    age = st.slider("Age", 10, 100)
    height = st.number_input("Height (m)", 1.0, 2.5, step=0.01)
    weight = st.number_input("Weight (kg)", 30.0, 200.0, step=0.5)
    if st.button("Predict"):
        st.success("Prediction: Overweight")  # placeholder result

def upload():
    st.markdown("<h2 id='upload'>Upload & Retrain Model</h2>", unsafe_allow_html=True)
    uploaded_file = st.file_uploader("Upload CSV file for training", type=['csv'])
    if uploaded_file:
        st.success("File uploaded successfully!")
        # Placeholder for retrain code
        st.info("Retraining model... [Mocked]")
        st.success("Model retrained!")

# ---- MAIN ----
def main():
    navbar()
    # Render all sections on the same page (with anchor navigation)
    home()
    prediction()
    upload()

if __name__ == "__main__":
    main()
