import { useState, useEffect } from 'react';

import { useLogin } from '../hooks/useLogin';
import { desktopBg } from '../assests';

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
    <div className='h-screen w-9/12 flex items-center justify-start'>
      <img className='fixed top-0 left-0 h-screen w-full overflow-hidden -z-10' src={desktopBg} alt='desktop image' />
      <form onSubmit={handleSubmit} className='flex flex-col gap-10 bg-white h-1/2 items-center w-1/3 rounded-xl shadow-md'>
        <div>
          <h1 className='font-bold'>Login</h1>
        </div>
        <div className='flex flex-col gap-3 w-2/3'>
          <label className='flex flex-col'>
            Email:
            <input className='rounded-lg' type='email' placeholder='Enter email' name='email' value={formData.email} onChange={handleChange} />
          </label>
          <label className='flex flex-col'>
            Password:
            <input className='rounded-lg' type='password' placeholder='Enter password' name='password' value={formData.password} onChange={handleChange} />
          </label>
          <button className='bg-green-500 rounded-xl w-2/3 m-auto py-1 mt-5' disabled={isLoading} type="submit">Login</button>
          {error && <div>{error}</div>}
        </div>
      </form>
    </div>
  )
}

export default Login;