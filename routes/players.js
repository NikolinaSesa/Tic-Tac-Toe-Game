import {Player, validatePlayer} from '../models/players.js'
import express from 'express'
import lodash from 'lodash'
import bcrypt from 'bcrypt'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const players = await Player.find().select('-password')
    res.send(players)
})

router.get('/currentPlayer', auth, async (req, res) => {
    const player = await Player.findById(req.user._id)
    res.send(lodash.pick(player, ['_id', 'name', 'email']))

})

//registration
router.post('/', async (req, res) => { 
    const {_, error} = validatePlayer(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let player = await Player.findOne({email: req.body.email})
    if(player) return res.status(400).send('Player with entered email already exists.')

    player = new Player(lodash.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    player.password = await bcrypt.hash(player.password, salt)
    await player.save()
    
    const token = player.generateAuthToken()

    res.header('x-auth-token', token).send(lodash.pick(player, ['_id','name', 'email']))
})

export default router
