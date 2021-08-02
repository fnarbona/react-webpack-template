import React, { useEffect, useRef } from "react";
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/face-landmarks-detection';
import Webcam from 'react-webcam';
import { hot } from "react-hot-loader";
import "./App.scss";
import 'bootstrap';

const App = () => {
  useEffect(() => {
    runFacemesh();
  })

  const resolution = {
    height: "480px",
    width: "640px"
  }

  // // setup references
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  
  // load facemesh
  const runFacemesh = async () => {
    const model = await facemesh.load({
      inputResolution: { width: 640, height: 480 }, scale: 0.8
    })
    setInterval(() => detect(model), 100)
  }

  // detect
  const detect = async (model) => {
    if (
      typeof webcamRef.current !== "undefined" && 
      webcamRef.current !== null && 
      webcamRef.current.video.readyState === 4) 
    {
      // get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // make detections
      const predictions = await model.estimateFaces(video);
      console.log(predictions);

      // get canvas context for drawing

    }
  }

  return (
    <div className="App">
      <div className="d-flex flex-column justify-content-center align-items-center pt-5">
        <h1>FaceMesh</h1>
        <Webcam ref={webcamRef} style={resolution}/>
        <canvas ref={canvasRef} style={resolution}/>
      </div>
    </div>
  )
};

// export default hot(module)(App);
export default hot(module)(App);