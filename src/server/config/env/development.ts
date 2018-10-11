export const config = {
  env: 'development',
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
    url: 'http://gl-apibe-development:6002/geo'
  },
  routes: {
    url: 'http://gl-routes-development:6001/routes'
  },
  idm: {
    url: 'http://tg-idm-development:6003/idm',
  },
  core: {
    url: 'http://tg-core-development:6004/core'
  }

};
