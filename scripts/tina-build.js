const { execSync } = require("child_process");

const hasCloudKeys =
  Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN);

const cmd = hasCloudKeys
  ? "npx tinacms build"
  : "npx tinacms build --local --skip-cloud-checks";

console.log(`[TinaCMS Build] ${hasCloudKeys ? "Using Tina Cloud credentials" : "No Tina Cloud credentials found, building with local schema fallback"}`);
console.log(`[TinaCMS Build] Executing: ${cmd}`);

try {
  execSync(cmd, { stdio: "inherit", shell: true });
} catch (err) {
  console.error("[TinaCMS Build] Build failed:", err);
  process.exit(1);
}
