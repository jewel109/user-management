An API server having uniform success and failure structure as well as CI/CD practice .

# Installation

Node version `v22.4.1`

Clone this repo running
`git clone https://github.com/jewel109/user-management.git <project-name>`

`cd` to `<project-name>` dir and run `pnpm install`

# Run the project

Make an `.env` file and copy the content from `.env.example` file later give value in `PORT` in `.env`.
You are now `<project-name>` dir.

Run the database by running `docker compose up --build`
Now run `pnpm run start:dev` to run the server.
You can see other available command in `package.json` file.
Your server is running now on the port *3232*.
Now run the tests by `pnpm test`
Now lint by `pnpm lint` and format by `pnpm format`

# End point

You can see the list of user by running `curl http://localhost:3232/user/users`

And you can add user to our server by running

```shell
curl -X POST http://localhost:3232/user/addUser \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "johndoe@example.com"
}'
```
