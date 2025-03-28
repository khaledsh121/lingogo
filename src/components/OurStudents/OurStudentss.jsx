import { useState, useRef, useEffect } from "react";
import "../OurStudents/OurStudents.css";
import { OurStudentsImg } from "../../AssetsFolder/Images";
import Counter from "../Counter/Counter";

const OurStudents = () => {
  const studentsNumber = 9999;
  const [number, setNumber] = useState(0);
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const currentRef = counterRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting) {
          setNumber(0);
          setNumber1(0);
          setNumber2(0);
          setNumber3(0);
        }
      },
      { threshold: 1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div id="ourStudents" className="our-students-container">
      <div className="our-student-img-container">
        <h1>Our Students :</h1>
        <div className="img">
          <img
            src={OurStudentsImg}
            alt="A person sitting on a chair"
            className="our-students-img"
          />
        </div>
      </div>
      <div className="counters-container" ref={counterRef}>
        <div className="first-counter-container">
          <Counter
            finalNumber={studentsNumber}
            description="Students Number"
            number={number}
            setNumber={setNumber}
            isVisible={isVisible}
            intervalBetweenIncrease={1}
            increaseAmount={3}
          />
          <Counter
            finalNumber={studentsNumber}
            description="Happy Students"
            number={number1}
            setNumber={setNumber1}
            isVisible={isVisible}
            intervalBetweenIncrease={1}
            increaseAmount={3}
          />
        </div>
        <div className="second-counter-container">
          <Counter
            finalNumber={studentsNumber}
            description="Languages Available"
            number={number2}
            setNumber={setNumber2}
            isVisible={isVisible}
            intervalBetweenIncrease={1}
            increaseAmount={3}
          />
          <Counter
            finalNumber={studentsNumber}
            description="Daily Logins"
            number={number3}
            setNumber={setNumber3}
            isVisible={isVisible}
            intervalBetweenIncrease={1}
            increaseAmount={3}
          />
        </div>
      </div>
    </div>
  );
};

export default OurStudents;
