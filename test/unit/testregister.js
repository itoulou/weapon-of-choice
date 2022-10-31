const TestWrapper = require('../utils/testWrapper')

describe('Register', () => {
    let testWrapper;
    beforeEach(() => {
        testWrapper = new TestWrapper();
    });

    afterEach(() => {
        testWrapper.closeServer();
    })

    it('should GET register page', (done) => {
        testWrapper.agent.get('/register').expect(200).end((err, res) => {
            if (err) {throw err}
            done();
        })
    });

    it('should register user with POST and redirect', (done) => {
        testWrapper.agent.post('/register')
            .send({username: 'newusername', email: 'newemail@example.com', password1: 'password', password2: 'password'})
            .set('Accept', 'application/json')
            .expect(302)
            .expect('Location', '/login')
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                done();
            })
    });

    it('should not register user when passwords are not the same', (done) => {
        testWrapper.agent.post('/register')
            .send({username: 'newusername2', email: 'newemail2@example.com', password1: 'password', password2: 'DIFFERENT_PASSWORD'})
            .set('Accept', 'application/json')
            .expect(409)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                done();
            })
    })
})