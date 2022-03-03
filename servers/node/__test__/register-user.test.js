const request = require('supertest');
const app = require('../app');
const { User } = require('../models/index');

afterAll(async () => {
    await User.destroy({
        where: {}
    })
})

describe('POST /user/register', function() { 
    // Valid test register user.
    it('should send response with 201 status code', function(done) {
        const body = {
            username: 'nafisaalfiani234',
            email: 'nafisa.alfiani.ica@gmail.com',
            password: 'nafisa098',
            firstname: 'Nafisa',
            lastname: 'Alfiani'
        };

        request(app)
        .post('/user/register')
        .send(body)
        .end(function(err, res) {
            if (err) done(err)
            
            expect(res.statusCode).toEqual(201);
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

            done();
        })
    })

    // Invalid test username is required.
    it('should send response with 500 status code', function(done) {
        const body = {
            username: null,
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
            
            expect(res.status).toEqual(500);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('errors');
            expect(Array.isArray(res.body.errors)).toEqual(true);
            expect(res.body.errors[0].message).toEqual('Please enter your username');
        })
        done();
    })

    // Invalid test email formating.
    it('should send response with 500 status code', function(done) {
        const body = {
            username: 'nafisalfiani',
            email: 'nafisa.alfiani',
            password: 'nafisa098',
            firstname: 'Nafisa',
            lastname: 'Alfiani'
        };

        request(app)
        .post('/user/register')
        .send(body)
        .end(function(err, res) {
            if (err) done(err)
            
            expect(res.statusCode).toEqual(500);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('errors');
            expect(Array.isArray(res.body.errors)).toEqual(true);
            expect(res.body.errors[0].message).toEqual('Must be in email format');
        })
        done();
    })

    // Invalid test password is required.
    it('should send response with 500 status code', function(done) {
        const body = {
            username: 'nafisalfiani',
            email: 'nafisa.alfiani.icaaaa@gmail.com',
            password: null,
            firstname: 'Nafisa',
            lastname: 'Alfiani'
        };

        request(app)
        .post('/user/register')
        .send(body)
        .end(function(err, res) {
            if (err) done(err)
            
            expect(res.statusCode).toEqual(500);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('errors');
            expect(Array.isArray(res.body.errors)).toEqual(true);
            expect(res.body.errors[0].message).toEqual('Please enter your password');
            })
        done();
    })

    // Invalid test password at least 6 chars.
    it('should send response with 500 status code', function(done) {
        const body = {
            username: 'nafisalfiani',
            email: 'nafisa.alfiani.icaaaa@gmail.com',
            password: 'cu23',
            firstname: 'Nafisa',
            lastname: 'Alfiani'
        };

        request(app)
        .post('/user/register')
        .send(body)
        .end(function(err, res) {
            if (err) done(err)
            
            expect(res.statusCode).toEqual(500);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('errors');
            expect(Array.isArray(res.body.errors)).toEqual(true);
            expect(res.body.errors[0].message).toEqual('Please enter your password at least 6 chars');
        })
        done();
    })

    // Invalid test firstname is required.
    it('should send response with 500 status code', function(done) {
        const body = {
            username: 'nafisalfiani',
            email: 'nafisa.alfiani@gmail.com',
            password: 'nafisa098',
            firstname: null,
            lastname: 'Alfiani'
        };

        request(app)
        .post('/user/register')
        .send(body)
        .end(function(err, res) {
            if (err) done(err)
            
            expect(res.status).toEqual(500);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('errors');
            expect(Array.isArray(res.body.errors)).toEqual(true);
            expect(res.body.errors[0].message).toEqual('Please enter your first name');
        })
        done();
    })

    // Invalid test lastname is required.
    it('should send response with 500 status code', function(done) {
        const body = {
            username: "nafisaalfiani",
            email: 'nafisa.alfiani@gmail.com',
            password: 'nafisa098',
            firstname: 'Nafisa',
            lastname: null
        };

        request(app)
        .post('/user/register')
        .send(body)
        .end(function(err, res) {
            if (err) done(err)
            
            expect(res.status).toEqual(500);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('errors');
            expect(Array.isArray(res.body.errors)).toEqual(true);
            expect(res.body.errors[0].message).toEqual('Please enter your last name');
        })
        done();
    })
})