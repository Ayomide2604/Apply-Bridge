import { useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";

const faqs = [
	{
		id: 1,
		question: "What is ApplyBridge?",
		answer: `
				ApplyBridge is a specialized service designed to reduce the stress of job applications. 
				We focus on helping job seekers create compelling applications by providing expert 
				assistance with CV reviews, supporting statement writing, and application guidance. 
				Our goal is to make the job application process smoother and more effective for our clients.
				`,
	},
	{
		id: 2,
		question: "What services does ApplyBridge offer?",
		answer: `
				<div class="grid-container">
					<div class="grid-item">✓ Professional CV review and enhancement</div>
					<div class="grid-item">✓ Expert supporting statement writing</div>
					<div class="grid-item">✓ Job application guidance and support</div>
				</div>
				
				We focus on helping you present your best self to potential employers through 
				well-crafted applications and documents.
				`,
	},
	{
		id: 3,
		question: "How can ApplyBridge help with my job applications?",
		answer: `
				<div class="grid-container">
					<div class="grid-item">✓ Reviewing and improving your CV to highlight your strengths</div>
					<div class="grid-item">✓ Writing compelling supporting statements that showcase your experience</div>
					<div class="grid-item">✓ Providing guidance on how to effectively present your skills and qualifications</div>
					<div class="grid-item">✓ Helping you create applications that stand out to employers</div>
				</div>
				
				Our expertise helps reduce the stress of application writing and increases your chances of success.
				`,
	},
	{
		id: 4,
		question: "What makes ApplyBridge's CV review service special?",
		answer: `
				<div class="grid-container">
					<div class="grid-item">✓ Expert analysis of your current CV</div>
					<div class="grid-item">✓ Suggestions for improvement and enhancement</div>
					<div class="grid-item">✓ Focus on highlighting your key achievements</div>
					<div class="grid-item">✓ Tailored recommendations for your specific industry</div>
					<div class="grid-item">✓ Professional formatting and presentation advice</div>
				</div>
				`,
	},
	{
		id: 5,
		question: "How does the supporting statement service work?",
		answer: `
				<div class="grid-container">
					<div class="grid-item">✓ Effectively communicate your experience and skills</div>
					<div class="grid-item">✓ Address key job requirements and criteria</div>
					<div class="grid-item">✓ Present your achievements in a clear, professional manner</div>
					<div class="grid-item">✓ Demonstrate your suitability for the role</div>
				</div>
				
				We work with you to ensure your supporting statement accurately represents your 
				capabilities and aligns with the job requirements.
				`,
	},
];

const Faq = () => {
	const [activeFaq, setActiveFaq] = useState(null);

	const handleActiveFaq = (id) => {
		activeFaq === id ? setActiveFaq(null) : setActiveFaq(id);
	};
	return (
		<section className="faq-9 faq section light-background" id="faq">
			<div className="container">
				<div className="row">
					<div className="col-lg-5" data-aos="fade-up">
						<h2 className="faq-title">Frequently Asked Questions</h2>
						<p className="faq-description">
							Find answers to common questions about our services and how we can
							help you achieve your career goals. If you have any other
							questions, feel free to contact us.
						</p>
					</div>

					<div className="col-lg-7" data-aos="fade-up" data-aos-delay="300">
						<div className="faq-container">
							{faqs.map((faq) => (
								<div
									key={faq.id}
									className={`faq-item  ${
										activeFaq === faq.id ? "faq-active" : ""
									}`}
									style={{ cursor: "pointer" }}
								>
									<div
										className="d-flex justify-content-between align-items-center"
										onClick={() => {
											handleActiveFaq(faq.id);
										}}
									>
										<h3>{faq.question}</h3>
										<span>
											{activeFaq === faq.id ? (
												<FaCaretDown />
											) : (
												<FaCaretRight />
											)}
										</span>
									</div>
									<div className="faq-content">
										<div dangerouslySetInnerHTML={{ __html: faq.answer }} />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Faq;
