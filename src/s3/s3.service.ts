import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk";
import path = require("path");

@Injectable()
export class S3Service {
    get s3Bucket() {
        return new AWS.S3();
    };

    async uploadFile(file: any) {
        const ext = path.extname(file.originalname);
        return this.fileUploadToS3(file.buffer, file.filename, ext);
    }

    async fileUploadToS3(buffer: Buffer, filename: string, ext: string) {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `${filename}${ext}`,
            Body: buffer
        };
        return new Promise((resolve, reject) => {
            const putObjectInS3 = this.s3Bucket.upload(params).promise();
            putObjectInS3.then((data) => {
                if (data == undefined) resolve(`Upload failed!`);
                else resolve(`Success Upload! Key: ${data.Key}`);
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }

}
