import React, { useEffect, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Props {
  video_id: string;
}

const VideoReport: React.FC<any> = ({ location: { state: { video_id } } }) => {
  const [count, setCount] = useState(0);
  const [id, setId] = useState('');
  const [videoName, setVideoName] = useState('');
  const [brand, setBrand] = useState('');
  const [videoPublishedDate, setVideoPublishedDate] = useState('');

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

  const updateCount = (e: MouseEvent<HTMLButtonElement>): void => {
    try {
      axios.put(`/api/video/view/${video_id}`);
      setCount(count + 1);

    } catch (e) {
      throw e;
    }
  }

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