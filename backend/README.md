# Books-Backend

This is a node backend for get books api.

## Table of Contents

- [Books-Backend](#books-backend)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)

## Installation

1. Install the dependencies

```shell
npm install
```

2. Create a local Mongo DB server running and get the connection string from it. Later now rename .env-template file to .env and paste your mongo connection url to it.

3. Run command to fill data to database

```shell
npm run seed
```

4. Finally run your backend using command:

```shell
npm start
```

Now you have your backend running at 'http:localhost:3000'
