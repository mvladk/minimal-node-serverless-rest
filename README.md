# Minimal Node Serverless REST

A **minimal** REST API built with:
- **Node.js** and **Express** for the web server
- **Serverless** Framework for AWS Lambda + API Gateway integration
- **Knex** for migrations and schema management
- **MySQL** (local via Docker Compose for development)

## Features

1. **CRUD** endpoints for `Employee` records (`name`, `familyName`, `position`, etc.).  
2. **Local Development** using `serverless-offline`.  
3. **Automated** local MySQL in a Docker container.  
4. **Database migrations** via Knex.  
5. **Structured logging** with Pino (optional `pino-pretty`).  

---

## Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/minimal-node-serverless-rest.git
cd minimal-node-serverless-rest
npm install
```

### 2. Run Locally
```bash
npm run start:local
```

## This script will:

1. Start a Docker container with MySQL
2. Wait 5 seconds (to allow MySQL to initialize)
3. Create the employees_db database (if not present)
4. Run Knex migrations (npm run db:migrate)
5. Launch serverless offline

## Default Local URL:
```bash
http://localhost:3000/dev
http://localhost:3000/v1
```

## Example endpoints:

* Health: GET http://localhost:3000/dev/health
* Get All Employees: GET http://localhost:3000/dev/employees
* Create Employee: POST http://localhost:3000/dev/employees

```bash
curl -X GET http://localhost:3000/dev/employees
curl -X POST http://localhost:3000/dev/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","familyName":"Smith","position":"Engineer","address":"123 Main St","phone":"555-1234","email":"alice@example.com"}'
```


### 3. Changing the Stage or Removing /dev
By default, serverless-offline uses the stage name (dev) in the path. You can:

* Change the stage in serverless.yml (under provider.stage) or via CLI --stage.
* Remove it by adding:

```yaml
custom:
  serverless-offline:
    noPrependStageInUrl: true
```
Then your endpoints will be http://localhost:3000/employees instead of http://localhost:3000/dev/employees.


Scripts Overview
npm run db:up: Runs docker compose up -d (starts MySQL in the background).
npm run db:down: Runs docker compose down (stops MySQL container).
npm run db:create: Runs a small bash script (scripts/create-db.sh) to create the employees_db if needed.
npm run db:migrate: Executes Knex migrations (knex migrate:latest).
npm run db:rollback: Rolls back the last Knex migration.
npm run start:local: The all-in-one command:
Up MySQL container
Sleep 5 seconds
Create the DB
Migrate
Launch serverless-offline
npm run dev: Just starts serverless-offline (no Docker steps).
npm run deploy: Deploys to AWS if you configure your AWS credentials and expand the serverless.yml.

### Project Structure
minimal-node-serverless-rest
├── docker-compose.yml
├── package.json
├── serverless.yml
├── knexfile.js
├── migrations
│   └── 20231001000000_create_employees_table.js
├── scripts
│   └── create-db.sh
├── src
│   ├── app.js
│   ├── db.js
│   ├── employees.router.js
│   ├── handler.js
│   └── logger.js
└── README.md


* docker-compose.yml: Defines the local MySQL container.
* scripts/create-db.sh: Script to create the DB (employees_db).
* migrations/: Knex migration files.
src/:
* app.js sets up Express.
    * employees.router.js has the CRUD routes.
    * db.js handles MySQL connection pooling.
    * handler.js wraps the Express app with serverless-http.
    * logger.js configures Pino logging.

### Deploying to AWS
1. Configure AWS credentials (e.g., aws configure).
2. Update serverless.yml with any environment variables (like DB host, user, password) if you plan to use RDS.
3. Possibly add an IAM role and VPC config (if using a private RDS).
4. Run:
```bash
npm run deploy
or
serverless deploy
```
Test your endpoints at the returned API Gateway URL (e.g., https://abcdefgh.execute-api.us-east-1.amazonaws.com/dev/employees).

### Contributing
Feel free to submit issues or pull requests to improve functionality, add more routes, or integrate advanced features like:

* JWT authentication
* Secrets Manager or SSM Parameter Store for DB credentials
* Knex seeds for sample data

License
MIT