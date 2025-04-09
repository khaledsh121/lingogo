import { useEffect, useState } from "react";
import "../CreatePresentation/CreatePresentation.css";
import PagesList from "../PagesList/PagesList";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchImageFromGoogleAPI, fetchTranslation } from "../../Utils/Utils";
import { Image } from "../../AssetsFolder/Images";

const CreatePresentation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [ImgURI, setImgURI] = useState(Image);
  const [itemToFetch, setItemToFetch] = useState("");
  const [translation, setTranslation] = useState("");
  const [fetchingData, setFetchingData] = useState(false);
  const [prevPresentation, setprevPresentation] = useState(
    location.state?.prevPresentation || []
  );
  const [currentSlide, setCurrentSlide] = useState(prevPresentation.length + 1);

  const [nativeLanguageInput, setNativeLanguageInput] = useState("");

  const handleUserChangeInput = (event) => {
    setNativeLanguageInput(event.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (nativeLanguageInput !== itemToFetch) {
        setItemToFetch(nativeLanguageInput);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [nativeLanguageInput, itemToFetch]);

  const handleNextClick = () => {
    if (itemToFetch && translation && ImgURI && nativeLanguageInput) {
      setprevPresentation((prev) => {
        const existingSlideIndex = prev.findIndex(
          (slide) => slide.id === currentSlide
        );
        const newSlide = {
          source: ImgURI,
          id: currentSlide,
          nativeLanguage: nativeLanguageInput,
          translation: translation,
        };

        if (existingSlideIndex !== -1) {
          const updatedSlides = [...prev];
          updatedSlides[existingSlideIndex] = newSlide;
          return updatedSlides;
        } else {
          return [...prev, newSlide];
        }
      });

      setNativeLanguageInput("");
      setTranslation("");
      setImgURI(Image);
      setCurrentSlide(prevPresentation.length + 2);
    }
  };

  const handleFinishPresentationClick = () => {
    handleNextClick();
    navigate("/SubmitPresentation", { state: { prevPresentation } });
  };

  useEffect(() => {
    const fetchImageAndTranslation = async () => {
      setFetchingData(true);
      try {
        const imageURI = await fetchImageFromGoogleAPI(itemToFetch);
        setImgURI(imageURI);

        const translation = await fetchTranslation(itemToFetch, "en", "ar");
        setTranslation(translation);
        setFetchingData(false);
      } catch (err) {
        console.log(err);
      }
    };

    if (itemToFetch) {
      fetchImageAndTranslation();
    }
  }, [itemToFetch]);

  const handlePreviousPresentationClick = (prev) => {
    setNativeLanguageInput(prev.nativeLanguage);
    setImgURI(prev.source);
    setTranslation(prev.translation);
    setCurrentSlide(prev.id);
  };

  return (
    <div className="create-presentation-container">
      <PagesList active={2} />
      <div className="create-proccess">
        <div className="show-all-slides">
          {prevPresentation.map((item) => {
            return (
              <div
                className="Previous-slide"
                key={item.id}
                onClick={() => {
                  handlePreviousPresentationClick(item);
                }}
              >
                <img src={item.source} alt={item.nativeLanguage} />
              </div>
            );
          })}
          <button onClick={handleNextClick}>+</button>
        </div>
        <div className="create-presentation-process">
          <div className="native-language-input-container">
            <input
              type="text"
              onChange={handleUserChangeInput}
              placeholder="Write ..."
              value={nativeLanguageInput}
            />
          </div>
          {fetchingData ? (
            <div className="image-loading">Loading...</div> // Or use a spinner
          ) : (
            <img src={ImgURI} alt={nativeLanguageInput} />
          )}
          <label>{translation}</label>
          <div className="finsh-presentation-btn-container">
            {prevPresentation.length < 10 ? (
              <div>
                At least 10 slides must be created [{prevPresentation.length}]
              </div>
            ) : null}
            <button
              onClick={handleFinishPresentationClick}
              disabled={prevPresentation.length < 10}
              style={
                prevPresentation.length < 10
                  ? { opacity: "0.5" }
                  : { opacity: "1" }
              }
            >
              finish
            </button>
            <button onClick={handleNextClick}>next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePresentation;
