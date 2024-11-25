import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="41px" height="41px"><path fill="#d8e5f9" d="M23,9v7h-4V9H23z" /><path fill="#d8e5f9" d="M28,24v6H16v-3h6v-3H28z" /><path fill="#d8e5f9" d="M23,4c0,1.105-0.895,2-2,2s-2-0.895-2-2c0-1.105,0.895-2,2-2S23,2.895,23,4z" /><path fill="#d8e5f9" d="M11,9c0,1.105-0.895,2-2,2s-2-0.895-2-2c0-1.105,0.895-2,2-2S11,7.895,11,9z" /><path fill="#d8e5f9" d="M10.77,13.56l-1.35,8.13l-2.64-1.36c-0.38-0.2-0.6-0.61-0.54-1.03L7,14.05L10.77,13.56z" /><path fill="#0e5dd8" d="M9,12c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3S10.654,12,9,12z M9,8C8.449,8,8,8.448,8,9s0.449,1,1,1	s1-0.448,1-1S9.551,8,9,8z" /><path fill="#0e5dd8" d="M6,30c-0.095,0-0.192-0.014-0.288-0.042c-0.529-0.159-0.829-0.717-0.67-1.246l1.491-4.966	c0.159-0.528,0.718-0.826,1.245-0.67c0.529,0.159,0.829,0.717,0.67,1.246l-1.491,4.966C6.828,29.721,6.43,30,6,30z" /><path fill="#0e5dd8" d="M28,31c-0.552,0-1-0.447-1-1v-5h-4v2c0,0.553-0.448,1-1,1h-5v2c0,0.553-0.448,1-1,1h-6c-0.552,0-1-0.447-1-1	s0.448-1,1-1h5v-2c0-0.553,0.448-1,1-1h5v-2c0-0.553,0.448-1,1-1h6c0.552,0,1,0.447,1,1v6C29,30.553,28.552,31,28,31z" /><path fill="#0e5dd8" d="M21,7c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3S22.654,7,21,7z M21,3c-0.551,0-1,0.448-1,1s0.449,1,1,1	s1-0.448,1-1S21.551,3,21,3z" /><path fill="#0e5dd8" d="M27.316,3.052c-0.526-0.175-1.091,0.108-1.265,0.632L25.16,6.358L22.697,8H19c-0.197,0-0.391,0.059-0.555,0.168	l-3,2C15.167,10.354,15,10.666,15,11v0.991l-9.168,1.204c-1.589,0.208-2.896,1.34-3.33,2.883l-0.464,1.651	c-0.149,0.531,0.161,1.084,0.692,1.233C2.82,18.988,2.911,19,3,19c0.437,0,0.838-0.288,0.962-0.729l0.464-1.651	c0.19-0.675,0.722-1.172,1.383-1.361l-0.556,3.895c-0.121,0.843,0.307,1.671,1.064,2.062L10,23.11V27c0,0.553,0.448,1,1,1	s1-0.447,1-1v-4.5c0-0.375-0.209-0.718-0.542-0.89l-0.929-0.478l1.114-6.683l3.36-0.441C15.006,14.557,15.451,15,16,15	c0.552,0,1-0.447,1-1v-2.465l1-0.667V24c0,0.553,0.448,1,1,1s1-0.447,1-1v-7h2.586L24,18.414V21c0,0.553,0.448,1,1,1s1-0.447,1-1v-3	c0-0.266-0.105-0.52-0.293-0.707L24,15.586V9.535l2.555-1.703c0.185-0.123,0.324-0.305,0.394-0.516l1-3	C28.124,3.792,27.84,3.226,27.316,3.052z M8.661,20.171l-1.427-0.735l0.642-4.493l1.694-0.222L8.661,20.171z M20,10h2v5h-2V10z" /></svg>
    ),
    title: "Technical Mentorship",
    paragraph:
      "Connect and consult with highly experienced aerospace experts to address your specific technical challenges.",
  },
  {
    id: 2,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="41px" height="41px"><linearGradient id="xHKlpW5FPT8R_hljzzGeja" x1="11" x2="11" y1="29.723" y2="49.726" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff" /><stop offset="1" stop-color="#e6abff" /></linearGradient><path fill="url(#xHKlpW5FPT8R_hljzzGeja)" d="M8,31h6v19H8V31z" /><linearGradient id="xHKlpW5FPT8R_hljzzGejb" x1="36.977" x2="36.977" y1="94.083" y2="102.234" gradientTransform="translate(0 -82)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff" /><stop offset="1" stop-color="#e6abff" /></linearGradient><path fill="url(#xHKlpW5FPT8R_hljzzGejb)" d="M37.464,12.385l0.227,1.132c0.177,0.885,0.863,1.578,1.741,1.756l1.123,0.229	c0.531,0.108,0.531,0.874,0,0.982l-1.123,0.229c-0.878,0.179-1.565,0.87-1.741,1.756L37.464,19.6c-0.107,0.536-0.867,0.536-0.974,0	l-0.227-1.132c-0.177-0.885-0.863-1.578-1.741-1.756l-1.123-0.229c-0.531-0.108-0.531-0.874,0-0.982l1.123-0.229	c0.878-0.179,1.565-0.87,1.741-1.756l0.227-1.132C36.597,11.849,37.357,11.849,37.464,12.385z" /><linearGradient id="xHKlpW5FPT8R_hljzzGejc" x1="32" x2="32" y1="5.979" y2="56.624" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1a6dff" /><stop offset="1" stop-color="#c822ff" /></linearGradient><path fill="url(#xHKlpW5FPT8R_hljzzGejc)" d="M56.427,38.815c-0.937-0.693-2.188-0.895-3.435-0.55l-15.289,4.227 C37.891,42.028,38,41.523,38,40.991C38,38.79,36.206,37,34,37h-9.377c-0.666-1-2.362-4-4.623-4h-4v-1c0-1.654-1.346-3-3-3H9 c-1.654,0-3,1.346-3,3v17c0,1.654,1.346,3,3,3h4c1.654,0,3-1.345,3-3v-0.752l12.139,8.202c1.524,1.032,3.298,1.55,5.075,1.55 c1.642,0,3.287-0.442,4.742-1.331l18.173-11.101C57.283,44.865,58,43.587,58,42.235v-0.313C58,40.691,57.427,39.559,56.427,38.815z M14,49c0,0.552-0.449,1-1,1h-1v-4h-2v4H9c-0.551,0-1-0.448-1-1V32c0-0.552,0.449-1,1-1h4c0.551,0,1,0.449,1,1V49z M56,42.235 c0,0.66-0.35,1.283-0.913,1.627l-18.173,11.1c-2.365,1.443-5.369,1.378-7.654-0.169L16,45.835V35h4 c1.059,0,2.469,2.034,3.088,3.409L23.354,39H34c1.103,0,2,0.893,2,1.99c0,1.108-0.897,2.01-2,2.01H24v2h10h2l17.524-4.807 c0.641-0.178,1.28-0.093,1.71,0.229C55.721,40.783,56,41.33,56,41.922V42.235z" /><linearGradient id="xHKlpW5FPT8R_hljzzGejd" x1="37" x2="37" y1="6" y2="56.645" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1a6dff" /><stop offset="1" stop-color="#c822ff" /></linearGradient><path fill="url(#xHKlpW5FPT8R_hljzzGejd)" d="M32.751,25.025C31.767,25.149,31,25.983,31,27v2c0,1.103,0.897,2,2,2h0.184 c0.414,1.161,1.514,2,2.816,2h2c1.302,0,2.402-0.839,2.816-2H41c1.103,0,2-0.897,2-2v-2c0-1.017-0.767-1.851-1.751-1.975 C44.721,23.39,47,19.888,47,16c0-5.514-4.486-10-10-10s-10,4.486-10,10C27,19.888,29.279,23.39,32.751,25.025z M41,29h-8v-2h8 l0.002,2H41z M37,8c4.411,0,8,3.589,8,8c0,3.377-2.144,6.404-5.334,7.534L39,23.77V25h-4v-1.23l-0.666-0.235 C31.144,22.404,29,19.377,29,16C29,11.589,32.589,8,37,8z" /></svg>
    ),
    title: "Idea Validation",
    paragraph:
      "Validate and refine your ideas with experts feedback and insights to ensure your startup is on the right track.",
  },
  {
    id: 3,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="40px" height="40px"><path fill="#71c2ff" d="M103,1H81c-1.66,0-3,1.34-3,3s1.34,3,3,3h14.76L60.41,42.34c-0.76,0.75-2.07,0.76-2.83,0L44.66,29.41 c-1.51-1.51-3.52-2.34-5.66-2.34s-4.15,0.83-5.66,2.34L6.88,55.88c-1.17,1.17-1.17,3.07,0,4.24C7.46,60.71,8.23,61,9,61 s1.54-0.29,2.12-0.88l26.46-26.46c0.76-0.75,2.07-0.76,2.83,0l12.93,12.93c1.51,1.51,3.52,2.34,5.66,2.34s4.15-0.83,5.66-2.34 L100,11.24V26c0,1.66,1.34,3,3,3s3-1.34,3-3V4C106,2.34,104.66,1,103,1z" /><path fill="#444b54" d="M46,97c-0.77,0-1.54-0.29-2.12-0.88c-1.17-1.17-1.17-3.07,0-4.24l38-38c1.17-1.17,3.07-1.17,4.24,0 c1.17,1.17,1.17,3.07,0,4.24l-38,38C47.54,96.71,46.77,97,46,97z" /><path fill="#444b54" d="M16,127c-0.77,0-1.54-0.29-2.12-0.88c-1.17-1.17-1.17-3.07,0-4.24l10-10c1.17-1.17,3.07-1.17,4.24,0 c1.17,1.17,1.17,3.07,0,4.24l-10,10C17.54,126.71,16.77,127,16,127z" /><path fill="#444b54" d="M124,73h-22c-1.66,0-3,1.34-3,3s1.34,3,3,3h14.76l-43.34,43.34c-1.17,1.17-1.17,3.07,0,4.24 c0.59,0.59,1.35,0.88,2.12,0.88s1.54-0.29,2.12-0.88L121,83.24V98c0,1.66,1.34,3,3,3s3-1.34,3-3V76C127,74.34,125.66,73,124,73z" /></svg>
    ),
    title: "Accelerated growth",
    paragraph:
      "Speed up your innovation and bring your ideas to life faster with the help of our expert mentors.",
  },



];
export default featuresData;
