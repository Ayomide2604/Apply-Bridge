// ProfileCard.jsx
import React from "react";

const ProfileCard = ({ client, handleLogout }) => (
	<div
		className="profile-card"
		style={{
			minWidth: 260,
			maxWidth: 320,
			background: "#fff",
			borderRadius: 14,
			boxShadow: "0 2px 12px #0001",
			padding: 28,
			marginBottom: 24,
			flex: 1,
		}}
	>
		<div style={{ textAlign: "center", marginBottom: 18 }}>
			<div
				style={{
					width: 70,
					height: 70,
					borderRadius: "50%",
					background: "#e3e8ef",
					margin: "0 auto 12px auto",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: 32,
					color: "#1976d2",
					fontWeight: 700,
				}}
			>
				{client.firstName[0]}
				{client.lastName[0]}
			</div>
			<div style={{ fontWeight: 700, fontSize: 20 }}>
				{client.firstName} {client.lastName}
			</div>
			<div style={{ color: "#64748b", fontSize: 15, marginTop: 2 }}>
				{client.email}
			</div>
			<div style={{ color: "#64748b", fontSize: 15 }}>{client.phone}</div>
		</div>
		<div style={{ borderTop: "1px solid #e5e7eb", margin: "16px 0" }} />
		<div style={{ fontSize: 15, color: "#475569" }}>
			{/* <b>Joined:</b> {client.joined} */}
		</div>
		<button
			onClick={handleLogout}
			style={{
				marginTop: 18,
				width: "100%",
				padding: 10,
				background: "#b91c1c",
				color: "#fff",
				border: "none",
				borderRadius: 8,
				fontWeight: 600,
				fontSize: 16,
				cursor: "pointer",
			}}
		>
			Logout
		</button>
	</div>
);

export default ProfileCard;
