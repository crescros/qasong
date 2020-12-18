# Qasong

Test Workflow
![Test Workflow](https://github.com/IanWalston/qasong/workflows/Node.js%20CI/badge.svg)

React Test Coverage 
![React Test Coverage Branches](https://ianwalston.github.io/qasong/frontend/coverage/badges-branches.svg)
![React Test Coverage Functions](https://ianwalston.github.io/qasong/frontend/coverage/badges-functions.svg)
![React Test Coverage Lines](https://ianwalston.github.io/qasong/frontend/coverage/badges-lines.svg)
![React Test Coverage Statements](https://ianwalston.github.io/qasong/frontend/coverage/badges-statements.svg)


## About the Application

Qasong provides an alternate user interface for listening to music from youtube.

This project is currently under development and is scheduled for it's first release on December 20th, 2020.

## Links

Join us on Discord

[Qasong Team Discord](https://discord.gg/VnpcrtYnrS)

Production URL

[Qasong Web App](https://qasong.com)

Alternate URLs provided by our cloud host

[Alternate URL 1](https://qasong.appspot.com)

[Alternate URL 2](https://qasong.ew.r.appspot.com/)

### Frontend-only development

enter the frontend folder

`cd frontend`

install dependencies

`npm i`

start react frontend

`npm start`

the frontend should be live in dev mode at localhost:8080

### Backend-only development

install dependencies

`npm i`

start the server in dev mode

`npm run dev:server`

the server will be available at localhost:3016

this will only enable the api. if you want to see the frontend served by the server, you'll need to compile the frontend

`npm run build`

### Full development environment

install all packages and start both front and backend in dev mode

`npm run dev`

the frontend should be live at localhost:8080
the backend will be available at localhost:3016

note: the frontend is currently hardwired to communicate with the production api.
To see your backend changes in the frontend, you'll need to change the url in functions.js.
you should find the development url there commented out.

## CONTRIBUTING

please make a pull request to the `develop` branch of this repo

for assistance working with this repo, contact us on discord [discord](https://discord.gg/b2gEwT8) or ping a contributer in an Issue.
