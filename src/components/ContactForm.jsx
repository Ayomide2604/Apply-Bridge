const ContactForm = () => {
	return (
		<form
			action="forms/contact.php"
			method="post"
			className="php-email-form"
			data-aos="fade-up"
			data-aos-delay="200"
		>
			<div className="row gy-4">
				<div className="col-md-6">
					<input
						type="text"
						name="name"
						className="form-control mb-3"
						placeholder="Your Name"
						required=""
					/>
				</div>

				<div className="col-md-6 ">
					<input
						type="email"
						className="form-control mb-3"
						name="email"
						placeholder="Your Email"
						required=""
					/>
				</div>

				<div className="col-12">
					<input
						type="text"
						className="form-control mb-3"
						name="subject"
						placeholder="Subject"
						required=""
					/>
				</div>

				<div className="col-12">
					<textarea
						className="form-control mb-3"
						name="message"
						rows="6"
						placeholder="Message"
						required=""
					></textarea>
				</div>

				<div className="col-12 text-center">
					<div className="loading">Loading</div>
					<div className="error-message"></div>
					<div className="sent-message">
						Your message has been sent. Thank you!
					</div>

					<button type="submit" className="btn">
						Send Message
					</button>
				</div>
			</div>
		</form>
	);
};

export default ContactForm;
