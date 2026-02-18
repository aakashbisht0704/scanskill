import { useGetContext } from "../projectContext.js";

export type Framework = "flutter" | "react" | "react-native" | "nextjs" | "unknown";

export async function detectFramework(root:string) : Promise<Framework> {
    const project = await useGetContext(root);
    if(project.ecosystem === "flutter"){
        return "flutter";
    }
    if(project.ecosystem !== "node" || !project.context){
        return "unknown";
    }

    const deps = project.context?.dependencies;

    if(deps.has("next")){
        return "nextjs";
    }
    if(deps.has("react-native") || deps.has("expo")){
        return "react-native";
    }
    if(deps.has("react") && deps.has("react-dom")){
        return "react";
    }

    return "unknown";
}

// let strong_signals = {
//   file: new Set<String>([
//     "next.config.js",
//     "next.config.mjs",
//     "next.config.ts",
//     "vite.config.*",
//     "app.json",
//     "pubspec.yaml",
//   ]),
//   directory: new Set<String>([
//     "app/",
//     "pages/",
//     "android/",
//     "ios/",
//     "lib/",
//   ]),
//   dependency: new Set<String>([
//     "next",
//     "react",
//     "react-dom",
//     "vite",
//     "@vitejs/plugin-react",
//     "react-scripts",
//     "react-native",
//     "expo",
//   ]),
//   script: new Set<String>(["next dev", "next build", "next start"]),
// };
// let support_signals = {
//   file: [],
//   directory: [],
//   dependency: [],
//   script: [],
// };