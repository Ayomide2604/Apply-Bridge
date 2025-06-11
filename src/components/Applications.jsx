import { useState, useEffect } from "react";
import Papa from "papaparse";

const PAGE_SIZE_OPTIONS = [10, 20, 30];
const SESSION_KEY = "client_applications_session";
const SESSION_EXPIRY_MINUTES = 30;
const SHEET_NAME = "applicationAlways";

const Applications = () => {
	const [code, setCode] = useState("");
	const [error, setError] = useState("");
	const [client, setClient] = useState(null);
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
	const [sortBy, setSortBy] = useState("Date Applied");
	const [sortDir, setSortDir] = useState("desc");
	const [dateFrom, setDateFrom] = useState("");
	const [dateTo, setDateTo] = useState("");

	// On mount, check for session
	useEffect(() => {
		const session = localStorage.getItem(SESSION_KEY);
		if (session) {
			try {
				const parsed = JSON.parse(session);
				const now = Date.now();
				if (parsed.expiry > now) {
					// Restore session
					setCode(parsed.code);
					handleSessionLogin(parsed.code, true);
				} else {
					localStorage.removeItem(SESSION_KEY);
				}
			} catch {}
		}
		// eslint-disable-next-line
	}, []);

	// Load client_sheets.json at runtime
	const handleSessionLogin = async (sessionCode, silent) => {
		setError("");
		setLoading(true);
		setJobs([]);
		setClient(null);
		setPage(1);
		try {
			const res = await fetch("/src/assets/client_sheets.json");
			const clients = await res.json();
			const found = clients.find((c) => c.code === sessionCode.trim());
			if (!found) {
				if (!silent) setError("Invalid code. Please try again.");
				setLoading(false);
				return;
			}
			setClient({ ...found });
			// Build CSV URL from sheetId
			let sheetUrl = found.sheetUrl;
			if (/^[a-zA-Z0-9-_]+$/.test(sheetUrl)) {
				sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetUrl}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
			}
			// Fetch and parse CSV
			const csvRes = await fetch(sheetUrl);
			const csvText = await csvRes.text();
			// Use PapaParse for robust CSV parsing
			const parsed = Papa.parse(csvText, {
				header: true,
				skipEmptyLines: true,
				dynamicTyping: false,
				transformHeader: (header) => header.trim(),
			});
			const data = parsed.data.map((row) => ({
				"Job Title": row["Job Title"]?.replace(/^\"|\"$/g, ""),
				Company: row["Company"]?.replace(/^\"|\"$/g, ""),
				Location: row["Location"]?.replace(/^\"|\"$/g, ""),
				"Date Applied": row["Date Applied"]?.replace(/^\"|\"$/g, ""),
			}));
			setJobs(data);
		} catch (err) {
			console.error("Error fetching jobs:", err);
			if (!silent) setError("Failed to fetch data. Please try again later.");
		}
		setLoading(false);
	};

	// Date filter
	const filteredJobs = jobs.filter((job) => {
		if (!dateFrom && !dateTo) return true;
		const jobDate = new Date(job["Date Applied"]);
		if (dateFrom && jobDate < new Date(dateFrom)) return false;
		if (dateTo && jobDate > new Date(dateTo)) return false;
		return true;
	});

	// Sorting
	const sortedJobs = [...filteredJobs].sort((a, b) => {
		let aVal = a[sortBy] || "";
		let bVal = b[sortBy] || "";
		if (sortBy === "Date Applied") {
			aVal = new Date(aVal);
			bVal = new Date(bVal);
		}
		if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
		if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
		return 0;
	});

	// Pagination
	const totalPages = Math.ceil(sortedJobs.length / pageSize);
	const pagedJobs = sortedJobs.slice((page - 1) * pageSize, page * pageSize);

	const handleSort = (col) => {
		if (sortBy === col) {
			setSortDir(sortDir === "asc" ? "desc" : "asc");
		} else {
			setSortBy(col);
			setSortDir("asc");
		}
		setPage(1);
	};

	// Replace handleSubmit to use session login
	const handleSubmit = async (e) => {
		e.preventDefault();
		await handleSessionLogin(code, false);
	};

	// Add logout
	const handleLogout = () => {
		setClient(null);
		setJobs([]);
		setCode("");
		setError("");
		localStorage.removeItem(SESSION_KEY);
	};

	// Helper to format date as '2nd September 2025'
	function formatHumanDate(dateStr) {
		if (!dateStr) return "";
		const date = new Date(dateStr);
		if (isNaN(date)) return dateStr;
		const day = date.getDate();
		const month = date.toLocaleString("default", { month: "long" });
		const year = date.getFullYear();
		// Ordinal suffix
		const j = day % 10,
			k = day % 100;
		let suffix = "th";
		if (j === 1 && k !== 11) suffix = "st";
		else if (j === 2 && k !== 12) suffix = "nd";
		else if (j === 3 && k !== 13) suffix = "rd";
		return `${day}${suffix} ${month} ${year}`;
	}

	return (
		<div
			style={{
				maxWidth: 1100,
				margin: "80px auto 0 auto",
				padding: 32,
				background: "#f8fafc",
				borderRadius: 16,
				boxShadow: "0 4px 32px #0002",
				minHeight: 600,
				width: "95%",
			}}
		>
			{/* Responsive styles */}
			<style>{`
				@media (max-width: 900px) {
					.dashboard-flex { flex-direction: column !important; gap: 0 !important; }
					.profile-card { max-width: 100% !important; min-width: 0 !important; margin-bottom: 18px !important; }
					.table-card { min-width: 0 !important; }
					.table-scroll { overflow-x: auto !important; }
				}
				@media (max-width: 600px) {
					form, .profile-card, .table-card { padding: 12px !important; }
					.dashboard-flex { padding: 0 !important; }
					th, td { padding: 8px !important; font-size: 14px !important; }
					h1 { font-size: 22px !important; }
					h2 { font-size: 16px !important; }
				}
			`}</style>
			<h1
				style={{
					textAlign: "center",
					marginBottom: 32,
					fontWeight: 700,
					fontSize: 32,
					letterSpacing: 1,
				}}
			>
				Job Applications Dashboard
			</h1>
			{!client && (
				<form
					onSubmit={handleSubmit}
					style={{
						maxWidth: 400,
						margin: "0 auto",
						background: "#fff",
						padding: 32,
						borderRadius: 12,
						boxShadow: "0 2px 12px #0001",
					}}
				>
					<label
						style={{
							fontWeight: "bold",
							fontSize: 18,
							display: "block",
							marginBottom: 8,
						}}
					>
						Enter your access code
					</label>
					<input
						type="password"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						style={{
							width: "100%",
							padding: 12,
							margin: "16px 0",
							borderRadius: 8,
							border: "1px solid #cbd5e1",
							fontSize: 17,
							background: "#f1f5f9",
						}}
						placeholder="Access code"
						required
					/>
					<button
						type="submit"
						style={{
							width: "100%",
							padding: 14,
							background: "#1976d2",
							color: "#fff",
							border: "none",
							borderRadius: 8,
							fontSize: 18,
							fontWeight: 600,
							letterSpacing: 1,
							boxShadow: "0 1px 4px #0001",
						}}
						disabled={loading}
					>
						{loading ? "Loading..." : "View My Applications"}
					</button>
					{error && (
						<div
							style={{
								color: "#b91c1c",
								marginTop: 16,
								fontWeight: 500,
							}}
						>
							{error}
						</div>
					)}
				</form>
			)}
			{client && (
				<div
					className="dashboard-flex"
					style={{
						display: "flex",
						gap: 32,
						marginTop: 32,
						alignItems: "flex-start",
						flexWrap: "wrap",
					}}
				>
					{/* Profile Card */}
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
						<div
							style={{
								textAlign: "center",
								marginBottom: 18,
							}}
						>
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
							<div
								style={{
									fontWeight: 700,
									fontSize: 20,
								}}
							>
								{client.firstName} {client.lastName}
							</div>
							<div
								style={{
									color: "#64748b",
									fontSize: 15,
									marginTop: 2,
								}}
							>
								{client.email}
							</div>
							<div
								style={{
									color: "#64748b",
									fontSize: 15,
								}}
							>
								{client.phone}
							</div>
						</div>
						<div
							style={{
								borderTop: "1px solid #e5e7eb",
								margin: "16px 0",
							}}
						/>
						<div
							style={{
								fontSize: 15,
								color: "#475569",
							}}
						>
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
					{/* Table Card */}
					<div className="table-card" style={{ flex: 3, minWidth: 350 }}>
						<h2
							style={{
								fontWeight: 600,
								fontSize: 22,
								marginBottom: 18,
								color: "#1976d2",
							}}
						>
							Applications ({filteredJobs.length})
						</h2>
						{/* Filters */}
						<div
							style={{
								display: "flex",
								gap: 16,
								alignItems: "center",
								marginBottom: 18,
								flexWrap: "wrap",
							}}
						>
							<div>
								<label style={{ fontWeight: 500, marginRight: 6 }}>Show</label>
								<select
									value={pageSize}
									onChange={(e) => {
										setPageSize(Number(e.target.value));
										setPage(1);
									}}
									style={{
										padding: 6,
										borderRadius: 6,
										border: "1px solid #cbd5e1",
										fontSize: 15,
									}}
								>
									{PAGE_SIZE_OPTIONS.map((opt) => (
										<option key={opt} value={opt}>
											{opt}
										</option>
									))}
								</select>
								<span style={{ marginLeft: 6 }}>per page</span>
							</div>
							<div>
								<label style={{ fontWeight: 500, marginRight: 6 }}>From</label>
								<input
									type="date"
									value={dateFrom}
									onChange={(e) => {
										setDateFrom(e.target.value);
										setPage(1);
									}}
									style={{
										padding: 6,
										borderRadius: 6,
										border: "1px solid #cbd5e1",
										fontSize: 15,
									}}
								/>
							</div>
							<div>
								<label style={{ fontWeight: 500, marginRight: 6 }}>To</label>
								<input
									type="date"
									value={dateTo}
									onChange={(e) => {
										setDateTo(e.target.value);
										setPage(1);
									}}
									style={{
										padding: 6,
										borderRadius: 6,
										border: "1px solid #cbd5e1",
										fontSize: 15,
									}}
								/>
							</div>
						</div>
						{jobs.length === 0 ? (
							<div
								style={{
									textAlign: "center",
									marginTop: 32,
									color: "#64748b",
									fontSize: 18,
								}}
							>
								No job applications found.
							</div>
						) : (
							<div
								className="table-scroll"
								style={{ overflowX: "auto", marginTop: 8 }}
							>
								<table
									style={{
										width: "100%",
										borderCollapse: "separate",
										borderSpacing: 0,
										background: "#fff",
										borderRadius: 12,
										boxShadow: "0 2px 12px #0001",
										fontSize: 16,
									}}
								>
									<thead style={{ background: "#e3e8ef" }}>
										<tr>
											<th
												style={{
													padding: 16,
													borderBottom: "2px solid #e0e7ef",
													fontWeight: 700,
													color: "#1976d2",
													textAlign: "left",
													borderTopLeftRadius: 12,
													cursor: "pointer",
												}}
												onClick={() => handleSort("Company")}
											>
												Company Name{" "}
												{sortBy === "Company" &&
													(sortDir === "asc" ? "▲" : "▼")}
											</th>
											<th
												style={{
													padding: 16,
													borderBottom: "2px solid #e0e7ef",
													fontWeight: 700,
													color: "#1976d2",
													textAlign: "left",
													cursor: "pointer",
												}}
												onClick={() => handleSort("Job Title")}
											>
												Job Title{" "}
												{sortBy === "Job Title" &&
													(sortDir === "asc" ? "▲" : "▼")}
											</th>
											<th
												style={{
													padding: 16,
													borderBottom: "2px solid #e0e7ef",
													fontWeight: 700,
													color: "#1976d2",
													textAlign: "left",
													cursor: "pointer",
												}}
												onClick={() => handleSort("Location")}
											>
												Location{" "}
												{sortBy === "Location" &&
													(sortDir === "asc" ? "▲" : "▼")}
											</th>
											<th
												style={{
													padding: 16,
													borderBottom: "2px solid #e0e7ef",
													fontWeight: 700,
													color: "#1976d2",
													textAlign: "left",
													borderTopRightRadius: 12,
													cursor: "pointer",
												}}
												onClick={() => handleSort("Date Applied")}
											>
												Date Applied{" "}
												{sortBy === "Date Applied" &&
													(sortDir === "asc" ? "▲" : "▼")}
											</th>
										</tr>
									</thead>
									<tbody>
										{pagedJobs.map((job, i) => (
											<tr
												key={i}
												style={{
													borderBottom: "1px solid #f1f5f9",
													background: i % 2 === 0 ? "#f8fafc" : "#fff",
												}}
											>
												<td
													style={{
														padding: 14,
														fontWeight: 600,
														color: "#22223b",
													}}
												>
													{job["Company"]}
												</td>
												<td style={{ padding: 14 }}>{job["Job Title"]}</td>
												<td style={{ padding: 14 }}>{job["Location"]}</td>
												<td style={{ padding: 14 }}>
													{formatHumanDate(job["Date Applied"])}
												</td>
											</tr>
										))}
									</tbody>
								</table>
								{/* Pagination */}
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										gap: 8,
										marginTop: 24,
									}}
								>
									<button
										onClick={() => setPage((p) => Math.max(1, p - 1))}
										disabled={page === 1}
										style={{
											padding: "8px 16px",
											borderRadius: 6,
											border: "none",
											background: page === 1 ? "#e5e7eb" : "#1976d2",
											color: page === 1 ? "#64748b" : "#fff",
											fontWeight: 600,
											cursor: page === 1 ? "not-allowed" : "pointer",
										}}
									>
										Prev
									</button>
									<span
										style={{
											fontWeight: 600,
											fontSize: 16,
										}}
									>
										Page {page} of {totalPages}
									</span>
									<button
										onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
										disabled={page === totalPages}
										style={{
											padding: "8px 16px",
											borderRadius: 6,
											border: "none",
											background: page === totalPages ? "#e5e7eb" : "#1976d2",
											color: page === totalPages ? "#64748b" : "#fff",
											fontWeight: 600,
											cursor: page === totalPages ? "not-allowed" : "pointer",
										}}
									>
										Next
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Applications;
