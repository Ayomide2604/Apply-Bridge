import { useState, useEffect } from "react";
import Papa from "papaparse";
import "../assets/css/applications-dashboard-responsive.css";
import ProfileCard from "../components/ProfileCard";
import ApplicationsTable from "../components/ApplicationsTable";

const PAGE_SIZE_OPTIONS = [10, 20, 30];
const SESSION_KEY = "client_applications_session";
const SESSION_EXPIRY_MINUTES = 30;
const SHEET_NAME = "application";

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
			} catch (e) {}
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
			// Always use root-relative path for both dev and prod
			const res = await fetch("/client_sheets.json");
			if (!res.ok) {
				throw new Error(
					`Failed to fetch client_sheets.json: ${res.status} ${res.statusText}`
				);
			}
			const clients = await res.json();
			const found = clients.find((c) => c.code === sessionCode.trim());
			if (!found) {
				if (!silent) setError("Invalid code. Please try again.");
				setLoading(false);
				return;
			}
			setClient({ ...found });

			// FIX: If no sheetUrl, set jobs to [] and return early
			if (!found.sheetUrl) {
				setJobs([]);
				setLoading(false);
				return;
			}
			// Persist session with expiry
			const expiry = Date.now() + SESSION_EXPIRY_MINUTES * 60 * 1000;
			localStorage.setItem(
				SESSION_KEY,
				JSON.stringify({ code: found.code, expiry })
			);
			// Build CSV URL from sheetId or use local CSV
			let sheetUrl = found.sheetUrl;
			// If it's a Google Sheet ID (not a URL or CSV path), build the export URL
			if (/^[a-zA-Z0-9-_]+$/.test(sheetUrl)) {
				sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetUrl}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
			}
			// Fetch and parse CSV
			console.log("Fetching job data from:", sheetUrl); // DEBUG: log the actual URL being fetched
			const csvRes = await fetch(sheetUrl);
			if (!csvRes.ok) {
				throw new Error(
					`Failed to fetch job data: ${csvRes.status} ${csvRes.statusText}`
				);
			}
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
			console.error("Error loading client_sheets.json or job data:", err);
			if (!silent)
				setError(
					"Failed to fetch data. Please check your access code, Google Sheet sharing settings, and tab name."
				);
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

	if (loading) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "80vh",
				}}
			>
				<div className="spinner" style={{ width: 60, height: 60 }} />
			</div>
		);
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
					<ProfileCard client={client} handleLogout={handleLogout} />
					<ApplicationsTable
						jobs={filteredJobs}
						pagedJobs={pagedJobs}
						page={page}
						pageSize={pageSize}
						totalPages={totalPages}
						sortBy={sortBy}
						sortDir={sortDir}
						handleSort={handleSort}
						formatHumanDate={formatHumanDate}
						setPage={setPage}
						loading={loading} // <-- pass loading state
					/>
				</div>
			)}
		</div>
	);
};

export default Applications;
