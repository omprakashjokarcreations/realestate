import video from '@/assets/construction-timelapse.mp4.asset.json';
import foundation from '@/assets/foundation.jpg.asset.json';
import completed from '@/assets/completed.jpg.asset.json';

export const constructionVideo = { src: video.url, poster: foundation.url, completed: completed.url, seconds: 10, desktopScreens: 3, mobileScreens: 1.8 };
export function progressToTime(progress: number, duration: number) {
  return Math.max(0, Math.min(1, progress)) * Math.max(0, Math.min(10, duration) - 0.05);
}