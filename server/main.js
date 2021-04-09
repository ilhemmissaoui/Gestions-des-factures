import "../imports/startup/server/create-admin";
import "../imports/startup/server/create-roles";
import "../imports/api";
import { LinksCollection } from "../collections/links";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { WebApp } from "meteor/webapp";

Accounts.validateNewUser((user) => {
  console.log("this the user", user);
  return true;
});

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = LinksCollection.findOne({ _id });
    if (link) {
      res.statusCode = 302;
      res.setHeader("Location", link.url);
      res.end();
    } else {
      next();
    }
  });
});
