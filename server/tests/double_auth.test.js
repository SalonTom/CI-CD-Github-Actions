const server = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest('http://localhost:3300');

describe('Login', () => {
    it('should be okay with any mail', async () => {
        const res = await requestWithSupertest.post('/login')
            .send({
                mail: 'test@test.com',
                password: 'ttttttt',
            })
            .expect(200);

        expect(res.body.user).toStrictEqual({
            id: 1,
            mail: 'test@test.com',
            auth_enabled : true
        });
    })

    it('should fail without mail', async () => {
        const res = await requestWithSupertest.post('/login')
            .send({
                login: 'test@test.com',
                password: 'ttttttt',
            })
            .expect(500);

        expect(res.text).toStrictEqual('Incorrect login data was sent.');
    })
})