import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const demoHandler = () => {
    dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    ).then(closeModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <>
      <div className="loginModal">
        <h1>Log In</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li className="error" key={idx}>
                {error}
              </li>
            ))}
          </ul>
          <label>Username or Email</label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="login-button"
            type="submit"
            disabled={credential.length < 4 || password.length < 6}
          >
            Log In
          </button>
        </form>
        <button className="demo-button" type="submit" onClick={demoHandler}>
          Demo User
        </button>
      </div>
    </>
  );
}

export default LoginFormModal;
