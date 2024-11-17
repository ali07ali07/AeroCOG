const expertsData = [
  { 
    id: '1', 
    name: 'Dr. John Doe', 
    designation: 'Aerospace Engineer', 
    shortIntro: 'Specialist in spacecraft systems and propulsion technologies.', 
    bio: 'Dr. John Doe has over 20 years of experience in the aerospace industry... ',
    photo: '/images/experts/john-doe.jpg', 
    notableProjects: [
      { name: 'Mars Propulsion System', link: '#0' },
      { name: 'Lunar Mission', link: '#1' }
    ],
    socialLinks: [
      { platform: 'LinkedIn', link: 'https://www.linkedin.com/in/johndoe' },
      { platform: 'Twitter', link: 'https://twitter.com/johndoe' }
    ]
  },
  
  
  {
    id: '5',
    name: 'Yousuf Ali',
    designation: 'Web Dev', 
    shortIntro: 'Focused in setallite engineering',
    bio: 'Dr. Jane Smith specializes in aerodynamics...',
    photo: '/images/experts/ali.jpg', 
    notableProjects: [
      { name: 'Aerofoil Design for Jet Engines', link: '#2' },
      { name: 'Wind Tunnel Testing', link: '#3' }
    ],
    socialLinks: [
      { platform: 'LinkedIn', link: 'https://www.linkedin.com/in/janesmith' }
    ]
  },
 
  // More experts data...
];

export default expertsData;
