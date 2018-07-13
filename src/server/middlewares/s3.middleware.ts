import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as S3 from 'aws-sdk/clients/s3';
import * as config from '../config';
import {NextFunction, Request, Response} from 'express';
import * as httpStatus from 'http-status';

const s3 = new S3(config.get().aws.s3);

class Options {
  bucket: string;
}

export class S3Middleware {

  constructor(private options: Options){}

  uploader() {
    return multer({
      storage: multerS3({
        s3: s3,
        bucket: `taylorgps/${this.options.bucket}`,
        acl: 'public-read',
        metadata: (req, file, cb) => {
          cb(null, {fieldName: file.fieldname});
        },
        key: (req, file, cb) => {
          const extension = file.originalname.split('.').pop();
          cb(null, `${Date.now().toString()}.${extension}`);
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

      const _params = {
        Bucket: 'taylorgps',
        Delete: { // required
          Objects: data.deleted_images.map(image => {
            return {Key: `${_options.bucket}/${image.key}`};
          })
        },
      };

      s3.deleteObjects(_params, (err) => {
        if (err) {
          if (res.headersSent) {
            return next(err);
          }
          res.status(httpStatus.BAD_REQUEST);
          return next(err);
        }
        next();
      });
    };
  }
}






