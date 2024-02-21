## Kanketsu

Kanketsu (簡潔: concise; brief; succinct; ​), is a distributed short URL server designed for high availability 


## Installation 

1. Make sure that you have [Docker](https://docs.docker.com/) installed
2. Clone down this repository.
```sh
git clone https://github.com/farajist/kanketsu.git
```
3. Create environment file `.env` based on `.env.example`
4. In the project workding directory, run the docker-compose command
```sh
docker-compose up --build
```
5. The URL shortner service is now ready to serve requests:

```sh
curl --location 'localhost:4000/url/shorten' --header 'Content-Type: application/json' --data '{ "url": "http://www.example.com" }'
```

```sh
curl --location 'localhost:4000/url/expand/3PKb'
```
## System design 

The system design as well as architectural decisions are detailed [here]("ARCHITECTURE.md").

## License
