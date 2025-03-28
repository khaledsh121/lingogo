import "../Wellcome/Wellcome.css";
import NavBar from "../../components/NavBar/NavBar";
import Intro from "../../components/Intro/Intro";
import AboutUs from "../../components/AboutUs/AboutUs";
import OurStudents from "../../components/OurStudents/OurStudentss";
import Opinions from "../../components/Opinions/Opinions";
import EmailUs from "../../components/EmailUs/EmailUs";
import WellcomeFooter from "../../components/WellcomeFooter/WellcomeFooter";
import { useEffect } from "react";

const Wellcome = () => {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  return (
    <div className="Wellcome-screen-container">
      <NavBar />
      <Intro />
      <AboutUs />
      <OurStudents />
      <Opinions />
      <EmailUs />
      <WellcomeFooter />
    </div>
  );
};

export default Wellcome;
