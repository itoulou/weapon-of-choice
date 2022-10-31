const bcrypt = require('bcrypt');
const db = require('../../models');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = db.users;

const register = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { username, email, password1 } = req.body;

            const data = {
                username,
                email,
                password: await bcrypt.hash(password1, 10)
            };
            
            const user = await User.create(data);

            if (user) {
                let token = jwt.sign({ id: user.id }, config.db.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000
                });
                
                res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log('user', JSON.stringify(user, null, 2));
                console.log(token);
                return res.redirect('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }   
    return res.render('entro/register.html', {});
}

module.exports = register;