import about1 from "../assets/img/about1.jpg";
import about2 from "../assets/img/about2.jpg";
import { FaCheckCircle } from "react-icons/fa";
const About = () => {
	return (
		<section id="about" className="about section">
			<div className="container" data-aos="fade-up" data-aos-delay="100">
				<div className="row gy-4 align-items-center justify-content-between">
					<div className="col-xl-5" data-aos="fade-up" data-aos-delay="200">
						<span className="about-meta">OUR MISSION</span>
						<h2 className="about-title">
							Simplifying Healthcare Job Applications for Australia & the UK
						</h2>
						<p className="about-description">
							We are dedicated to supporting healthcare professionals in their
							journey to work abroad. Our service streamlines the job
							application process for positions in Australia and the UK,
							providing expert CV writing, supporting statement preparation, and
							application assistance. We help qualified candidates present
							themselves effectively to secure their desired roles.
						</p>

						<div className="row feature-list-wrapper">
							<div className="col-md-6">
								<ul className="feature-list">
									<li className="d-flex align-items-center">
										<FaCheckCircle /> Professional CV Writing
									</li>
									<li className="d-flex align-items-center">
										<FaCheckCircle /> Supporting Statement Preparation
									</li>
								</ul>
							</div>
							<div className="col-md-6">
								<ul className="feature-list">
									<li>
										<FaCheckCircle /> Job Application Support
									</li>
									<li>
										<FaCheckCircle /> Expert Guidance & Feedback
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="col-xl-6" data-aos="fade-up" data-aos-delay="300">
						<div className="image-wrapper">
							<div
								className="images position-relative d-none d-md-block"
								data-aos="zoom-out"
								data-aos-delay="400"
							>
								<img
									src={about1}
									alt="Healthcare Professional"
									className="img-fluid main-image rounded-4"
								/>
								{/* <img
									src={about2}
									alt="International Job Search"
									className="img-fluid small-image rounded-4"
								/> */}
							</div>
							{/* <div className="experience-badge floating">
								<h3>
									10+ <span>Years</span>
								</h3>
								<p>Of experience in international healthcare recruitment</p>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
