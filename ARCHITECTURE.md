# A detailed overview of how Kanketsu works

## Architectural descisions

- For high availablitiy and performance, the system uses Redis as a cache and MongoDB as a database
- Nginx is use to balance the load as well as a reverse proxy for backend server.
- Zookeeper eliminates the issue of race conditions by providing tokens for hash generation.
- Docker/docker-compose is used to containerize the application so that it's easy to depoly 

## base58 hashing algorithm 

While many of the system design articles and books recommend using the `base64` as method for hashing, we adopted base58 for simplicity and clarity, this line of reasoning as backed by Satoshi Nakamoto's explanation: TODO: url

- The characters 0,O, I, l are highly confusing when used in certain settings and are even quite harder to differentiate.
- Removing ponctuations characters prevent confusion for line breakers.
- Double-clicking selects the whole number as one word if it's all alphanumeric.

The tradeoff of using base58 is also minimal, for a hash that is 7 characters long we have :

$$ 58^7 = 2.2079842 * 10^{12} $$

## Database Design

Our system's datastore needs to be highly available, scalable and performant and the database schema does not require
any relations to other entities, therefore a NoSQL database is the perfect choice as relational databases are geared towards complex entities and can only be scaled vertically 

TODO: insert url schema 


## Global Cache 

Although a local in-memory cache would be a viable solution for low latency for a smaller number of nodes, the number of cache reads would increase up to the number of existing nodes. Which is why a global cache is more sustainable

## Sequence diagram


## API Specification 

```
The service can be accessed via this URL:
    Load Balanced Server: http://localhost:4000/

POST:
    /url/shorten : Shorten a long URL and store it in database and cache
GET:
    /url/expand/:hash : Retrieve the long format of an existing hash
```

## References

https://www.eddywm.com/lets-build-a-url-shortener-in-go-part-3-short-link-generation/

https://www.thinksoftwarelearning.com/pages/tiny-url-design#HLD-Cache

https://www.linkedin.com/pulse/system-design-url-shortener-rahul-arram