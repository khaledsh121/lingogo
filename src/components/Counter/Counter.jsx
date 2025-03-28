import { useEffect } from "react";
import "../Counter/Counter.css";

const Counter = ({
  finalNumber,
  description,
  number,
  setNumber,
  isVisible,
  intervalBetweenIncrease,
  increaseAmount,
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setNumber((prev) =>
        prev >= finalNumber ? finalNumber : prev + increaseAmount
      );
    }, intervalBetweenIncrease);

    return () => clearInterval(interval);
  }, [
    isVisible,
    finalNumber,
    setNumber,
    increaseAmount,
    intervalBetweenIncrease,
  ]);
  return (
    <div className="counter-container">
      <div className="counter">{number}</div>
      <div className="counter-description">{description}</div>
    </div>
  );
};

export default Counter;
