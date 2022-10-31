const db = require('../models');
const User = db.users;

const saveUser = async (req, res, next) => {
    if (req.method === 'POST') {
        try {
            const username = await User.findOne({
                where: {
                    username: req.body.username,
                }
            });
    
            if (username) {
                return res.json(409).send('Username already exists');
            }
    
            const emailCheck = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });
    
            if (emailCheck) {
                return res.json(409).send('Authentication failed');
            }
    
    
            const password1 = req.body.password1;
            const password2 = req.body.password2;
    
            if (password1 != password2) {
                return res.status(409).send(`Passwords don't match`);
            }

            next();
    
        } catch (error) {
            console.log(error)
        }
    } else {
        next();
    }
};

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login');
}

const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/profile')
    }
    next()
} 

module.exports = {
    saveUser,
    checkAuthenticated,
    checkNotAuthenticated
};