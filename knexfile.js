module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '12345',
        database: 'employees_db',
        port: 3306
      },
      migrations: {
        directory: './migrations'
      }
    }
  };
  