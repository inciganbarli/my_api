const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
require("dotenv").config();

// serialize user - save user id to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize user - get user from database using id from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// GitHub OAuth strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if user already exists with this github id
        let user = await User.findOne({
          where: { githubId: profile.id.toString() },
        });

        if (!user) {
          // create a new user from github profile
          user = await User.create({
            username: profile.username || "github_user_" + profile.id,
            email:
              (profile.emails && profile.emails[0] && profile.emails[0].value) ||
              profile.username + "@github.com",
            githubId: profile.id.toString(),
            // no password needed for OAuth users
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
