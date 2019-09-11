import React, { MouseEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';

interface Props {
  video_id: string;
  name: string;
  date_published: string;
}

const VideoItem: React.FC<Props> = ({ name, video_id, date_published }) => {
  const [redirect, setRedirect] = useState(false);

  const handleOnClick = (e: MouseEvent<HTMLDivElement>): void => {
    setRedirect(true);
  }

  return (
    <div style={{borderStyle: 'solid'}} onClick={handleOnClick}>
      {
        !redirect ? 
          <h3>{name} - {date_published}</h3>
          : <Redirect 
              to={{
                pathname: `/video/report`, state: { video_id }
              }}
            />
      }
    </div>
  )
}

export default VideoItem;