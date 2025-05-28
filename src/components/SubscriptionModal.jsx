import { useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import axios from "axios";

const SubscriptionModal = ({
	isOpen,
	onClose,
	selectedPlan,
	selectedPrice,
}) => {
	const form = useRef();
	const [isLoading, setIsLoading] = useState(false);
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

	const sendEmailNotification = async (reference) => {
		try {
			const templateParams = {
				to_email: [formData.email, import.meta.env.VITE_ADMIN_EMAIL],
				from_name: formData.name,
				from_email: formData.email,
				phone: formData.phone,
				plan: selectedPlan,
				amount: selectedPrice,
				comment: formData.comment,
				reference: reference,
			};

			await emailjs.send(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
				templateParams,
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY
			);

			console.log("Email sent successfully!");
		} catch (error) {
			console.error("Failed to send email:", error);
		}
	};

	const initializePayment = async () => {
		try {
			setIsLoading(true);

			// Initialize transaction
			const response = await axios.post(
				"https://api.paystack.co/transaction/initialize",
				{
					email: formData.email,
					amount: selectedPrice * 100, // Convert to kobo
					callback_url: window.location.origin + "/payment-callback",
					metadata: {
						custom_fields: [
							{
								display_name: "Name",
								variable_name: "name",
								value: formData.name,
							},
							{
								display_name: "Phone",
								variable_name: "phone",
								value: formData.phone,
							},
							{
								display_name: "Plan",
								variable_name: "plan",
								value: selectedPlan,
							},
							{
								display_name: "Price",
								variable_name: "price",
								value: selectedPrice,
							},
							{
								display_name: "Comment",
								variable_name: "comment",
								value: formData.comment,
							},
						],
					},
				},
				{
					headers: {
						Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
						"Content-Type": "application/json",
					},
				}
			);

			// Redirect to Paystack payment page
			window.location.href = response.data.data.authorization_url;
		} catch (error) {
			console.error("Payment initialization failed:", error);
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await initializePayment();
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
				<form ref={form} onSubmit={handleSubmit}>
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
							disabled={isLoading}
							style={{
								width: "100%",
								padding: "12px",
								backgroundColor: isLoading ? "#cccccc" : "#007bff",
								color: "white",
								border: "none",
								borderRadius: "4px",
								cursor: isLoading ? "not-allowed" : "pointer",
								fontSize: "16px",
							}}
						>
							{isLoading
								? "Processing..."
								: `Pay ₦${selectedPrice.toLocaleString()}`}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SubscriptionModal;
