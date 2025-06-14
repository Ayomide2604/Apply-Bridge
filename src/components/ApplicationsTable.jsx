// ApplicationsTable.jsx
import React from "react";

const ApplicationsTable = ({
	jobs,
	pagedJobs,
	page,
	pageSize,
	totalPages,
	sortBy,
	sortDir,
	handleSort,
	setPage,
	loading, // <-- add loading prop
}) => (
	<div className="table-card" style={{ flex: 3, minWidth: 350 }}>
		<h2
			style={{
				fontWeight: 600,
				fontSize: 22,
				marginBottom: 18,
				color: "#1976d2",
			}}
		>
			Applications ({jobs.length})
		</h2>
		{loading ? (
			<div
				style={{
					textAlign: "center",
					margin: "48px 0",
					fontSize: 22,
					color: "#1976d2",
				}}
			>
				<div className="spinner" style={{ margin: "0 auto 16px auto" }} />
				Loading applications...
			</div>
		) : jobs.length === 0 ? (
			<div
				style={{
					textAlign: "center",
					marginTop: 32,
					color: "#64748b",
					fontSize: 18,
				}}
			>
				You have no job applications yet.
			</div>
		) : (
			<div className="table-scroll" style={{ overflowX: "auto", marginTop: 8 }}>
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
								}}
							>
								#
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
								onClick={() => handleSort("Company")}
							>
								Company{" "}
								{sortBy === "Company" && (sortDir === "asc" ? "▲" : "▼")}
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
								{sortBy === "Job Title" && (sortDir === "asc" ? "▲" : "▼")}
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
								{sortBy === "Location" && (sortDir === "asc" ? "▲" : "▼")}
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
								{sortBy === "Date Applied" && (sortDir === "asc" ? "▲" : "▼")}
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
								<td style={{ padding: 14, color: "#888", fontWeight: 500 }}>
									{(page - 1) * pageSize + i + 1}
								</td>
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
									{(() => {
										const raw = job["Date Applied"];
										if (!raw) return "-";
										// Try to parse as dd-mm-yy or dd/mm/yy (Excel import)
										let m = raw.match(/(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})$/);
										let day, month, year;
										if (m) {
											day = parseInt(m[1], 10);
											month = parseInt(m[2], 10) - 1;
											year = parseInt(m[3], 10);
											if (year < 100) year += 2000; // treat 2-digit years as 20yy
										} else {
											// Try to parse as ISO or other formats
											let d = new Date(raw);
											if (isNaN(d.getTime())) return raw;
											day = d.getDate();
											month = d.getMonth();
											year = d.getFullYear();
										}
										// Day suffix
										const getDaySuffix = (n) => {
											if (n >= 11 && n <= 13) return "th";
											switch (n % 10) {
												case 1:
													return "st";
												case 2:
													return "nd";
												case 3:
													return "rd";
												default:
													return "th";
											}
										};
										const monthNames = [
											"January",
											"February",
											"March",
											"April",
											"May",
											"June",
											"July",
											"August",
											"September",
											"October",
											"November",
											"December",
										];
										return `${day}${getDaySuffix(day)} ${
											monthNames[month]
										} ${year}`;
									})()}
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
					<span style={{ fontWeight: 600, fontSize: 16 }}>
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
);

export default ApplicationsTable;
