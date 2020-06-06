import path from 'path';

module.exports = {

  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, 'src', 'app', 'database', 'database.sqlite'),
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'app', 'database', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'app', 'database', 'seeds')
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'app', 'database', 'database_test.sqlite')
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'app', 'database', 'migrations')
    },
    useNullAsDefault: true
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
