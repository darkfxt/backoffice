export const config = {
  env: 'development',
  logger: {
    console: true,
    remote: {
      host: 'logstash01dv.almundo.it',
      port: 5515,
    },
  },
  apiBasePath: 'https://apist.almundo.com/api/',
  absBasePath: 'http://absdv.almundo.it:8080/abs/',
  db: {
    'type': 'mssql',
    'host': '184.168.194.77',
    'port': 1433,
    'username': 'Taylor',
    'password': 'TaylorAB2015',
    'database': 'TaylorGPS_prueba',
    'synchronize': false,
    'entities': [
      'build/server/api/**/*.entity.js'
    ]
  }
};
