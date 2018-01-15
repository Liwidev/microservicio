const chai = require('chai');
const response = require('mock-express-response');
const chaiHttp = require('chai-http');
const expectToBeAPromise = require('expect-to-be-a-promise');
const proxyquire = require('proxyquire').noCallThru();



chai.use(chaiHttp);
chai.use(expectToBeAPromise);
const expect = chai.expect;

describe('serviceTwitter', () => {
    it('Deberia retornar exito a la llamada de la API de twitter', () => {
        const res = new response();
        const req = {
            params: {
                heroe: 'test'
            }
        }

        const serviceTwitter = proxyquire('../../service/serviceTwiter', {
            'request-promise-native': {
                get: (json) => {
                    return new Promise((resolve, reject) => { resolve({ 'test': 'exito' }) })
                }
            }
        });
        serviceTwitter.getTwits(req, res)
        expect(res).to.have.a.property('statusCode', 200);
    });

    it('Deberia retornar fallo a la llamada de la API de twitter', () => {
        const res = new response();
        const req = {
            params: {
                heroe: 'test'
            }
        }

        const serviceTwitter = proxyquire('../../service/serviceTwiter', {
            'request-promise-native': {
                get: (json) => {
                    return new Promise((resolve, reject) => { reject({ 'test': 'fallo' }) })
                }
            }
        });
        serviceTwitter.getTwits(req, res)
        expect(res).to.have.a.property('statusCode', 200);
    });
});