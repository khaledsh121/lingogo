import { useLocation, useNavigate } from "react-router-dom";
import "../ShowPresentation/ShowPresentation.css";
import { useEffect, useState } from "react";

const ShowPresentation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [presentation, setPresentation] = useState(
    location.state?.presentation || null
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  const speakText = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!presentation?.slides || presentation.slides.length === 0) return;

    const speakSlideText = (slide) => {
      if (!slide) return;
      window.speechSynthesis.cancel();
      speakText(slide.nativeLanguage, presentation.translatingFrom);

      setTimeout(() => {
        speakText(slide.translation, presentation.translatingTo);
      }, 2000);
    };

    speakSlideText(presentation.slides[0]);

    const interval = setInterval(() => {
      const randomIndex = Math.floor(
        Math.random() * presentation.slides.length
      );
      setCurrentSlide(randomIndex);
      speakSlideText(presentation.slides[randomIndex]);
    }, 8000);

    return () => {
      clearInterval(interval);
      window.speechSynthesis.cancel();
    };
  }, [
    presentation?.slides,
    presentation?.translatingFrom,
    presentation?.translatingTo,
  ]);

  if (
    !presentation ||
    !presentation.slides ||
    presentation.slides.length === 0
  ) {
    return <div>please create a presentation first</div>;
  }

  return (
    <div className="show-presentation-container">
      <div className="show-presentation">
        <label>{presentation.slides[currentSlide].nativeLanguage}</label>
        <img src={presentation.slides[currentSlide].source} alt="" />
        <label>{presentation.slides[currentSlide].translation}</label>

        <div className="center">
          <button
            className="return-btn"
            onClick={() => {
              navigate("/presentation");
            }}
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowPresentation;
