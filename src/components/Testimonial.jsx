import { BiSolidQuoteRight, BiSolidQuoteLeft } from "react-icons/bi";
const Testimonial = ({ image, name, testimonial }) => {
	return (
		<div className="testimonial-item">
			<img src={image} className="testimonial-img" alt="" />
			<h3>{name}</h3>
			<div className="stars">
				<i className="bi bi-star-fill"></i>
				<i className="bi bi-star-fill"></i>
				<i className="bi bi-star-fill"></i>
				<i className="bi bi-star-fill"></i>
				<i className="bi bi-star-fill"></i>
			</div>
			<p>
				<BiSolidQuoteLeft className="quote-icon-left" />
				<span>{testimonial}</span>
				<BiSolidQuoteRight className="quote-icon-right" />
			</p>
		</div>
	);
};

export default Testimonial;
