import React, { useEffect, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Props {
  video_id: string;
}

// Props here is broken down in order to pass value from state object in 
// the Redirect component. It's being used in the VideoList component
const VideoReport: React.FC<any> = ({ location: { state: { video_id } } }) => {
  // Hooks
  const [count, setCount] = useState(0);
  const [id, setId] = useState('');
  const [videoName, setVideoName] = useState('');
  const [brand, setBrand] = useState('');
  const [videoPublishedDate, setVideoPublishedDate] = useState('');

  // Get all data
  const getData = async () => {
    const { data } = await axios.get(`/api/video/report/${video_id}`);
    const { videoInfo, count } = data;

    const { id, name, brand, published_date } = videoInfo;

    setId(id);
    setCount(count);
    setVideoName(name);
    setBrand(brand);
    setVideoPublishedDate(published_date);
  }

  // Update view count 
  const updateCount = (e: MouseEvent<HTMLButtonElement>): void => {
    try {
      axios.put(`/api/video/view/${video_id}`);
      setCount(count + 1);
    } catch (e) {
      throw e;
    }
  }

  // Get initial data
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Link to='/'>
        Go Back
      </Link>

      <div >
        <h3>Id: {id}</h3>
        <h3>Name: {videoName}</h3>
        <h3>Brand: {brand}</h3>
        <h3>Published Date: {videoPublishedDate}</h3>
        <h3>View Count: {count}</h3>
        <button 
        style={{textAlign: 'center'}}
        onClick={updateCount}
        >Add View</button>
      </div>
    </div>
  )
}

export default VideoReport;