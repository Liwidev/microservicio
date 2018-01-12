const chai = require('chai');
const response = require('mock-express-response');
const chaiHttp = require('chai-http');
const expectToBeAPromise = require('expect-to-be-a-promise');
const proxyquire = require('proxyquire').noCallThru();


chai.use(chaiHttp);
chai.use(expectToBeAPromise);
const expect = chai.expect;

describe('repositoryMongo', () => {

    it('Deberia retornar error al intentar conectar a MongoDB', () => {
        const repositoryMongo = proxyquire('../../repository/repositoryMongo', {
            mongodb: {
                MongoClient: {
                    connect: (options, callback) => {
                        return callback('error', '')
                    },
                    collection: {
                        find: (json) => {
                            return 'test';
                        }
                    }
                }
            }
        });

        const res = new response();
        const req = {
            params: {
                heroe: 'spiderman'
            }
        }
        repositoryMongo.getHeroe(req, res);
        expect(res).to.have.a.property('statusCode', 200);
    })

    it('Deberia retornar exito al intentar conectar a MongoDB', () => {

        
        const repositoryMongo = proxyquire('../../repository/repositoryMongo', {
            mongodb: {
                MongoClient: {
                    connect: (options, callback) => {
                        const db = (options) => {
                            const collection = (options) => {
                                const find = (json) => {
                                    const toArray = (callback) => {
                                        return callback('', 'docs')
                                    }
                                    const test = {
                                        toArray : toArray
                                    }
                                    return test
                                }
                                const test = {
                                    find: find
                                }
                                return test
                            }
                            const test = {
                                collection: collection
                            }
                            return test
                        }

                        const test = {
                            db: db
                        }

                        return callback('', test)
                    }
                }
            }
        });

        const res = new response();
        const req = {
            params: {
                heroe: 'spiderman'
            }
        }
        repositoryMongo.getHeroe(req, res);
        expect(res).to.have.a.property('statusCode', 200);
        
    })
    
});