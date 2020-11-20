# Qasong

## Frontend-only development

enter the frontend folder

`cd frontend`

install dependencies

`npm i`

start react frontend

`npm start`

the frontend should be live in dev mode at localhost:8080

## Backend-only development

install dependencies

`npm i`

start the server in dev mode

`npm run dev:server`

the server will be available at localhost:3016

this will only enable the api. if you want to see the frontend served by the server, you'll need to compile the frontend

`npm run build`

## Full development environment

install all packages and start both front and backend in dev mode

`npm run dev`

the frontend should be live at localhost:8080
the backend will be available at localhost:3016

note: the frontend is currently hardwired to communicate with the production api.
To see your backend changes in the frontend, you'll need to change the url in functions.js. 
you should find the development url there commented out. 

## About the Application

Qasong provides an alternate user interface for listening to music from youtube.

This project is currently under development and is scheduled for it's first release on December 20th, 2020.

## Links

[Qasong Team Discord](https://discord.gg/b2gEwT8)

[Qasong Web App](https://qasong.com)

[Google App Direct URL](https://qasong.appspot.com)

[Other Resources](https://team.qasong.com)

## CONTRIBUTING 

please make a pull request to the `develop` branch of this repo

for assistance working with this repo, contact us on [discord](https://discord.gg/b2gEwT8) or ping a contributer in an Issue. 
