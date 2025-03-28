import "../Slide/Slide.css";

const Slide = ({ imgSource, comment }) => {
  return (
    <div className="slides-container">
      <div className="slide-container">
        <div className="slide-img-container">
          <img src={imgSource} alt="user profile" />
          <div className="eclipse"></div>
        </div>
        <p>{comment}</p>
      </div>
      <div className="slide-container">
        <div className="slide-img-container">
          <img src={imgSource} alt="user profile" />
          <div className="eclipse"></div>
        </div>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Slide;
