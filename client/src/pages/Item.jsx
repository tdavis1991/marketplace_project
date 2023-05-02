import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';

const postItem = async ({ title, description, price, category, photo }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  setIsLoading(true);
  setError(null);

  const response = await fetch('http://localhost:8080/api/v1/items', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ title, description, price, category, photo })
  })
}

const Item = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    photo: ''
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
    console.log(formData)

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
        <label>
          Price:
          <input type='number' name='price' value={formData.price} onChange={handleChange} />
        </label>
        <select name='category' value={formData.category} onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="electronic">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="outdoor">Outdoor</option>
        </select>

        <label>
          Photo:
          <input type='file' name='photo' value={formData.photo} onChange={handleChange} />
        </label>
        <button type="submit">Post Item</button>
        {/* {error && <div>{error}</div>} */}
      </form>
    </div>
  )
}

export default Item