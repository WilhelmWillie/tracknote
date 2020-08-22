# Tracknote 🎵

## About

Tracknote (🎵) is an application for annotating Spotify playlists. Enhance your playlists by adding context and notes alongside your music selection

## Technology Stack

The tech stack for Tracknote is as follows:

* `client` - built using React, Next.js, and TypeScript
* `server` - built using Node.js, Express, and TypeScript with MongoDB as our underlying database

## Repo Organization

This repo hosts Monorepo's API and client code which should be treated as separate apps. To faciliate easy type and code sharing, there is also a `shared` folder used between both.

* `client/` - hosts our React/Next application
* `server/` - hosts our Node/Express server
* `shared/` - hosts shared types, utilites, and data

## Hosting

Currently, Tracknote is not being hosted anywhere but the plan is use the following services:

* Our client app will be hosted on a Vercel instance
* Our API server will be hosted on a separate AWS instance
* Will use a managed MongoDB instance from TBD

Also looking into setting up a safe staging environment using a similar setup as above

## Installation and Setup

TODO: clean this section up @WilhelmWillie

To start app and develop... first make sure to set up a Spotify Developer account and an app.
Once you have that, install the dependencies for both client and server:

```
# In /server
yarn install
```

```
# In /client
yarn install
```

Next, set up your `server/.env` file:

```
MONGODB_HOST={mongodb uri}

SPOTIFY_CLIENT_ID={your apps client id}
SPOTIFY_SECRET={your apps secret}
JWT_SECRET={ur server's JWT secret}
```

I need to clean this up, but you'll also need to update `client/utils/authorizeSpotify` and update line 1 to your Spotify client ID.

Once you have that set-up, you can run the `dev` script for both client and server:

```
# In /server
yarn dev
```

```
# In /client
yarn dev
```

(Note: make sure you have MongoDB up and running)

Everything should be smooth sailing after that. Visit `localhost:3000` to test out your app or `localhost:8000` to test out the API