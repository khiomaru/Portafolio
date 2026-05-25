export const projects = [
  {
    id: 1,
    tKey: 'afer',
    techs: ["Angular", "NestJS", "TypeScript", "PostgreSQL", "Docker", "HTML", "CSS", "API REST"],
    repo: "https://github.com/Manuel-Adolfo-Soto/Afer-Bolivia-backend",
    repoFront: "https://github.com/Manuel-Adolfo-Soto/Afer-Bolivia-frontend",
    year: "2025-2026",
    featured: true,
    completed: false,
    images: [
      "/images/Afer-Login.webp",
      "/images/Afer-Marcas.webp",
      "/images/Afer-Pagina-inical.webp",
    ],
  },
  {
    id: 2,
    tKey: 'farmacia',
    techs: ["C#", ".NET", "SQL Server", "Windows Forms"],
    repo: "https://github.com/Manuel-Adolfo-Soto/Sis457_Farmacia",
    repoBack: "https://github.com/Manuel-Adolfo-Soto/Sis457_Farmacia_2-2025",
    year: "2025",
    completed: true,
    images: [
      "/images/farmacia/final_si4257_FARMACIA_page-0006.jpg",
      "/images/farmacia/final_si4257_FARMACIA_page-0008.jpg",
      "/images/farmacia/final_si4257_FARMACIA_page-0009.jpg",
      "/images/farmacia/final_si4257_FARMACIA_page-0010.jpg",
      "/images/farmacia/final_si4257_FARMACIA_page-0011.jpg",
      "/images/farmacia/final_si4257_FARMACIA_page-0012.jpg",
      "/images/farmacia/final_si4257_FARMACIA_page-0013.jpg",
      "/images/farmacia/final_si4257_FARMACIA_page-0014.jpg",
      "/images/farmacia/final_si4257_FARMACIA_page-0015.jpg",
    ],
  },
  {
    id: 3,
    tKey: 'hamburgueseria',
    techs: ["Vue 3", "NestJS", "TypeScript", "PostgreSQL", "Docker", "CSS"],
    repo: "https://github.com/cruzvillcamarleny1-del/Sis257_hamburgueseria",
    year: "2025",
    completed: true,
    images: [
      "/images/hamburgueseria/Captura de pantalla 2026-05-24 234219.png",
      "/images/hamburgueseria/Captura de pantalla 2026-05-24 234319.png",
      "/images/hamburgueseria/Captura de pantalla 2026-05-24 234357.png",
      "/images/hamburgueseria/Captura de pantalla 2026-05-24 234427.png",
      "/images/hamburgueseria/Captura de pantalla 2026-05-24 234449.png",
      "/images/hamburgueseria/Captura de pantalla 2026-05-24 234508.png",
      "/images/hamburgueseria/Captura de pantalla 2026-05-24 234602.png",
      "/images/hamburgueseria/Captura de pantalla 2026-05-24 234617.png",
    ],
  },
  {
    id: 4,
    tKey: 'cafeteria',
    techs: ["C#", ".NET", "SQL Server"],
    repo: "https://github.com/soledadzegarra/Sis457_cafeteria",
    year: "2025",
    completed: true,
  },
  {
    id: 5,
    tKey: 'tienda',
    techs: ["Vue 3", "TypeScript", "Vite", "CSS"],
    repo: "https://github.com/Manuel-Adolfo-Soto/SIS257_TIENDA_DE_COMPUTADORAS",
    year: "2025",
    completed: true,
  },
  {
    id: 6,
    tKey: 'api',
    techs: ["NestJS", "TypeScript", "PostgreSQL", "Docker", "JWT"],
    repo: "https://github.com/Manuel-Adolfo-Soto/backend_sis257_mas",
    year: "2025",
    completed: true,
  },
];

export const skills = {
  frontend: [
    { name: "HTML", level: 80 },
    { name: "CSS", level: 75 },
    { name: "JavaScript", level: 75 },
    { name: "TypeScript", level: 70 },
    { name: "Angular", level: 70 },
    { name: "Vue 3", level: 65 },
    { name: "React", level: 40 },
    { name: "Bootstrap", level: 60 },
    { name: "Tailwind", level: 50 },
  ],
  backend: [
    { name: "Node.js", level: 70 },
    { name: "NestJS", level: 65 },
    { name: "C#", level: 70 },
    { name: "Python", level: 40 },
    { name: "PHP", level: 45 },
    { name: "Java", level: 35 },
  ],
  databases: [
    { name: "PostgreSQL", level: 65 },
    { name: "MySQL", level: 65 },
    { name: "SQL Server", level: 55 },
    { name: "MongoDB", level: 40 },
    { name: "Firebase", level: 35 },
  ],
  tools: [
    { name: "Git", level: 75 },
    { name: "GitHub", level: 75 },
    { name: "VS Code", level: 85 },
    { name: "Docker", level: 55 },
    { name: "Linux", level: 50 },
    { name: "Windows", level: 80 },
    { name: "Figma", level: 40 },
  ],
  networking: [
    { name: "IPv4", level: 60 },
    { name: "IPv6", level: 45 },
    { name: "Subredes", level: 55 },
    { name: "DHCP", level: 50 },
    { name: "Direccionamiento IP", level: 55 },
  ],
};

