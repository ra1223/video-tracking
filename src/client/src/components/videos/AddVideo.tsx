import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useVideoContext } from '../../App';

const AddVideo: React.FC = () => {
  // Hooks
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Thrillest');
  const [redirect, setRedirect] = useState(false);

  const { addNewVideo } = useVideoContext();

  if (!addNewVideo) {
    throw new Error('addNewVideo not working');
  }
  
  // Change textbox value when user types something
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  // Change dropdown value when user selects something
  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setBrand(e.target.value);
  };

  // Once the user clicks submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addNewVideo(name, brand);
    setName('');
    setRedirect(true);
  };

  return (
    <div style={{textAlign: 'center', position: 'relative'}}>
      <div style={{display: 'inline-block', paddingRight: '300px'}}>
        <span style={{float: 'left', textDecoration: 'none'}}>
          <Link to='/'>Go Back</Link>
        </span>
      </div>

      <div>
        <h3>Add New Video</h3>
      </div>

      {!redirect ? 
        <div style={{display: 'inline-block'}}>
          <form
            id='form'
            style={{display: 'flex'}}
            onSubmit={handleSubmit}
          >

            <input 
              type="text" 
              name="Name of Video"
              style={{ padding: '5px' }}
              placeholder="Name of video ..."
              value={name}
              onChange={handleTextChange}
            />

            <select name="brand" value={brand} onChange={handleDropdownChange}>
              <option value="Thrillest">Thrillest</option>
              <option value="NowThis">NowThis</option>
              <option value="The Dodo">The Dodo</option>
              <option value="Seeker">Seeker</option>
            </select> 

            <button 
              type='submit'
              value='submit'
              form='form'
              disabled={ !name }
            >Submit</button>

          </form>
        </div>
      : <Redirect to='/' />}

    </div>
  )
}

export default AddVideo;