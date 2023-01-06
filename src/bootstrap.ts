import "dotenv/config";
import "source-map-support/register";
import { register as registerPaths } from "tsconfig-paths";

process.env.TS_NODE_BASEURL = process.argv[1].endsWith(".ts") ? "./src" : "./dist";
registerPaths();
