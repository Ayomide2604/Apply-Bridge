import { useState, useEffect, useRef } from "react";
import PriceCard from "../components/PriceCard";

const prices = [
	{
		id: 1,
		title: "Basic",
		description:
			"Get started with our basic job application service. Perfect for those looking to apply to a few jobs each month.",
		price: 100000,
		features: [
			"50 Applications per month",
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
		price: 125000,
		features: [
			"100 Applications per month",
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
		price: 150000,
		features: [
			"150 Applications per month",
			"Premium CV review",
			"Priority job application assistance",
			"24/7 Priority support",
		],
	},
];

const Pricing = () => {
	const [activePricing, setActivePricing] = useState("Standard");
	const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
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

	return (
		<section id="pricing" className="pricing section">
			<div className="container section-title" data-aos="fade-up">
				<h2>Pricing</h2>
				<p>
					Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
					consectetur velit
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
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Pricing;
