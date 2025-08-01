import { useState } from 'react';
import Image from 'next/image';
import { FaLaptopCode, FaBriefcase, FaRocket, FaDownload, FaGraduationCap, FaUniversity, FaSchool } from 'react-icons/fa';
import styles from '../styles/experience.module.css';
import Resume from './resume'; // Import the Resume component

const educationData = [
	{
		icon: <FaGraduationCap />,
		degree: 'B.Tech Information Technology',
		institution: 'SPU(Pune) University',
		duration: '2024 – 2028',
		description:
			'CGPA: 8.45/10. Specialized in web development, data structures, and algorithms.',
		highlights: [
			'Top 10% of class',
			'Lead, Coding Club',
			'Built a campus event portal',
		],
	},
	{
		icon: <FaUniversity />,
		degree: 'Higher Secondary (12th)',
		institution: 'Sanjivani Junior college kopargaon',
		duration: '2022 – 2024',
		description: 'PCM. Percentage: 81.7%.',
		highlights: [
			'School Topper',
			'Organized tech fest',
		],
	},
	{
		icon: <FaSchool />,
		degree: 'Secondary (10th)',
		institution: 'Janta vidyalay gavandgaon',
		duration: '2016 – 2022',
		description: 'Percentage: 91%.',
		highlights: [
			'Science Olympiad Winner',
		],
	},
];

const experienceData = [
	{
		icon: <FaLaptopCode />,
		logo: '/images/techx-logo.png',
		role: 'Frontend Developer Intern',
		company: 'TechX Pvt. Ltd.',
		duration: 'Jan 2024 – Jun 2024',
		description:
			'Worked on building reusable React components, enhancing UI/UX, and integrating REST APIs in client projects.',
		features: [
			'Developed 10+ reusable React components',
			'Improved page load speed by 30%',
			'Collaborated with UI/UX designers for modern interfaces',
			'Integrated REST APIs and handled state management',
		],
		skills: [
			'React',
			'JavaScript',
			'REST API',
			'UI/UX',
			'Redux',
			'CSS Modules',
		],
	},
	{
		icon: <FaBriefcase />,
		logo: '', // no logo, fallback to icon
		role: 'Freelance Web Developer',
		company: 'Self-employed',
		duration: 'Jul 2023 – Dec 2023',
		description:
			'Created full-stack websites using Next.js and MongoDB for local businesses, including e-commerce platforms and portfolios.',
		features: [
			'Delivered 5+ client projects end-to-end',
			'Implemented secure authentication and payments',
			'Responsive design for all devices',
			'SEO optimization for better reach',
		],
		skills: [
			'Next.js',
			'MongoDB',
			'Node.js',
			'Stripe',
			'SEO',
			'Responsive Design',
		],
	},
	{
		icon: <FaRocket />,
		logo: '', // no logo, fallback to icon
		role: 'Open Source Contributor',
		company: 'GitHub Projects',
		duration: 'Ongoing',
		description:
			'Contributed to open-source UI libraries and bug fixing in collaborative repositories.',
		features: [
			'Merged 15+ pull requests in popular repos',
			'Reviewed code and mentored new contributors',
			'Improved documentation and accessibility',
			'Fixed critical bugs and enhanced test coverage',
		],
		skills: [
			'Git',
			'Open Source',
			'Collaboration',
			'Testing',
			'Documentation',
		],
	},
];

export default function Experience() {
	const [showResume, setShowResume] = useState(false);

	return (
		<section id="experience" className={styles.experienceSection}>
			<h2 className={styles.title}>Experience & Education</h2>
			<div className={styles.expGrid}>
				{/* Education */}
				<div className={styles.expCol}>
					<h3 className={styles.sectionLabel}>Education</h3>
					<div className={styles.timelineVertical}>
						{educationData.map((edu, i) => (
							<div className={styles.timelineBox} key={i}>
								<div className={styles.timelineDot} />
								{i < educationData.length - 1 && (
									<div className={styles.timelineLine} />
								)}
								<div className={styles.cardBox}>
									<div className={styles.avatar}>
										<span className={styles.icon}>{edu.icon}</span>
									</div>
									<div className={styles.content}>
										<h4>{edu.degree}</h4>
										<span className={styles.company}>
											{edu.institution}
										</span>
										<span className={styles.duration}>
											{edu.duration}
										</span>
										<p>{edu.description}</p>
										{edu.highlights && (
											<ul className={styles.featuresList}>
												{edu.highlights.map((h, idx) => (
													<li key={idx}>{h}</li>
												))}
											</ul>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* Experience */}
				<div className={styles.expCol}>
					<h3 className={styles.sectionLabel}>Experience</h3>
					<div className={styles.timelineVertical}>
						{experienceData.map((exp, i) => (
							<div className={styles.timelineBox} key={i}>
								<div className={styles.timelineDot} />
								{i < experienceData.length - 1 && (
									<div className={styles.timelineLine} />
								)}
								<div className={styles.cardBox}>
									<div className={styles.avatar}>
										{exp.logo ? (
											<Image
												src={exp.logo}
												alt={exp.company}
												width={100}
												height={40}
											/>
										) : (
											<span className={styles.icon}>{exp.icon}</span>
										)}
									</div>
									<div className={styles.content}>
										<h4>{exp.role}</h4>
										<span className={styles.company}>
											{exp.company}
										</span>
										<span className={styles.duration}>
											{exp.duration}
										</span>
										<p>{exp.description}</p>
										{exp.features && (
											<ul className={styles.featuresList}>
												{exp.features.map((f, idx) => (
													<li key={idx}>{f}</li>
												))}
											</ul>
										)}
										{exp.skills && (
											<div className={styles.skillsRow}>
												{exp.skills.map((skill, idx) => (
													<span
														className={styles.skillBadge}
														key={idx}
													>
														{skill}
													</span>
												))}
											</div>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.resumeBtnWrapper}>
				<button
					className={styles.resumeBtn}
					onClick={() => setShowResume(true)}
					aria-label="Open Resume"
				>
					<FaDownload style={{ marginRight: 8 }} />
					View Resume
				</button>
			</div>
			{showResume && (
				<div
					className={styles.resumeModalOverlay}
					onClick={() => setShowResume(false)}
				>
					<div
						className={styles.resumeModal}
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className={styles.resumeModalClose}
							onClick={() => setShowResume(false)}
							aria-label="Close Resume"
							title="Close"
						>
							×
						</button>
						<Resume />
					</div>
				</div>
			)}
		</section>
	);
}

