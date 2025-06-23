# FaceSense: AI Powered Attendance for Offices and Colleges (AWS-based)

**FaceSense** is a smart face recognition system that automates attendance marking using AWS services. It captures images from a webcam, sends them to the backend, and authenticates users using facial recognition making attendance seamless and contactless.

## ✨ Features

- 🔒 Face-based secure authentication
- ☁️ Fully serverless with AWS Lambda, S3, and DynamoDB
- 🎯 Real-time face comparison with Amazon Rekognition
- 💻 Simple React-based frontend
- 🧑‍💼 Separate flows for registration and attendance
- 🏫 Works for both offices and colleges
  

## 🛠️ Tech Stack

- **Frontend:** React
- **Backend:** AWS Lambda, API Gateway
- **Face Recognition:** Amazon Rekognition
- **Database:** Amazon DynamoDB
- **Storage:** Amazon S3

## 📷 How It Works

1. **User Uploads Image:**  
   - Employees/students register or mark attendance using their photo via the React frontend.

2. **AWS API Gateway:**  
   - Routes the request to AWS Lambda functions.

3. **Image Handling & Recognition:**  
   - Uploaded image is stored in S3.
   - AWS Lambda triggers Amazon Rekognition to compare the face.
   - Face metadata and results are stored or fetched from DynamoDB.

4. **Result Return:**  
   - Match result (authenticated or not) is returned to the frontend for action/logging.



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
│ └── ...
│ 
├── .env.example (Create a `.env` file with your AWS endpoint variables.)
├── .gitignore
├── package.json
└── ...
```



### 📦 Setup
1. Clone the repo.
2. Run `npm install`.
3. Create a `.env` file with your AWS endpoint variables.
4. Run the app using `npm start`.

### 📄 License
MIT

---

*Built for modern attendance needs — contactless, intelligent, and efficient.*
