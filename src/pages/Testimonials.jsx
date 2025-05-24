import Testimonial from "../components/Testimonial";
// import image from "../assets/img/default.jpg";

const testimonialData = [
	{
		id: 1,
		// image: image,
		name: "Saul Goodman",
		testimonial:
			"Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
	},
	{
		id: 2,
		// image: image,
		name: "Sara Wilsson",
		testimonial:
			"Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
	},
	{
		id: 3,
		// image: image,
		name: "Jena Karlis",
		testimonial:
			"Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
	},
	{
		id: 4,
		// image: image,
		name: "Matt Brandon",
		testimonial:
			"Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
	},
];
const Testimonials = () => {
	return (
		<section
			id="testimonials"
			className="testimonials section light-background"
		>
			<div className="container section-title" data-aos="fade-up">
				<h2>Testimonials</h2>
				<p>
					Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
					consectetur velit
				</p>
			</div>

			<div className="container">
				<div className="row g-5">
					{testimonialData.map((testimonial) => (
						<div
							className="col-lg-6 mb-3"
							data-aos="fade-up"
							data-aos-delay="100"
							key={testimonial.id}
						>
							<Testimonial
								image={testimonial.image}
								name={testimonial.name}
								testimonial={testimonial.testimonial}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
