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
    <div className='h-5/6 my-10 shadow-md rounded-lg'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
        <h2>Post item for sale</h2>
        <label className='flex flex-col'>
          Title:
          <input placeholder='Title' className="input input-bordered w-full max-w-xs" type='text' name='title' value={formData.title} onChange={handleChange} />
        </label>
        <div className='flex justify-between w-full max-w-xs'>
          <label className='flex flex-col w-2/5'>
            Price:
            <input placeholder='Price' className="input input-bordered w-full max-w-xs" type='number' name='price' value={formData.price} onChange={handleChange} />
          </label>
          <label className='flex flex-col w-2/5'>
            Rating:
            <input placeholder='Rating' className="input input-bordered w-full max-w-xs" type='number' name='rating' value={formData.rating} onChange={handleChange} />
          </label>
        </div>
        <select className='select select-bordered select-md w-full max-w-xs rounded-2xl' name='category' value={formData.category} onChange={handleChange}>
          <option disabled selected>Category</option>
          <option value="electronic">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="outdoor">Outdoor</option>
        </select>
        <label className='flex flex-col'>
          Description:
          <textarea placeholder='Description' className="textarea textarea-bordered textarea-lg w-full max-w-xs" name='description' value={formData.description} onChange={handleChange} />
        </label>  
        <label>
          Photo:
          <input className="file-input file-input-bordered w-full max-w-xs" accept='image/*' type='file' onChange={(e) => handleImageChange(e.target.files[0])} />
        </label>
        <button className='bg-quaternary w-1/2 mx-auto rounded-lg py-3' type="submit">Post Item</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  )
}

export default Item
