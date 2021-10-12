# Lendesk Assignment

Please find attached all of the files needed to run my project.

Note that after you start the server it will be running on port 3000 so for example the signup route can be accessed at `localhost:3000/auth/signin`.

I have put together an API using express which is composed of the following routes:

1. POST /auth/signup - This route expects a username and a password and will enforce various rules including a minimum username length and password complexity. It will also verify that usernames are unique. Upon successfully POSTing to this endpoint a new user will be created in the redis data store.
2. POST /auth/signin - This route expects a username and a password and will attempt to sign a user in by comparing their username and password with what is available in the DB. It will validate for presence of username/password but nothing further. If there is an error when authenticating the message returned is intentionally obscure.

To run the project, I assume you have the necessary technologies installed, e.g. node, npm, redis etc. It should be as simple as running: `npm i` and then `npm run start`. It assumes that your redis instance is running on port 6379 so please ensure that is the case in order to test.

Some points of note:

- I worked on this project for approx 3-4 hours
- I have never used redis in a production environment and so may not have followed best practices
- Given more time I would have liked to add some tests
- I focused on ensuring clean architecture with a clear divide between each layer, e.g. controllers/business logic/data access while also meeting the projects requirements
- I used express-validator to validate requests, express as a server framework and bcrypt for password encryption
- I did not implement an actual auth system, e.g. providing a JWT or some kind of token upon successful login. It seemed out of scope for this project but could easily be implemented if needed.

Please get in touch if you have any questions or issues running the project.
