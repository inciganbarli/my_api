const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
require("dotenv").config();


passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

if (githubClientId && githubClientSecret) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: githubClientId,
        clientSecret: githubClientSecret,
        callbackURL:
          process.env.GITHUB_CALLBACK_URL ||
          "http://localhost:3000/auth/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({
            where: { githubId: profile.id.toString() },
          });

          if (!user) {
            user = await User.create({
              username: profile.username || "github_user_" + profile.id,
              email:
                (profile.emails && profile.emails[0] && profile.emails[0].value) ||
                profile.username + "@github.com",
              githubId: profile.id.toString(),
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
} else {
  console.log(
    "GitHub OAuth disabled: missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET"
  );
}

module.exports = passport;
