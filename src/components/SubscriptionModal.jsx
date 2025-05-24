import { useState } from "react";
import { FaTimes } from "react-icons/fa";

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

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission here
		console.log("Form submitted:", { ...formData, plan: selectedPlan });
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
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
							value={`${selectedPlan} Plan`}
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
							Subscribe Now
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SubscriptionModal;
