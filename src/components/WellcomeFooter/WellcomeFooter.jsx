import "../WellcomeFooter/WellcomeFooter.css";
import {
  FacebookIcon,
  EmailIcon,
  twitterIcon,
  WhatsAppIcon,
  InstaGramIcon,
} from "../../AssetsFolder/Images";

const WellcomeFooter = () => {
  const contactInfo = [
    {
      id: 1,
      Icon: FacebookIcon,
      text: "LinguMaster",
    },
    {
      id: 2,
      Icon: InstaGramIcon,
      text: "LinguMaster",
    },
    {
      id: 3,
      Icon: EmailIcon,
      text: "LinguMaster@gmail.com",
    },
    {
      id: 4,
      Icon: WhatsAppIcon,
      text: "1-800 100 100",
    },
    {
      id: 5,
      Icon: twitterIcon,
      text: "LinguMaster",
    },
  ];
  return (
    <div className="Wellcome-footer-container">
      <h1 className="footer-header">Contact Us :</h1>
      <div className="footer-content">
        <div className="contact-container">
          {contactInfo.map((item) => {
            return (
              <div key={item.id} className="contact-item-container">
                <img src={item.Icon} alt="icon" className="contact-img" />
                <p className="contact-info">{item.text}</p>
              </div>
            );
          })}
        </div>
        <div className="footer-links-container">
          <div className="footer-links-container_upper">
            <div className="footer-links">
              <span>About Us</span>
              <span>Features</span>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
            <div className="footer-links">
              <span>Quick Links :</span>
              <span>Presentations</span>
              <span>Real Scenarios</span>
              <span>AI Chatting</span>
            </div>
          </div>
          <h2>We are delighted to make your learning enjoyable</h2>
        </div>
      </div>
      <div className="copy-right">© 2025 LinguMaster. All rights reserved.</div>
    </div>
  );
};

export default WellcomeFooter;
