import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define keyframes for rotating the circle
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Define styled component for the circular container
const Circle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid #000;
  animation: ${rotate} 10s linear infinite;
`;

// Define styled component for each letter that will rotate along the circle
const Character = styled.span<{ rotateDeg: number }>`
  position: absolute;
  transform-origin: 100px; /* Radius of the circle (half the width/height of Circle) */
  transform: rotate(${(props) => props.rotateDeg}deg) translate(100px) rotate(-${(props) => props.rotateDeg}deg);
  font-size: 48px;
`;

// Define the CircularText component
const Animation: React.FC<{ text: string }> = ({ text }) => {
  const characters = text.split('');
  const angleStep = 200 / characters.length;

  return (
    <Circle>
      {characters.map((char, index) => (
        <Character key={index} rotateDeg={index * angleStep}>
          {char}
        </Character>
      ))}
    </Circle>
  );
};

export default Animation;
