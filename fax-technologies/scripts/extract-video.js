import fs from "fs";
import path from "path";

const htmlPath = path.join(process.cwd(), "Title_FABX_Innovations_Cine.html");
const outputDir = path.join(process.cwd(), "public", "videos");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const htmlContent = fs.readFileSync(htmlPath, "utf-8");
const match = htmlContent.match(/src="data:video\/mp4;base64,([^"]+)"/);

if (match && match[1]) {
  const base64Data = match[1].replace(/\s+/g, "");
  const buffer = Buffer.from(base64Data, "base64");
  const outputPath = path.join(outputDir, "fabx_cine.mp4");
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully extracted video to ${outputPath} (${buffer.length} bytes)`);
} else {
  console.error("Could not find base64 video string in Title_FABX_Innovations_Cine.html");
}
