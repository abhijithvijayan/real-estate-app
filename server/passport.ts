import {Strategy as LocalStrategy} from 'passport-local';
import passport from 'passport';
import {getRepository} from 'typeorm';

import {User} from './models/User';

/**
 *  Local username + password strategy
 *
 *  https://www.passportjs.org/docs/username-password/
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // name of fields for auth
      passwordField: 'password',
    },
    async (email, password, done) => {
      const userRepository = getRepository(User);
      let user: User;
      try {
        user = await userRepository.findOneOrFail({where: {email}});

        // Get user from db
        if (!user) {
          return done(null, false);
        }

        if (!user.checkIfPasswordsMatch(password)) {
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
