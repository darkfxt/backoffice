export const config = {
  env: 'production',
  aws: {
    s3: {
      'accessKeyId': 'AKIAIDY3Y2IKYIQ22HIA',
      'secretAccessKey': '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',
      'region': 'us-east-1',
      'apiVersion': '2006-03-01'
    }
  },
  googleApiKey: 'AIzaSyB79RxuTmeFJ97NQGQCEwdhsOE8trgocRg',
  geo: {
    url: 'http://gl-apibe-production:6002/geo'
  },
  routes: {
    url: 'http://gl-routes-production:6001/routes'
  },
  idm: {
    url: 'http://tg-idm-production:6003/idm',
  },
  core: {
    url: 'http://tg-core-production:6004/core'
  }

};
