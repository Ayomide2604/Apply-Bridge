import { useState, useEffect, useRef } from "react";
import PriceCard from "../components/PriceCard";

const prices = [
	{
		id: 1,
		title: "Basic",
		description:
			"Perfect for job seekers beginning their international application journey. Includes essential support and a generous number of applications.",
		price: 100000,
		features: [
			"200 Applications",
			"Professional CV review",
			"Personalized job application assistance",
			"Priority Email and chat support",
		],
		link: "https://paystack.shop/pay/go0pwoj6ci",
	},
	{
		id: 2,
		title: "Pro",
		description:
			"Ideal for active job seekers who want more applications and advanced support to maximize their chances.",
		price: 150000,
		features: [
			"300 Applications",
			"Professional CV & cover letter review",
			"Personalized job application assistance",
			"Priority email & chat support",
		],
		popular: true,
		link: "https://paystack.shop/pay/ebgkwbv0e4",
	},
	{
		id: 3,
		title: "Premium",
		description:
			"For serious professionals seeking the highest level of support, maximum applications, and premium services.",
		price: 200000,
		features: [
			"400 Applications",
			"Premium CV, cover letter & LinkedIn review",
			"Dedicated job application manager",
			"24/7 priority support",
		],
		link: "https://paystack.shop/pay/-2bwy3wk9f",
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
									link={price.link}
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
