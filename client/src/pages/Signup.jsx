import { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: ''
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

    console.log(formData.name, formData.email, formData.password, formData.avatar);

    setFormData({
      name: '',
      email: '',
      password: '',
      avatar: ''
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label>
          Name:
          <input type="text" name='name' value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type='email' name='email' value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type='password' name='password' value={formData.password} onChange={handleChange} />
        </label>
        <label>
          Avatar:
          <input type='file' name='avatar' value={formData.avatar} onChange={handleChange} />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup;