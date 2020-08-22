# Tracknote 🎵

## About

Tracknote (🎵) is an application for annotating Spotify playlists. Enhance your playlists by adding context and notes alongside your music selection

## Technology Stack

The tech stack for Tracknote is as follows:

* `client` - built using React, Next.js, and TypeScript
* `server` - built using Node.js, Express, and TypeScript with MongoDB as our underlying database

## Repo Organization

This repo hosts Monorepo's API and client code which should be treated as separate apps. To faciliate easy type and code sharing, there is also a `shared` folder used between both.

* `client` - hosts our React/Next application
* `server` - hosts our Node/Express server
* `shared/` - hosts shared types, utilites, and data

## Hosting

Currently, Tracknote is not being hosted anywhere but the plan is use the following services:

* Our client app will be hosted on a Vercel instance
* Our API server will be hosted on a separate AWS instance
* Will use a managed MongoDB instance from TBD

Also looking into setting up a safe staging environment using a similar setup as above