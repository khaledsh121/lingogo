import "../Level/Level.css";
import PagesList from "../PagesList/PagesList";
import { NewWorld, Heart } from "../../AssetsFolder/Images";
import { useEffect, useState } from "react";
import {
  fetchImageFromGoogleAPI,
  fetchTranslation,
  getLevel,
  SubmitLevel,
} from "../../Utils/Utils";
import { useLocation, useNavigate } from "react-router-dom";

const Level = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentLevel = location.state?.index + 1 || 1;

  const [selectedLevel, setSelectedLevel] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(
    location.state?.currentQuestion || 0
  );
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answer, setAnswer] = useState("");
  const [lifes, setLifes] = useState(3);
  const [fullAnswers, setFullAnswers] = useState(
    location.state?.fullAnswers || {
      topicId: "",
      fullEvaluation: [],
      levelNumber: currentLevel,
      score: 0,
      completed: true,
    }
  );
  const [fullLevel, setFullLevel] = useState({});

  useEffect(() => {
    const fetchLevelData = async () => {
      const level = await getLevel(currentLevel);
      if (!level) return;

      setFullLevel(level);

      const translatedTopic = await fetchTranslation(level?.topic, "native");
      setSelectedLevel((prev) => ({ ...prev, translatedTopic }));

      setFullAnswers((prev) => ({
        ...prev,
        topic: level.topic,
        topicId: level.id,
      }));
    };

    fetchLevelData();
  }, [currentLevel]);

  useEffect(() => {
    const fetchQuestion = async () => {
      const currentQ = fullLevel?.questions?.[currentQuestion];
      if (!currentQ) return;

      const translatedAnswer = await fetchTranslation(currentQ.answer);
      const translatedQuestion = await fetchTranslation(
        currentQ.question,
        "native"
      );
      const translatedOptions = await Promise.all(
        currentQ.options.map(async (item) => ({
          translatedOption: await fetchTranslation(item),
          OptionImg: await fetchImageFromGoogleAPI(item),
        }))
      );

      setAnswer(translatedAnswer);
      setSelectedLevel((prev) => ({
        ...prev,
        translatedQuestion,
        translatedOptions,
      }));
    };

    if (fullLevel.questions) {
      fetchQuestion();
    }
  }, [currentQuestion, fullLevel]);

  const handleSubmitAnswer = () => {
    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedSelectedAnswer = selectedAnswer.trim().toLowerCase();

    let updatedLifes = lifes;
    if (normalizedAnswer !== normalizedSelectedAnswer) {
      updatedLifes -= 1;
      setLifes(updatedLifes);
    }

    const newFullAnswers = {
      ...fullAnswers,
      fullEvaluation: [
        ...fullAnswers.fullEvaluation,
        {
          question: selectedLevel.translatedQuestion,
          options: selectedLevel.translatedOptions,
          answer: answer,
          selectedAnswer: selectedAnswer,
          evaluation: normalizedAnswer === normalizedSelectedAnswer,
        },
      ],
      score:
        normalizedAnswer === normalizedSelectedAnswer
          ? fullAnswers.score + 1
          : fullAnswers.score,
    };

    setFullAnswers(newFullAnswers);

    if (updatedLifes <= 0) {
      SubmitLevel({ ...newFullAnswers, completed: false });
      navigate("/realScenario");
      return;
    }

    if (fullLevel.questions.length > currentQuestion + 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
      setSelectedLevel({
        ...selectedLevel,
        translatedOptions: [],
        translatedQuestion: "",
      });
    } else {
      const waitLevelupdate = async () => {
        await SubmitLevel(newFullAnswers);
        navigate("/realScenario");
      };
      waitLevelupdate();
    }
  };

  return (
    <div className="level-container">
      <PagesList active={3} />
      <div className="question-container">
        <div className="header">
          <div className="new-world-container">
            <img src={NewWorld} alt="circle" />
            <span>{selectedLevel.translatedTopic || "Loading..."}</span>
          </div>
          <div className="horizontal-line" />
          <div className="lifes-container">
            <img src={Heart} alt="Heart" />
            <span>{lifes}</span>
          </div>
        </div>
        <h1>{selectedLevel.translatedQuestion || "Loading..."}</h1>
        <div className="answer-container">
          {selectedLevel?.translatedOptions?.map((item, index) => (
            <div
              className={`answer-card ${
                selectedAnswer === item.translatedOption
                  ? "selected-answer-card"
                  : ""
              }`}
              key={index}
              onClick={() => setSelectedAnswer(item.translatedOption)}
            >
              <img src={item.OptionImg} alt={`Option ${index}`} />
              <span>{item.translatedOption}</span>
            </div>
          ))}
        </div>
        <div className="btn-container">
          <button
            onClick={
              selectedAnswer
                ? handleSubmitAnswer
                : () => alert("Please select an answer!")
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Level;
