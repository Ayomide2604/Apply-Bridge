import { FaFileAlt, FaBriefcase, FaPenFancy, FaRegComments } from "react-icons/fa";
import Service from "../components/Service";

const servicesData = [
	{
		id: 1,
		icon: FaFileAlt,
		title: "CV Optimization",
		description:
			"Professional CV review and enhancement to highlight your skills and experience. We help you create an impactful CV that stands out to employers and passes ATS systems.",
	},
	{
		id: 2,
		icon: FaBriefcase,
		title: "Job Application",
		description:
			"Personalized guidance on job search strategies, application timing, and targeting the right opportunities. We help you navigate the job market effectively and increase your chances of success.",
	},
	{
		id: 3,
		icon: FaPenFancy,
		title: "Cover Letter & Statement Writing",
		description:
			"Expertly crafted cover letters and personal statements tailored to your target roles, helping you make a strong first impression with employers.",
	},
	{
		id: 4,
		icon: FaRegComments,
		title: "Expert Guidance & Feedback",
		description:
			"Personalized support and actionable feedback throughout your job search journey, helping you make informed decisions and maximize your chances of success.",
	},
];

const Services = () => {
	return (
		<section id="services" className="services section light-background">
			<div className="container section-title" data-aos="fade-up">
				<h2>Our Services</h2>
				<p>
					Comprehensive solutions to streamline your application process and
					enhance your career journey
				</p>
			</div>

			<div className="container" data-aos="fade-up" data-aos-delay="100">
				<div className="row g-4">
					{servicesData.map((service) => (
						<Service
							key={service.id}
							icon={service.icon}
							title={service.title}
							description={service.description}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
