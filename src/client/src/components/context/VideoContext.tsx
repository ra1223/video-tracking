import { createContext } from 'react';
import Video from '../../types/video';

// Leave interface attributes as optional
interface ContextProps {
  videos: Video[];
  addNewVideo: (name: string, brand: string) => void;

}
const VideoContext = createContext<Partial<ContextProps>>({});

export const VideoProvider = VideoContext.Provider;
export const VideoConsumer = VideoContext.Consumer;

export default VideoContext;

