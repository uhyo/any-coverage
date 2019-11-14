import path from "path";
import { check } from "./check";

const targetProject = path.resolve(__dirname, "../example/tsconfig.json");

check(targetProject);
