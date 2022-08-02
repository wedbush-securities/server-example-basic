This example demonstrates how to run Glue42 Server from NPM packages using basic authentication.

## Prerequisites 

### Access
The NPM packages exposing the Glue42 Server and the Admin UI are hosted in a private NPM repository. To obtain access, contact us at info@glue42.com.

### Environment Setup
Generate an .npmrc file that will contain the authentication information for connecting to the private NPM repository. Make sure to exclude this file from your source control system.

To generate an .npmrc file:

* Login to Glue42 JFROG.
* Expand the menu in top right.
* Click "Setup".
* Select "NPM".
* From the dropdown menu select _default-npm-virtual_.
* Copy the snippet.
* Create an .npmrc file with the copied contents.

### Prepare a running mongo instance

Once you have a running mongodb instance change the **mongoURI** variable in **server/src/index.ts**

## How to run the server

Execute 
```sh
cd server
npm i
npm run start
```

This will start the server with one predefined user (username:admin, password: admin)

## How to run the administrative UI

1. Execute 
```sh
cd admin-ui
npm i
npm run start
```

This will run the administrative UI on *http://localhost:3000/*. Use (username:admin, password: admin) to login

## How to configure Glue42 Enterprise to use the server

You will need to edit system.json file located in %LocalAppData%\Tick42\GlueDesktop\config

### Connect to Glue42 Server
To configure Glue42 Enterprise to connect to the Glue42 Server, use the "server" top-level key. Add the following configuration to enable connection to the Glue42 Server:

```json
{
    "server": {
        "enabled": true,
        "url": "http://localhost:4356/api"
    }
}
```

This will add the Glue42 Server as an additional application store. If you want the Glue42 Server to be the only app store, set the "appStores" top-level key to an empty array.

This will also instruct Glue42 Enterprise to store Layouts and Application Preferences on the Glue42 Server.

### Use a custom login screen
To enable the custom login screen, use the "ssoAuth" top-level key

```json
{
    "ssoAuth": {
        "authController": "sso",
        "options": {
            "url": "http://localhost:3000/?gd",
            "window": {
                "width": 500,
                "height": 650,
                "mode": "flat"
            }
        }
    }
}
```

### Re-direct crashes to the server

```json
"crashReporter": {
      "enabled": true,
      "folderPath": "%GLUE-USER-DATA%/crashes",
      "companyName": "Tick42",
      "productName": "Glue42 Enterprise",
      "ignoreSystemCrashHandler": false,
      "output": {
         "type": "server",
         "serverUrl": "https://server-demos.glue42.com:4087/api/crashes"
      }
}
```
