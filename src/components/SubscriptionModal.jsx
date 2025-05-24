import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { usePaystackPayment } from "react-paystack";

const SubscriptionModal = ({ isOpen, onClose, selectedPlan }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		comment: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Get plan price based on selected plan
	const getPlanPrice = (plan) => {
		switch (plan) {
			case "Basic":
				return 100000; // ₦100,000
			case "Standard":
				return 125000; // ₦125,000
			case "Premium":
				return 150000; // ₦150,000
			default:
				return 0;
		}
	};

	const config = {
		reference: new Date().getTime().toString(),
		email: formData.email,
		amount: getPlanPrice(selectedPlan) * 100, // Convert to kobo
		publicKey: import.meta.env.VITE_PAYSTACK_TEST_KEY,
		metadata: {
			name: formData.name,
			phone: formData.phone,
			plan: selectedPlan,
			comment: formData.comment,
		},
	};

	const initializePayment = usePaystackPayment(config);

	const onSuccess = (reference) => {
		// Implementation for whatever you want to do with reference and after success call.
		console.log("Payment successful!", reference);
		onClose();
	};

	const onPaymentClose = () => {
		// Implementation for whatever you want to do when the Paystack dialog closed.
		console.log("Payment cancelled");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Clear form data
		setFormData({
			name: "",
			email: "",
			phone: "",
			comment: "",
		});
		// Close modal
		onClose();
		// Initialize payment
		initializePayment(onSuccess, onPaymentClose);
	};

	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="container">
				<div
					className="modal-content"
					style={{ backgroundColor: "#ffffff", color: "#000000" }}
				>
					<div className="modal-header">
						<h3 style={{ color: "#000000" }}>{selectedPlan} Plan</h3>
						<button
							className="close-button"
							onClick={onClose}
							style={{ color: "#000000" }}
						>
							<FaTimes />
						</button>
					</div>
					<form onSubmit={handleSubmit} className="subscription-form">
						<div className="form-group">
							<label
								htmlFor="plan"
								className="form-label"
								style={{ color: "#000000" }}
							>
								Selected Plan:
							</label>
							<input
								type="text"
								id="plan"
								value={`${selectedPlan} Plan - ₦${getPlanPrice(
									selectedPlan
								).toLocaleString()}`}
								disabled
								className="form-control"
								style={{ backgroundColor: "#f5f5f5", color: "#6c757d" }}
							/>
						</div>
						<div className="form-group">
							<label
								htmlFor="name"
								className="form-label"
								style={{ color: "#000000" }}
							>
								Full Name:
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="form-control"
								required
								style={{ backgroundColor: "#ffffff", color: "#000000" }}
							/>
						</div>
						<div className="form-group">
							<label
								htmlFor="email"
								className="form-label"
								style={{ color: "#000000" }}
							>
								Email Address:
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="form-control"
								required
								style={{ backgroundColor: "#ffffff", color: "#000000" }}
							/>
						</div>
						<div className="form-group">
							<label
								htmlFor="phone"
								className="form-label"
								style={{ color: "#000000" }}
							>
								Phone Number:
							</label>
							<input
								type="tel"
								id="phone"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								className="form-control"
								required
								style={{ backgroundColor: "#ffffff", color: "#000000" }}
							/>
						</div>
						<div className="form-group">
							<label
								htmlFor="comment"
								className="form-label"
								style={{ color: "#000000" }}
							>
								Additional Comments:
							</label>
							<textarea
								id="comment"
								name="comment"
								value={formData.comment}
								onChange={handleChange}
								className="form-control"
								rows="4"
								style={{ backgroundColor: "#ffffff", color: "#000000" }}
							/>
						</div>
						<div className="form-actions">
							<button type="submit" className="btn btn-primary">
								Pay ₦{getPlanPrice(selectedPlan).toLocaleString()}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SubscriptionModal;
