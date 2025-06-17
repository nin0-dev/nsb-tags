// @ts-check

import { build } from "esbuild";

await build({
	entryPoints: [`${process.argv[process.argv.length - 1]}/index.js`],
	bundle: true,
	platform: "node",
	target: "esnext",
	logLevel: "info",
	outfile: `dist/${process.argv[process.argv.length - 1]}.js`,
	minify: true,
	treeShaking: true, // shake it off shake it offff
});
