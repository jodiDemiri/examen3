const express = require('express')
const router = express.Router()
const Contact = require('../models/contacts')

// Getting all
router.get('/', async (req, res) => {
  try {
    const Contacts = await Contact.find()
    res.json(Contacts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//Getting One
router.get('/:id', getContact, (req, res) => {
  res.json(res.contact.name)
})

//Creating one
router.post('/', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
    birthday: req.body.birthday
  })
  try {
    const newContact = await contact.save()
    res.status(201).json(newContact)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
  
})

// Updating One
router.patch('/:id', getContact, async (req, res) => {
  if (req.body.name != null) {
    res.contact.name = req.body.name
  }
  if (req.body.phone != null) {
    res.contact.phone = req.body.phone
  }
  if (req.body.birthday != null) {
    res.contact.birthday = req.body.birthday
  }
  try {
    const updatedContact = await res.contact.save()
    res.json(updatedContact)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getContact, async (req, res) => {
  try {
    await res.contact.remove()
    res.json({ message: 'Deleted Contact' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getContact(req, res, next) {
  let contact
  try {
    contact = await Contact.findById(req.params.id)
    if (contact == null) {
      return res.status(404).json({ message: 'Cannot find Contact' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.contact = contact
  next()
}

module.exports = router