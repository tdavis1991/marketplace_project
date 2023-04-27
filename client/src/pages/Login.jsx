import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Login;