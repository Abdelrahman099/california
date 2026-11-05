// Shared words for the six simpler homepage designs. Facts come from the live site. The three steps are new copy to review.
import { MAIN_SITE } from '../config';

export const CDN = 'https://cdn.prod.website-files.com/66ccd1ea2c9c64cd900a5d93';
export const APPLY = `${MAIN_SITE}/apply-for-admission`;

export const steps = [
  {
    n: '01',
    title: 'Apply',
    text: 'Fill out the short form and book your admission appointment. We go over your start date and financing options.',
  },
  {
    n: '02',
    title: 'Learn and train',
    text: 'Study online at your own pace, then practice hands-on with real instructors at a location near you.',
  },
  {
    n: '03',
    title: 'Start your career',
    text: 'Finish in 8–15 weeks, earn your certificates, and get job placement help from our 100+ partnered dental clinics.',
  },
];

export const learning = [
  { title: 'Self paced', text: 'Complete the program even with your busy schedule. You get 12 months of access.' },
  { title: 'Hands-on training', text: 'Blend online lessons with in-person clinical training taught near your location.' },
  { title: '1-on-1 Dental Buddy', text: '24/7 access to an experienced dental buddy, plus 40+ teachers who are dentists and registered dental assistants.' },
];

export const stats = [
  { value: '8–15', label: 'Weeks to finish' },
  { value: '300+', label: 'Course hours' },
  { value: '100+', label: 'Partnered dental clinics' },
  { value: '5.0', label: 'From 127 Google reviews' },
];

// The value stack in design 6: what the student gets, in plain lines.
export const stack = [
  ['Online and clinical course hours', '300+'],
  ['Hands-on training locations', '25+'],
  ['Teachers: dentists and registered dental assistants', '40+'],
  ['Experienced Dental Buddy', '1-on-1, 24/7'],
  ['Access to the program', '12 months'],
  ['Job placement assistance', '100+ clinics'],
  ['Tuition financing', '0%'],
];

export const partners = [
  ['66cd39438b2cbacb439990af_Tooth-Berry-Kids-Dental-logo.webp', 'Tooth Berry Kids Dental'],
  ['66cd384d20d5dd141c5a3ccd_smilebrands%20(1)%20-%20Copy.png', 'Smile Brands Inc.'],
  ['66cd388bb781780f458d9259_logo_1%20(1).png', 'Western Dental & Orthodontics'],
  ['66cd388b73bca25a47e68cfc_AspenLogoDark%20(2).png', 'Aspen Dental'],
  ['66cd394372348bff063b75a0_logo.png', 'Kids Smile Dental & Orthodontics'],
].map(([file, name]) => ({ src: `${CDN}/${file}`, name }));

// Word for word from the live FAQ.
export const faqs = [
  ['When can I start this course?', 'This course is open enrollment, so you can register and start the course whenever you are ready. Access to your course can take 24-48 business hours.'],
  ['Is the program online?', 'The program has blended learning according to your state standards. Between Online and Hands-on in person learning. Aimed to be taught near your location.'],
  ['Can I work while attending the program?', 'Yes, our program is self-paced, designed for those that want flexibility.'],
  ['Financial Assistance?', 'We give private financial Assistance. Reserve to see what you qualify for today. Courses are non-credit, so they do not qualify for federal aid, FAFSA, and Pell Grant. In some states, vocational rehab or workforce development boards may provide funding to take our courses. Additionally, you may qualify for financial assistance if you meet certain requirements.'],
];

// Word for word from a Google review in reviews-data.js.
export const quote = {
  text: 'It gave me the confidence and skills I needed to start my career in dental assisting.',
  name: 'Jayleen S.',
};

export const video = {
  poster: `${CDN}%2F66cf6a7901a8182c1c945c7d_California%20Dental%20Assistant%20Program%20Experience-poster-00001.jpg`,
  mp4: `${CDN}%2F66cf6a7901a8182c1c945c7d_California%20Dental%20Assistant%20Program%20Experience-transcode.mp4`,
  webm: `${CDN}%2F66cf6a7901a8182c1c945c7d_California%20Dental%20Assistant%20Program%20Experience-transcode.webm`,
};

export const photos = {
  group: { file: 'images/clinic-group.jpg', w: 1400, h: 933, alt: 'Students in blue gowns practicing on patients during a hands-on class.' },
  clinic: { file: 'images/hero-clinic.jpg', w: 1600, h: 1066, alt: 'A full classroom of students in blue gowns practicing chairside skills.' },
  chairside: { file: 'images/learn-chairside.jpg', w: 636, h: 900, alt: 'A student in a blue gown preparing instruments at a dental chair.' },
  steril: { file: 'images/learn-graduate.jpg', w: 675, h: 900, alt: 'A student in a blue gown working at a sterilizer.' },
  xray: { file: 'images/learn-xray.jpg', w: 636, h: 900, alt: 'A student positioning a handheld X-ray unit for a patient in a lead apron.' },
};

