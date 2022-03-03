const request = require('supertest');
const app = require('../app');
const { User } = require('../models/index');

afterAll(async () => {
    await User.destroy({
        where: {}
    })
})

describe('User flow', function() {
    let id;
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

                // assigning newly created id
                id = res.body.id

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

    // login
    describe('GET /user/login', () =>{
        it("get single user token", (done) =>{
            const body = {
                username: '',
                email: 'nafisa.alfiani.ica@gmail.com',
                password: 'nafisa098',
            };

            request(app)
            .post('/user/login')
            .send(body)
            .end((err,res) =>{
                const { body,status } = res

                if(err){
                return done(err)
                }
                expect(status).toEqual(200)
                expect(body).toHaveProperty("access_token")
                done()
            })
        })
    })

    // Get all user.
    describe('GET /user/list', () =>{
        it("get all data in database", (done) =>{
            request(app)
            .get('/user/list')
            .end((err,res) =>{
                const { body,status } = res

                if(err){
                return done(err)
                }
                expect(status).toBe(200)
                expect(body[0]).toHaveProperty("username",expect.any(String))
                expect(body[0]).toHaveProperty("email",expect.any(String))
                expect(body[0]).toHaveProperty("password",expect.any(String))
                expect(body[0]).toHaveProperty("firstname",expect.any(String))
                expect(body[0]).toHaveProperty("lastname",expect.any(String))
                done()
            })
        })
    });

    describe('Success put user', () =>{
        it("should send response with 200 status code", (done) =>{
            const body = {
                username: 'nafisaalfiani234',
                email: 'nafisa.alfiani.ica@gmail.com',
                firstname: 'Bidadari',
                lastname: 'Cantik'
            };

            request(app)
            .put(`/user/update/${id}`)
            .send(body)
            .end( (err,res) =>{
            const { body,status } =res
            if(err){
                return done(err)
            }

            expect(res.status).toEqual(200)
            done();
            })
        })
    })

    describe('Success patch user', () =>{
        it("should send response with 200 status code", (done) =>{
            const body = {
                username: 'bidadaricantek',
            };

            request(app)
            .patch(`/user/edit/${id}`)
            .send(body)
            .end( (err,res) =>{
            const { body,status } =res
            if(err){
                return done(err)
            }

            expect(res.status).toEqual(200)
            done();
            })
        })
    })

    describe(' Success delete user' , () =>{
        it("should send response with 200 status code", (done) =>{
            request(app)
            .delete(`/user/delete/${id}`)
            .end( (err,res) =>{
            const { body,status } =res
            if(err){
                return done(err)
            }

            expect(res.status).toEqual(200)
            done()
            })
        })
    });
});