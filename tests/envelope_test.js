const assert = require('assert');
let chai = require('chai');
let server = require('../server');
let chaiHttp = require('chai-http');
const { response } = require('express');

chai.should();
chai.use(chaiHttp);

describe('Test all envelope operations', () => {

    describe("Test GET route for /api/envelope", () => {
        it( 'It should return all of the budget envolopes', (done) => {
            chai.request(server)
                .get("/api/envelope")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.not.be.eq(0);
                done();
                })
        })

        it( 'It should return the rent envelope', (done) => {
            chai.request(server)
                .get("/api/envelope/Rent")
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                })
        })
    })

    describe("Test POST route for /api/envelope", () => {
        it('Creates one new envelope budgeting object', (done) => {
            chai.request(server)
                .post("/api/envelope?envelope=movies&balance=200")
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                })
        })
    });
})