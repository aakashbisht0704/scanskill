#!/usr/bin/env node

import { cwd } from "node:process";
import { findRoot } from "./rootFinder";

async function main() {
  console.log("skillscan running...");
  const curr_dir = process.cwd();
  const root = await findRoot(curr_dir);
  if (root) console.log("Detected project root:", root);
  
  else console.log("No project detected");
}

main();