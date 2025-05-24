import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
const Footer = () => {
	return (
		<footer id="footer" className="footer">
			<div className="container footer-top">
				<div className="row gy-4">
					<div className="col-lg-4 col-md-6 footer-about">
						<a href="index.html" className="logo d-flex align-items-center">
							<span className="sitename">Apply Bridge</span>
						</a>
						<div className="footer-contact pt-3">
							<p>43 Ojileru Street</p>
							<p>Oworoshoki, Lagos, Nigeria</p>
							<p className="mt-3">
								<strong>Phone:</strong> <span>+234 812 666 0484</span>
							</p>
							<p>
								<strong>Email:</strong> <span>contact@gmail.com</span>
							</p>
						</div>
						<div className="social-links d-flex mt-4">
							<a href="">
								<FaFacebook />
							</a>
							<a href="">
								<FaTwitter />
							</a>
							<a href="">
								<FaLinkedin />
							</a>
						</div>
					</div>

					<div className="col-lg-2 col-md-3 footer-links">
						<h4>Quick Links</h4>
						<ul>
							<li>
								<a href="#">Home</a>
							</li>
							<li>
								<a href="#">About Us</a>
							</li>
							<li>
								<a href="#">How It Works</a>
							</li>
							<li>
								<a href="#">Success Stories</a>
							</li>
							<li>
								<a href="#">Contact Us</a>
							</li>
						</ul>
					</div>

					<div className="col-lg-2 col-md-3 footer-links">
						<h4>Our Services</h4>
						<ul>
							<li>
								<a href="#">Job Matching</a>
							</li>
							<li>
								<a href="#">Career Guidance</a>
							</li>
							<li>
								<a href="#">Resume Builder</a>
							</li>
							<li>
								<a href="#">Interview Prep</a>
							</li>
							<li>
								<a href="#">Skill Assessment</a>
							</li>
						</ul>
					</div>

					<div className="col-lg-2 col-md-3 footer-links">
						<h4>For Employers</h4>
						<ul>
							<li>
								<a href="#">Post Jobs</a>
							</li>
							<li>
								<a href="#">Find Talent</a>
							</li>
							<li>
								<a href="#">Pricing Plans</a>
							</li>
							<li>
								<a href="#">Employer Resources</a>
							</li>
							<li>
								<a href="#">Success Metrics</a>
							</li>
						</ul>
					</div>

					<div className="col-lg-2 col-md-3 footer-links">
						<h4>Resources</h4>
						<ul>
							<li>
								<a href="#">Career Blog</a>
							</li>
							<li>
								<a href="#">Job Search Tips</a>
							</li>
							<li>
								<a href="#">Industry Insights</a>
							</li>
							<li>
								<a href="#">FAQ</a>
							</li>
							<li>
								<a href="#">Support Center</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="container copyright text-center mt-4">
				<p>
					© <span>Copyright {new Date().getFullYear()}</span>{" "}
					<strong className="px-1 sitename">Apply Bridge</strong>{" "}
					<span>All Rights Reserved</span>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
