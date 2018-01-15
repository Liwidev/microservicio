const chai = require('chai');
const response = require('mock-express-response');
const chaiHttp = require('chai-http');
const expectToBeAPromise = require('expect-to-be-a-promise');
const proxyquire = require('proxyquire').noCallThru();


chai.use(chaiHttp);
chai.use(expectToBeAPromise);
const expect = chai.expect;

describe('repositoryMongo', () => {

    it('Deberia retornar error al intentar conectar a MongoDB', (done) => {
        function check(done, f) {
            try {
                f();
                done();
            } catch (e) {
                done(e);
            }
        }
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

        setTimeout(function () {
            check(done, function () {
                expect(res).to.have.a.property('statusCode', 500);
            });
        }, 100);

    })

    it('Deberia retornar exito al intentar conectar a MongoDB', (done) => {
        function check(done, f) {
            try {
                f();
                done();
            } catch (e) {
                done(e);
            }
        }

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
                                        toArray: toArray
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

        setTimeout(function () {
            check(done, function () {
                expect(res).to.have.a.property('statusCode', 200);
            });
        }, 100);

    })

    it('Deberia retornar fallo al intentar conectar a MongoDB', (done) => {
        function check(done, f) {
            try {
                f();
                done();
            } catch (e) {
                done(e);
            }
        }

        const repositoryMongo = proxyquire('../../repository/repositoryMongo', {
            mongodb: {
                MongoClient: {
                    connect: (options, callback) => {
                        const db = (options) => {
                            const collection = (options) => {
                                const find = (json) => {
                                    const toArray = (callback) => {
                                        return callback('error', '')
                                    }
                                    const test = {
                                        toArray: toArray
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

        setTimeout(function () {
            check(done, function () {
                expect(res).to.have.a.property('statusCode', 500);
            });
        }, 100);

    })

    it('Deberia retornar exito al obtener los herores con CACHE', (done) => {
        function check(done, f) {
            try {
                f();
                done();
            } catch (e) {
                done(e);
            }
        }
        const repositoryMongo = proxyquire('../../repository/repositoryMongo', {
            './repositoryRedis': {
                getFromCache: (test) => {
                    return new Promise((resolve, reject) => {
                        resolve(JSON.stringify({ test: 'exito' }));
                    })
                }
            },
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
                                        toArray: toArray
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
        const req = {};
        const res = new response();
        repositoryMongo.getAllHeroes(req, res);
        setTimeout(function () {
            check(done, function () {
                expect(res).to.have.a.property('statusCode', 200);
            });
        }, 100);
    })

    it('Deberia retornar exito al obtener los herores con CACHE', (done) => {
        function check(done, f) {
            try {
                f();
                done();
            } catch (e) {
                done(e);
            }
        }
        const repositoryMongo = proxyquire('../../repository/repositoryMongo', {
            './repositoryRedis': {
                getFromCache: (test) => {
                    return new Promise((resolve, reject) => {
                        resolve('fallo');
                    })
                }
            },
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
                                        toArray: toArray
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
        const req = {};
        const res = new response();
        repositoryMongo.getAllHeroes(req, res);
        setTimeout(function () {
            check(done, function () {
                expect(res).to.have.a.property('statusCode', 500);
            });
        }, 100);
    })

    it('Deberia retornar exito al obtener los herores sin CACHE sin Error', (done) => {
        function check(done, f) {
            try {
                f();
                done();
            } catch (e) {
                done(e);
            }
        }
        const repositoryMongo = proxyquire('../../repository/repositoryMongo', {
            './repositoryRedis': {
                getFromCache: (test) => {
                    return new Promise((resolve, reject) => {
                        resolve(false);
                    })
                },
                setInCache: (id, test) => {
                    return true;
                }
            },
            mongodb: {
                MongoClient: {
                    connect: (options, callback) => {
                        const db = (options) => {
                            const collection = (options) => {
                                const find = (json) => {
                                    const toArray = (callback) => {
                                        return callback('', { docs: 'docs' })
                                    }
                                    const test = {
                                        toArray: toArray
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
        const req = {};
        const res = new response();
        repositoryMongo.getAllHeroes(req, res);
        setTimeout(function () {
            check(done, function () {
                expect(res).to.have.a.property('statusCode', 200);
            });
        }, 100);
    })

    it('Deberia retornar exito al obtener los herores sin CACHE con Error', (done) => {
        function check(done, f) {
            try {
                f();
                done();
            } catch (e) {
                done(e);
            }
        }
        const repositoryMongo = proxyquire('../../repository/repositoryMongo', {
            './repositoryRedis': {
                getFromCache: (test) => {
                    return new Promise((resolve, reject) => {
                        resolve(false);
                    })
                },
                setInCache: (id, test) => {
                    return true;
                }
            },
            mongodb: {
                MongoClient: {
                    connect: (options, callback) => {
                        const db = (options) => {
                            const collection = (options) => {
                                const find = (json) => {
                                    const toArray = (callback) => {
                                        return callback('error', '')
                                    }
                                    const test = {
                                        toArray: toArray
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
        const req = {};
        const res = new response();
        repositoryMongo.getAllHeroes(req, res);
        setTimeout(function () {
            check(done, function () {
                expect(res).to.have.a.property('statusCode', 500);
            });
        }, 100);
    })
});