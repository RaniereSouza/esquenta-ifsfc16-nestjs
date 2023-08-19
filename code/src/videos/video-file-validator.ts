import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

export class VideoFileValidator extends FileValidator {
  isValid(file?: IFile) {
    console.log(file);
    return (
      file.mimetype === this.validationOptions.mimeType &&
      file.size <= this.validationOptions.maxSizeInBytes
    );
  }

  buildErrorMessage(file: any): string {
    if (!file) return 'File is required';

    if (file.mimetype !== this.validationOptions.mimeType)
      return `File must be of type ${this.validationOptions.mimeType}`;

    if (file.size > this.validationOptions.maxSizeInBytes)
      return `File must be smaller than ${this.validationOptions.mimeType}`;
  }
}
