// Edit these values to change contact details and the registration form.

// GoHighLevel form shown in the "Register" section.
// Replace with the form ID of your Virtual Preview registration form.
export const REGISTRATION_FORM_URL =
  'https://connect.californiadentalassistant.com/widget/form/Zz8aVljab60uOlQf5XTH';

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
