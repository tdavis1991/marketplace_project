import { useState } from 'react';

import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login, isLoading, error } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(formData.email, formData.password);

    setFormData({
      email: '',
      password: '',
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <label>
          Email:
          <input type='email' name='email' value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type='password' name='password' value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit" disabled={isLoading}>Sign Up</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  )
}

export default Login;