# RPR Prototype

This repository contains the code for the Node.js RPR (Regulated Professions Register) prototype

Steps to run:

## Install Dependencies

NPM (latest version)
Node.JS (latest version)
Docker 

## Environment Variables

- RUN_PENDING_MIGRATIONS = [ true or false ] => this will run any pending migrations when the app starts
- DB_SERVICE_NAME = [ name of the backing service bound to the app ]

### Development

- HOST <= hostname i.e. localhost
- PORT <= port i.e. 3000

### DB Connection (for LOCAL dev and running MIGRATIONS in the pipeline only)
First rename .env.template to .env (DO NOT COMMIT)

- TYPEORM_HOST = [ POSTGRES HOSTNAME ] <= 'localhost' if using the included docker-compose file
- TYPEORM_USERNAME = [ POSTGRES USERNAME ] <= 'user' if using the included docker-compose file
- TYPEORM_PASSWORD = [ POSTGRES PASSWORD ] <= 'testing' if using the included docker-compose file
- TYPEORM_DATABASE = [ POSTGRES DATABASE ] <= this needs to be set up first in Postgres
- TYPEORM_PORT = [ POSTGRES POST ] <= usually 5432

Or the following can be set which will take priority over the above options

- TYPEORM_URL = [ POSTGRES CONNECTION STRING ] => postgresql://.....

## Run the Prototype

### To run locally in development mode

Note: make sure the above environment variables are set.

```
cd dev 

docker-compose up -d

cd ..

npm install 

npm run dev
```

Go to http://localhost:3000 in your browser.


### To run locally in production mode

Note: make sure the above environment variables are set.

```
cd dev 

docker-compose up -d

cd ..

npm install 

npm run build

npm run start
```

Go to http://localhost:3000 in your browser.

## Database Migrations

### Generate a migration
```
npm run migration:generate [migration name]
```

### To run a migration LOCALLY for dev
```
npm run migration:migrate
```
### To run a migration for PRODUCTION in the release pipeline
```
npm run migration:migrate-prod
```