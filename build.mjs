// @ts-check

import { context } from "esbuild";

let ctx = await context({
	entryPoints: [`${process.argv[process.argv.length - 1]}/index.ts`],
	bundle: true,
	platform: "node",
	target: "esnext",
	logLevel: "info",
	outfile: `_dist/${process.argv[process.argv.length - 1]}.js`,
	minify: true,
	treeShaking: true, // shake it off shake it offff
});

await ctx.watch();
