const request = require('supertest');
const app = require('../app');
const { User } = require('../models/index');
const { encrypt } = require('../helpers/encryption');


afterAll(async () => {
    await User.destroy({
        where: {}
    })
})
describe('POST /user/register', function() { 
    it('should send response with 201 status code', function(done) {
        const body = {
            username: 'nafis',
            email: 'nafisa.alfiani@gmail.com',
            password: 'nafisa098',
            firstname: 'Nafisa',
            lastname: 'Alfiani'
        };

        request(app)
        .post('/user/register')
        .send(body)
        .end(function(err, res) {
            if (err) done(err)
            
            expect(res.status).toEqual(201);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('id');
            expect(typeof res.body.id).toEqual('number') ;
            expect(res.body).toHaveProperty('username');
            expect(res.body.username).toEqual(body.username);
            expect(res.body).toHaveProperty('email');
            expect(res.body.email).toEqual (body.email);
            expect(res.body).toHaveProperty('password');
            expect(res.body.password).toBeTruthy();
            expect(res.body).toHaveProperty('firstname');
            expect(res.body.firstname).toEqual(body.firstname);
            expect(res.body).toHaveProperty('lastname');
            expect(res.body.lastname).toEqual(body.lastname);
            // jest.setTimeout(30000)
            done();
        })

        



    })
})