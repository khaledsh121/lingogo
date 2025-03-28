import "../EmailUs/EmailUs.css";

const EmailUs = () => {
  return (
    <div id="emailUs" className="email-us-container">
      <h1>contact with us and write your nots </h1>
      <div className="input-container">
        <input
          type="email"
          placeholder="Email address..."
          className="email-input"
        />
        <button className="email-button">Email</button>
      </div>
    </div>
  );
};

export default EmailUs;
