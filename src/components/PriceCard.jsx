import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { formatNumber } from "../utils/priceFormatter";
import SubscriptionModal from "./SubscriptionModal";

const PriceCard = ({ id, title, description, price, features, popular }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSubscribe = (e) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

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

			<button onClick={handleSubscribe} className="btn btn-light">
				Subscribe Now
				<i className="bi bi-arrow-right"></i>
			</button>

			<SubscriptionModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				selectedPlan={title}
			/>
		</div>
	);
};

export default PriceCard;
