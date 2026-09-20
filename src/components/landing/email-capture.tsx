import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eyebrow, H2, Section } from "@/components/landing/reveal";
import { SAMPLE_KEY } from "@/lib/product";
import { buildPrompt, getFeatured } from "@/lib/prompts";

export function EmailCapture() {
  const [firstName, setFirstName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessDoes, setBusinessDoes] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [done, setDone] = useState(false);
  const samples = getFeatured().slice(0, 3);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!consent) {
      toast.error("Please confirm we may send the sample prompts you asked for.");
      return;
    }
    try {
      localStorage.setItem(
        SAMPLE_KEY,
        JSON.stringify({
          firstName,
          businessName,
          businessDoes,
          email,
          marketing,
          at: Date.now(),
        }),
      );
    } catch {
      /* ignore */
    }
    setDone(true);
    toast.success("Sample prompts ready below.");
  }

  return (
    <Section raised>
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <Eyebrow>Not ready for the full OS?</Eyebrow>
          <H2>Take a few prompts for a test drive.</H2>
          <p className="mt-4 text-muted">
            Three complete prompts, in your browser, no payment. Built for
            South African business owners and brands — tell us who you are so
            we send the right sample, not a generic pack.
          </p>
        </div>
        {done ? (
          <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-gold)]">
            <p className="font-display text-lg font-semibold text-fg">
              {firstName
                ? `${firstName}, your samples are ready.`
                : "Your samples are ready."}
            </p>
            {businessName ? (
              <p className="mt-1 text-sm text-muted">
                Filed for {businessName}
                {businessDoes ? ` · ${businessDoes}` : ""}.
              </p>
            ) : null}
            <ul className="mt-4 space-y-3">
              {samples.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    className="w-full rounded-md bg-bg px-3 py-3 text-left text-sm text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-gold)]"
                    onClick={() => {
                      void navigator.clipboard.writeText(buildPrompt(p));
                      toast.success("Copied. Paste into ChatGPT, Claude or Gemini.");
                    }}
                  >
                    Copy · {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]"
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sample-name">First name</Label>
                <Input
                  id="sample-name"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sample-business">Business name</Label>
                <Input
                  id="sample-business"
                  autoComplete="organization"
                  placeholder="e.g. Naidoo Dental or Mabena HVAC"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sample-does">What the business does</Label>
                <Input
                  id="sample-does"
                  autoComplete="organization-title"
                  placeholder="e.g. Owner · Sandton dental practice"
                  value={businessDoes}
                  onChange={(e) => setBusinessDoes(e.target.value)}
                  required
                />
                <p className="text-xs text-subtle">
                  Built for operators running a real business — not for browsing.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sample-email">Work email</Label>
                <Input
                  id="sample-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <label className="flex items-start gap-3 text-sm text-muted">
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-gold"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                I agree that BuzzCraft may email me the sample prompts I
                requested. I can unsubscribe at any time. See{" "}
                <Link to="/privacy" className="text-gold hover:underline">
                  Privacy
                </Link>{" "}
                and{" "}
                <Link to="/popia" className="text-gold hover:underline">
                  POPIA
                </Link>
                .
              </label>
              <label className="flex items-start gap-3 text-sm text-muted">
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-gold"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
                Optional: also send occasional emails about Prompt OS and
                BuzzCraft. Not required to get the samples.
              </label>
              <Button type="submit" size="lg">
                Send me the sample prompts
              </Button>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}
