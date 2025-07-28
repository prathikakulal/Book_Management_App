import React, { useState, useEffect } from "react";

const ConfettiPiece = ({ x, y, angle, size, opacity, color }) => (
  <div
    style={{
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      opacity,
      borderRadius: "50%",
      transform: `rotate(${angle}deg)`,
      pointerEvents: "none"
    }}
  />
);

const Confetti = ({ show }) => {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    if (show) {
      const newPieces = Array.from({ length: 100 }).map(() => ({
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: -20,
        angle: Math.random() * 360,
        size: Math.random() * 8 + 4,
        opacity: 1,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      }));
      setPieces(newPieces);
      setTimeout(() => {
        setPieces((curr) => curr.map(p => ({ ...p, y: window.innerHeight + 20, opacity: 0 })));
      }, 100);
      setTimeout(() => setPieces([]), 1100);
    }
  }, [show]);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 9999 }}>
      {pieces.map((p) => <ConfettiPiece key={p.id} {...p} />)}
    </div>
  );
};
export default Confetti;
