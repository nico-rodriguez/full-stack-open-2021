# Phonebook backend

## About

This is the backend, written in NodeJS, for the phonebook.

## Prerequisites

NodeJS version 14.x.x (at least).

## Deploying

First, the Heroku application was created with `heroku create`. The application was assigned the name `damp-chamber-99299`.

Then, the repository for it was created with `heroku git:remote -a damp-chamber-99299`.

In order to deploy the backend, from the root folder run

``` bash
git subtree push --prefix part3/phonebook-backend heroku master
```

This pushes only the subdirectory to the heroku remote.

## Usage

Run the server with `npm start`. Alternatively, run it on development mode, which enables hot reload, with `npm run dev`.
