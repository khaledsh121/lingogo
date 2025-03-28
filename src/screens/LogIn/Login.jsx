import "../LogIn/Login.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import Promo from "../../components/Promo/Promo";

const Login = () => {
  return (
    <div className="login-Container">
      <Promo />
      <LoginForm />
    </div>
  );
};

export default Login;
