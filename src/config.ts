// Edit these values to change the video, booking calendar, application and contact details.

// The Virtual Preview recording.
// Either a file in /public (like 'videos/virtual-preview.mp4'),
// or a YouTube, Vimeo, Wistia or direct .mp4 link.
// Leave empty to show the placeholder.
export const PREVIEW_VIDEO_URL = 'videos/virtual-preview.mp4';
export const PREVIEW_VIDEO_CAPTIONS = 'videos/virtual-preview.vtt';

// GoHighLevel calendar for the Initial Student Admissions Appointment (main goal of the page).
export const BOOKING_URL =
  'https://connect.californiadentalassistant.com/widget/booking/cFcjguRB7b0OHXaZzIgS';

// GoHighLevel Student Application (secondary action).
export const APPLICATION_URL =
  'https://connect.californiadentalassistant.com/widget/survey/8OH1bTjr2aiv5sb7EpMB';

export const GHL_EMBED_SCRIPT =
  'https://connect.californiadentalassistant.com/js/form_embed.js';

export const MAIN_SITE = 'https://www.californiadentalassistant.com';
export const PHONE = '(916) 249-1253';
export const PHONE_HREF = 'tel:+19162491253';
export const EMAIL = 'info@californiadentalassistant.com';
export const ADDRESS = '5015 Madison Ave #399, Sacramento, CA 95841';

// Prefixes a file in /public with the path Webflow Cloud mounts the app at.
export function asset(path: string): string {
  const prefix =
    import.meta.env.ASSETS_PREFIX || import.meta.env.BASE_URL || '';
  return `${String(prefix).replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

// Turns a YouTube / Vimeo / Wistia / .mp4 link into something the page can play.
export function videoEmbed(url: string):
  | { kind: 'iframe'; src: string }
  | { kind: 'file'; src: string }
  | null {
  if (!url) return null;
  if (/\.(mp4|webm|mov)(\?|$)/i.test(url))
    return { kind: 'file', src: /^https?:\/\//.test(url) ? url : asset(url) };
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  if (yt) return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0&modestbranding=1` };
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: 'iframe', src: `https://player.vimeo.com/video/${vimeo[1]}` };
  const wistia = url.match(/wistia\.(?:com|net)\/(?:medias|embed\/iframe)\/(\w+)/);
  if (wistia) return { kind: 'iframe', src: `https://fast.wistia.net/embed/iframe/${wistia[1]}` };
  return { kind: 'iframe', src: url };
}
