import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

const PaymentCallback = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [status, setStatus] = useState("verifying");

	const sendEmailNotification = async (paymentData) => {
		try {
			// Get customer email from payment data
			const customerEmail = paymentData.customer?.email;
			const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

			if (!customerEmail || !adminEmail) {
				throw new Error("Missing email addresses");
			}

			// Extract data from Paystack metadata
			const metadata = paymentData.metadata;
			const customFields = metadata.custom_fields || [];

			// Convert custom fields array to object for easier access
			const formData = customFields.reduce((acc, field) => {
				acc[field.variable_name] = field.value;
				return acc;
			}, {});

			const templateParams = {
				to_email: customerEmail,
				admin_email: adminEmail,
				from_name: formData.name || "Customer",
				from_email: customerEmail,
				phone: formData.phone || "Not provided",
				plan: formData.plan || "Not provided",
				amount: formData.price || "Not provided",
				comment: formData.comment || "No comment",
				reference: paymentData.reference,
			};

			const response = await emailjs.send(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
				templateParams,
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY
			);

			console.log("Email notification sent successfully");
		} catch (error) {
			console.error("Failed to send email notification:", error.message);
		}
	};

	useEffect(() => {
		const verifyPayment = async () => {
			try {
				const reference = searchParams.get("reference");
				if (!reference) {
					setStatus("error");
					return;
				}

				// Verify the payment
				const response = await axios.get(
					`https://api.paystack.co/transaction/verify/${reference}`,
					{
						headers: {
							Authorization: `Bearer ${
								import.meta.env.VITE_PAYSTACK_SECRET_KEY
							}`,
						},
					}
				);

				if (response.data.data.status === "success") {
					setStatus("success");
					// Send email notification with payment data
					await sendEmailNotification(response.data.data);
					setTimeout(() => {
						navigate("/"); // Redirect to home page after 3 seconds
					}, 3000);
				} else {
					setStatus("error");
				}
			} catch (error) {
				console.error("Payment verification failed:", error);
				setStatus("error");
			}
		};

		verifyPayment();
	}, [searchParams, navigate]);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				flexDirection: "column",
				gap: "20px",
				padding: "20px",
				textAlign: "center",
			}}
		>
			{status === "verifying" && (
				<>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "20px",
						}}
					>
						<FaSpinner
							style={{
								fontSize: "48px",
								color: "#007bff",
								animation: "spin 1s linear infinite",
							}}
						/>
						<h2 style={{ fontSize: "24px", margin: 0 }}>
							Verifying your payment...
						</h2>
						<div style={{ fontSize: "16px", color: "#666" }}>
							Please wait while we confirm your payment.
						</div>
					</div>
					<style>
						{`
							@keyframes spin {
								0% { transform: rotate(0deg); }
								100% { transform: rotate(360deg); }
							}
						`}
					</style>
				</>
			)}
			{status === "success" && (
				<>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "20px",
						}}
					>
						<FaCheckCircle
							style={{
								fontSize: "64px",
								color: "#28a745",
								animation: "scaleIn 0.5s ease-out",
							}}
						/>
						<h2 style={{ fontSize: "28px", margin: 0, color: "#28a745" }}>
							Payment Successful!
						</h2>
						<div style={{ fontSize: "18px", color: "#666", maxWidth: "400px" }}>
							Thank you for your subscription. You will be redirected to the
							home page shortly.
						</div>
					</div>
					<style>
						{`
							@keyframes scaleIn {
								0% { transform: scale(0); }
								50% { transform: scale(1.2); }
								100% { transform: scale(1); }
							}
						`}
					</style>
				</>
			)}
			{status === "error" && (
				<>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "20px",
						}}
					>
						<h2 style={{ fontSize: "28px", margin: 0, color: "#dc3545" }}>
							Payment Verification Failed
						</h2>
						<div style={{ fontSize: "18px", color: "#666", maxWidth: "400px" }}>
							Please contact support if you have been charged.
						</div>
						<button
							onClick={() => navigate("/")}
							style={{
								padding: "12px 24px",
								backgroundColor: "#007bff",
								color: "white",
								border: "none",
								borderRadius: "4px",
								cursor: "pointer",
								fontSize: "16px",
								transition: "background-color 0.3s ease",
							}}
							onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
							onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
						>
							Return to Home
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default PaymentCallback;
