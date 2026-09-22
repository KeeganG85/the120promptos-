//#region node_modules/.nitro/vite/services/ssr/assets/product-BY13tKKv.js
/**
* Single commercial config for the landing page.
* Set `priceLabel` to a display string such as "R497" when pricing is ready.
* Leave it null to run in free / registration mode — CTAs switch automatically.
* Set `checkoutUrl` to an external checkout (PayFast, Lemon Squeezy, etc.)
* to send buyers off-site instead of the in-page access form.
*/
var product = {
	name: "The 120 Prompt OS",
	shortName: "Prompt OS",
	brand: "BuzzCraft",
	tagline: "Crafting Buzz. Creating Impact.",
	url: "https://www.buzzcraft.co.za",
	email: "info@buzzcraft.co.za",
	location: "Johannesburg, South Africa",
	priceLabel: null,
	checkoutUrl: null,
	title: "The 120 Prompt OS | AI Prompts for South African Businesses | BuzzCraft",
	description: "120 practical AI prompts for South African business owners covering SEO, AI visibility, marketing, sales, automation, strategy and operations. Built by BuzzCraft."
};
var isFree = product.priceLabel == null;
function primaryCtaLabel() {
	return isFree ? "Get the Prompt OS free" : "Get the 120 Prompt OS";
}
function pricingCtaLabel() {
	return isFree ? "Get the Prompt OS free" : `Get instant access — ${product.priceLabel}`;
}
var ACCESS_KEY = "buzzcraft-promptos-access";
var SAMPLE_KEY = "buzzcraft-promptos-sample";
//#endregion
export { primaryCtaLabel as a, pricingCtaLabel as i, SAMPLE_KEY as n, product as o, isFree as r, ACCESS_KEY as t };
