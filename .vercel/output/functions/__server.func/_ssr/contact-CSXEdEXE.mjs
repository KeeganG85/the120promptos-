import { i as __toESM } from "../_runtime.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { o as product } from "./product-BY13tKKv.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as Button } from "./router-DCdSzdw5.mjs";
import { n as Input, r as Label } from "./checkout-dialog-DBNpWwij.mjs";
import { t as LegalLayout } from "./legal-layout-CqE1ZXNC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CSXEdEXE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	const [name, setName] = (0, import_react.useState)("");
	const [businessName, setBusinessName] = (0, import_react.useState)("");
	const [businessDoes, setBusinessDoes] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	function onSubmit(e) {
		e.preventDefault();
		const body = [
			message,
			"",
			`Name: ${name}`,
			`Business: ${businessName}`,
			`What they do: ${businessDoes}`,
			`Email: ${email}`
		].join("\n");
		const href = `mailto:${product.email}?subject=${encodeURIComponent("Prompt OS enquiry from " + (businessName || name))}&body=${encodeURIComponent(body)}`;
		window.location.href = href;
		toast.success("Opening your email app.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalLayout, {
		title: "Contact",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			product.brand,
			" · ",
			product.location,
			". Email",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `mailto:${product.email}`,
				children: product.email
			}),
			". Website",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: product.url,
				children: product.url.replace("https://", "")
			}),
			". For South African business owners and brands."
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "mt-8 grid max-w-lg gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-name",
						children: "First name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "c-name",
						autoComplete: "given-name",
						value: name,
						onChange: (e) => setName(e.target.value),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-business",
						children: "Business name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "c-business",
						autoComplete: "organization",
						placeholder: "e.g. Naidoo Dental or Mabena HVAC",
						value: businessName,
						onChange: (e) => setBusinessName(e.target.value),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-does",
						children: "What the business does"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "c-does",
						autoComplete: "organization-title",
						placeholder: "e.g. Owner · Sandton dental practice",
						value: businessDoes,
						onChange: (e) => setBusinessDoes(e.target.value),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-email",
						children: "Work email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "c-email",
						type: "email",
						autoComplete: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-msg",
						children: "Message"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "c-msg",
						required: true,
						rows: 6,
						value: message,
						onChange: (e) => setMessage(e.target.value),
						className: "w-full rounded-md bg-surface-2 px-4 py-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus-visible:shadow-[var(--shadow-gold)]"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "lg",
					children: "Send message"
				})
			]
		})]
	});
}
//#endregion
export { Contact as component };
