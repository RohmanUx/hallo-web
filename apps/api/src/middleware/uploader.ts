import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// TypeScript type for multer file
type MulterFile = Express.Multer.File;

export const uploader = (dirName: string | null, prefixName?: string) => {
  // Base directory for file storage
  const mainDir = path.join(__dirname, '../../public');

  // Configure storage for multer
  const configFileStore = multer.diskStorage({
    destination: (
      req: Request,
      file: MulterFile,
      callback: (error: Error | null, destination: string) => void,
    ) => {
      // Resolve the destination directory path
      const fileDest = dirName ? path.join(mainDir, dirName) : mainDir;
      callback(null, fileDest);
    },
    filename: (
      req: Request,
      file: MulterFile,
      callback: (error: Error | null, filename: string) => void,
    ) => {
      // Generate unique filename
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      callback(null, `${prefixName || 'MEDIA'}_${Date.now()}${ext}`);
    },
  });

  return multer({
    storage: configFileStore,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
  });
 };
