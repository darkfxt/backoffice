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
    url: 'https://dev.api.taylorgps.com/geov2'
  },
  routes: {
    url: 'https://dev.api.taylorgps.com/routes'
  },
  trips: {
    url: 'https://dev.api.taylorgps.com/trips'
  },
  idm: {
    url: 'https://dev.api.taylorgps.com/idm'
  },
  core: {
    url: 'https://dev.api.taylorgps.com/core'
  }

};
