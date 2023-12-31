import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { InvalidRelationError } from '../errors/invalid-relation.error';

@Injectable()
export class VideosService {
  constructor(private prismaService: PrismaService) {}

  private async categoryExistsOrThrow(categoryId: number, customError?: Error) {
    try {
      await this.prismaService.category.findFirstOrThrow({
        where: { id: categoryId },
      });
    } catch (prismaError) {
      throw customError || prismaError;
    }
  }

  async create(createVideoDto: CreateVideoDto, file: Express.Multer.File) {
    const categoryId = createVideoDto.category_id;
    await this.categoryExistsOrThrow(
      categoryId,
      new InvalidRelationError(
        `Cannot create relationship: Category #${categoryId} not found`,
      ),
    );
    return this.prismaService.video.create({
      data: {
        ...createVideoDto,
        file_path: file.path,
      },
    });
  }

  findAll() {
    return this.prismaService.video.findMany({ include: { category: true } });
  }

  async findByCategory(categoryId: number) {
    await this.categoryExistsOrThrow(categoryId);
    return this.prismaService.video.findMany({
      where: { category_id: categoryId },
      include: { category: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.video.findUniqueOrThrow({
      where: { id },
      include: { category: true },
    });
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video\n${JSON.stringify(
      updateVideoDto,
    )}`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
