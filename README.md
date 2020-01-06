# vue-node-passport

# Description

This is a small example of using an openID provider to add authentication to your  applications. I had a ton of trouble understanding the Passport workflow so hopefully this helps.

Try it out [here](https://vue-node-passport.herokuapp.com)!

It's using [Passport](https://www.npmjs.com/package/passport), and it's implemented on the frontend using [Vue.js](https://github.com/vuejs/vue), but any framework would work - accessing a single api point is all that needs to be done to check user logged-in status and retrieve data.

# Setup

1. Start with the obvious:

```
npm install
```

2. Rename `server/settings.js.example` to `server/settings.js` and fill in all of your information for Mongo, Twitch, etc.

## Running the Server

For this project, you'll be running two servers: a Node server for the backend, and vue-cli-service for hot-reloading and building your app. Run each of the following commands in two different terminals:

```
node server.js
npm run serve
```

The example app is now up and running. You should be able to login with your Twitch account.

# What if I want to login with [a different service]?

You'll need to change the Passport strategy. [Just about every service](http://www.passportjs.org/packages/) already has a passport strategy available. You'll need to update `server.js` but that's about it.

# I have more questions!

I'd love to help - UPDATE: I don't have social media anymore, so just leave an issue here on Github.
