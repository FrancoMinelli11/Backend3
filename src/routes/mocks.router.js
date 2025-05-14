

import { Router } from 'express'
import bcrypt from 'bcrypt'
import { fakerES as faker } from '@faker-js/faker'

import UserModel from '../models/user.model.js'
import PetModel from '../models/pet.model.js'


const router = Router()

// Generador de usuarios mock
function generateMockUser() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('coder123', 10),
    role: faker.helpers.arrayElement(['user', 'admin']),
    pets: []
  }
}

// Generador de mascotas mock
function generateMockPet() {
  return {
    name: faker.animal.name(),
    specie: faker.animal.type(),
    age: faker.number.int({ min: 1, max: 15 }),
    adopted: faker.datatype.boolean()
  }
}


router.get('/mockingusers', async (req, res) => {
  try {
    const users = Array.from({ length: 50 }, generateMockUser)
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


router.get('/mockingpets', (req, res) => {
  const pets = Array.from({ length: 100 }, generateMockPet)
  res.json(pets)
})


router.post('/generateData', async (req, res) => {
  try {
    const usersQty = parseInt(req.query.users) || 0
    const petsQty = parseInt(req.query.pets) || 0

    const users = Array.from({ length: usersQty }, generateMockUser)
    const pets = Array.from({ length: petsQty }, generateMockPet)

    await UserModel.insertMany(users)
    await PetModel.insertMany(pets)

    res.json({ message: `${usersQty} usuarios y ${petsQty} mascotas insertados.` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


router.get('/pets', async (req, res) => {
  try {
    const pets = await PetModel.find()
    res.json(pets)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
