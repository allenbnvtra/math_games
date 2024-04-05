"use client";

import React, { useState, useEffect } from "react";

const shapes = ["circle", "square", "triangle"]; // Possible shape options
const shapeImages = {
  circle: "circle.png",
  square: "square.png",
  triangle: "triangle.png",
};

const ShapeConnect = () => {
  const [currentChoices, setCurrentChoices] = useState([]);
  const [randomShape, setRandomShape] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateChoices();
  }, []);

  const generateChoices = () => {
    // Randomly select a shape as the correct answer
    const randomIndex = Math.floor(Math.random() * shapes.length);
    const correctShape = shapes[randomIndex];
    setRandomShape(correctShape);

    // Create choices array with the correct shape and three random shapes
    const otherShapes = shapes.filter((shape) => shape !== correctShape);
    const choices = [correctShape];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * otherShapes.length);
      choices.push(otherShapes[randomIndex]);
    }

    // Shuffle the choices array
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }

    setCurrentChoices(choices);
  };

  const handleClick = (shape) => {
    if (shape === randomShape) {
      setScore(score + 1);
    }
    generateChoices();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Shape Counting Game is under process
      </h1>
      {/* <div className="mb-4">
        <img
          src={shapeImages[randomShape]}
          alt={randomShape}
          className="w-32 h-32"
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {currentChoices.map((shape, index) => (
          <div key={index} className="m-4">
            <img
              src={shapeImages[shape]}
              alt={shape}
              className="w-16 h-16 cursor-pointer"
              onClick={() => handleClick(shape)}
            />
          </div>
        ))}
      </div>
      <div className="mt-4">Score: {score}</div> */}
    </div>
  );
};

export default ShapeConnect;
