const events = require('express').Router()
const db = require('../models')
const {Event} = db
const {Op} = require('sequelize')

//get all events
events.get('/', async (req, res) => {
    try{
        const foundEvents = await Event.findAll({
            order: [['date','ASC']],
            where: {
                name: {[Op.like]: `%${req.query.name ? req.query.name: ''}`}
            }
        })
        res.status(200).json(foundEvents)
    }catch(error){
        res.status(500).json(error)
    }
})
//find event by id
events.get('/:id', async(req, res) => {
    try{
        const foundEvent = await Event.findOne({
            where: {event_id: req.params.id}
        })
        res.status(200).json(foundEvent)
    }catch(err){
        res.status(500).json(err)
    }
})

//create event
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'created new event',
            data: newEvent
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//edit event
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `updated ${updatedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//delete event
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `deleted ${deletedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


//Export
module.exports = events