# NBA Project

# Start

## Start your docker container

- `docker run --name mongodb-container -d -p 27017:27017 mongo`
  - if you want a specific name for the container
    - `docker run --name <inputContainername> -d -p 27017:27017: mongo`
- ensure the container is running

  - `docker ps`

- Scrape the data
- `node mongo.js`
