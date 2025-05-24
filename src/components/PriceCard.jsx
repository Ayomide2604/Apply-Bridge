import { FaCheckCircle } from "react-icons/fa";
import { formatNumber } from "../utils/priceFormatter";

const PriceCard = ({ id, title, description, price, features, popular }) => {
	return (
		<div>
			{popular && <div className="popular-badge">Most Popular</div>}
			<h3>{title} Plan</h3>
			<div className="price">
				<span className="amount">₦{formatNumber(price)}</span>
				<span className="period">/ month</span>
			</div>
			<p className="description">{description}</p>

			<h4>Featured Included:</h4>
			<ul className="features-list">
				{features?.map((feature) => (
					<li key={feature}>
						<FaCheckCircle className="mr-2" />
						{feature}
					</li>
				))}
			</ul>

			<a href="#" className="btn btn-light">
				Subscribe Now
				<i className="bi bi-arrow-right"></i>
			</a>
		</div>
	);
};

export default PriceCard;
