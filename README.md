# FaceSense: AI-Powered Face Authentication for Colleges and Workplaces (AWS-based)
![Python](https://img.shields.io/badge/Python-3.9+-blue?style=flat-square&logo=python)
![React](https://img.shields.io/badge/Frontend-React-blue?style=flat-square&logo=react)
![Amazon Rekognition](https://img.shields.io/badge/AWS-Rekognition-orange?style=flat-square&logo=amazonaws)
![Amazon S3](https://img.shields.io/badge/AWS-S3-orange?style=flat-square&logo=amazonaws)
![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-orange?style=flat-square&logo=amazonaws)
![DynamoDB](https://img.shields.io/badge/AWS-DynamoDB-orange?style=flat-square&logo=amazonaws)
![API Gateway](https://img.shields.io/badge/AWS-API--Gateway-orange?style=flat-square&logo=amazonaws)
![Status](https://img.shields.io/badge/Project-Completed-brightgreen?style=flat-square)

**FaceSense** is an AI-powered facial recognition system designed for identity verification in institutional and security contexts. It enables seamless attendance marking by capturing a user's face through a real-time camera feed, matching it against a registered database using AWS Rekognition. Beyond attendance, FaceSense can also be integrated into secure access systems, offering an efficient and automated alternative to traditional ID-based authentication. The system leverages cloud technologies like Amazon S3, Lambda, DynamoDB, and API Gateway to ensure scalable, fast, and reliable face recognition workflows.

---

## ✨ Features

- 🔒 Face-based secure authentication
- ☁️ Fully serverless with AWS Lambda, S3, and DynamoDB
- 🎯 Real-time face comparison with Amazon Rekognition
- 💻 Simple React-based frontend
- 🧑‍💼 Separate flows for registration and attendance
- 🏫 Works for both offices and colleges

---

## 🚀 Tech Stack

- **Frontend:** React
- **Backend:** AWS Lambda, API Gateway
- **Face Recognition:** Amazon Rekognition
- **Database:** Amazon DynamoDB
- **Storage:** Amazon S3

---

## 🛠️ System Workflow

### 🔹 Registration Process
- A user's(employee/student) image is **uploaded manually** to a dedicated S3 bucket (e.g., `facesense-registered-users`).
- The image upload triggers an **AWS Lambda function**, which:
  - Uses **Amazon Rekognition** to index the face.
  - Assigns a **unique ID**.
  - Stores the metadata (e.g., name, ID, image path) in **Amazon DynamoDB**.

### 🔹 Attendance Marking Process
- **User camera** captures a real-time image via the **React frontend**.
- The image is sent through **AWS API Gateway** to a **Lambda function**.
- The Lambda function:
  - Stores the image in a separate S3 bucket (e.g., `facesense-visitor-logs`).
  - Invokes **Amazon Rekognition** to match the face against the registered users.
  - Logs the result or fetches match details from **DynamoDB**.
- The **frontend** receives the response (authenticated or not) and displays/logs the outcome accordingly.


---

## 📂 Project Structure
```
my-app/
│
├── public/
│ ├── Index.html
│ └── ...
│
├── src/
│ ├── App.js
│ ├── App.css
│ ├── Index.css
│ └── ...
│ 
├── .env.example (Create a `.env` file with your AWS endpoint variables.)
├── .gitignore
├── package.json
└── ...
```

---

## 🧠 System Architecture

![System Architecture](Architecture-diagram/architecture-diagram.jpeg)

## 📸 Screenshots

### 🔹 Start Camera
<img src="ScreenShots/01-Start_Camera.png" alt="Start Camera" width="600"/>

### 🔹 Capture Image 
<img src="ScreenShots/02-Capture_Image.png" alt="Capture Image" width="600"/>

### 🔹 Authenticate
<img src="ScreenShots/03-Authenticate.png" alt="Authenticate" width="600"/>


---

### 📦 Setup
1. Clone the repo.
2. Run `npm install`.
3. Create a `.env` file with your AWS endpoint variables.
4. Run the app using `npm start`.

### 📄 License
MIT

---

*Built for modern attendance needs — contactless, intelligent, and efficient.*
