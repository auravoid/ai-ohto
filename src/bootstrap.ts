import "dotenv/config";
import "source-map-support/register";
import { register as registerPaths } from "tsconfig-paths";

// the baseurl is set to src in development, but obviously when running the bot, it's in dist
process.env.TS_NODE_BASEURL = "./dist";
registerPaths();
