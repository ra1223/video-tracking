import React from 'react';
import { Link } from 'react-router-dom';
import VideoItem from './VideoItem';
import { useVideoContext } from '../../App'

const Videos: React.FC = () => {
  // Context to get list of videos
  const { videos } = useVideoContext();

  return (
    <div style={{textAlign: 'center', position: 'relative'}}>
      <h2>Videos</h2>
      <div style={{ display: 'inline-block', paddingLeft: '300px'}}>
        <span style={{float: 'right'}}>
          <Link to='/video/add'>Add Video</Link>
        </span>
      </div>

      <div>
        {
          videos ? videos.map((video) => (
            <VideoItem
              key={video.id}
              name={video.name}
              video_id={video.id!}
              date_published={video.published_date!}
            />
          )) : ( <h3>There are no videos</h3> )
        }
      </div>
    </div>
  )
}

export default Videos;