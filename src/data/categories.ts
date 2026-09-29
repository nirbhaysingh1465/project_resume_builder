import { CategoryDefinition, ResumeCategoryKey, ResumeData } from '../types/resume';

export const CATEGORIES: Record<ResumeCategoryKey, CategoryDefinition> = {
  student: {
    id: 'student',
    name: 'Student Resume',
    icon: '🎓',
    badge: 'Academic & Internship Ready',
    description: 'Designed for college and university students seeking internships, campus placements, and graduate roles.',
    features: ['Coursework & Projects', 'Technical & Soft Skills', 'Certifications & Workshops', 'College Submissions'],
    templates: [
      { id: 'student_prof', name: 'Professional Student', desc: 'Classic 1-column layout with bordered section headers and clean education table.' },
      { id: 'student_modern', name: 'Modern Student', desc: 'Two-column sidebar design separating contact & skills from education and projects.' },
      { id: 'student_academic', name: 'Simple Academic', desc: 'Traditional collegiate format with elegant divider rules suitable for college submission.' },
      { id: 'student_creative', name: 'Creative Student', desc: 'Modern card styling with skill badges and clean vibrant typography.' }
    ],
    defaultSections: {
      contact: true,
      objective: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      workshops: true,
      achievements: true,
      hobbies: true,
      personal: true,
      declaration: true
    }
  },

  professor: {
    id: 'professor',
    name: 'Professor / Faculty CV',
    icon: '👨‍🏫',
    badge: 'Academic & Scholarly',
    description: 'Formal comprehensive curriculum vitae tailored for professors, lecturers, deans, and academic faculty.',
    features: ['Google Scholar & ORCID', 'Publications & Patents', 'Teaching & Research Exp', 'FDPs & Sponsored Grants'],
    templates: [
      { id: 'prof_traditional', name: 'Traditional Academic CV', desc: 'Classic scholarly serif CV with numbered publications and institutional credentials.' },
      { id: 'prof_modern', name: 'Modern Academic CV', desc: 'Structured academic layout with researcher badges and organized research/teaching blocks.' },
      { id: 'prof_research', name: 'Research-Oriented CV', desc: 'Prominent focus on research labs, funded grants, citations, patents, and keynote talks.' }
    ],
    defaultSections: {
      contact: true,
      summary: true,
      education: true,
      teaching: true,
      publications: true,
      patents: true,
      grants: true,
      fdp: true,
      achievements: true
    }
  },

  professional: {
    id: 'professional',
    name: 'Professional Resume',
    icon: '💼',
    badge: 'Corporate & Executive',
    description: 'Refined corporate resumes for experienced employees, managers, and executives highlighting career milestones.',
    features: ['Work History & Achievements', 'Core Competencies', 'Leadership Projects', 'ATS-Compliant Structure'],
    templates: [
      { id: 'corp_classic', name: 'Corporate Classic', desc: 'Clean, ATS-friendly one-column layout with chronological career progression.' },
      { id: 'corp_modern', name: 'Modern Corporate', desc: 'Contemporary two-column layout highlighting executive summary and core competencies.' },
      { id: 'corp_executive', name: 'Executive Style', desc: 'High-level executive layout featuring distinguished leadership achievements.' }
    ],
    defaultSections: {
      contact: true,
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      achievements: true
    }
  },

  developer: {
    id: 'developer',
    name: 'Developer / IT Resume',
    icon: '👨‍💻',
    badge: 'Software & Engineering',
    description: 'Optimized for software developers, full-stack engineers, DevOps, and data scientists with tech-stack emphasis.',
    features: ['GitHub & Live Demos', 'Categorized Tech Stack', 'Highlighted Software Projects', 'Tech Certifications'],
    templates: [
      { id: 'dev_modern', name: 'Modern Tech Resume', desc: 'Two-column layout with GitHub/portfolio badges, tech stack pills, and project links.' },
      { id: 'dev_clean', name: 'Clean Software Engineer', desc: 'Clean single-column engineering format with grouped languages, frameworks, and tools.' },
      { id: 'dev_terminal', name: 'Minimal Developer', desc: 'Sleek, tech-accented layout with monospace headers and repository-focused project entries.' }
    ],
    defaultSections: {
      contact: true,
      summary: true,
      tech_skills: true,
      projects: true,
      experience: true,
      education: true,
      certifications: true,
      achievements: true
    }
  },

  fresher: {
    id: 'fresher',
    name: 'Fresher Resume',
    icon: '🧑‍💼',
    badge: 'Entry-Level & Graduates',
    description: 'Crafted for recent graduates and job seekers with little or no prior professional experience.',
    features: ['Degree & Academic Projects', 'Internships & Vocational Training', 'Key Strengths & Certifications', 'No Mandatory Work History'],
    templates: [
      { id: 'fresher_clean', name: 'Clean Entry-Level', desc: 'Straightforward layout placing academic achievements and projects at the forefront.' },
      { id: 'fresher_modern', name: 'Modern Graduate', desc: 'Fresh aesthetic with project spotlights, soft accent cards, and extracurriculars.' },
      { id: 'fresher_compact', name: 'Compact One-Page', desc: 'Dense, beautifully balanced single-page layout maximizing impact.' }
    ],
    defaultSections: {
      contact: true,
      objective: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      workshops: true,
      achievements: true,
      strengths: true,
      hobbies: true,
      declaration: true
    }
  },

  researcher: {
    id: 'researcher',
    name: 'Researcher / Academic CV',
    icon: '🔬',
    badge: 'Post-Doc & Scientific',
    description: 'Designed for scientists, PhD scholars, postdoctoral fellows, and research scientists seeking grants or lab positions.',
    features: ['Research Focus & Interests', 'Publications & Preprints', 'Conferences & Keynotes', 'Funded Grants & Patents'],
    templates: [
      { id: 'res_scholarly', name: 'Scholarly Academic CV', desc: 'Traditional scholarly format highlighting peer-reviewed papers, lab research, and grants.' },
      { id: 'res_modern', name: 'Modern Scientist', desc: 'Clean, data-informed CV with scientific identifiers, citations, and research areas.' },
      { id: 'res_fellow', name: 'Fellowship & Grant CV', desc: 'Targeted format structured for fellowship panels, research proposals, and grants.' }
    ],
    defaultSections: {
      contact: true,
      summary: true,
      education: true,
      experience: true,
      publications: true,
      patents: true,
      grants: true,
      achievements: true
    }
  },

  designer: {
    id: 'designer',
    name: 'Designer / Creative Portfolio',
    icon: '🎨',
    badge: 'UI/UX & Visual Design',
    description: 'Vibrant, design-focused resume for UI/UX designers, graphic artists, and creative directors with portfolio links.',
    features: ['Design Tools (Figma, Adobe)', 'Portfolio & Case Studies', 'Design Systems & Wireframing', 'Visual Accomplishments'],
    templates: [
      { id: 'student_creative', name: 'Creative Portfolio', desc: 'Contemporary two-column layout highlighting portfolio projects, visual skills, and tools.' },
      { id: 'dev_modern', name: 'Visual Designer', desc: 'Modern card styling with accent badges and creative typography.' }
    ],
    defaultSections: {
      contact: true,
      summary: true,
      skills: true,
      projects: true,
      experience: true,
      education: true,
      certifications: true,
      achievements: true
    }
  },

  medical: {
    id: 'medical',
    name: 'Medical / Healthcare CV',
    icon: '🏥',
    badge: 'Clinical & Healthcare',
    description: 'Specialized curriculum vitae for physicians, resident doctors, nurses, surgeons, and healthcare practitioners.',
    features: ['Medical License & Board Certifications', 'Clinical Rotations & Residency', 'Hospital Appointments', 'Medical Research'],
    templates: [
      { id: 'prof_traditional', name: 'Traditional Medical CV', desc: 'Formal clinical curriculum vitae with licensing and medical appointments.' },
      { id: 'corp_classic', name: 'Clinical Specialist', desc: 'Structured professional healthcare format highlighting clinical procedures and patient care.' }
    ],
    defaultSections: {
      contact: true,
      summary: true,
      experience: true,
      education: true,
      certifications: true,
      skills: true,
      publications: true,
      achievements: true
    }
  }
};

