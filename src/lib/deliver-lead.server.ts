import { appendFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { product } from "@/lib/product";
import { ConnectorType } from "@/lib/app-data";

const SHEET_ID = "1exdIXM_XmueP0-d7e2vjOB6hJ_x2__IFHPkiTqB6ceQ";
const SHEET_NAME = "The 120 Prompt OS — Leads";
const LOG_PATH = join(process.cwd(), "data", "prompt-os-leads.csv");
const CONSENT =
  "Yes — instant access to The 120 Prompt OS. BuzzCraft may email the product to this address. Privacy and POPIA acknowledged.";

export type DeliveredLead = {
  firstName: string;
  businessName: string;
  businessDoes: string;
  email: string;
  consent: true;
};

function submittedAt(): string {
  return new Intl.DateTimeFormat("en-ZA", {
    timeZone: "Africa/Johannesburg",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
}

function csvCell(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function leadBody(lead: DeliveredLead, when: string): string {
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
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`,
  ].join("\n");
}

async function sendViaGmail(lead: DeliveredLead, when: string): Promise<boolean> {
  try {
    const { callTool } = await import("@/lib/app-data/client.server");
    const result = await callTool(
      "gmail_send_message",
      {
        to: [product.email],
        subject: `New Prompt OS registration — ${lead.businessName}`,
        body: leadBody(lead, when),
      },
      { connectorType: ConnectorType.Gmail },
    );
    return result.ok;
  } catch {
    return false;
  }
}

async function sendViaRelay(lead: DeliveredLead, when: string): Promise<boolean> {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(product.email)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
        "Submitted at": when,
      }),
    });
    if (!res.ok) return false;
    const json = (await res.json().catch(() => null)) as { success?: string } | null;
    return json?.success !== "false";
  } catch {
    return false;
  }
}

function rememberLocally(lead: DeliveredLead, when: string): void {
  const row = [
    lead.firstName,
    lead.businessName,
    lead.email,
    CONSENT,
    lead.businessDoes,
    when,
  ]
    .map(csvCell)
    .join(",");
  mkdirSync(dirname(LOG_PATH), { recursive: true });
  const exists = (() => {
    try {
      readFileSync(LOG_PATH, "utf8");
      return true;
    } catch {
      return false;
    }
  })();
  if (!exists) {
    appendFileSync(
      LOG_PATH,
      "First Name,Business name,Business Email address,Consent,What the business does,Submitted at\n",
    );
  }
  appendFileSync(LOG_PATH, `${row}\n`);
}

async function appendSheet(lead: DeliveredLead, when: string): Promise<boolean> {
  try {
    rememberLocally(lead, when);
  } catch {
    /* read-only host */
  }
  try {
    const { callTool } = await import("@/lib/app-data/client.server");
    const current = await callTool(
      "google_drive_read_file",
      { file_id: SHEET_ID },
      { connectorType: ConnectorType.GoogleDrive },
    );
    if (!current.ok) return false;
    const text =
      typeof current.data === "string"
        ? current.data
        : current.data &&
            typeof current.data === "object" &&
            "content" in current.data &&
            typeof (current.data as { content?: unknown }).content === "string"
          ? (current.data as { content: string }).content
          : "";
    if (!text.includes("First Name")) return false;
    const row = [
      lead.firstName,
      lead.businessName,
      lead.email,
      CONSENT,
      lead.businessDoes,
      when,
    ]
      .map(csvCell)
      .join(",");
    const next = `${text.replace(/\s+$/, "")}\n${row}\n`;
    const updated = await callTool(
      "google_drive_update_file_content",
      {
        file_id: SHEET_ID,
        content: next,
        mime_type: "text/csv",
      },
      { connectorType: ConnectorType.GoogleDrive },
    );
    return updated.ok;
  } catch {
    return false;
  }
}

export async function deliverLead(lead: DeliveredLead): Promise<{ emailed: boolean; sheet: boolean }> {
  const when = submittedAt();
  const gmail = await sendViaGmail(lead, when);
  const emailed = gmail || (await sendViaRelay(lead, when));
  const sheet = await appendSheet(lead, when);
  return { emailed, sheet };
}
