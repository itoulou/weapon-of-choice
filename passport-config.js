const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const { emit } = require('nodemon');
const db = require('./app/models/index')
const User = db.users;

function init(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({where: {email: email}});
        if (user == null) {
            return done(null, false, {message: 'Invalid email'});
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            }

            return done(null, false, {message: 'Password incorrect'})
        } catch (error) {
            return done (error);
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findByPk(id).then(function(user) { done(null, user); });
    });
}

module.exports = init