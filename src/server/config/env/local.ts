export const config = {
  env: 'local',
  db: {
    'type': 'mssql',
    'host': '184.168.194.77',
    'port': 1433,
    'username': 'Taylor',
    'password': 'TaylorAB2015',
    'database': 'TaylorGPS_prueba',
    'synchronize': false
  },
  aws: {
    s3: {
      'accessKeyId': 'AKIAIWKWSV2WVMSW4STA',
      'secretAccessKey': '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',
      'region': 'us-east-1',
      'apiVersion': '2006-03-01'
    }
  },
  googleApiKey: 'AIzaSyB79RxuTmeFJ97NQGQCEwdhsOE8trgocRg',
  geo: {
    url: 'http://localhost:3000'
  }
};
