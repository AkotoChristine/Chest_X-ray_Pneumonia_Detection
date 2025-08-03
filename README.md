# 🫡 Pneumonia Detection System

A full-stack AI-powered web app that detects pneumonia from chest X-ray images using a Convolutional Neural Network (CNN).
Built with **FastAPI** (Python) for the backend and **React.js** for the frontend.

---

##  Live Demo

* 🔹 **Frontend (User Interface)**: [https://chest-x-ray-pneumonia-front-2.onrender.com](https://chest-x-ray-pneumonia-front-2.onrender.com)
* 🔹 **Backend (FastAPI API)**: [https://chest-x-ray-pneumonia-detection-2.onrender.com](https://chest-x-ray-pneumonia-detection-2.onrender.com)
 
---
 **Youtube Link** : [https://youtu.be/COUyZDF0Xtc](https://youtu.be/COUyZDF0Xtc)
## Features

* Upload chest X-ray images
* Get instant prediction (Pneumonia or Normal)
* Trigger model retraining using new image data
* Clean UI built with React
* RESTful API with FastAPI
* Model persistence using Pickle or `joblib`

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/pneumonia-detection.git
cd pneumonia-detection
```

---

### 2. Backend (FastAPI)

#### 📁 Navigate to backend directory

If everything is in one root folder, skip this.

```bash
cd backend
```

####  Create virtual environment

```bash
python3.11 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

#### 📦 Install dependencies

```bash
pip install -r requirements.txt
```

#### ▶️ Run the server

```bash
uvicorn main:app --reload
```

By default, it runs at: [http://localhost:8000](http://localhost:8000)

---

### 3. Frontend (React)

####  Navigate to frontend directory

```bash
cd frontendpnuemo
```

####  Install dependencies

```bash
npm install
```

#### ▶️ Start the frontend

```bash
npm start
```

By default, it runs at: [http://localhost:3000](http://localhost:3000)

---

## 🗃️ Project Structure

```
pneumonia-detection/
│
├── backend/
│   ├── main.py              # FastAPI app
│   ├── model/               # Trained CNN model
│   ├── utils/               # Prediction, preprocessing, etc.
│   ├── requirements.txt
│   └── ...
│
├── frontendpnuemo/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🛠️ Deployment Notes

* **Python version**: Use `python-3.11` (not 3.13) in Render deployments
  → Create a `runtime.txt` file:

  ```txt
  python-3.11.9
  ```

* Make sure `scipy` and other scientific libraries are compatible (avoid source builds)

* For React, build with `npm run build` before deploying to static site host

---


#

---
