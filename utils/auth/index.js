import passport from 'passport';
import LocalStrategy from './strategies/local.js';
import JwtStrategy from './strategies/jwt.js';

passport.use(LocalStrategy);
passport.use(JwtStrategy);
