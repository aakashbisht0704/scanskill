import { detectFramework } from "../detectors/frameworkDetector.js";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Resolve package root (dist/)
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PACKAGE_ROOT = path.resolve(__dirname, ".."); // dist/
const TEMPLATE_DIR = path.join(PACKAGE_ROOT, "templates");

const TEMPLATE_MAP: Record<string, string> = {
  "nextjs": "nextjs.md",
  "react": "react.md",
  "react-native": "react-native.md",
  "flutter": "flutter.md",
};

async function fileExists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

export async function writeSkills(root: string) {
  const framework = await detectFramework(root);

  if (framework === "unknown") {
    console.log("No supported framework detected.");
    return;
  }

  const templateName = TEMPLATE_MAP[framework];
  const templatePath = path.join(TEMPLATE_DIR, templateName);
  const outputPath = path.join(root, "skills.md");

  // prevent overwrite
  if (await fileExists(outputPath)) {
    console.log("skills.md already exists. Delete it or use --force (coming soon).");
    return;
  }

  const template = await fs.readFile(templatePath, "utf-8");
  await fs.writeFile(outputPath, template);

  console.log(`skills.md created for ${framework} project`);
}
