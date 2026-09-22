import { Link } from "@tanstack/react-router";
import { Globe, Mail } from "lucide-react";
import { Logo } from "@/components/landing/logo";
import { product } from "@/lib/product";

const links = [
  { to: "/", label: "Home" },
  { to: "/library", label: "Prompt Library" },
  { to: "/privacy", label: "Privacy" },
  { to: "/popia", label: "POPIA" },
  { to: "/terms", label: "Terms" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-bg-elevated px-5 pt-16 pb-28 md:px-8 md:pb-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo wordmarkHref={product.url} />
          <p className="mt-4 max-w-sm text-sm text-muted">{product.tagline}</p>
          <p className="mt-6 text-sm text-subtle">{product.location}</p>
          <div className="mt-4 flex items-center gap-2">
            <a
              href={`mailto:${product.email}`}
              aria-label={`Email ${product.email}`}
              title={product.email}
              className="inline-flex size-10 items-center justify-center rounded-md text-gold shadow-[var(--shadow-border)] transition-shadow hover:shadow-[var(--shadow-gold)]"
            >
              <Mail className="size-4" aria-hidden />
            </a>
            <a
              href={product.url}
              aria-label="BuzzCraft website, www.buzzcraft.co.za"
              title="www.buzzcraft.co.za"
              className="inline-flex size-10 items-center justify-center rounded-md text-gold shadow-[var(--shadow-border)] transition-shadow hover:shadow-[var(--shadow-gold)]"
            >
              <Globe className="size-4" aria-hidden />
            </a>
          </div>
        </div>
        <div className="md:col-span-7 md:flex md:justify-end">
          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-muted transition-colors hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl text-xs text-subtle">
        © {year} {product.brand}. {product.name}. Prompts assist thinking and
        drafting — they do not guarantee rankings, citations or revenue.
      </p>
    </footer>
  );
}
