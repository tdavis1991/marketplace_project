import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';
import { usePostItem } from '../hooks/usePostItem';

const Item = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
  });

  const [photo, setPhoto] = useState({ name: '', url: '' });

  const { postItem, isLoading, error } = usePostItem();

  const { user } = useAuthContext();

  // console.log('Rendering Item component with user:', user)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (file) => {
    const reader = (readFile) =>
      new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.readAsDataURL(readFile);
      });
  
    reader(file).then((result) =>
      setPhoto({ name: file?.name, url: result })
    );
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(photo)

    await postItem(formData.title, formData.description, formData.price, formData.category, photo.url, user.email);

    setFormData({
      title: '',
      description: '',
      price: 0,
      category: '',
    });

    setPhoto({ name: '', url: '' })
  };

  if (!user) {
    return <div>Loading...</div>; // Or redirect to login page
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Post item for sale</h2>
        <label>
          Title:
          <input type='text' name='title' value={formData.title} onChange={handleChange} />
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
          <input hidden accept='image/*' type='file' onChange={(e) => handleImageChange(e.target.files[0])} />
        </label>
        <button type="submit">Post Item</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  )
}

export default Item
