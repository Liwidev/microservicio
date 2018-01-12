const chai = require('chai');
const response = require('mock-express-response');
const PromiseMock = require('promise-mock');
const expectToBeAPromise = require('expect-to-be-a-promise');
const server = require('../../server/server');

chai.use(expectToBeAPromise);
const expect = chai.expect;
//const res = new response();
describe('Server', () => {
    it('Deberia retornar la promesa del servidor', () => {
        const result = server.start();
        result.then(
            (server) => {
                console.log('close');
                server.close();
            }
        );
        expect(result).to.be.a.promise;
    })
});