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
    rating: 0,
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
    console.log('ITEM', photo)

    await postItem(formData.title, formData.description, formData.price, formData.rating, formData.category, photo.url, user.email);

    setFormData({
      title: '',
      description: '',
      price: 0,
      category: '',
      rating: 0,
    });

    setPhoto({ name: '', url: '' })
  };

  if (!user) {
    return <div>Loading...</div>; // Or redirect to login page
  }

  return (
    <div className='h-5/6 mt-10'>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <h2>Post item for sale</h2>
        <label>
          Title:
          <input className="input input-bordered w-full max-w-xs" type='text' name='title' value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input className="input input-bordered w-full max-w-xs" type='number' name='price' value={formData.price} onChange={handleChange} />
        </label>
        <label>
          Rating:
          <input className="input input-bordered w-full max-w-xs" type='number' name='rating' value={formData.rating} onChange={handleChange} />
        </label>
        <select name='category' value={formData.category} onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="electronic">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="outdoor">Outdoor</option>
        </select>

        <label>
          Photo:
          <input className="file-input file-input-bordered w-full max-w-xs" accept='image/*' type='file' onChange={(e) => handleImageChange(e.target.files[0])} />
        </label>
        <label>
          Description:
          <textarea className="textarea textarea-bordered textarea-lg w-full max-w-xs" name='description' value={formData.description} onChange={handleChange} />
        </label>
        <button type="submit">Post Item</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  )
}

export default Item
