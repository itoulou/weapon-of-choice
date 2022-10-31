const app = require('app')
const request = require('supertest')

class TestWrapper {
    constructor() {
        this.server = app.init();
        this.agent = request.agent(this.server.app);
    }

    closeServer() {
        this.server.http.close();
    }
}

module.exports = TestWrapper;