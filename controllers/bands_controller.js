const bands = require('express').Router()
const db = require('../models')
const { Band, MeetGreet, Event, SetTime } = db
const { Op } = require('sequelize')

//ROUTES
//get bands
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll()
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})
//show band
bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name },
            include: [
                {
                    model: MeetGreet,
                    as: "meet_greets",
                    include: {
                        model: Event,
                        as: "event",
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                    }
                },
                {
                    model: SetTime,
                    as: "set_times",
                    include: {
                        model: Event,
                        as: "event",
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }

                    }
                }
            ]
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})
//create band
bands.post('/', async (req, res) => {
    try {
        const newBand = Band.create(req.body)
        res.status(200).json({
            message: 'successfully added new band',
            data: newBand
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//update band
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `successfully updated ${updatedBands} band(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})
//delete band
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `deleted ${deletedBands} bands(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = bands