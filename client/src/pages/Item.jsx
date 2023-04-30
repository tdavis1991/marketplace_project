import React from 'react';

const Item = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    photo: ''
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

    setFormData({
      title: '',
      description: '',
      price: 0,
      category: '',
      photo: ''
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Post item for sale</h2>
        <label>
          Title:
          <input type='title' name='title' value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name='description' value={formData.description} onChange={handleChange} />
        </label>
        <button type="submit" disabled={isLoading}>Sign Up</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  )
}

export default Item