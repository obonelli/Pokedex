<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Run in development

1. Clone the repository
2. Execute
```
yarn install
```
3. Have Nest CLI installed
```
npm i -g @nestjs/cli
```

4. Raise the database
```
docker-compose up -d
```

5. Rebuild the database with Sync
```
http://localhost:3000/api/v2/sync
```

6. Enabled endPoints
```
http://localhost:3000/api/v2/sync GET
http://localhost:3000/api/v2/pokemon GET
http://localhost:3000/api/v2/pokemon/{pokemon-id / pokemon-name} GET
http://localhost:3000/api/v2/pokemon/type/{pokemon-type} GET
```

## Stack
* MongoDB
* Nest
* Typescript