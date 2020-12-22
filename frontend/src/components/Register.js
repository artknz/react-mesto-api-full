import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ handleRegister }) => {
  const [ data, setData ] = useState({
    email: '',
    password: '',
    message: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    handleRegister(email, password)
  }
  return(
    <div className="auth">
      <p className="auth__welcome">Регистрация</p>
      <form onSubmit={handleSubmit} className="auth__form">
        <input id="username" required name="email" placeholder="Email" type="text" value={data.username} onChange={handleChange} />
        <input id="password" required name="password" placeholder="Пароль" type="password" value={data.password} onChange={handleChange} />
        <div className="auth__button-container">
          <button type="submit" className="auth__link">Зарегистрироваться</button>
        </div>
        <p className="auth__register-router">Уже зарегистрированы?<Link to="/signin" className="auth__register-router"> Войти</Link></p>
      </form>
    </div>
  );
}

export default Register;
