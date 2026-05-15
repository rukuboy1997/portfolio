export const profile = {
	name: 'Faruk Abubakar Sadiq',
	alias: 'Dr. Saffas',
	title: 'Full Stack Engineer & AI Developer',
	location: 'Abuja, Nigeria',
	email: 'farouksaffas@gmail.com',
	phone: '+234 902 377 2493',
	github: 'https://github.com/rukuboy1997',
	linkedin: 'https://www.linkedin.com/in/rukuboy1997',
	summary:
		'Results-driven Full Stack Software Engineer and AI Developer with experience designing, developing, and deploying scalable web applications and intelligent systems. Proficient in modern software development practices, backend architecture, and AI integration. Strong background in building production-ready applications, APIs, and blockchain-based solutions.',
	available: true
};

export const skills = [
	{
		category: 'Languages',
		items: [
			{ name: 'JavaScript', level: 95 },
			{ name: 'TypeScript', level: 90 },
			{ name: 'Python', level: 80 },
			{ name: 'SQL', level: 85 },
			{ name: 'PHP', level: 75 },
			{ name: 'Move', level: 65 }
		]
	},
	{
		category: 'Frameworks & Libraries',
		items: [
			{ name: 'React.js', level: 92 },
			{ name: 'Next.js', level: 88 },
			{ name: 'Node.js', level: 90 },
			{ name: 'Express.js', level: 88 },
			{ name: 'React Native', level: 82 },
			{ name: 'Svelte/SvelteKit', level: 78 }
		]
	},
	{
		category: 'Backend & Cloud',
		items: [
			{ name: 'RESTful APIs', level: 95 },
			{ name: 'PostgreSQL', level: 85 },
			{ name: 'MySQL', level: 80 },
			{ name: 'Vercel / Replit', level: 90 },
			{ name: 'Docker (Basic)', level: 65 },
			{ name: 'Microservices', level: 78 }
		]
	},
	{
		category: 'AI & Blockchain',
		items: [
			{ name: 'LLM Integration', level: 85 },
			{ name: 'Prompt Engineering', level: 88 },
			{ name: 'Smart Contracts', level: 72 },
			{ name: 'Web3 Integration', level: 70 },
			{ name: 'Data Processing', level: 80 },
			{ name: 'AI Automation', level: 83 }
		]
	}
];

export const projects = [
	{
		id: 1,
		title: 'GhostAgent',
		description:
			'An AI-powered automation platform integrating backend services and intelligent agents. Features task automation workflows, real-time processing, and a live functional prototype.',
		tags: ['AI', 'Node.js', 'React', 'LLM', 'Automation'],
		category: 'AI',
		live: 'https://ghostagent.vercel.app',
		github: 'https://github.com/rukuboy1997',
		color: '#63e8c7',
		featured: true
	},
	{
		id: 2,
		title: 'AgriChain Vault',
		description:
			'Blockchain-based system for agricultural asset tokenization. Developed smart contracts for secure asset ownership and tracking, focusing on real-world asset (RWA) applications.',
		tags: ['Blockchain', 'Sui/Move', 'Web3', 'Smart Contracts', 'React'],
		category: 'Blockchain',
		live: 'https://agrichain-vault.vercel.app',
		github: 'https://github.com/rukuboy1997',
		color: '#4f8ef7',
		featured: true
	},
	{
		id: 3,
		title: 'VaultIQ',
		description:
			'A fintech vault and investment platform with intelligent tracking, analytics dashboards, and secure transaction management built on a modern full-stack architecture.',
		tags: ['React', 'Node.js', 'PostgreSQL', 'FinTech'],
		category: 'FullStack',
		live: 'https://vaultiq-project.vercel.app',
		github: 'https://github.com/rukuboy1997',
		color: '#f7c44f',
		featured: true
	},
	{
		id: 4,
		title: 'Freelancers Hub',
		description:
			'A marketplace platform for freelancers and clients. Features project listings, proposal management, and profile system with RESTful API backend.',
		tags: ['React', 'Express', 'PostgreSQL', 'REST API'],
		category: 'FullStack',
		live: 'https://freelancershub-project.vercel.app',
		github: 'https://github.com/rukuboy1997',
		color: '#e867a0',
		featured: false
	},
	{
		id: 5,
		title: 'BitGate',
		description:
			'A crypto gateway and portfolio tracker with live market data integration, wallet management, and transaction history with a sleek modern interface.',
		tags: ['React', 'Node.js', 'Crypto API', 'Web3'],
		category: 'Blockchain',
		live: 'https://bitgate-frontend.vercel.app',
		github: 'https://github.com/rukuboy1997',
		color: '#f79c4f',
		featured: false
	},
	{
		id: 6,
		title: 'Banco Seeds',
		description:
			'Agricultural micro-finance platform connecting farmers to seed funding. Built RESTful APIs, user management, loan tracking, and mobile-responsive frontend.',
		tags: ['PHP', 'MySQL', 'React', 'FinTech', 'AgriTech'],
		category: 'FullStack',
		live: 'https://bancoseeds.com.ng',
		github: 'https://github.com/rukuboy1997',
		color: '#67d56b',
		featured: false
	}
];

