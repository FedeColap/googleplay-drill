const supertest = require('supertest');
const app = require('../app');
const {expect} = require ('chai');

describe('GET /plays', () => {
    it('should return an array of plays', () => {
        return supertest(app)
                            .get('/plays')
                            .expect(200)
                            .expect('Content-Type', /json/)
                            .then(res => {
                                    expect(res.body).to.be.an('array');
                                    expect(res.body).to.have.lengthOf.at.least(1);
                                    const play= res.body[0];
                                    expect(play).to.include.keys('App', 'Reviews', 'Category');
                            })
    });
    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
                    .get('/plays')
                    .query({ sort: 'MISTAKE' })
                    .expect(400, 'Sort must be one of app or rating');
    });

    
})