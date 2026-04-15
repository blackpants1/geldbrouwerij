import fs from "node:fs/promises";
import path from "node:path";

export type LeadSource =
  | "newsletter"
  | "brouwketel"
  | "brouwavond"
  | "brouwavond_gezin"
  | "check_up"
  | "contact"
  | "werkgeversworkshop"
  | "platform_trial";

export interface Lead {
  id: string;
  email: string;
  naam?: string;
  source: LeadSource;
  createdAt: number;
  payload?: Record<string, unknown>;
}

const FILE = () => path.join(process.cwd(), ".data", "leads.json");

async function readAll(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(FILE(), "utf8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

async function writeAll(list: Lead[]) {
  await fs.mkdir(path.dirname(FILE()), { recursive: true });
  await fs.writeFile(FILE(), JSON.stringify(list, null, 2), "utf8");
}

export async function saveLead(lead: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const list = await readAll();
  const now = Date.now();
  const record: Lead = {
    ...lead,
    id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: now,
  };
  list.push(record);
  await writeAll(list);
  return record;
}

export async function listLeads(): Promise<Lead[]> {
  return readAll();
}
