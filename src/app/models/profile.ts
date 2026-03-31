export class Profile {
  firstName: string = '';
  lastName: string = '';
  age: string = '';
  slogan: string = '';
  status: boolean = true;
  title: string = '';
  bio: string = '';
  email: string = '';
  linkedin: string = '';
  photo: string = '';
  education: Education[] = [];
  experiences: Experience[] = [];
  projects: Project[] = [];
  skills: Skill[] = [];
  interests: string[] = [];
  values: Values[] = [];

  constructor(init?: Partial<Profile>) {
    Object.assign(this, init);
  }

  public getStatusStr(): string {
    return this.status ? 'Disponible' : 'Non-disponible';
  }
}

export interface Values {
  title: string;
  desc: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  description?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Project {
  logo: string;
  name: string;
  description: string;
  status: string;
  technologies: string[];
  link?: string;
  photos: string[];
}

export interface Skill {
  name: string;
  level: number; // 1-5
  category: string;
}

export const profile = new Profile({
  firstName: 'Clément',
  lastName: 'MOULIS',
  age: '21',
  slogan: 'Étudiant passionné & créateur de sites qui marquent',
  status: true,
  title: 'Développeur Full-Stack',
  bio: 'Passionné par le développement web et les nouvelles technologies, je crée des solutions digitales sur mesure pour accompagner les entreprises dans leur transformation numérique et les moderniser.',
  email: 'moulisclement.pro@gmail.com',
  linkedin: 'https://linkedin.com/in/clément-moulis',
  photo: 'clement-moulis-photo.png',
  education: [
    {
      degree: 'Master Informatique',
      school: 'IPI IGENSIA',
      year: '2027',
      description:
        'Expertise en tout type de développement et conception logicielle et applicative.',
    },
    {
      degree: "Concepteur et Développeur d'Applications Numériques",
      school: 'IPI IGENSIA',
      year: '2025',
      description:
        "Apprentissage et développement d'applications numériques de la phase de conception jusque la phase de déploiement",
    },
  ],
  experiences: [
    {
      title: 'Développeur Web',
      company: 'ACTN',
      period: '2025 – En cours',
      description:
        "Intégration d'interfaces et développement de composants Angular. Participation active au développement continu du site web client et intra en fonction des besoins utilisateurs.",
    },
    {
      title: 'Développeur Full-Stack',
      company: 'SopraSteria',
      period: '2024-2025',
      description:
        "Conception et développement d'une application web pour Orange à partir de l'existant. Travail en équipe avec des internationaux notamment, grâce à la méthode agile",
    },
    {
      title: 'Développeur Full-Stack - Stage',
      company: 'LGM',
      period: '2025',
      description:
        "Développement d'un gestionnaire de configuration système avec python et Qt.",
    },
  ],
  projects: [
    {
      name: 'Ce sera moi',
      description:
        'Jeu vidéo où le but est de se faire élire aux élections présidentielles françaises',
      status: 'En cours',
      technologies: ['Python', 'Pytest', 'Qt', 'SQLite'],
      link: 'https://clemcleragazzo.itch.io/politicgamesimulator',
      photos: [],
      logo: '',
    },
    {
      name: 'Projet Zombie',
      description: 'Jeu vidéo de survie durant une apocalypse zombie.',
      technologies: ['Unreal Engine 5', '3D'],
      status: 'En cours',
      link: '',
      photos: [],
      logo: '',
    },
    {
      name: 'Projet SAMARAI',
      description:
        'Site web, gestionnaire de flux pour regrouper les différents processus métier en une seule application.',
      technologies: ['SpringBoot', 'Java8', 'Junit4', 'Angular'],
      status: '',
      link: '',
      photos: [],
      logo: '',
    },
    {
      name: 'Site de prompt',
      description:
        "Création d'un formulaire sur un site internet afin de créer le meilleur prompt pour une Intelligence Artificielle générative",
      technologies: ['HTML', 'CSS', 'JavaScript'],
      status: 'Terminé',
      link: '',
      photos: [],
      logo: '',
    },
  ],
  skills: [
    { name: 'Angular / TypeScript', level: 5, category: 'Front-End' },
    { name: 'HTML / CSS / SCSS / JS', level: 5, category: 'Front-End' },
    { name: 'PHP / Symfony', level: 3, category: 'Back-End' },
    { name: 'Java / SpringBoot', level: 5, category: 'Back-End' },
    { name: 'Python / Qt', level: 4, category: 'FullStack' },
    { name: 'API REST', level: 5, category: 'FullStack' },
    { name: 'API SOAP', level: 5, category: 'FullStack' },
    { name: 'PostgreSQL', level: 4, category: 'Base de données' },
    { name: 'MySQL', level: 4, category: 'Base de données' },
    { name: 'SQLite', level: 5, category: 'Base de données' },
    // { name: 'Docker', level: 3, category: 'DevOps' },
    { name: 'Git / GitHub', level: 5, category: 'Outils' },
    { name: 'Pytest', level: 4, category: 'Test unitaire' },
    { name: 'JUnit', level: 3, category: 'Test unitaire' },
    { name: 'Cypress', level: 3, category: 'Test unitaire' },
  ],
  interests: ['Politique', 'Généalogie', 'Jeu vidéo', 'Sport/Éducation'],
  values: [
    {
      title: 'Autodidacte',
      desc: "J'apprends en faisant. Chaque projet m'apporte de nouvelles compétences que j'applique immédiatement.",
    },
    {
      title: 'Réactif',
      desc: 'Délais tenus, réponses rapides, livraison en 10 jours. Vous avez un interlocuteur unique de A à Z.',
    },
    {
      title: 'Passionné',
      desc: "Le code c'est plus qu'un métier — c'est ce que je fais le soir par plaisir. Cette énergie se ressent dans chaque projet.",
    },
  ],
});
