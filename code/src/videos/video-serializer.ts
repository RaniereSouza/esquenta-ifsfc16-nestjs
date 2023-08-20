import path from 'path';
import { Category, Video } from '@prisma/client';

const FILES_API_URL = 'http://localhost:3000/videos/file/';

export class VideoSerializer {
  id: number;
  title: string;
  description?: string;
  category: {
    id: number;
    name: string;
    description?: string;
  };
  file_url: string;

  constructor(video: Video & { category: Category }) {
    this.id = video.id;
    this.title = video.title;
    this.description = video.description;
    this.category = video.category;
    this.file_url = FILES_API_URL + path.basename(video.file_path);
  }
}