export const experience = [
	{
		role: 'Full Stack Software Engineer',
		type: 'Freelance / Independent',
		period: '2022 – Present',
		highlights: [
			'Designed and developed scalable full-stack applications using React, Node.js, and PostgreSQL',
			'Built and deployed RESTful APIs with secure authentication and efficient data handling',
			'Integrated AI-powered features using modern LLM APIs to automate workflows',
			'Collaborated on multiple hackathon projects, delivering functional prototypes under tight deadlines'
		]
	},
	{
		role: 'React Native Developer',
		type: 'Mobile App Projects',
		period: '2018 – 2022',
		highlights: [
			'Built wallet/balance dashboard UI with gradient cards and live backend data',
			'Integrated PHP/MySQL REST APIs into React Native apps',
			'Implemented secure login, referral systems, and reward mechanics',
			'Built transaction history screens with refresh, pagination, and claim timer logic'
		]
	},
	{
		role: 'PHP & MySQL API Developer',
		type: 'Backend Development',
		period: '2018 – 2022',
		highlights: [
			'Designed RESTful APIs for user auth, balance management, and transaction recording',
			'Implemented referral tracking, reward crediting, and secure password handling',
			'Built scalable backend architecture for mobile app backends'
		]
	}
];

export const education = [
	{
		degree: 'BSc. Computer Science (Online)',
		institution: 'University of the People (UoPeople)',
		period: 'Present'
	},
	{
		degree: 'PGCert. Data Science in Precision Medicine & Cloud Computing',
		institution: 'Stanford University',
		period: '2024'
	},
	{
		degree: 'PGCert. Software Engineering',
		institution: 'African Leadership Accelerators (ALX)',
		period: '2023'
	},
	{
		degree: 'BSc. Medical Laboratory Science',
		institution: 'Institut Pratique de Santé Publique (IPSP)',
		period: '2021'
	}
];

export const terminalCommands: Record<string, string> = {
	help: `Available commands:
  <span class="cmd-accent">about</span>      — who I am
  <span class="cmd-accent">skills</span>     — my technical toolkit
  <span class="cmd-accent">projects</span>   — things I've shipped
  <span class="cmd-accent">contact</span>    — let's connect
  <span class="cmd-accent">experience</span> — my work history
  <span class="cmd-accent">education</span>  — academic background
  <span class="cmd-accent">clear</span>      — clear the terminal
  <span class="cmd-accent">exit</span>       — close terminal`,

	about: `<span class="cmd-accent">Faruk Abubakar Sadiq</span> (aka Dr. Saffas)
Full Stack Software Engineer & AI Developer
Location: Abuja, Nigeria

Results-driven engineer with experience designing, developing, and
deploying scalable web applications and intelligent systems.
Strong in backend architecture, AI integration, and blockchain solutions.`,

	skills: `<span class="cmd-accent">Technical Toolkit</span>
─────────────────────────────
Languages:     JavaScript, TypeScript, Python, SQL, PHP, Move
Frontend:      React.js, Next.js, Svelte, React Native
Backend:       Node.js, Express.js, REST APIs, Microservices
Databases:     PostgreSQL, MySQL, Neon Database
AI/ML:         LLM APIs, Prompt Engineering, AI Automation
Blockchain:    Sui/Move, Smart Contracts, Web3
DevOps:        Git, Docker (Basic), Vercel, Replit`,

	projects: `<span class="cmd-accent">Deployed Projects</span>
─────────────────────────────
1. GhostAgent         → ghostagent.vercel.app          (AI Platform)
2. AgriChain Vault    → agrichain-vault.vercel.app     (Blockchain)
3. VaultIQ            → vaultiq-project.vercel.app     (FinTech)
4. Freelancers Hub    → freelancershub-project.vercel.app
5. BitGate            → bitgate-frontend.vercel.app    (Crypto)
6. Banco Seeds        → bancoseeds.com.ng              (AgriFinance)`,

	contact: `<span class="cmd-accent">Contact Information</span>
─────────────────────────────
Email:    farouksaffas@gmail.com
GitHub:   github.com/rukuboy1997
LinkedIn: linkedin.com/in/rukuboy1997
Phone:    +234 902 377 2493

Available for remote and on-site opportunities.
Open to Full Stack, Backend, and AI Engineering roles.`,

	experience: `<span class="cmd-accent">Work Experience</span>
─────────────────────────────
2022–Present  Full Stack Software Engineer (Freelance)
              React, Node.js, PostgreSQL, AI Integration

2018–2022     React Native Developer (Mobile Projects)
              React Native, Expo, PHP/MySQL backends

2018–2022     PHP & MySQL API Developer
              RESTful APIs, Authentication, Backend Systems`,

	education: `<span class="cmd-accent">Academic Background</span>
─────────────────────────────
Present   BSc. Computer Science — University of the People
2024      PGCert. Data Science — Stanford University
2023      PGCert. Software Engineering — ALX
2021      BSc. Medical Laboratory Science — IPSP`
};
