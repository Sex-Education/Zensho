# Zensho
## INTRODUCTION

## INSTALL WITH DOCKER

# Create volume for local DB
```
docker volume create data
```

# Build services
```
docker-compose up
```

## DEPLOY WITH HEROKU

### INITIALIZATION
```
$ heroku create YOUR-APP-NAME
$ heroku stack:set container
$ heroku addons:create heroku-postgresql:hobby-dev
```

### DEPLOYING
```
$ git push heroku YOUR-BRANCH
```