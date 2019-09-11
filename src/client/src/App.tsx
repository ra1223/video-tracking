import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import './App.css';
import Videos from './components/videos/Videos';
import AddVideo from './components/videos/AddVideo';
import VideoReport from './components/videos/VideoReport';
import VideoContext, { VideoProvider } from './components/context/VideoContext';

import Video from './types/video';
import Count from './types/count';

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[] | []>([]);
  const [counts, setCounts] = useState<Map<string, Count>>(new Map());

  const fetchData = async (): Promise<void> => {
    try {
      const { data } = await axios.get('/api/video');
      const { videoList } = data;

      setVideos(videoList.sort((a: Video, b: Video): number => { 
        const date1: Date = new Date(a.published_date);
        const date2: Date = new Date(b.published_date);

        return date1 < date2 ? 1 : date1 > date2 ? -1 : 0;
    }));
    } catch (e) {
      throw e;
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  

  const addNewVideo = (name: string, brand: string): void => {
    const id: string = uuid();
    const newVideo: Video = {
      id,
      name,
      brand,
      published_date: new Date().toDateString()
    };

    const newCount: Count = {
      id,
      count: 0,
      date_viewed: new Date().toDateString()
    }

    try {
      axios.post('/api/video', { id, name, brand, published_date: new Date().toDateString() });

      setVideos([...videos, newVideo].sort((a: Video, b: Video): number => {
        const date1: Date = new Date(a.published_date);
        const date2: Date = new Date(b.published_date);

        return date1 < date2 ? 1 : date1 > date2 ? -1 : 0;
      }));
      
      const newMap: Map<string, Count> = new Map(counts);
      newMap.set(id, newCount);
      setCounts(newMap);
    } catch (e) {
      throw e;
    }
  };

  const contextValues = {
    videos,
    addNewVideo
  }

  return (
    <VideoProvider value={contextValues}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path='/' component={Videos}/>
          <Route path='/video/add' component={AddVideo}/>
          <Route path='/video/report' component ={VideoReport}/>
        </div>
      </Router>
    </VideoProvider>
    
    
  );
}

export function useVideoContext() {
  const videoContext = useContext(VideoContext);

  if (!videoContext) {
    throw new Error('Context not working!');
  }

  return videoContext;
}

export default App;