/* ---------- Second round: everything here comes from the live homepage ---------- */
export const three = [
  { n: 1, title: 'Learn online', meta: '300+ course hours', text: 'Self paced, with 12 months of access. Complete the program even with your busy schedule.' },
  { n: 2, title: 'Train hands-on', meta: '25+ locations', text: 'Online and clinical hands-on training, taught near your location by highly educated dentists and registered dental assistants.' },
  { n: 3, title: 'Start your career', meta: '100+ clinics', text: 'Finish in 8\u201315 weeks and get job placement assistance with our partnered dental clinics.' },
];
export const result = 'Finish in 8\u201315 weeks with state-approved certificates, ready to start your dental career.';

// Word for word from the live homepage. The figure is the part shown large.
export const promises = [
  {
    figure: '0%',
    label: 'Easy Tuition Financing',
    text: 'Make your dental education affordable and accessible with our easy tuition financing options. We offer flexible payment plans tailored to fit your budget, so you can focus on your studies without financial worry.',
  },
  {
    figure: '99%',
    label: 'Program Success Rate',
    text: 'Join the ranks of successful dental professionals who have graduated from our program. With a 99% program success rate, our comprehensive curriculum and dedicated support ensure that you have the tools you need to thrive.',
  },
  {
    figure: '99%',
    label: 'Job Placement',
    text: 'Launch your dental career with confidence. Our program boasts a 99% job placement rate, connecting you with trusted employers and providing you with the resources you need to start working in your new profession immediately after graduation.',
  },
];

export const benefits = [
  { title: 'Self Paced', text: 'Complete the program even with your busy schedule' },
  { title: '40+ teachers', text: 'Our teachers are highly educated dentists, registered dental assistants' },
  { title: 'Online community', text: 'Get access to our online community full of dental professionals' },
  { title: '1-on-1 Dental Buddy', text: '24/7 Access to an experienced dental buddy' },
];

export const reasons = [
  { title: 'Flexible & Accelerated Learning', text: 'Fast-track your career with our flexible and accelerated dental assisting program. Complete your coursework at your own pace, with options designed to fit your busy lifestyle and get you job-ready in no time.' },
  { title: 'Low Tuition Cost', text: 'Experience quality dental education without breaking the bank. Our program offers some of the lowest tuition rates in the industry, ensuring that you can pursue your career goals without financial strain.' },
  { title: 'Job Placement Assistance', text: 'Your career starts here. Benefit from our comprehensive job placement assistance, designed to help you secure employment immediately after completing your training.' },
  { title: '99% Successful Completion Rate', text: 'Join a program with a proven track record of success. With a 99% completion rate, our students gain the knowledge and skills they need to succeed in the dental field.' },
  { title: 'Student Grants & Scholarships', text: 'Take advantage of our grants and scholarships to make your dental education even more affordable. Apply today and see how we can help you achieve your career goals with financial support.' },
  { title: '0% Tuition Financing', text: 'Start your dental assisting career with peace of mind. We offer 0% tuition financing, making it easier than ever to manage your education costs without upfront financial pressure.' },
];

export const numbers = [
  { value: '9.8/10', label: 'Complete Courses Approval Score' },
  { value: '200+', label: 'Satisfied students across the state' },
  { value: '99%', label: 'Course Completion Success Rate' },
];

export const regions = [
  { region: 'Sacramento & North', cities: ['Roseville', 'Fair Oaks', 'Rocklin', 'Chico'] },
  { region: 'Bay Area', cities: ['Napa', 'Hayward', 'San Jose', 'Sunnyvale'] },
  { region: 'Central Valley', cities: ['Kingsburg', 'Bakersfield'] },
  { region: 'Ventura & Los Angeles', cities: ['Oxnard', 'Ventura', 'Van Nuys', 'Pasadena'] },
  { region: 'Orange County & San Diego', cities: ['Tustin', 'Rancho Santa Margarita', 'San Diego'] },
];
export const travelNote = 'Blended online and hands-on learning, taught near your location. Serving the entire State of California!';

// Word for word from the live FAQ.
export const faqs2 = [
  ['When can I start this course?', 'This course is open enrollment, so you can register and start the course whenever you are ready. Access to your course can take 24-48 business hours.'],
  ['How long does it take to complete the dental assisting program?', 'After you register, you will receive 12 months to complete the course. The time allotted for completion has been calculated based on the number of course hours.'],
  ['Is the program online?', 'The program has blended learning according to your state standards. Between Online and Hands-on in person learning. Aimed to be taught near your location.'],
  ['Can I work while attending the program?', 'Yes, our program is self-paced, designed for those that want flexibility.'],
  ['What happens when I complete the course?', 'Upon successfully passing the final exam, you will receive a certificate of completion from our school (recognized exclusively by our institution). Additionally, you will be awarded state-approved certificates, giving you basic knowledge as a dental assistant.'],
  ['Financial Assistance?', 'We give private financial Assistance. Reserve to see what you qualify for today. Courses are non-credit, so they do not qualify for federal aid, FAFSA, and Pell Grant. In some states, vocational rehab or workforce development boards may provide funding to take our courses. Additionally, you may qualify for financial assistance if you meet certain requirements.'],
];
