import React, { useState } from "react";
import axios from "../../utils/axios";

const LoginForm = props => {
  const [form, setForm] = useState({ username: "", password: "" });

  const changeHandler = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = e => {
    console.log(form);
    e.preventDefault();
    axios()
      .post("/api/auth/login", form)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        props.history.push("/jokes");
      })
      .catch(err => console.log(err.response));
  };

  return (
    <form onSubmit={handleLogin}>
      Login
      <input
        type="text"
        value={form.username}
        name="username"
        onChange={changeHandler}
      />
      <input
        type="password"
        value={form.password}
        name="password"
        onChange={changeHandler}
      />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
