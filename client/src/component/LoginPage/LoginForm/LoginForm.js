import "./LoginForm.css";

const LoginForm = () => {
  return (
    <div className="login-form">
      <h1>Login</h1>
      <div className="form-control">
        <input type="text" placeholder="Username"></input>
        <span></span>
      </div>
      <div className="form-control">
        <input type="text" placeholder="Password"></input>
        <span></span>
      </div>
      <button className="login-btn">Login</button>
    </div>
  );
};

export default LoginForm;
