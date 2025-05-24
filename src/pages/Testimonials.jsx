import Testimonial from "../components/Testimonial";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
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

			<div className="container" data-aos="fade-up" data-aos-delay="100">
				<Swiper
					modules={[Pagination, Autoplay, Navigation]}
					spaceBetween={30}
					slidesPerView={1}
					pagination={{ clickable: true }}
					navigation={true}
					loop
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					breakpoints={{
						640: {
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 2,
						},
						1024: {
							slidesPerView: 3,
						},
					}}
					className="testimonials-slider"
				>
					{testimonialData.map((testimonial) => (
						<SwiperSlide key={testimonial.id}>
							<Testimonial
								image={testimonial.image}
								name={testimonial.name}
								testimonial={testimonial.testimonial}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default Testimonials;
