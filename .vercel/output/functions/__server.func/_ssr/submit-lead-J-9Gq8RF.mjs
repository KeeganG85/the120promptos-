import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/submit-lead-J-9Gq8RF.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function clean(value, max) {
	if (typeof value !== "string") return "";
	return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}
var submitLead_createServerFn_handler = createServerRpc({
	id: "29b8cab67d2eb6de95ec29ee4457dbc6f42911c0e50f778cac9a3e3299c1d780",
	name: "submitLead",
	filename: "src/lib/submit-lead.ts"
}, (opts) => submitLead.__executeServer(opts));
var submitLead = createServerFn({ method: "POST" }).validator((input) => {
	const firstName = clean(input?.firstName, 80);
	const businessName = clean(input?.businessName, 120);
	const businessDoes = clean(input?.businessDoes, 180);
	const email = clean(input?.email, 120).toLowerCase();
	if (!firstName || !businessName || !businessDoes) throw new Error("Please complete your name, business, and what the business does.");
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Please enter a valid work email.");
	if (input?.consent !== true) throw new Error("Please confirm you want instant access.");
	return {
		firstName,
		businessName,
		businessDoes,
		email,
		consent: true
	};
}).handler(submitLead_createServerFn_handler, async ({ data }) => {
	const { deliverLead } = await import("./deliver-lead.server-COd1llQo.mjs");
	return deliverLead(data);
});
//#endregion
export { submitLead_createServerFn_handler };
