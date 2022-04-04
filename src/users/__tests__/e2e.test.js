import request from "supertest"
import {jest} from '@jest/globals'
import app from '../../'
describe('user tests', () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDA0ZTJlMjE4ZDA4N2ZiMTRhMTg0YiIsImlhdCI6MTY0ODM4MTQ4NiwiZXhwIjoxNjU2MTU3NDg2fQ.Tf6ICs1Rxcl635_3Fp3MPMO-vY6OujYjlx31X94TXVM';
    describe('test signup', () => {
        let user, res;
        user = { name:"Angelus1234",
        email:"asd12@gmail.com",
        phone:"0785126627",
        password:"Angel123",
        role:"Admin",
        confirmPassword:"Angel123"
       }

        it('should signup unique user', async() => {
            res = await request(app)
            .post('/api/v1/users')
            .send(user)
            // token =
            expect(res.body.message).toContain(`user with email ${user.email} exists`)  
        }, 54000)
    })
    describe('blog tests', () => {
        let blog, res;
        blog = { title:"Angelus1234",
        article:"asd12@gmail.com",
        blogImage:"0785126627",
       }
        it('should add blog', async() => {
            res = await request(app)
            .post('/api/v1/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            console.log(res)
            expect(res.body.message).toContain("You do not have permission to perform this action")  
        }, 54000)
    })
})