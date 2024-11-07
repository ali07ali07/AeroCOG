import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Dr. Emily Harris",
    paragraph:
      `Specialization: Aerospace Systems Engineering, Satellite Design\n
      Experience: Over 15 years in the aerospace sector, with involvement in projects with NASA and ESA.\n
      Notable Projects: Led development of CubeSat missions, consulted for private satellite companies.\n
     `,
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Consultation Fee",
      designation: "$250 per hour",
      
      
    },
    tags: ["creative"],
    publishDate: "2025",
    
  },
  {
    id: 2,
    title: "Dr. Rajiv Patel",
    paragraph:
      `Specialization: Propulsion Systems, Rocket Design\n
      Experience: 20 years with major aerospace agencies and private firms.\n
      Notable Projects: Chief engineer on reusable rocket programs.\n
      `,
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "Consultation Fee",
      
      designation: "$300 per hour",
    },
    tags: ["propulsion", "rocket-design"],
    publishDate: "2025",
    
  },
  {
    id: 3,
    title: "Dr. Sarah Chen",
    paragraph:
      `Specialization: Avionics and Autonomous Systems.\n
      Experience: 12 years in autonomous flight and avionics research.\n
      Notable Projects: Developed avionics systems for UAVs, supervised AI navigation projects.\n
      `,
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "Consultation Fee",
      
      designation: "$280 per hour",
    },
    tags: ["avionics", "autonomous-systems"],
    publishDate: "2025",
   
  },
];

export default blogData;
