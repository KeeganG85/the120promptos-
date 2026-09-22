import { o as product } from "./product-BY13tKKv.mjs";
import { appendFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/deliver-lead.server-COd1llQo.js
var ConnectorType = {
	GoogleDrive: "GoogleDrive",
	Gmail: "Gmail",
	GoogleCalendar: "GoogleCalendar",
	Outlook: "Outlook",
	OutlookCalendar: "OutlookCalendar",
	MicrosoftTeams: "MicrosoftTeams",
	Mcp: "Mcp"
};
var SHEET_ID = "1exdIXM_XmueP0-d7e2vjOB6hJ_x2__IFHPkiTqB6ceQ";
var SHEET_NAME = "The 120 Prompt OS — Leads";
var LOG_PATH = join(process.cwd(), "data", "prompt-os-leads.csv");
var CONSENT = "Yes — instant access to The 120 Prompt OS. BuzzCraft may email the product to this address. Privacy and POPIA acknowledged.";
function submittedAt() {
	return new Intl.DateTimeFormat("en-ZA", {
		timeZone: "Africa/Johannesburg",
		dateStyle: "medium",
		timeStyle: "short"
	}).format(/* @__PURE__ */ new Date());
}
function csvCell(value) {
	if (/[",\n]/.test(value)) return `"${value.replace(/"/g, "\"\"")}"`;
	return value;
}
function leadBody(lead, when) {
	return [
		"New registration for The 120 Prompt OS.",
		"",
		`First Name: ${lead.firstName}`,
		`Business name: ${lead.businessName}`,
		`Business Email address: ${lead.email}`,
		`Consent: ${CONSENT}`,
		`What the business does: ${lead.businessDoes}`,
		`Submitted at: ${when} (Johannesburg)`,
		"",
		`Sheet: ${SHEET_NAME}`,
		`https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`
	].join("\n");
}
async function sendViaGmail(lead, when) {
	try {
		const { callTool } = await import("./client.server-8adlthcn.mjs");
		return (await callTool("gmail_send_message", {
			to: [product.email],
			subject: `New Prompt OS registration — ${lead.businessName}`,
			body: leadBody(lead, when)
		}, { connectorType: ConnectorType.Gmail })).ok;
	} catch {
		return false;
	}
}
async function sendViaRelay(lead, when) {
	try {
		const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(product.email)}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				_subject: `New Prompt OS registration — ${lead.businessName}`,
				_template: "table",
				_captcha: "false",
				_replyto: lead.email,
				"First Name": lead.firstName,
				"Business name": lead.businessName,
				"Business Email address": lead.email,
				Consent: CONSENT,
				"What the business does": lead.businessDoes,
				"Submitted at": when
			})
		});
		if (!res.ok) return false;
		return (await res.json().catch(() => null))?.success !== "false";
	} catch {
		return false;
	}
}
function rememberLocally(lead, when) {
	const row = [
		lead.firstName,
		lead.businessName,
		lead.email,
		CONSENT,
		lead.businessDoes,
		when
	].map(csvCell).join(",");
	mkdirSync(dirname(LOG_PATH), { recursive: true });
	if (!(() => {
		try {
			readFileSync(LOG_PATH, "utf8");
			return true;
		} catch {
			return false;
		}
	})()) appendFileSync(LOG_PATH, "First Name,Business name,Business Email address,Consent,What the business does,Submitted at\n");
	appendFileSync(LOG_PATH, `${row}\n`);
}
async function appendSheet(lead, when) {
	try {
		rememberLocally(lead, when);
	} catch {}
	try {
		const { callTool } = await import("./client.server-8adlthcn.mjs");
		const current = await callTool("google_drive_read_file", { file_id: SHEET_ID }, { connectorType: ConnectorType.GoogleDrive });
		if (!current.ok) return false;
		const text = typeof current.data === "string" ? current.data : current.data && typeof current.data === "object" && "content" in current.data && typeof current.data.content === "string" ? current.data.content : "";
		if (!text.includes("First Name")) return false;
		const row = [
			lead.firstName,
			lead.businessName,
			lead.email,
			CONSENT,
			lead.businessDoes,
			when
		].map(csvCell).join(",");
		return (await callTool("google_drive_update_file_content", {
			file_id: SHEET_ID,
			content: `${text.replace(/\s+$/, "")}\n${row}\n`,
			mime_type: "text/csv"
		}, { connectorType: ConnectorType.GoogleDrive })).ok;
	} catch {
		return false;
	}
}
async function deliverLead(lead) {
	const when = submittedAt();
	return {
		emailed: await sendViaGmail(lead, when) || await sendViaRelay(lead, when),
		sheet: await appendSheet(lead, when)
	};
}
//#endregion
export { deliverLead, ConnectorType as n };
