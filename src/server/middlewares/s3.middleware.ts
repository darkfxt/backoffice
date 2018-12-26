import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as S3 from 'aws-sdk/clients/s3';
import * as config from '../config';
import { NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status';

const s3 = new S3(config.get().aws.s3);

class Options {
  bucket: string;
}

function uniqueID() {
  function chr4() {
    return Math.random().toString(16).slice(-4);
  }
  return chr4() + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() + chr4() + chr4();
}

async function emptyS3Directory(bucket, dir) {
  const listParams = {
    Bucket: bucket,
    Prefix: dir
  };

  const listedObjects = await s3.listObjects(listParams).promise();

  if (listedObjects.Contents.length === 0) return;

  const deleteParams = {
    Bucket: bucket,
    Delete: {Objects: []}
  };

  listedObjects.Contents.forEach(({Key}) => {
    deleteParams.Delete.Objects.push({Key});
  });

  await s3.deleteObjects(deleteParams).promise();

  if (listedObjects.IsTruncated) await emptyS3Directory(bucket, dir);
}

const env =  config.get().env !== 'production' ? 'development' : 'production';

export class S3Middleware {

  constructor(private options: Options) {}

  uploader() {
    return multer({
      storage: multerS3({
        s3: s3,
        bucket: `taylorgps/${env}`,
        acl: 'public-read',
        metadata: (req, file, cb) => {
          cb(null, {fieldName: file.fieldname});
        },
        key: (req, file, cb) => {
          const exension = file.originalname.split('.').pop();
          cb(null, `${uniqueID()}/original.${exension}`);
        }
      })
    });
  }

  deleteObjects() {
    const _options = this.options;

    return (req: Request, res: Response, next: NextFunction) => {

      const data = JSON.parse(req.body.data);
      if (data.deleted_images.length === 0)
        return next();

      const emptyList: Promise<any>[] = [];
      data.deleted_images.forEach(image => {
        emptyList.push(emptyS3Directory('taylorgps', `${env}/${image.key}/`));
      });

      Promise.all(emptyList).then((resp) => {
        next();
      }, err => {
        if (err) {
          if (res.headersSent)
            return next(err);

          res.status(httpStatus.BAD_REQUEST);
          return next(err);
        }
        next();
      });
    };
  }

  upload() {
    const storage = multer.memoryStorage();

    return multer({storage});
  }

}






