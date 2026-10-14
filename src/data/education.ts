export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  year: string;
  grade: string;
  scale: string;
  highlights: string[];
}

export const educations: EducationItem[] = [
  {
    degree: "Bachelor of Science (B.Sc.)",
    field: "Computer Science & Engineering (CSE)",
    institution: "Canadian University of Bangladesh (CUB)",
    location: "Dhaka, Bangladesh",
    year: "Graduated 2022",
    grade: "3.55",
    scale: "4.00",
    highlights: [
      "Rigorous foundational and advanced computer science coursework in Algorithms, Data Structures, and Software Engineering.",
      "Served as Teaching Assistant during undergraduate tenure, assisting faculty with classroom discussions and labs.",
      "Recognized for active participation in national programming contests and university research assistance.",
    ],
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    field: "Science Group",
    institution: "Rajshahi Govt. Model School and College",
    location: "Rajshahi, Bangladesh",
    year: "Passed 2012",
    grade: "3.70",
    scale: "5.00",
    highlights: [
      "Core curriculum in Higher Mathematics, Physics, Chemistry, and Information Technology.",
      "Solid analytical grounding leading to undergraduate computer science engineering studies.",
    ],
  },
  {
    degree: "Secondary School Certificate (SSC)",
    field: "Science Group",
    institution: "Rajshahi Loknath High School",
    location: "Rajshahi, Bangladesh",
    year: "Passed 2010",
    grade: "3.81",
    scale: "5.00",
    highlights: [
      "Rigorous secondary education in General Sciences, Mathematics, and Computer Studies.",
      "Active participant in extracurricular academic and science clubs.",
    ],
  },
];
