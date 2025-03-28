import "../UserInfoCard/UserInfoCard.css";

const UserInfoCard = ({ percentage, desc }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;
  return (
    <div className="user-info-card-container">
      <svg className="percentage">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#ddd"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#6918e8"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dy=".3em"
          fontSize="18px"
          fill="#6918e8"
          fontWeight="bold"
        >
          {percentage}%
        </text>
      </svg>
      <span>{desc}</span>
    </div>
  );
};

export default UserInfoCard;
