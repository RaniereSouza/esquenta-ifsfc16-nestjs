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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoFileValidator } from './video-file-validator';

const KB = 1024;
const MB = KB * 1024;
const GB = MB * 1024;

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
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
  findAll() {
    return this.videosService.findAll();
  }

  @Get('category/:category_id')
  findByCategory(@Param('category_id') categoryId: string) {
    return this.videosService.findByCategory(+categoryId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
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
}
