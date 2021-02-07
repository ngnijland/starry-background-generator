import { useState } from "react";

import "./App.css";

type Size = [number, number];

function generateStars(amount: number, size: Size): string {
  let stars = "";

  for (let i = 0; i < amount; i++) {
    stars = `${stars}${i === 0 ? "" : ","} ${Math.ceil(
      Math.random() * size[0]
    )}px ${Math.ceil(Math.random() * size[1])}px var(--star-color)`;
  }

  return stars;
}

function App(): JSX.Element {
  const [stars, setStars] = useState<number[]>([100]);
  const [size, setSize] = useState<Size>([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [color, setColor] = useState<string>("#fff");

  return (
    <div>
      <div>
        <h1>Starry background generator</h1>
        <h2>Stars:</h2>
        {stars.map((star, index) => (
          <div>
            <label key={index}>
              Number of stars of size: {index + 1}
              <input
                type="number"
                value={star}
                onChange={({ target: { value } }) => {
                  setStars((prev) => {
                    const newState = [...prev];
                    newState[index] = Number(value);
                    return newState;
                  });
                }}
              />
            </label>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setStars((prev) => [...prev, 100]);
          }}
        >
          Add star size
        </button>

        <h2>Size:</h2>
        <div>
          <label>
            Width
            <input
              type="number"
              value={size[0]}
              onChange={({ target: { value } }) => {
                setSize((prev) => {
                  return [Number(value), prev[1]];
                });
              }}
            />
          </label>
        </div>
      </div>
      <div>
        <label>
          Height
          <input
            type="number"
            value={size[1]}
            onChange={({ target: { value } }) => {
              setSize((prev) => {
                return [prev[0], Number(value)];
              });
            }}
          />
        </label>
      </div>

      <h2>Color:</h2>
      <div>
        <label>
          Color
          <input
            type="text"
            value={color}
            onChange={({ target: { value } }) => {
              setColor(value);
              document.documentElement.style.setProperty("--star-color", value);
            }}
          />
        </label>
      </div>
      {stars.map((star, index) => (
        <div
          key={index}
          className="star"
          style={{
            width: `${index + 1}px`,
            height: `${index + 1}px`,
            boxShadow: generateStars(star, size),
          }}
        ></div>
      ))}
    </div>
  );
}

export default App;