export const experience = [
  {
    type: "internship",
    tKey: 0,
    techs: ["Angular", "NestJS", "TypeScript", "PostgreSQL", "Docker", "API REST", "Git", "HTML", "CSS"],
  },
  {
    type: "internship",
    tKey: 1,
    techs: ["Angular", "NestJS", "TypeScript", "PostgreSQL"],
  },
  {
    type: "academic",
    tKey: 2,
    techs: ["C#", "Vue 3", "NestJS", "SQL Server", "PostgreSQL", "Git"],
  },
];

export const education = [
  {
    degree: "Ingeniería Informática (Último semestre)",
    institution: "Universidad Mayor, Real y Pontificia de San Francisco Xavier de Chuquisaca (USFX)",
    period: "2022 - Actualidad",
    description: "Cursando el último semestre de la carrera, próximo a egresar. Formación integral en desarrollo de software, ingeniería de sistemas, bases de datos, redes de computadoras y gestión de proyectos tecnológicos.",
    highlights: [
      "Desarrollo de aplicaciones Internet/Intranet I y II (Angular, NestJS, Vue)",
      "Programación avanzada con C# y .NET",
      "Bases de datos relacionales (PostgreSQL, SQL Server, MySQL)",
      "Arquitectura de redes y direccionamiento IP",
      "Trabajo dirigido como modalidad de titulación",
      "Proyecto final: Sistema e-commerce para Afer Bolivia",
    ],
  },
];

export const certificates = [
  {
    name: "Carta de Recomendación - Afer Bolivia",
    issuer: "Afer Bolivia",
    date: "2026",
    link: "/images/certificado-afer.jpg",
    description: "Carta de recomendación laboral por desempeño como Pasante Full Stack en Afer Bolivia.",
    pending: false,
  },
  {
    name: "Certificado de Participación - DevFest Sucre 2024",
    issuer: "Google Developer Groups · Women Techmakers · USFX",
    date: "Noviembre 2024",
    link: "/images/Manuel_Adolfo_Soto_Certificado_de_Participación_Certificate.jpg",
    description: "Certificado por destacada participación y contribución como participante en DevFest Sucre 2024, celebrado el 16 de noviembre de 2024.",
    pending: false,
  },
  {
    name: "Certificado de iniciación al desarrollo con IA",
    issuer: "Big School · Brais Moure (Director Máster en IA)",
    date: "Mayo 2026",
    link: "/images/certificado-ia.jpg",
    description: "Por participación en las jornadas formativas 'Desarrollo con IA: De 0 a Producción' de Big School, el 25 de mayo de 2026.",
    pending: false,
  },
  {
    name: "Próximamente — Cursos y certificaciones",
    issuer: "",
    date: "",
    link: "#",
    description: "Actualmente fortaleciendo inglés y formación complementaria",
    pending: true,
  },
];

export const timeline = [
  { year: "2022", title: "Inicio de Ingeniería Informática", description: "Ingreso a la USFX en Sucre, Bolivia", icon: "🎓" },
  { year: "2023", title: "Primeros proyectos", description: "Desarrollo de sistemas con C# y bases de datos", icon: "💻" },
  { year: "2024", title: "Ingreso a Afer Bolivia", description: "Inicio como pasante full stack, desarrollo real en Angular y NestJS", icon: "🚀" },
  { year: "2025", title: "Proyectos full-stack", description: "Farmacia, Hamburguesería, Cafetería — sistemas completos con múltiples tecnologías", icon: "🛠️" },
  { year: "2025-2026", title: "E-commerce Afer Bolivia", description: "Desarrollo de sistema comercial para usuarios reales, próximo a deploy", icon: "🌟" },
  { year: "2026", title: "Último semestre + Pasantía", description: "Finalización de carrera y formalización de experiencia laboral", icon: "🎯" },
];
