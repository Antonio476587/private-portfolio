import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(process.env.import_meta_url_root);
const __dirname = dirname(__filename);

export { __dirname };