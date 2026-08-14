import { r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-hsQXeGuc2.mjs";
import { n as analyzeInputSchema, t as analyzeImages } from "./analyze.server-ClZi6SVD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analyze.functions-CLMKw-bS.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var analyzeScreenshots_createServerFn_handler = createServerRpc({
	id: "a2df76a8f617d5cff8bd0e8da556d7935175bca9d869e91076cd5dcfa3900579",
	name: "analyzeScreenshots",
	filename: "src/lib/analyze.functions.ts"
}, (opts) => analyzeScreenshots.__executeServer(opts));
var analyzeScreenshots = createServerFn({ method: "POST" }).inputValidator((data) => analyzeInputSchema.parse(data)).handler(analyzeScreenshots_createServerFn_handler, async ({ data }) => analyzeImages(data));
//#endregion
export { analyzeScreenshots_createServerFn_handler };
