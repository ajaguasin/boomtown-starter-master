const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 2
  });
  // -------------------------------
}

function generateToken(user, secret) {
  const { id, email, fullname, bio } = user;

  const token = jwt.sign(
    {
      id: id,
      email: email,
      fullname: fullname,
      bio: bio
    },
    secret,
    { expiresIn: '2h' }
  );
  return token;
  // -------------------------------
}

module.exports = app => {
  return {
    async signup(parent, args, context) {
      try {
        const hashedPassword = bcrypt.hashSync(args.password);
        // -------------------------------

        const user = await context.pgResource.createUser({
          email: args.email,
          fullname: args.fullname,
          password: hashedPassword
        });

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        });

        return {
          id: user.id
        };
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    async login(parent, args, context) {
      try {
        const user = await context.pgResource.getUserAndPasswordForVerification(
          args.input.email
        );

        const valid = bcrypt.compareSync(args.input.password, user.password);
        // -------------------------------
        if (!valid || !user) throw 'User was not found.';

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        });

        return {
          id: user.id,
          fullname: user.fullname
        };
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    logout(parent, args, context) {
      context.req.res.clearCookie(app.get('JWT_COOKIE_NAME'));
      return true;
    }
  };
};
