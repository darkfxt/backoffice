export const config = {
  env: 'local',
  newrelic: {
    app_name: 'API-FE-BACKOFFICE-DEV',
    license_key: 'fa39f2a5d23d346f07edace94a3a8d547c9e0c31',
    log_level: 'info',
    agent_enabled: false
  },
  aws: {
    s3: {
      'accessKeyId': 'AKIAIKKMPF54FK7QZMUA',
      'secretAccessKey': '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',
      'region': 'us-east-1',
      'apiVersion': '2006-03-01'
    }
  },
  googleApiKey: 'AIzaSyB79RxuTmeFJ97NQGQCEwdhsOE8trgocRg',
  geo: {
    url: 'http://TG-PRD-ExternalLoa-12NMRNXRFWJO4-1651206308.us-east-1.elb.amazonaws.com:6006/geov2'
  },
  routes: {
    url: 'http://TG-PRD-ExternalLoa-12NMRNXRFWJO4-1651206308.us-east-1.elb.amazonaws.com:6001/routes'
  },
  trips: {
    url: 'http://TG-PRD-ExternalLoa-12NMRNXRFWJO4-1651206308.us-east-1.elb.amazonaws.com:6008/trips'
  },
  idm: {
    url: 'http://TG-PRD-ExternalLoa-12NMRNXRFWJO4-1651206308.us-east-1.elb.amazonaws.com:6003/idm'
  },
  core: {
    url: 'hhttp://TG-PRD-ExternalLoa-12NMRNXRFWJO4-1651206308.us-east-1.elb.amazonaws.com:6004/core'
  },
  content: {
    url: 'http://TG-PRD-ExternalLoa-12NMRNXRFWJO4-1651206308.us-east-1.elb.amazonaws.com:6007/content'
  }

};
