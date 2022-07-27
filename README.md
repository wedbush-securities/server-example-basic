# Glue42 Server Example

This example demonstrates how to run Glue42 Server from NPM packages using basic authentication.

# Prerequisites 

## Setup your access to Glue42 JFROG artifactory

Some of the packages used in this example are in a private NPM repository - you need to have access to it.
Once you have, follow the steps to setup your dev env:

1. To prepare a **.npmrc** file:
   1. Login to Glue42 JFROG
   2. Expand menu in top right
   3. Click Setup
   4. Select NPM
   5. From the dropdown select default-npm-virtual
   6. Copy the snippet
2. Add a **.npmrc** file with the contents you just copied to **server** and **admin-ui** folders

## Prepare a running mongo instance

Once you have a running mongodb instance change the **mongoURI** variable in **server/src/index.ts**

# How to run the server

Execute 
```sh
cd server
npm i
npm run start
```

This will start the server with one predefined user (username:admin, password: admin)

# How to run the administrative UI

1. Execute 
```sh
cd admin-ui
npm i
npm run start
```

This will run the administrative UI on *http://localhost:3000/*. Use 
