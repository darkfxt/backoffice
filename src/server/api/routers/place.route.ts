import {Router} from 'express';
import {PlaceController} from '../controllers/place.controller';

import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as S3 from 'aws-sdk/clients/s3';
import * as config from '../../config';

const PlaceRouter: Router = Router();
const s3 = new S3(config.get().aws.s3);
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'taylorgps/places',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const extension = file.originalname.split('.').pop();
      cb(null, `${Date.now().toString()}.${extension}`);
    }
  })
});

PlaceRouter.route('/autocomplete')
  .get(PlaceController.autocomplete);

PlaceRouter.route('/:place_id')
  .get(PlaceController.getDetail);

PlaceRouter.route('/')
  .get(PlaceController.getAll)
  .post(upload.array('files[]'), PlaceController.create);

export default PlaceRouter;
