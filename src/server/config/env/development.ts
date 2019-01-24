export const config = {
  env: 'development',
  newrelic: {
    app_name: 'API-FE-BACKOFICCE-DEV',
    license_key: 'fa39f2a5d23d346f07edace94a3a8d547c9e0c31',
    log_level: 'info',
    agent_enabled: true
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
    url: 'http://tg-geolocation-development:6006/geov2'
  },
  routes: {
    url: 'http://gl-routes-development:6001/routes'
  },
  idm: {
    url: 'http://tg-idm-development:6003/idm',
  },
  core: {
    url: 'http://tg-core-development:6004/core'
  },
  content: {
    url: 'http://gl-api-content-development:6007/content'
  }

};
