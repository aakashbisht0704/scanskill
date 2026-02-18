#!/usr/bin/env node

import { cwd } from "node:process";
import { findRoot } from "./rootFinder.js";
import { writeSkills } from "./generators/writeSkills.js";

async function main() {
  console.log("skillscan running...");
  const curr_dir = process.cwd();
  const root = await findRoot(curr_dir);
  if (root) {
    console.log("Detected project root:", root);
    await writeSkills(root);
  }
  else console.log("No project detected");
}

main();