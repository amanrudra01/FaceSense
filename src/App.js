import React, { useRef, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [uploadResultMessage, setUploadResultMessage] = useState('Please upload or capture an image to authenticate.');
  const [visitorName, setVisitorName] = useState('placeholder.jpg');
  const [isAuth, setAuth] = useState(false);
  const [stream, setStream] = useState(null); // for stopping camera

  // Start the webcam
  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(mediaStream => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          setStream(mediaStream); // Save the stream so we can stop it
        }
      })
      .catch(err => {
        console.error('Error accessing webcam:', err);
        alert('Cannot access webcam.');
      });
  };

  // Stop the webcam
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
    }
  };

  // Capture image from video stream
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      if (blob) {
        const file = new File([blob], 'visitor.jpg', { type: 'image/jpeg' });
        setImage(file);
        setVisitorName('visitor.jpg');
      } else {
        console.error('Failed to capture image from canvas.');
      }
    }, 'image/jpeg');
  };

  // Send image to AWS Lambda
  const sendImage = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('No image selected or captured.');
      return;
    }

    const visitorImageName = uuidv4();
    setVisitorName(`${visitorImageName}.jpeg`);

    try {
      await fetch(`${process.env.REACT_APP_UPLOAD_URL}/${visitorImageName}.jpeg`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg'
        },
        body: image
      });

      const response = await AuthenticatorResponse(visitorImageName);

      if (response.Message === 'Success') {
        setAuth(true);
        setUploadResultMessage(`Hi ${response.firstName} ${response.lastName}, welcome to work!`);
      } else {
        setAuth(false);
        setUploadResultMessage('Authentication failed: you are not an employee.');
      }
    } catch (error) {
      console.error(error);
      setAuth(false);
      setUploadResultMessage('Error during authentication. Please try again.');
    }
  };

  // AWS Lambda GET call
  const AuthenticatorResponse = async (visitorImageName) => {
    const requestUrl = `${process.env.REACT_APP_AUTH_URL}?objectKey=${visitorImageName}.jpeg`;
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  };

  return (
    <div className="App">
      <h2>FaceSense: AI-Powered Attendance for Modern Offices via AWS</h2>

      <video ref={videoRef} width="100%" height="250" style={{ borderRadius: '8px' }} />

      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'center' }}>
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={stopCamera}>Stop Camera</button>
        <button onClick={captureImage}>Capture Image</button>
      </div>

      <form onSubmit={sendImage}>
        <input type='file' accept='image/*' onChange={e => setImage(e.target.files[0])} />
        <button type='submit'>Authenticate</button>
      </form>

      <div className={isAuth ? 'success' : 'failure'}>
        {uploadResultMessage}
      </div>

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Visitor Preview"
        />
      )}
    </div>
  );
}

export default App;