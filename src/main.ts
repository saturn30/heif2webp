import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import sharp from "sharp";

async function main() {
  const files = getDownloadFolderFiles();
  const hiefFiles = files.filter((name) => name.endsWith(".HIF"));
  for (const path of hiefFiles) {
    await sharp(path)
      .webp({ quality: 100 })
      .toFile(path.replace(".HIF", ".webp"));
    fs.unlinkSync(path);
  }
}

function getDownloadFolderFiles(): string[] {
  const homeDir = os.homedir();
  const downloadDir = path.join(homeDir, "Downloads");
  try {
    const files = fs.readdirSync(downloadDir);
    return files.map((fileName) => `${downloadDir}/${fileName}`);
  } catch (error) {
    console.error("Error reading download directory:", error);
    return [];
  }
}

main();
