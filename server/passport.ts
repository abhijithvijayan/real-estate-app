import {
  IStrategyOptions as LocalStrategyOptions,
  Strategy as LocalStrategy,
} from 'passport-local';
import {
  StrategyOptions as JwtStrategyOptions,
  Strategy as JwtStrategy,
  ExtractJwt,
} from 'passport-jwt';
import passport from 'passport';
import {getRepository} from 'typeorm';

import {User} from './models/User';
import env from './env';

/**
 *  Local username + password strategy
 *
 *  http://www.passportjs.org/docs/username-password/
 */

const localOptions: LocalStrategyOptions = {
  usernameField: 'email', // name of fields for auth
  passwordField: 'password',
};

passport.use(
  new LocalStrategy(localOptions, async (email, password, done) => {
    const userRepository = getRepository(User);
    let user: User;

    try {
      // Get user from db
      user = await userRepository.findOneOrFail({where: {email}});

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
  })
);

/**
 *  JWT Auth Strategy
 *
 *  http://www.passportjs.org/packages/passport-jwt/
 */

const jwtOptions: JwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(
    jwtOptions,
    async (jwt_payload: string, done): Promise<void> => {
      const userRepository = getRepository(User);

      let user: User;
      try {
        // Get user from db
        user = await userRepository.findOneOrFail({
          where: {email: jwt_payload},
        });

        if (user) {
          return done(null, user);
        }

        return done(null, false);
      } catch (err) {
        return done(err);
      }
    }
  )
);
