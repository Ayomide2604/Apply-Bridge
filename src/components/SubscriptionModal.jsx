import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { usePaystackPayment } from "react-paystack";

const SubscriptionModal = ({
	isOpen,
	onClose,
	selectedPlan,
	selectedPrice,
}) => {
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

	const config = {
		reference: new Date().getTime().toString(),
		email: formData.email,
		amount: selectedPrice * 100, // Convert to kobo
		publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
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
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 9999,
				overflow: "auto",
				padding: "20px",
			}}
		>
			<div
				style={{
					backgroundColor: "#ffffff",
					color: "#000000",
					maxWidth: "600px",
					width: "100%",
					borderRadius: "8px",
					boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
					position: "relative",
					padding: "20px",
					margin: "auto",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: "20px",
						paddingBottom: "10px",
						borderBottom: "1px solid #eee",
					}}
				>
					<h3 style={{ color: "#000000", margin: 0 }}>{selectedPlan} Plan</h3>
					<button
						onClick={onClose}
						style={{
							background: "none",
							border: "none",
							color: "#000000",
							cursor: "pointer",
							padding: "5px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<FaTimes />
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<div style={{ marginBottom: "15px" }}>
						<label
							htmlFor="plan"
							style={{
								color: "#000000",
								display: "block",
								marginBottom: "5px",
							}}
						>
							Selected Plan:
						</label>
						<input
							type="text"
							id="plan"
							value={`${selectedPlan} Plan - ₦${selectedPrice.toLocaleString()}`}
							disabled
							style={{
								width: "100%",
								padding: "8px",
								borderRadius: "4px",
								border: "1px solid #ddd",
								backgroundColor: "#f5f5f5",
								color: "#6c757d",
							}}
						/>
					</div>
					<div style={{ marginBottom: "15px" }}>
						<label
							htmlFor="name"
							style={{
								color: "#000000",
								display: "block",
								marginBottom: "5px",
							}}
						>
							Full Name:
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							style={{
								width: "100%",
								padding: "8px",
								borderRadius: "4px",
								border: "1px solid #ddd",
								backgroundColor: "#ffffff",
								color: "#000000",
							}}
						/>
					</div>
					<div style={{ marginBottom: "15px" }}>
						<label
							htmlFor="email"
							style={{
								color: "#000000",
								display: "block",
								marginBottom: "5px",
							}}
						>
							Email Address:
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							style={{
								width: "100%",
								padding: "8px",
								borderRadius: "4px",
								border: "1px solid #ddd",
								backgroundColor: "#ffffff",
								color: "#000000",
							}}
						/>
					</div>
					<div style={{ marginBottom: "15px" }}>
						<label
							htmlFor="phone"
							style={{
								color: "#000000",
								display: "block",
								marginBottom: "5px",
							}}
						>
							Phone Number:
						</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							required
							style={{
								width: "100%",
								padding: "8px",
								borderRadius: "4px",
								border: "1px solid #ddd",
								backgroundColor: "#ffffff",
								color: "#000000",
							}}
						/>
					</div>
					<div style={{ marginBottom: "15px" }}>
						<label
							htmlFor="comment"
							style={{
								color: "#000000",
								display: "block",
								marginBottom: "5px",
							}}
						>
							Additional Comments:
						</label>
						<textarea
							id="comment"
							name="comment"
							value={formData.comment}
							onChange={handleChange}
							rows="4"
							style={{
								width: "100%",
								padding: "8px",
								borderRadius: "4px",
								border: "1px solid #ddd",
								backgroundColor: "#ffffff",
								color: "#000000",
							}}
						/>
					</div>
					<div style={{ marginTop: "20px" }}>
						<button
							type="submit"
							style={{
								width: "100%",
								padding: "12px",
								backgroundColor: "#007bff",
								color: "white",
								border: "none",
								borderRadius: "4px",
								cursor: "pointer",
								fontSize: "16px",
							}}
						>
							Pay ₦{selectedPrice.toLocaleString()}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SubscriptionModal;
