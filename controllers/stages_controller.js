//dependencies
const stages = require('express').Router()
const db = require('../models')
const {Stage} = db
const {Op} = require('sequelize')

//get all stages
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            where: {
                stage_name: { [Op.like]: `%${req.query.stage_name ? req.query.stage_name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

//find stage by id
stages.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.id }
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

//create stage
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'inserted a new stage',
            data: newStage
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//edit stage
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `updated ${updatedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//delete stage
stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `deleted ${deletedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//export
module.exports = stages