import {Controller, HttpStatus, Post, Res, UploadedFile} from '@nestjs/common';
import {ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {S3Service} from "./s3.service";
import {FileUploadDTO} from "../dto/file-upload.dto";
@ApiTags('S3')

@Controller()
export class S3Controller {
    constructor(private readonly s3Service: S3Service) {
    }

    @Post('upload')
    @ApiOperation({description: 'File Upload'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'FIle',
        type: FileUploadDTO,
    })
    @ApiResponse({
        status: 200,
        description: 'Success File Upload',
    })
    async uploadFile(@Res() res, @UploadedFile() file) {
        const result = await this.s3Service.uploadFile(file);
        return res.status(HttpStatus.OK).json(result);
    }
}
