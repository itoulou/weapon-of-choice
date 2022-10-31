const TestWrapper = require('../utils/testWrapper')

describe('Home', () => {

    let testWrapper;
    beforeEach(() => {
        testWrapper = new TestWrapper();
    });

    afterEach(() => {
        testWrapper.closeServer();
    })

    it('should GET landing page', (done) => {
        testWrapper.agent.get('/').expect(200).end((err, res) => {
            if (err) {throw err}
            done();
        })
    })
})