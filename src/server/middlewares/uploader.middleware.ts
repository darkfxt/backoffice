import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as S3 from 'aws-sdk/clients/s3';
import * as config from '../config';

const s3 = new S3(config.get().aws.s3);

export class UploaderMiddleware{
  static uploader(){
    return multer({
      storage: multerS3({
        s3: s3,
        bucket: 'taylorgps/places',
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
}




