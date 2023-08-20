import { createReadStream } from 'fs';
import path from 'path';
import { Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipe,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { VideosService } from './videos.service';
import {
  CreateVideoDto,
  CreateVideoWithUploadDto,
} from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoFileValidator } from './video-file-validator';
import { VideoSerializer } from './video-serializer';

const KB = 1024;
const MB = KB * 1024;
const GB = MB * 1024;

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateVideoWithUploadDto })
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createVideoDto: CreateVideoDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new VideoFileValidator({
            mimeType: 'video/mp4',
            maxSizeInBytes: 100 * MB,
          }),
        ],
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('file:', file);
    return this.videosService.create(createVideoDto, file);
  }

  @Get()
  async findAll() {
    const videos = await this.videosService.findAll();
    return videos.map((video) => new VideoSerializer(video));
  }

  @Get('category/:category_id')
  async findByCategory(@Param('category_id') categoryId: string) {
    const videos = await this.videosService.findByCategory(+categoryId);
    return videos.map((video) => new VideoSerializer(video));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const video = await this.videosService.findOne(+id);
    return new VideoSerializer(video);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }

  @Get('file/:file_name')
  file(@Param('file_name') filename: string, @Res() response: Response) {
    const fileStream = createReadStream(
      path.join(process.cwd(), 'upload', filename),
    );
    return fileStream.pipe(response);
  }
}
