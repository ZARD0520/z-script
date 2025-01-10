const sharp = require('sharp')
const path = require('path')
const fs = require('fs').promises

const getMimeType = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    default:
      return null;
  }
}

const convertToWebp = async (oldPath, newPath) => {
  const dirPath = path.resolve(__dirname, './', oldPath)
  const dirNewPath = path.resolve(__dirname, './', newPath)
  const files = await fs.readdir(dirPath)
  // 遍历files
  for (const filename of files) {
    const filePath = path.join(dirPath, filename)
    const mimeType = getMimeType(filename)
    if (mimeType) {
      const newFileName = filename.replace(/.[^.]+$/, '.webp')
      const outputFilePath = path.join(dirNewPath, newFileName)
      try {
        await sharp(filePath)
          .toFormat('webp')
          .webp({ quality: 100, effort: 6 })
          .toFile(outputFilePath)
        // await fs.unlink(filePath)
      } catch (e) {
        console.error(e)
      }
    } else {
      console.log(`${filename} is not an allowed image type.`);
    }
  }
}

convertToWebp('image-webp/image', 'image-webp/webp')