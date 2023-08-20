import path from 'path';
import multer from 'multer';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'upload/');
  },
  filename: (_, file, cb) => {
    cb(null, Date.now() + Math.random() + path.extname(file.originalname));
  },
});

@Module({
  imports: [MulterModule.register({ storage })],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
