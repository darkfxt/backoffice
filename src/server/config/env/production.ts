export const config = {
  env: 'production',
  newrelic: {
    app_name: 'API-FE-BACKOFFICE-PROD',
    license_key: '106a7812da3b90a948d8acb3a35bf8947c5e372b',
    log_level: 'error',
    agent_enabled: true
  },
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
    url: 'http://tg-geolocation-production:6006/geov2'
  },
  routes: {
    url: 'http://gl-routes-production:6001/routes'
  },
  trips: {
    url: 'http://api-trips-production:6008/trips'
  },
  idm: {
    url: 'http://tg-idm-production:6003/idm',
  },
  core: {
    url: 'http://tg-core-production:6004/core'
  },
  content: {
    url: 'http://gl-api-content-production:6007/content'
  }

};
