const chai = require('chai');
const response = require('mock-express-response');
const chaiHttp = require('chai-http');
const expectToBeAPromise = require('expect-to-be-a-promise');
const proxyquire = require('proxyquire').noCallThru();


chai.use(chaiHttp);
chai.use(expectToBeAPromise);
const expect = chai.expect;

describe('repositoryRedis', () => {

    it('Deberia retornar promesa de exito al intentar conectar a Redis', () => {
        const repositoryRedis = proxyquire('../../repository/repositoryRedis', {
            redis: {
                createClient: (port, host) => {
                    const auth = (txt, callback) => {
                        return callback();
                    }
                    const on = (txt, callback) => {
                        return callback();
                    }
                    return { auth: auth, on: on }
                }
            }
        });

        const result = repositoryRedis.cache();
        expect(result).to.be.a.promise;
    });

    it('Deberia resolver promesa con exito al intentar obtener datos de Redis', () => {
        const repositoryRedis = proxyquire('../../repository/repositoryRedis', {
            redis: {
                createClient: (port, host) => {
                    const auth = (txt, callback) => {
                        return callback();
                    }
                    const on = (txt, callback) => {
                        return callback();
                    }
                    const get = (id, callback) => {
                        return callback('', 'test')
                    }
                    return { auth: auth, on: on, get: get }
                }
            }
        });

        const result = repositoryRedis.getFromCache('test');
        expect(result).to.be.a.promise;
    });

    it('Deberia resolver promesa con fallo al intentar obtener datos de Redis', () => {
        const repositoryRedis = proxyquire('../../repository/repositoryRedis', {
            redis: {
                createClient: (port, host) => {
                    const auth = (txt, callback) => {
                        return callback();
                    }
                    const on = (txt, callback) => {
                        return callback();
                    }
                    const get = (id, callback) => {
                        return callback('error', '')
                    }
                    return { auth: auth, on: on, get: get }
                }
            }
        });

        const result = repositoryRedis.getFromCache('test');
        expect(result).to.be.a.promise;
    });

    it('Deberia resolver promesa con rechazo al intentar setear datos de Redis', () => {
        const repositoryRedis = proxyquire('../../repository/repositoryRedis', {
            redis: {
                createClient: (port, host) => {
                    const auth = (txt, callback) => {
                        return callback();
                    }
                    const on = (txt, callback) => {
                        return callback();
                    }
                    const set = (id, valor, ex, duracion, callback) => {
                        return callback('error', '')
                    }
                    return { auth: auth, on: on, set: set }
                }
            }
        });

        const result = repositoryRedis.setInCache('test', JSON.stringify({ test: 'test' }));
        expect(result).to.be.a.promise;
    });

    it('Deberia resolver promesa con exito al intentar setear datos de Redis', () => {
        const repositoryRedis = proxyquire('../../repository/repositoryRedis', {
            redis: {
                createClient: (port, host) => {
                    const auth = (txt, callback) => {
                        return callback();
                    }
                    const on = (txt, callback) => {
                        return callback();
                    }
                    const set = (id, valor, ex, duracion, callback) => {
                        return callback('', 'exito')
                    }
                    return { auth: auth, on: on, set: set }
                }
            }
        });

        const result = repositoryRedis.setInCache('test', JSON.stringify({ test: 'test' }));
        expect(result).to.be.a.promise;
    });

});