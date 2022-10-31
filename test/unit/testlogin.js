const TestWrapper = require('../utils/testWrapper')

describe('Login', () => {
    let testWrapper;
    beforeEach(() => {
        testWrapper = new TestWrapper();
    });

    afterEach(() => {
        testWrapper.closeServer();
    })

    it('should GET login page', (done) => {
        testWrapper.agent.get('/login').expect(200).end((err, res) => {
            if (err) {throw err}
            done();
        })
    });

    it('should login user with POST and redirect', (done) => {
        testWrapper.agent.post('/login')
            .send({email: 'janedoe@example.com', password: 'password'})
            .set('Accept', 'application/json')
            .expect(302)
            .expect('Location', '/profile')
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                done();
            })
    });

    it ('should fail login with invalid password', (done) => {
        testWrapper.agent.post('/login')
        .send({email: 'janedoe@example.com', password: 'INVALID_PASSWORD'})
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

    it ('should fail login when email does not exist' , (done) => {
        testWrapper.agent.post('/login')
        .send({email: 'INVALID_EMAIL@example.com', password: 'password'})
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


})