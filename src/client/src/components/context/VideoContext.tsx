import { createContext } from 'react';
import Video from '../../types/video';

interface ContextProps {
  videos: Video[];
  addNewVideo: (name: string, brand: string) => void;
  updateCount: (video_id: string) => void;

}
const VideoContext = createContext<Partial<ContextProps>>({});

export const VideoProvider = VideoContext.Provider;
export const VideoConsumer = VideoContext.Consumer;

export default VideoContext;

