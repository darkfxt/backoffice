import * as moment from 'moment';
import { AccountsService } from './accounts.service';
import { CompanyService } from './company.service';

export interface IMailRequest {
  title: string;
  comment: string;
  username: string;
  company: string;
  account: string;
  time: string;
}

export class CommentsService {

  public static async create(body, headers): Promise<any> {
    // const account = await AccountsService.getDetail(resp.data.account_id, 'en', headers);
    // resp.data.account_id = account.data;
    const company = await CompanyService.getDetail(body.loggedUser.CompanyID, 'en', headers);
    const mailReq: IMailRequest = {
      comment: body.comment,
      title: body.title,
      username: body.loggedUser.Username,
      company: company.data.name,
      account: '',
      time: moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')
    };
    const aws = require('aws-sdk');
    aws.config = new aws.Config();
    aws.config.update({
      accessKeyId: 'AKIAYGVVKPYFIPRK5WFD',
      secretAccessKey: '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',
      region: 'us-east-1'});
    const to = ['support@taylorgps.com'];
    const bcc = ['ariel@taylorgps.com', 'enrico@taylorgps.com'];
    const from = 'support@taylorgps.com';

    if (!mailReq.comment)
      return { success: false, error: 'Message field is mandatory' };

    const params = {
      Source: from, Destination: { ToAddresses: to, BccAddresses: bcc },
      ReplyToAddresses: [
        mailReq.username
      ],
      Message: {
        Subject: { Data: `Formulario de contacto TaylorGPS` },
        Body: { Html: { Data: '<body>'
            + `<ul>
                  <li>Username: ${mailReq.username}</li>
                  <li>Company: ${mailReq.company}</li>
                  <li>Title: ${mailReq.title}</li>
                  <li>Comment: ${mailReq.comment}</li>
                  <li>Date: ${mailReq.time}</li>
              </ul>`
            + '</body>' }}
      }
    };

    return new aws.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
  }

}
