# Qasong

Qasong provides an alternate user interface for listening to music from youtube.

This project is currently under development.

Learn more about our project at [team.qasong.com](http://team.qasong.com)

## ENVIRONMENT

A `.env` file must be added to the root directory of this project.

Your `.env` file must look like this:

```
NODE_ENV=development
SECRET=random-string-this-could-be-anything
```

## STARTING THE SERVER IN PRODUCTION MODE

`npm start`

the server will be available at http://localhost:3016

## STARTING THE SERVER AND FRONTEND IN DEVELOPMENT MODE

`npm run dev`

the frontend development server will be at http://localhost:8080

**the first time you run this, it will take a while as it installs all the packages needed from the server and frontend**

## DEPLOYMENT

`npm deploy`

this will

- build the react frontend into static assets in the public folder
- deploy the app to google cloud using instructions in `app.yaml`

## Contact

### Join Us on Discord

https://discord.gg/CpcKseP
