import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function getServerVersion(): string {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const packageJsonPath = path.resolve(__dirname, "../../package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  return packageJson.version;
}
