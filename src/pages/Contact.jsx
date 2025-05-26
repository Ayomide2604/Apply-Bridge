import ContactForm from "../components/ContactForm";
import { FaEnvelope, FaGlobe, FaPhone } from "react-icons/fa";

const Contact = () => {
	return (
		<section id="contact" className="contact section  mb-3">
			<div className="container section-title" data-aos="fade-up">
				<h2>Contact</h2>
				<p>
					Get in touch with us for any inquiries, support, or collaboration
					opportunities. We're here to help and would love to hear from you.
				</p>
			</div>

			<div className="container" data-aos="fade-up" data-aos-delay="100">
				<div className="row g-4 g-lg-5">
					<div className="col-lg-5">
						<div className="info-box" data-aos="fade-up" data-aos-delay="200">
							<h3>Contact Info</h3>
							<p>
								Feel free to reach out to us through any of our contact
								channels. Our team is ready to assist you with your needs and
								provide the support you require.
							</p>

							<div
								className="info-item"
								data-aos="fade-up"
								data-aos-delay="300"
							>
								<div className="icon-box">
									<FaGlobe />
								</div>
								<div className="content">
									<h4>Our Location</h4>
									<p>43 Ojileru Street</p>
									<p>Oworoshoki, Lagos, Nigeria</p>
								</div>
							</div>

							<div
								className="info-item"
								data-aos="fade-up"
								data-aos-delay="400"
							>
								<div className="icon-box">
									<FaPhone />
								</div>
								<div className="content">
									<h4>Phone Number</h4>
									<p>+234 812 666 0484</p>
								</div>
							</div>

							<div
								className="info-item"
								data-aos="fade-up"
								data-aos-delay="500"
							>
								<div className="icon-box">
									<FaEnvelope />
								</div>
								<div className="content">
									<h4>Email Address</h4>
									<p>applybridgeco@gmail.com</p>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-7">
						<div
							className="contact-form"
							data-aos="fade-up"
							data-aos-delay="300"
						>
							<h3>Get In Touch</h3>
							<p>
								Have a question or want to work with us? Fill out the form below
								and we'll get back to you as soon as possible. Your message is
								important to us.
							</p>

							<ContactForm />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
