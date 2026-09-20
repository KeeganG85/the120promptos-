import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { LegalLayout } from "@/components/landing/legal-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { product } from "@/lib/product";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessDoes, setBusinessDoes] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const body = [
      message,
      "",
      `Name: ${name}`,
      `Business: ${businessName}`,
      `What they do: ${businessDoes}`,
      `Email: ${email}`,
    ].join("\n");
    const href = `mailto:${product.email}?subject=${encodeURIComponent("Prompt OS enquiry from " + (businessName || name))}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    toast.success("Opening your email app.");
  }

  return (
    <LegalLayout title="Contact">
      <p>
        {product.brand} · {product.location}. Email{" "}
        <a href={`mailto:${product.email}`}>{product.email}</a>. Website{" "}
        <a href={product.url}>{product.url.replace("https://", "")}</a>. For
        South African business owners and brands.
      </p>
      <form onSubmit={onSubmit} className="mt-8 grid max-w-lg gap-4">
        <div className="grid gap-2">
          <Label htmlFor="c-name">First name</Label>
          <Input
            id="c-name"
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="c-business">Business name</Label>
          <Input
            id="c-business"
            autoComplete="organization"
            placeholder="e.g. Naidoo Dental or Mabena HVAC"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="c-does">What the business does</Label>
          <Input
            id="c-does"
            autoComplete="organization-title"
            placeholder="e.g. Owner · Sandton dental practice"
            value={businessDoes}
            onChange={(e) => setBusinessDoes(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="c-email">Work email</Label>
          <Input
            id="c-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="c-msg">Message</Label>
          <textarea
            id="c-msg"
            required
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-md bg-surface-2 px-4 py-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus-visible:shadow-[var(--shadow-gold)]"
          />
        </div>
        <Button type="submit" size="lg">
          Send message
        </Button>
      </form>
    </LegalLayout>
  );
}
