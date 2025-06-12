export default function ApplicationPage() {
	return (
		<div
			style={{
				maxWidth: 700,
				margin: "80px auto",
				padding: 32,
				background: "#f8fafc",
				borderRadius: 16,
			}}
		>
			<h2 style={{ textAlign: "center", color: "#1976d2", marginBottom: 24 }}>
				Job Application Form
			</h2>
			<iframe
				src="https://docs.google.com/forms/d/e/1FAIpQLSfO7oxb7JhmGVuiJt0fFdBsgkEwZg2fo3x6a2jdl_owRTI95g/viewform?embedded=true"
				width="100%"
				height="1200"
				title="Job Application"
				style={{
					background: "#fff",
					borderRadius: 8,
					boxShadow: "0 2px 12px #0001",
				}}
			></iframe>
		</div>
	);
}
