# API architecture code sample using nodeJs | typescript | mongo atlas | S.OL.I.D  principle | express | docker compose | use test case


The API by itself doesn't do anything fancy, it's just a user CRUD with authentication capabilities.
Maybe we can transform this into something useful, a more advanced example, just open an issue and let's discuss the future of the repo.

## Development

We use `node` version `14.9.0`

```
nvm install 14.9.0
```

```
nvm use 14.9.0
```

The first time, you will need to run

```
npm install
```

Then just start the server with

```
npm run start
```

# Docker is setup 

run the command to run docker container:
```
docker-compose up
```



# Roadmap
- [x] API Validation layer (Celebrate+Joi)
- [ ] Unit tests examples
- [x] The logging _'layer'_
- [ ] Add agenda dashboard
- [x] Continuous integration with CircleCI 😍
- [x] The docker compose setup to run prod and developoment too
- [ ] Deploys script and docs for AWS Elastic Beanstalk and Heroku
- [ ] Integration test with newman 😉
- [ ] Instructions on typescript debugging with VSCode