export const SAMPLE_DATA: Record<ResumeCategoryKey, ResumeData> = {
  student: {
    fullName: 'Nirbhay Singh',
    currentDegree: 'B.Tech in Computer Science & Engineering',
    email: 'nirbhay.singh@example.com',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    location: 'Lucknow, India',
    linkedin: 'linkedin.com/in/nirbhay-singh',
    github: 'github.com/nirbhay-singh',
    webLink: 'nirbhaysingh.dev',
    summaryText: 'Motivated 2nd-year Computer Science undergraduate with strong foundations in data structures, algorithms, and full-stack web development. Eager to contribute to high-impact software engineering internships and collaborative team environments.',
    educationList: [
      {
        id: 'edu-1',
        degree: 'B.Tech in Computer Science & Engineering',
        institute: 'Lucknow Technological University',
        board: 'DTU',
        year: '2022 - 2026',
        score: '8.85 CGPA'
      },
      {
        id: 'edu-2',
        degree: 'Senior Secondary School Examination (Class XII)',
        institute: 'Lucknow Public School, R.K. Puram',
        board: 'CBSE',
        year: '2021 - 2022',
        score: '94.6%'
      }
    ],
    experienceList: [
      {
        id: 'exp-1',
        role: 'Software Development Intern',
        company: 'InnovateX Labs',
        period: 'May 2024 - July 2024',
        location: 'Gurugram (Hybrid)',
        details: '• Developed responsive dashboard modules using React.js and Tailwind CSS for 12,000+ daily active users\n• Optimized REST API response payloads, decreasing average latency by 28%\n• Collaborated in an Agile team of 6 engineers with daily standups and weekly sprint reviews'
      }
    ],
    projectsList: [
      {
        id: 'proj-1',
        title: 'Multi-Category Resume Studio',
        stack: 'React, TypeScript, Tailwind CSS',
        link: 'https://github.com/nirbhay-singh/resume-builder',
        desc: '• Engineered a real-time reactive resume builder supporting 8 professional personas and 18+ templates\n• Built an instant ATS scoring evaluator and seamless vector PDF print export'
      },
      {
        id: 'proj-2',
        title: 'PeerEdu - Student Resource Portal',
        stack: 'Node.js, Express, MongoDB, Socket.io',
        link: 'https://github.com/nirbhay-singh/peeredu',
        desc: '• Created an open-source notes sharing and real-time query discussion hub used by 1,400+ campus students\n• Implemented secure JWT-based authentication and role-based access control'
      }
    ],
    skillsText: '• Programming Languages: C++, Python, JavaScript (ES6+), TypeScript, SQL\n• Web Technologies: HTML5, CSS3, React.js, Node.js, Express, Tailwind CSS\n• Developer Tools: Git, GitHub, VS Code, Postman, Linux (Ubuntu)\n• Soft Skills: Problem Solving, Team Collaboration, Technical Documentation, Adaptability',
    certificationsText: '• Meta Front-End Developer Professional Certificate (Coursera)\n• Data Structures & Algorithms Specialization - Stanford Online (Coursera)\n• AWS Certified Cloud Practitioner (Foundational)',
    workshopsText: '• Attended 2-day Hands-on Workshop on Machine Learning & Neural Networks at DTU\n• Completed Full-Day Cloud Bootcamp on Containerization with Docker',
    achievementsText: '• Winner (1st Prize), Smart India Hackathon 2023 - College Level round among 45 teams\n• Solved 350+ algorithmic challenges on LeetCode with peak contest rating of 1820+\n• Academic Merit Scholarship recipient for top 5% academic performance in Semester 3',
    hobbiesText: '• Competitive Coding & Algorithm Challenges\n• Tech Blogging on Medium & Dev.to\n• Speed Chess (Rapid rating 1650 on Chess.com)',
    fatherName: 'Mr. Ashok Singh',
    motherName: 'Mrs. Sunita Sharma',
    dob: '15/08/2003',
    languages: 'English (Fluent), Hindi (Native)',
    permanentAddress: 'B-42, Vasant Kunj, Lucknow - 110070',
    declarationText: 'I hereby solemnly declare that all the details furnished above are true and correct to the best of my knowledge and belief.',
    decDate: '22/09/2026',
    decPlace: 'Lucknow'
  },

  professor: {
    fullName: 'Dr. Anand Verma',
    designation: 'Associate Professor & Head of Department',
    department: 'Department of Computer Science & Engineering',
    institution: 'Indian Institute of Technology Lucknow',
    email: 'anand.verma@cse.iitd.ac.in',
    phone: '+91 11 2659 1000',
    location: 'Lucknow, India',
    scholar: 'scholar.google.com/citations?user=anand_verma',
    orcid: '0000-0002-1825-0097',
    researchGate: 'researchgate.net/profile/Anand-Verma',
    instituteWeb: 'cse.iitd.ac.in/faculty/anand-verma',
    summaryText: 'Accomplished academician and researcher with over 14 years of teaching and research experience in Distributed Systems, Cloud Computing, Edge AI, and Network Security. Principal Investigator for DST-SERB funded research grants. Authored 38+ peer-reviewed journal papers and guided 6 Ph.D. scholars.',
    educationList: [
      {
        id: 'edu-prof-1',
        degree: 'Ph.D. in Computer Science & Engineering',
        institute: 'Indian Institute of Science (IISc)',
        board: 'IISc Bangalore',
        year: '2010 - 2014',
        score: 'Doctoral Fellowship'
      },
      {
        id: 'edu-prof-2',
        degree: 'M.Tech in Computer Science',
        institute: 'Indian Institute of Technology Bombay',
        board: 'IIT Bombay',
        year: '2008 - 2010',
        score: '9.45 CGPA (Gold Medalist)'
      },
      {
        id: 'edu-prof-3',
        degree: 'B.E. in Computer Engineering',
        institute: 'University of Lucknow',
        board: 'Lucknow University',
        year: '2004 - 2008',
        score: '84.2%'
      }
    ],
    experienceList: [
      {
        id: 'exp-prof-1',
        role: 'Associate Professor & Head of Department',
        company: 'IIT Lucknow',
        period: 'July 2019 - Present',
        location: 'Lucknow',
        details: '• Guiding 6 Ph.D. scholars and 14 M.Tech dissertations in Edge Computing and Resilient Consensus Protocols\n• Taught Advanced Distributed Operating Systems and Cloud Architectures to 200+ postgraduate scholars annually\n• Serving as Chairman for Department Curriculum Revision and Laboratory Modernization Committee'
      },
      {
        id: 'exp-prof-2',
        role: 'Assistant Professor',
        company: 'IIT Lucknow',
        period: 'January 2014 - June 2019',
        location: 'Lucknow',
        details: '• Established the Distributed Computing & Edge Intelligence Research Laboratory funded via DST grants\n• Published 22 high-impact papers in IEEE/ACM transactions and international conferences'
      }
    ],
    projectsList: [],
    publicationsList: '1. Verma, A., & Gupta, S. "Decentralized Resource Scheduling in Federated Edge Computing." IEEE Transactions on Cloud Computing, Vol. 11, No. 2, 2023, pp. 450-463.\n2. Verma, A., Sharma, R., & Patel, K. "Resilient Byzantine Fault-Tolerant Consensus for IoT Swarms." ACM Transactions on Sensor Networks, Vol. 19, No. 3, 2022, pp. 112-129.\n3. Verma, A. "Energy-Aware Task Offloading in Multi-Access Edge Networks." IEEE Internet of Things Journal, Vol. 8, 2021, pp. 7890-7901.',
    patentsList: '1. "Fault-Tolerant Distributed Storage Mechanism for Low-Power Edge Nodes", Indian Patent Application No. 202311029481, Status: Granted (2024).\n2. "Dynamic Adaptive Load Balancing System for Cloud-Fog Hybrid Infrastructures", Patent App. No. 202111018244, Status: Published (2022).',
    grantsList: '• Principal Investigator: "Secure & Resilient AI-Driven Edge Infrastructure", Sponsoring Agency: DST-SERB, Grant Amount: ₹48.5 Lakhs (2023 - 2026)\n• Co-Principal Investigator: "Next-Gen IoT Communication Architecture", Sponsoring Agency: MeitY, Govt. of India, Grant Amount: ₹82 Lakhs (2020 - 2023)',
    fdpList: '• Course Coordinator: 2-Week AICTE/ATAL Sponsored FDP on "Cloud-Native Technologies & Microservices" (2023)\n• Resource Person / Keynote Speaker at 18+ National and International Faculty Development Programs',
    achievementsText: '• Recipient of the National Young Scientist Excellence Award (2020)\n• Senior Member, IEEE (Institute of Electrical and Electronics Engineers)\n• Life Member, Computer Society of India (CSI)'
  },

  developer: {
    fullName: 'Aman Kumar',
    devRole: 'Senior Full Stack Software Engineer',
    email: 'aman.kumar.dev@gmail.com',
    phone: '+91 98112 33445',
    location: 'Bengaluru, India',
    github: 'github.com/amankumar-dev',
    portfolio: 'amankumar.tech',
    linkedin: 'linkedin.com/in/aman-kumar-tech',
    summaryText: 'Senior Full Stack Engineer with 4+ years of hands-on experience architecting high-throughput distributed microservices and intuitive frontend applications. Specializes in TypeScript, React, Go, and AWS cloud infrastructures. Passionate about system scalability, automated CI/CD pipelines, and micro-frontend design.',
    devLanguages: 'TypeScript, JavaScript (ES6+), Go, Python, SQL, HTML5/CSS3',
    devFrameworks: 'React.js, Next.js, Node.js, Express, Go Fiber, Tailwind CSS, Redux Toolkit',
    devDatabases: 'PostgreSQL, Redis (Caching & Pub/Sub), MongoDB, Elasticsearch',
    devTools: 'Docker, Kubernetes, AWS (S3, EC2, ECS, Lambda), Git, GitHub Actions, Linux, Jest',
    educationList: [
      {
        id: 'edu-dev-1',
        degree: 'B.Tech in Computer Science',
        institute: 'National Institute of Technology (NIT) Karnataka, Surathkal',
        year: '2018 - 2022',
        score: '8.72 CGPA'
      }
    ],
    experienceList: [
      {
        id: 'exp-dev-1',
        role: 'Senior Software Engineer',
        company: 'CloudWave Technologies',
        period: 'August 2023 - Present',
        location: 'Bengaluru, India',
        details: '• Designed and rolled out event-driven streaming pipeline handling 45,000 requests/sec with Kafka and Go\n• Spearheaded migration of legacy monolith frontend into modular Next.js SSR architecture, boosting SEO score by 40%\n• Decreased AWS cloud infrastructure spending by 22% by containerizing workloads and implementing auto-scaling policies'
      },
      {
        id: 'exp-dev-2',
        role: 'Software Engineer',
        company: 'Nexus Fintech Solutions',
        period: 'July 2022 - July 2023',
        location: 'Bengaluru, India',
        details: '• Built merchant onboarding flow and instant payment verification dashboard using React and TypeScript\n• Integrated Stripe and Razorpay payment gateways with zero downtime and strict webhook validation\n• Authored 120+ unit and integration test suites with 92% code coverage using Jest and React Testing Library'
      }
    ],
    projectsList: [
      {
        id: 'proj-dev-1',
        title: 'Distributed Distributed In-Memory Cache (GoCache)',
        stack: 'Go, TCP Sockets, Raft Consensus, Docker',
        link: 'https://github.com/amankumar-dev/gocache',
        desc: '• Engineered high-performance clustered key-value store with LRU eviction and asynchronous persistence\n• Benchmark tests confirmed sub-millisecond read/write latency under 50,000 concurrent client connections'
      },
      {
        id: 'proj-dev-2',
        title: 'DevCollab - Real-Time Code Pair Canvas',
        stack: 'React, TypeScript, WebRTC, Socket.io, Redis',
        link: 'https://github.com/amankumar-dev/devcollab',
        desc: '• Built collaborative code editor featuring operational transform syntax highlighting and WebRTC voice calls\n• Deployed on AWS ECS with automated SSL certificates and CDN caching'
      }
    ],
    certificationsText: '• AWS Certified Solutions Architect - Associate (SAA-C03)\n• Certified Kubernetes Application Developer (CKAD) - Linux Foundation',
    achievementsText: '• Top 1% Contributor award across engineering team of 85+ engineers at CloudWave\n• Finalist at Global Hackathon (ET Campus Stars 2022)'
  },

  professional: {
    fullName: 'Priya Narang',
    jobTitle: 'Senior Product Manager & Operations Lead',
    email: 'priya.narang@corporate.com',
    phone: '+91 99887 76655',
    location: 'Mumbai, India',
    linkedin: 'linkedin.com/in/priya-narang',
    summaryText: 'Dynamic Product Manager with 6+ years of proven leadership driving B2B SaaS and enterprise solutions from concept to profitable scale. Expert in data-driven user research, cross-functional engineering leadership, and sprint execution. Led cross-functional teams of 25+ designers, developers, and product analysts.',
    educationList: [
      {
        id: 'edu-prof-1',
        degree: 'MBA in Product & Operations Management',
        institute: 'Faculty of Management Studies (FMS), Lucknow',
        year: '2018 - 2020',
        score: 'Grade A'
      },
      {
        id: 'edu-prof-2',
        degree: 'B.Com (Honours)',
        institute: 'Shri Ram College of Commerce (SRCC), Lucknow University',
        year: '2015 - 2018',
        score: '8.6 CGPA'
      }
    ],
    experienceList: [
      {
        id: 'exp-pm-1',
        role: 'Senior Product Manager',
        company: 'Vanguard Enterprise Systems',
        period: 'January 2022 - Present',
        location: 'Mumbai, India',
        details: '• Owned end-to-end product roadmap for flagship enterprise CRM platform generating $4.2M ARR\n• Boosted client retention rate by 19% by rolling out AI-assisted automated workflow triggers and user journeys\n• Managed backlog, sprint planning, and user acceptance criteria across 3 squad teams'
      },
      {
        id: 'exp-pm-2',
        role: 'Product Specialist',
        company: 'Deloitte Consulting India',
        period: 'June 2020 - December 2021',
        location: 'Gurugram, India',
        details: '• Spearheaded digital transformation blueprints for Fortune 500 retail and supply chain clients\n• Conducted 50+ stakeholder interviews and customer journey mapping sessions'
      }
    ],
    projectsList: [],
    skillsText: '• Core Competencies: Product Lifecycle Management (PLM), Roadmap Strategy, Wireframing & Prototyping\n• Analytics & Tools: Jira, Confluence, Figma, Mixpanel, Google Analytics, SQL, Tableau\n• Leadership: Cross-functional Stakeholder Management, Agile/Scrum Methodologies, Risk Mitigation',
    certificationsText: '• Pragmatic Institute Certified (PMC-III)\n• Certified Scrum Product Owner (CSPO) - Scrum Alliance',
    achievementsText: '• Awarded "Trailblazer Product of the Year" at Vanguard Global Summit 2023\n• Speaker on "Customer-Centric B2B SaaS Architecture" at ProductCon Mumbai'
  },

  fresher: {
    fullName: 'Neha Kapoor',
    currentDegree: 'Bachelor of Business Administration (BBA)',
    email: 'neha.kapoor@example.com',
    phone: '+91 97654 32109',
    location: 'Pune, India',
    linkedin: 'linkedin.com/in/neha-kapoor-pune',
    summaryText: 'Proactive and ambitious recent business graduate specializing in digital marketing, brand management, and market analysis. Possesses exceptional interpersonal communication skills and proven ability to execute growth campaigns during academic projects and internships.',
    educationList: [
      {
        id: 'edu-f-1',
        degree: 'Bachelor of Business Administration (BBA - Marketing)',
        institute: 'Symbiosis Centre for Management Studies',
        board: 'Symbiosis International University, Pune',
        year: '2021 - 2024',
        score: '3.78 / 4.0 GPA'
      },
      {
        id: 'edu-f-2',
        degree: 'Higher Secondary Certificate (HSC)',
        institute: 'St. Mary’s Junior College, Pune',
        board: 'Maharashtra State Board',
        year: '2020 - 2021',
        score: '91.2%'
      }
    ],
    experienceList: [
      {
        id: 'exp-f-1',
        role: 'Digital Marketing Intern',
        company: 'AdVenture Media Agency',
        period: 'January 2024 - April 2024',
        location: 'Pune, India',
        details: '• Managed organic Instagram and LinkedIn social media campaigns, driving 35% growth in follower engagement\n• Designed branded creative assets and promotional copy for 4 local lifestyle brands using Canva and Figma\n• Monitored weekly campaign metrics using Google Analytics and prepared performance summary decks'
      }
    ],
    projectsList: [
      {
        id: 'proj-f-1',
        title: 'Omnichannel Consumer Preference Analysis in E-Commerce',
        stack: 'SPSS, MS Excel, Survey Analytics',
        desc: '• Conducted market research study analyzing buying preferences of 450+ urban millennial shoppers\n• Presented data-backed findings to department faculty and received Highest Grade distinction'
      }
    ],
    skillsText: '• Digital Marketing: Search Engine Optimization (SEO), Social Media Marketing (SMM), Email Campaigns\n• Software & Tools: MS Excel (VLOOKUP, Pivot Tables), Google Analytics, Canva, PowerPoint\n• Soft Skills: Excellent Verbal & Written Communication, Presentation, Active Listening, Time Management',
    certificationsText: '• Google Digital Garage - Fundamentals of Digital Marketing\n• HubSpot Inbound Marketing Certification',
    workshopsText: '• Attended National Workshop on Business Analytics and Consumer Psychology (2023)',
    achievementsText: '• General Secretary, College Marketing Club (Organized flagship annual fest with 800+ attendees)\n• 1st Place in Inter-College Case Study Competition 2023',
    strengthsText: '• Fast learner with keen attention to detail\n• High emotional intelligence and diplomatic conflict resolution\n• Highly organized with structured multitasking ability',
    hobbiesText: '• Content Creation & Podcasting\n• Travel Photography\n• Badminton',
    fatherName: 'Mr. Sunil Kapoor',
    motherName: 'Mrs. Kavita Kapoor',
    dob: '12/11/2003',
    languages: 'English (Fluent), Hindi (Proficient), Marathi (Conversational)',
    permanentAddress: 'Flat 302, Green Acre Apartments, Kothrud, Pune - 411038',
    declarationText: 'I hereby state that the information submitted above is authentic and verifiable.',
    decDate: '22/09/2026',
    decPlace: 'Pune'
  },

  researcher: {
    fullName: 'Dr. Sameer Joshi',
    academicTitle: 'Postdoctoral Research Fellow',
    department: 'Department of Biotechnology & Bioengineering',
    institution: 'National Centre for Biological Sciences (NCBS)',
    email: 'sameer.joshi@ncbs.res.in',
    phone: '+91 80 2366 6000',
    location: 'Bengaluru, India',
    scholar: 'scholar.google.com/citations?user=sameer_joshi',
    orcid: '0000-0003-4412-8891',
    researchGate: 'researchgate.net/profile/Sameer-Joshi',
    summaryText: 'Postdoctoral Researcher with specialization in CRISPR gene editing, computational genomics, and structural biology. Experienced in processing high-throughput next-generation sequencing (NGS) pipelines and cryo-EM macromolecular modeling. First author on 7 publications in high-impact scientific journals.',
    educationList: [
      {
        id: 'edu-res-1',
        degree: 'Ph.D. in Molecular Biophysics & Computational Biology',
        institute: 'Tata Institute of Fundamental Research (TIFR)',
        year: '2018 - 2023',
        score: 'Dean’s Commendation for Outstanding Thesis'
      },
      {
        id: 'edu-res-2',
        degree: 'M.Sc. in Biotechnology',
        institute: 'Jawaharlal Nehru University (JNU), Lucknow',
        year: '2016 - 2018',
        score: 'First Class with Distinction'
      }
    ],
    experienceList: [
      {
        id: 'exp-res-1',
        role: 'Postdoctoral Research Fellow',
        company: 'National Centre for Biological Sciences',
        period: 'September 2023 - Present',
        location: 'Bengaluru, India',
        details: '• Investigating targeted epigenetic modifications in neurodegenerative disease models using CRISPR-dCas9\n• Mentoring 3 graduate students in high-throughput sequencing protocols and bioinformatics pipelines'
      }
    ],
    projectsList: [],
    publicationsList: '1. Joshi, S., & Bhattacharya, M. "Engineered CRISPR-Cas12b nucleases for high-fidelity mammalian gene editing." Nature Communications, Vol. 14, 2023, Article 3218.\n2. Joshi, S., et al. "Structural insights into RNA-guided DNA targeting by Cas14 complexes." Nucleic Acids Research, Vol. 50, No. 9, 2022, pp. 5230-5244.\n3. Joshi, S. "Machine learning approaches for off-target gRNA prediction." Bioinformatics, Vol. 37, 2021.',
    patentsList: '1. "Novel Cas-Variant with Enhanced Cleavage Specificity", International PCT Application No. PCT/IB2023/051120, Status: Under Examination.',
    grantsList: '• SERB National Postdoctoral Fellowship (N-PDF) - ₹21.6 Lakhs (2023 - 2025)\n• DBT-Junior and Senior Research Fellowship (2018 - 2023)',
    achievementsText: '• Eli Lilly Outstanding Graduate Research Award in Biotechnology (2023)\n• Travel Grant Awardee, American Society for Cell Biology (ASCB) Annual Meeting, Washington DC'
  },

  designer: {
    fullName: 'Rhea Sen',
    jobTitle: 'Lead Product & UI/UX Designer',
    email: 'rhea.sen.design@gmail.com',
    phone: '+91 98300 12345',
    location: 'Kolkata / Remote',
    portfolio: 'rheasendesign.com',
    linkedin: 'linkedin.com/in/rhea-sen-design',
    summaryText: 'User Experience & Product Designer with 5+ years of experience designing empathetic, accessible, and high-converting interfaces across mobile apps and enterprise web platforms. Adept at building scalable design systems, conducting user interviews, and working closely with engineers.',
    educationList: [
      {
        id: 'edu-des-1',
        degree: 'Bachelor of Design (B.Des - Industrial & Interaction Design)',
        institute: 'National Institute of Design (NID), Ahmedabad',
        year: '2016 - 2020',
        score: 'First Class'
      }
    ],
    experienceList: [
      {
        id: 'exp-des-1',
        role: 'Senior UI/UX Designer',
        company: 'Fintech Spark Studio',
        period: 'March 2022 - Present',
        location: 'Remote',
        details: '• Designed cohesive mobile banking experience used by 1.8M active customers, increasing task completion by 32%\n• Created the "Aura" Design System in Figma comprising 300+ accessible tokens, components, and interactive variants\n• Partnered with product managers to validate user journeys through moderated usability testing'
      }
    ],
    projectsList: [
      {
        id: 'proj-des-1',
        title: 'Zenith Health - Chronic Disease Tracker',
        stack: 'Figma, Protopie, Design Systems, User Research',
        link: 'https://rheasendesign.com/zenith',
        desc: '• Conducted 24 in-depth patient interviews and designed frictionless daily symptom logging flows\n• Featured in Best Mobile App UX Showcase at DesignMatters 2023'
      }
    ],
    skillsText: '• Design Disciplines: User Interface (UI) Design, User Experience (UX), Wireframing, Rapid Prototyping, Design Systems\n• Tools & Software: Figma, Adobe Creative Cloud (Photoshop, Illustrator), ProtoPie, Principle, Miro\n• Methods: User Personas, Empathy Mapping, A/B Usability Testing, Heuristic Evaluation, WCAG 2.1 AA Compliance',
    certificationsText: '• Nielsen Norman Group (NN/g) UX Master Certified\n• Interaction Design Foundation (IxDF) - Design for the 21st Century',
    achievementsText: '• Red Dot Design Award Nominee (2023)\n• Mentor to 45+ aspiring junior designers via ADPList'
  },

  medical: {
    fullName: 'Dr. Vivek Menon, MD',
    jobTitle: 'Consultant Interventional Cardiologist',
    email: 'dr.vivek.menon@hospital.org',
    phone: '+91 44 2829 0000',
    location: 'Chennai, India',
    linkedin: 'linkedin.com/in/dr-vivek-menon',
    summaryText: 'Board-certified Cardiologist with 8+ years of clinical and procedural expertise in coronary angiography, complex angioplasties, transcatheter aortic valve interventions, and cardiac critical care. Committed to patient-centered evidence-based medicine and clinical research.',
    educationList: [
      {
        id: 'edu-med-1',
        degree: 'DM in Cardiology',
        institute: 'Madras Medical College (MMC)',
        year: '2018 - 2021',
        score: 'First Class'
      },
      {
        id: 'edu-med-2',
        degree: 'MD in General Medicine',
        institute: 'Christian Medical College (CMC), Vellore',
        year: '2014 - 2017',
        score: 'Gold Medal in Internal Medicine'
      },
      {
        id: 'edu-med-3',
        degree: 'MBBS',
        institute: 'Stanley Medical College, Chennai',
        year: '2008 - 2014',
        score: 'First Class with Honors'
      }
    ],
    experienceList: [
      {
        id: 'exp-med-1',
        role: 'Consultant Cardiologist',
        company: 'Apollo Specialty Hospitals',
        period: 'August 2021 - Present',
        location: 'Chennai, India',
        details: '• Successfully performed 1,200+ coronary angiographies and 450+ percutaneous coronary interventions (PCI)\n• Leading the Cardiac Intensive Care Unit (CICU) team for managing acute myocardial infarctions and cardiogenic shock\n• Member of Hospital Clinical Ethics & Quality Audit Committee'
      }
    ],
    projectsList: [],
    publicationsList: '1. Menon, V., et al. "Outcomes of Primary PCI in Octogenarians: A 5-Year Tertiary Center Study." Indian Heart Journal, Vol. 74, 2022, pp. 210-216.\n2. Menon, V. "Role of Intravascular Ultrasound (IVUS) in Bifurcation Lesions." Journal of the American College of Cardiology (Asia), 2021.',
    certificationsText: '• Medical Council of India (MCI) Registration No. 94821\n• Fellow of the American College of Cardiology (FACC)\n• Life Member, Cardiological Society of India (CSI)',
    skillsText: '• Clinical Skills: Coronary Angiography & Angioplasty, IVUS/OCT Guidance, Pacemaker Implantation, Echocardiography\n• Patient Care: Acute Coronary Syndrome, Heart Failure Management, Emergency Resuscitation (ACLS certified)',
    achievementsText: '• Best Clinical Research Paper Award at CSI National Conference (2021)\n• Invited Faculty & Case Presenter at Asia-Pacific Transcatheter Cardiovascular Therapeutics (TCTAP)'
  }
};
