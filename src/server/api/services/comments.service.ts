import axios from 'axios';
import { config } from '../../config/env';
import * as FormData from 'form-data';


export class CommentsService {

  public static async create(body, headers): Promise<any> {
    const form = new FormData();
    body.primary_color = body.primary_color.replace('#', '');
    body.secondary_color = body.secondary_color.replace('#', '');

    form.append('name', body.name);
    form.append('company_id', body.company_id);
    form.append('primary_color', body.primary_color);
    form.append('secondary_color', body.secondary_color);
    form.append('file', body.file.buffer, {
      filename: body.file.originalname,
      contentType: body.file.mimetype,
      knownLength: body.file.size
    });
    const header = {...form.getHeaders(), ...{authorization: headers.authorization}};
    const resp = await axios.post(`${config.core.url}/accounts`, form, {headers: header});
    return resp;
  }

  private static async createMailNotification(body) {
    const aws = require('aws-sdk');
    aws.config = new aws.Config();
    aws.config.update({ accessKeyId: 'AKIAYGVVKPYFIPRK5WFD', secretAccessKey: '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', region: 'us-east-1'});
    const ses = new aws.SES({apiVersion: '2010-12-01'});
    const to = ['support@taylorgps.com'];
    const from = 'support@taylorgps.com ';

    if (!body.message)
      return res.json({ success: false, error: 'Message field is mandatory' });

    ses.sendEmail({
      Source: from, Destination: { ToAddresses: to },
      Message: {
        Subject: { Data: `Formulario de contacto TaylorGPS` },
        Body: { Html: { Data: '<body>'+body.message+'</body>' }}
      }
    }, (err, data) => {
      if(err) return console.log(err);
      res.json({ success: true, msg: 'Email sent successfully' });
    });

  }

}
