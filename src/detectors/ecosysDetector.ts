import * as path from "node:path";
import * as fs from "fs/promises";

export type Ecosystem = "node" | "flutter" | "unknown";


const start_dir = process.cwd();

async function fileExists(filePath: string) {
    try{
        const stats = await fs.stat(filePath);
        if (stats.isFile()){
            return true;
        }
    } catch {
        return false;
    }
}

export async function detectEcosystem(root: string): Promise<Ecosystem>{
    if (await fileExists(path.join(root, "package.json"))){
       return "node";
    }
    if (await fileExists(path.join(root, "pubspec.yaml"))){
       return "flutter";
    }
    return "unknown";
}