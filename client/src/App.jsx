import { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    photo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:8080/api/v1/items', formData)
      .then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
    
      setFormData({
        title: '',
        description: '',
        price: 0,
        category: '',
        photo: ''
      })
  }


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name='title' value={formData.title} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea name='description' value={formData.description} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Price:
          <input type='number' name='price' value={formData.price} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Category:
          <input type="text" name='category' value={formData.category} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Photo:
          <input type='file' name='photo' value={formData.photo} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
