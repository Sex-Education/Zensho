# Zensho
## INTRODUCTION
Project Zensho (translating from Japanese to Vietnamese: “Toàn thư”) is an online data library website that functions like Wikipedia, but primarily serves to ease researchers with data collecting endeavors and fosters  data contributions from researchers and non-researchers alike.

Data collection and assessment are the most important parts of research. Experiments require a huge amount of data from a verified source, and the authenticity of the result has to be reflected upon the quality of the dataset itself. In recent years, more and more people are aspiring to become data scientists or data engineers, yet they lack a meaningful method of obtaining qualifiable data for their research. Data sources are scattered all around the world, from the Internet to people’s daily interactions, and gathering all these sources has taken researchers up to years or decades, not to mention the data processing time. We think that it is helpful for newcomers to obtain and work upon these available datasets instead of spending too much time gathering and polishing their data. We also want to create a platform where many people can contribute their own data and help researchers with their data collecting endeavor. 

This leads us to the idea of a website that functions as a “data library”, where datasets are treated as a product, and any individual can create, sell, buy, manage, or contribute to them. Researchers, for example, can post their dataset and request contribution from site visitors, or publish their assembled datasets for others to assess and expand upon. Normal people, on the other hand, can subscribe (by buying or requesting) and use the dataset for their own purpose, add in their gathered data or feedback its quality to the creator. Site users can be a data creator and a consumer at the same time (as long as they do not violate terms of usage), and they can have their own profile page to show off their background. We expect that the final product will deliver all of the above functionalities, on top of authorization (for safe, genuine web-based activities) and smart browsing features (users can navigate the site and find what they want easily).


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
