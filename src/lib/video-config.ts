import heroVideo from '@/assets/House_construction_timelapse_video_20261012105611.mp4';
import architecture from '@/assets/architecture.jpg';

export const constructionVideo = {
  src: heroVideo,
  compatibleSrc: '/House_construction_timelapse_video_20261012105611.mp4',
  poster: architecture,
  completed: architecture,
  seconds: 14,
  desktopScreens: 2.8,
  mobileScreens: 1.8,
};

export function progressToTime(progress: number, duration: number) {
  const maxTime = Number.isFinite(duration) && duration > 0 ? duration : 14;
  return Math.max(0, Math.min(1, progress)) * Math.max(0, maxTime - 0.05);
}