# Solace Interview Assessment

## Checking the work on a hosted server
Visit https://solace.josh-kimmm.com/ to see the final product. 

This project was made by using NextJS/Postgresql/AWS.

## Getting started locally
1. Make sure you have postgresql 15 installed. Instructions on how to do it is [here](https://www.postgresql.org/download/).

2. After installation, make sure you start the postgres server by either `sudo service postgresql start` or if you're on mac `brew services postgresql start` You should be be able to see a message that looks something like this " * Starting PostgreSQL 15 database server [ OK ]".

3. Create a local DB called "solace" by either the command line or installing PGAdmin4 and doing it through there. 

4. Now that postgres is setup, pull the latest code from github and run `npm i`. 

5. We need to sync our DB with the entities listed in our db folder. Change into the @/src/server/db folder and run `npm run sync`.

6. Migrations are the last step for DB setup so we need to run `npm run migration`.

7. Once everything's good, change back to the root directory of this project and run `npm run dev`.

8. Check to see everything is compiled and visit localhost:3000. 

## Things to note
1. The abundance of folders/files are more to show general project structure of how I'd start to organize these different files and projects together if it were a real life application.

2. I wanted to use a server query in order to help with the search function of this project. For a simple project, filtering out the note contents client side would achieve what the prompt wanted but I wanted to show knowledge of efficient text queries with a combination of GIN indexes. Initially, I was also going to include ts_vectors alongside ts_queries to help with multi word searches but I decided it was a bit too much of an overkill for what this app really is. Also, since the maximum length of a note content is 300 characters, it helped further my justification on not including a ts_vector column. 

3. I have a bunch of console.errors written out everywhere in the app but ideally those lines would be replaced with a 3rd party error handling app (Sentry, Rollbar, etc.) and an error state on the Frontend indicating something happened. I only have 1 "error" state in this app but it acts more like a constraint rather than a true error. 

4. I opted to use NextJS entirely for this project since there wasn't much backend logic needed to create simple routes. Only needed a db folder for TypeORM related things.

5. I decided to use ElasticBeanStalk over Vercel because I wanted to utilize some of the other AWS resources such as Route 53, AWS Certificate Manager, and RDS. The idea of having as much relevant technologies live in one place as much as possible is what I was striving for.

6. I needed my own .tsconfig file in server/db because the typescript modules in TypeORM couldn't get compiled properly with the .tsconfig file created by NextJS. Admittedly, I spent way too much time trying to use 1 config file thus it became something I had to deprioritize which led me to create a nice hacky way of making all this work together by running a startup script to initialize TypeORM. This actually helped a bit in project structure because now any DB related scripts I have to run in .../server/db folder, however the tradeoff here is that I don't get to see all the typescript errors with files created in /db since it uses its own .tsconfig file.

7. I wanted to fully utilize MaterialUI for all styling purposes which even includes CSS. Although they have a bit of an opinionated way of doing things, it actually gives quite a lot of flexibility on how you want style all their other components but it is a bit of a learning curve. Ideally I wouldve shoved all the MaterialUI CSS helper components/themes into a different file but since it didn't take up too much space, I didn't bother. 

6. A couple of DevOps related notes:

    1. I registered my own domain name with the deployment of this EB instance and made the connection possible via SSL/TLS certificates. 
    2. I made connections to dev DB require an SSL certificate in order to make the connection secure, thus the need to have a .ebextensions file with some pre-deploy scripts fetching a secured SSL key that the EB instance should have access to. 
    3. In an ideal world, I would've loved to deploy the rest of these functions as lambdas (I believe that's the purpose of creating routes within your NextJS app but it's totally speculation) but the overhead to do this took a lot more time than expected.