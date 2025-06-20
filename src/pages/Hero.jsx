import { FaBell } from "react-icons/fa";
import heroImage from "../assets/img/hero.jpg";
const Hero = () => {
	return (
		<section id="hero" className="hero section">
			<div className="container" data-aos="fade-up" data-aos-delay="100">
				<div className="row align-items-center">
					<div className="col-lg-6">
						<div
							className="hero-content"
							data-aos="fade-up"
							data-aos-delay="200"
						>
							<div className="company-badge mb-4">
								<span className="mx-3">Save Time on Job Applications</span>
								<FaBell />
							</div>

							<h1 className="mb-4">
								Find Your <br />
								Dream Job <br />
								<span className="accent-text">
									in the USA, UK, Canada, or Australia
								</span>
							</h1>

							<p className="mb-4 mb-md-5">
								We understand the stress of job applications, especially when
								looking abroad. Our service is dedicated to helping professionals
								like you by simplifying and assisting with the application process
								for opportunities in the USA, UK, Canada, and Australia, so you can
								focus on your career.
							</p>

							<div className="hero-buttons">
								<a href="#about" className="btn btn-primary me-0 me-sm-2 mx-1">
									Learn More
								</a>
							</div>
						</div>
					</div>

					<div className="col-lg-6">
						<div
							className="hero-image"
							data-aos="zoom-out"
							data-aos-delay="300"
						>
							<img
								src={heroImage}
								alt="Hero Image"
								className="img-fluid"
								style={{ objectFit: "cover" }}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
