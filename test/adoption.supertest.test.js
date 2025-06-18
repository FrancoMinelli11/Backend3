import { faker } from '@faker-js/faker'
import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Test integradores para el router de Adoption',() => {
        let user;
        let pet;
        beforeEach(async function () {
                    const mockUser = {
            first_name:faker.person.firstName(),
            last_name:faker.person.lastName(),
            email:faker.internet.email(),
            password:faker.internet.password()
        }
        const mockPet = {
            name:faker.animal.petName(),
            specie:faker.animal.type(),
            birthDate:faker.date.anytime()
        }
        user = await requester.post('/api/sessions/register').send(mockUser)
        pet = await requester.post('/api/pets').send(mockPet)
        this.timeout(5000)
        })
    describe('Test GET para /api/adoptions', () => {
        it('Debe devolver un objeto con {payload:[], status:success}', async () => {
            const {_body,statusCode,ok} = await requester.get('/api/adoptions')
            expect(_body.payload).to.be.an('array')
            expect(_body).to.have.property('status')
            expect(_body.status).to.equal('success')
        })
    })
    describe('Test POST para /api/adoptions/:uid/:pid',() => {
        it('Debe poder adoptar una mascota y devolver el id de adoption', async () => {
            const userId = user._body.payload
            const petId = pet._body.payload._id
            const {_body,ok,statusCode} = await requester.post(`/api/adoptions/${userId}/${petId}`)
            let adoptedPet = await requester.get('/api/pets')
            adoptedPet = adoptedPet._body.payload[adoptedPet._body.payload.length - 1]
            expect(ok).to.be.true
            expect(statusCode).to.equal(200)
            expect(_body.aid).to.be.an('string')
            expect(adoptedPet._id).to.equal(petId)
            expect(adoptedPet.adopted).to.be.true
        })
    })
    describe('Test GET para /api/adoptions/:aid', () => {
            it('Debe devolver el _id de la adoption junto con el _id de owner y de pet', async () => {
            const userId = user._body.payload
            const petId = pet._body.payload._id
            const adoptionPet = await requester.post(`/api/adoptions/${userId}/${petId}`)
            const {_body,statusCode,ok} = await requester.get(`/api/adoptions/${adoptionPet._body.aid}`)
            expect(ok).to.be.true
            expect(statusCode).to.equal(200)
            expect(_body.payload.owner).to.equal(userId)
            expect(_body.payload.pet).to.equal(petId)
            })
    })
})