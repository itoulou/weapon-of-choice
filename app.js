const express = require('express');
const config = require('config');
const nunjucks = require('nunjucks');
const loginRouter = require('./app/routes/auth/login');
const registerRouter = require('./app/routes/auth/register');
const profileRouter = require('./app/routes/profile/profile');
const tracksRouter = require('./app/routes/tracksplaylists/tracks');
const playlistRouter = require('./app/routes/tracksplaylists/playlist');
const db = require('./app/models/index');
const cookierParser = require('cookie-parser');
const path = require('path');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const middleware = require('./app/middleware/userAuth')
const methodOverride = require('method-override');
const { env } = require('process');

exports.init = function () {
    const app = express();
    const port = config.app.port;

    app.use(flash())
    app.use(session({
        secret: config.app.session.secretKey,
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(methodOverride('_method'))


    // Static
    nunjucks.configure(config.app.assets.path, {
        autoescape: true,
        express: app
    });
    app.set('public', path.join(__dirname, 'public'))
    app.use(express.static(__dirname + '/public/entro'));

    //Middleware
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookierParser());

    //DB
    db.sequelize.sync({ force: false, alter: true }).then(() => {
        console.log("db has been re sync")
    })

    //App
    app.get('/', middleware.checkAuthenticated, (req, res) => {
        res.render('entro/index.html');
    });

    const init = require('./passport-config')
    init(passport)  
    app.use('/login', middleware.checkNotAuthenticated, loginRouter)
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }))
    app.use('/register', middleware.checkNotAuthenticated, registerRouter);
    app.use('/profile', middleware.checkAuthenticated, profileRouter)

    app.use('/track', middleware.checkAuthenticated, tracksRouter);
    app.use('/playlist', middleware.checkAuthenticated, playlistRouter);

    app.delete('/logout', (req, res, next) => {
        req.logOut((error) => {
            if (error) {
                return next(error);
            }
            return res.redirect('/login')
        });
      })
    
    
   
    let http;
    http = app.listen(port, () => {
        console.log(`Now listening on port ${port}`);
    });
    
    return {app, http}
}