import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const fileRemover = (filename) => {
  fs.unlink(path.join(__dirname, "../uploads", filename), (err) => {
    if (err && err.code == "ENOENT") {
      // file doenst exist
      console.log("File doesn't exist, won't remove it.");
    } else if (err) {
      console.log("Error occured while trying to remove file");
    } else {
      console.log("File removed successfully");
    }
  });
};

export { fileRemover };
