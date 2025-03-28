import "../Signup/Signup.css";
import SignupForm from "../../components/SignupForm/SignupForm";
import Promo from "../../components/Promo/Promo";

const Signup = () => {
  return (
    <div className="signup-Container">
      <Promo />
      <SignupForm />
    </div>
  );
};

export default Signup;
