import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import { Request } from 'express';
import * as passport from 'passport';
import { UsersController } from '../controllers/Users';
import { UserWithId } from '../controllers/Users/types';

export class PassportConfig {
  private userService = new UsersController();

  constructor(passport: passport.PassportStatic) {
    const params: StrategyOptions = {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      passReqToCallback: true
    };

    const strategy = new Strategy(params, (_: Request, payload: any, done: VerifiedCallback) => {
      this.userService.getUserById(payload.id, (err: string, user: UserWithId) => {
        if (err) {
          return done(err, false);
        }

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });

    passport.use(strategy);
  }
}
