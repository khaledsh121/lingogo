import "../DashboardCard/DashboardCard.css";

const DashboardCard = ({ imgsrc, alt, desc, handleCardClick }) => {
  return (
    <div className="dashboard-card-container" onClick={handleCardClick}>
      <img src={imgsrc} alt={alt} className={desc} />
      <span>{desc}</span>
    </div>
  );
};

export default DashboardCard;
