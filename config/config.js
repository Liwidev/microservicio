// simple configuration file

// server parameters

const optionsExpress = {
  port: 8000
}

const optionsTwitter = {
  consumer_key: 'YovoeLribO3D9i7sd4pmTwW7l',
  consumer_secret: 'uUieUlo6uLwzYTPEn6ntxAtUgeXwhKpJSmLcmxljTwKlHcwECf',
  token: '354411193-VMXg8qDGtZCmAAssN8TgYnBjTuVkcVq2FPGnanIj',
  token_secret: 'J8gJmrI54QHurIY5LqHOmulKMXnFbiXgeUZyLd0D76kae',
  url: 'https://api.twitter.com/1.1/search/tweets.json'
}

const optionsRedis = {
  port: 11074,
  host: 'redis-11074.c13.us-east-1-3.ec2.cloud.redislabs.com',
  duracion: 10
}

const optionsMongo = {
  urlMongoDB: 'mongodb://test:test@ds051750.mlab.com:51750/demobech',
  db: 'demobech',
  collection: 'demobech'
}

module.exports = { optionsMongo, optionsExpress, optionsRedis, optionsTwitter };