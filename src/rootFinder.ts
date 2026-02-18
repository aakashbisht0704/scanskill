import * as fs from "fs/promises";
import * as path from "path";

let markers = {
  file: [
    "package.json",
    "pubspec.yaml",
    "pnpm-workspace.yaml",
    "turbo.json",
    "nx.json",
  ],
  directory: [".git"],
};

async function pathExists(dir: string){
    for(const file of markers.file) {
        try{
            const stats = await fs.stat(path.join(dir, file));
            if(stats.isFile()){
                return true
            }
        } catch(error){
            continue;
        }
    }

    for(const folder of markers.directory){
        try{
            const stats = await(fs.stat(path.join(dir, folder)))
            if(stats.isDirectory()){
                return true
            }
        } catch{
            continue;
        }
    }
    return false;
}

export async function findRoot(start_dir: string): Promise<string | null> {
    let current = start_dir
    while(true){
        if(await pathExists(current)){
            return current;
        }

        const parent = path.dirname(current);

        if(parent === current){
            return null;
        }

        current = parent;
        console.log(current);
    }
}
