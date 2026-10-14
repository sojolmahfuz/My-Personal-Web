export interface ProfileData {
  name: string;
  lastName: string;
  salutation: string;
  title: string;
  department: string;
  institution: string;
  institutionShort: string;
  location: string;
  headlineQuote: string;
  email: string;
  githubUrl: string;
  githubUsername: string;
  phones: string[];
  addresses: {
    present: string;
    permanent: string;
  };
  portraitImage: string;
  summary: string;
  statement: string;
  stats: {
    value: string;
    label: string;
    detail: string;
  }[];
}

export const profileData: ProfileData = {
  name: "Al Amin Mahfuz",
  lastName: "Mahfuz",
  salutation: "Hello, I'm",
  title: "Assistant Professor",
  department: "Department of Computer Science & Engineering",
  institution: "Rajshahi Science and Technology University (RSTU)",
  institutionShort: "RSTU, Natore",
  location: "Natore, Bangladesh",
  headlineQuote: "Better Code. Better Future.",
  email: "sojol.cub@gmail.com",
  githubUrl: "https://github.com/alaminmahfuz",
  githubUsername: "alaminmahfuz",
  phones: ["+8801701012207", "+8801717704609"],
  addresses: {
    present: "Near VIP Hotel, Boro Horishpur, Kamarpara, Natore Sadar, Natore, Bangladesh",
    permanent: "Borogram Chalapukur, Ward 07, Komolpur Union, Dinajpur - 5200, Bangladesh",
  },
  portraitImage: "/src/assets/images/al_amin_mahfuz_real_portrait_1791991099877.jpg",
  summary:
    "Assistant Professor in Computer Science & Engineering with 5+ years of software engineering background and university teaching leadership. Specializing in full-stack web architectures, deep learning with Python, networking, and enterprise cybersecurity.",
  statement:
    "To pursue a career in a challenging environment with opportunities of utilizing interpersonal skills, creativity, technical and analytical knowledge. Dedicated to mentoring aspiring engineers, conducting applied technical research, and building resilient software solutions.",
  stats: [
    { value: "05+", label: "Years in Engineering", detail: "Full stack web & software architecture" },
    { value: "04+", label: "Years in Academia", detail: "Teaching & mentoring undergraduate engineers" },
    { value: "100%", label: "Curriculum Dedication", detail: "Syllabi design, lab support & accreditation" },
    { value: "01", label: "Published Research", detail: "Scapy & Kali Linux enterprise defense" },
  ],
};
