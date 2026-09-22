import { createServerFn } from "@tanstack/react-start";

export type LeadInput = {
  firstName: string;
  businessName: string;
  businessDoes: string;
  email: string;
  consent: boolean;
};

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: LeadInput) => {
    const firstName = clean(input?.firstName, 80);
    const businessName = clean(input?.businessName, 120);
    const businessDoes = clean(input?.businessDoes, 180);
    const email = clean(input?.email, 120).toLowerCase();
    if (!firstName || !businessName || !businessDoes) {
      throw new Error("Please complete your name, business, and what the business does.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Please enter a valid work email.");
    }
    if (input?.consent !== true) {
      throw new Error("Please confirm you want instant access.");
    }
    return { firstName, businessName, businessDoes, email, consent: true as const };
  })
  .handler(async ({ data }) => {
    const { deliverLead } = await import("./deliver-lead.server");
    return deliverLead(data);
  });
