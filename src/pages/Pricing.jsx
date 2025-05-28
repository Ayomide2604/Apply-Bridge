import { useState, useEffect, useRef } from "react";
import PriceCard from "../components/PriceCard";
import SubscriptionModal from "../components/SubscriptionModal";

const prices = [
	{
		id: 1,
		title: "Basic",
		description:
			"Get started with our basic job application service. Perfect for those looking to apply to a few jobs each month.",
		price: 60000 ,
		features: [
			"30 Applications",
			"Basic CV review",
			"Job application assistance",
			"Email support",
		],
	},
	{
		id: 2,
		title: "Standard",
		description:
			"Our most popular plan for active job seekers. Get more applications and better support.",
		price: 100000,
		features: [
			"60 Applications",
			"Enhanced CV review",
			"Priority job application assistance",
			"Priority email support",
		],
		popular: true,
	},
	{
		id: 3,
		title: "Premium",
		description:
			"Maximum applications with premium support. Best for serious job seekers.",
		price: 135000,
		features: [
			"80 Applications",
			"Premium CV review",
			"Priority job application assistance",
			"24/7 Priority support",
		],
	},
];

const Pricing = () => {
	const [activePricing, setActivePricing] = useState("Standard");
	const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState("");
	const [selectedPrice, setSelectedPrice] = useState(0);
	const pricingRefs = useRef([]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 992);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (!isMobile) {
			setActivePricing("Standard");
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const pricingTitle =
							entry.target.getAttribute("data-pricing-title");
						setActivePricing(pricingTitle);
					}
				});
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.5,
			}
		);

		pricingRefs.current.forEach((ref) => {
			if (ref) {
				observer.observe(ref);
			}
		});

		return () => {
			pricingRefs.current.forEach((ref) => {
				if (ref) {
					observer.unobserve(ref);
				}
			});
		};
	}, [isMobile]);

	const handleActivePricing = (pricing) => {
		setActivePricing(pricing);
	};

	const handleSubscribe = (plan, price) => {
		setSelectedPlan(plan);
		setSelectedPrice(price);
		setIsModalOpen(true);
	};

	return (
		<section id="pricing" className="pricing section container">
			<div className="container section-title" data-aos="fade-up">
				<h2>Pricing</h2>
				<p>
					Choose the perfect plan to accelerate your job search journey with our
					professional application assistance.
				</p>
			</div>

			<div className="container" data-aos="fade-up" data-aos-delay="100">
				<div className="row g-4 justify-content-center">
					{prices.map((price, index) => (
						<div
							className="col-lg-4 mb-5"
							data-aos="fade-up"
							data-aos-delay="200"
							key={price.id}
							onClick={() => {
								handleActivePricing(price.title);
							}}
							style={{ cursor: "pointer" }}
							ref={(el) => (pricingRefs.current[index] = el)}
							data-pricing-title={price.title}
						>
							<div
								className={`pricing-card ${
									activePricing === price.title ? "popular" : ""
								}`}
							>
								<PriceCard
									title={price.title}
									description={price.description}
									price={price.price}
									features={price.features}
									popular={price.popular}
									onSubscribe={() => handleSubscribe(price.title, price.price)}
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			<SubscriptionModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				selectedPlan={selectedPlan}
				selectedPrice={selectedPrice}
			/>
		</section>
	);
};

export default Pricing;
