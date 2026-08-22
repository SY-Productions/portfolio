/**
 * ts-node hook for `npm test`.
 *
 * The test files are TypeScript and import the app's lib modules directly, so
 * node's test runner needs a require hook. transpileOnly keeps the run fast —
 * type errors are the job of `next build` / `tsc`, not the test runner.
 */
require("ts-node").register({
  project: require("path").join(__dirname, "..", "tsconfig.test.json"),
  transpileOnly: true,
});
