import { FaCheckCircle } from "react-icons/fa";
import { formatNumber } from "../utils/priceFormatter";

const PriceCard = ({
	id,
	title,
	description,
	price,
	features,
	link,
	popular,
}) => {
	console.log(link);
	return (
		<div>
			{popular && <div className="popular-badge">Most Popular</div>}
			<h3>{title} Plan</h3>
			<div className="price">
				<span className="amount">₦{formatNumber(price)}</span>
				{/* <span className="period">/ month</span> */}
			</div>
			<p className="description">{description}</p>

			<h4>Featured Included:</h4>
			<ul className="features-list">
				{features?.map((feature) => (
					<li key={feature}>
						<FaCheckCircle className="mx-2" />
						{feature}
					</li>
				))}
			</ul>

			<a
				href={link}
				className="btn btn-light"
				style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
			>
				Subscribe Now
				<i className="bi bi-arrow-right"></i>
			</a>
		</div>
	);
};

export default PriceCard;
