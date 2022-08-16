const redis =  require("ioredis");

const {redisHost, redisPort} = process.env;

class Cache {
  constructor() {
    this.client = redis.createClient({
      host: redisHost,
      port: redisPort,
    });
  }

  set(key, value, expiry = 3600) {
    this.client.set(key, JSON.stringify(value), "EX", expiry);
  }

  async get(key) {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  delete(key) {
    this.client.del(key);
  }
}

module.exports = new Cache();
