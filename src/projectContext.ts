import * as path from "node:path";
import { findRoot } from "./rootFinder.js";
import * as fs from "fs/promises";
import { detectEcosystem, Ecosystem } from "./detectors/ecosysDetector.js";

export type ProjectContext = {
  hasPackageJson: boolean;
  dependencies: Set<string>;
  devDependencies: Set<string>;
  scripts: Set<string>;
};

async function jsonReader(dir: string) {
  try {
    const data = await fs.readFile(dir, "utf-8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function getNodeContext(root: string): Promise<ProjectContext> {

  const pkg = await jsonReader(path.join(root, "package.json"));

  if (!pkg) {
    return {
      hasPackageJson: false,
      dependencies: new Set(),
      devDependencies: new Set(),
      scripts: new Set(),
    };
  }

  const dependencies = new Set<string>(Object.keys(pkg.dependencies || {}));
  const devDependencies = new Set<string>(
    Object.keys(pkg.devDependencies || {}),
  );
  const scripts = new Set<string>(Object.keys(pkg.scripts || {}));

  return {
    hasPackageJson: true,
    dependencies,
    devDependencies,
    scripts,
  };
}

export async function useGetContext(start_dir: string) {
  const root = await findRoot(start_dir);
  if (!root)
    return {
      ecosystem: "unknown",
      context: null,
    };
  const ecosystem = await detectEcosystem(root);

  if (ecosystem === "flutter") {
    return {
      ecosystem: "flutter",
      context: null,
    };
  }
  if (ecosystem === "node") {
    const { hasPackageJson, dependencies, devDependencies, scripts } =
      await getNodeContext(root);
    return {
      ecosystem: "node",
      context: { hasPackageJson, dependencies, devDependencies, scripts },
    };
  }
  return {
    ecosystem: "unknown",
    context: null,
  };
}
