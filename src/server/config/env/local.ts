export const config = {
  env: 'local',
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
    url: 'http://localhost:6002/geo'
  },
  routes: {
    url: 'http://localhost:6001/routes'
  },
  idm: {
    url: 'https://dev.api.taylorgps.com/idm'
  },
  core: {
    url: 'https://dev.api.taylorgps.com/core'
  }

};
