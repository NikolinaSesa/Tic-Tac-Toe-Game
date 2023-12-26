import express, {Request, Response, Router} from "express"
import bcrypt from "bcrypt"
import lodash from "lodash"
import { Player, IPlayer, validatePlayer } from "../models/players"
import auth, {ICustomReq} from "../middlewares/auth"

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => { 

    const players = await Player.find({})
                                .select('-password')

    return res.send(players)
})

router.get('/currentPlayer', auth, async (req: Request, res: Response) => {

    const player = await Player.findById((req as ICustomReq).player._id)
                                .select('-password')

    return res.send(player)
})

//registration
router.post('/', async (req: Request, res: Response) => { 

    const error = validatePlayer(req.body).error
    if(error) return res.status(400).send(error.details[0].message)

    let player: IPlayer | null = await Player.findOne({email: req.body.email})
    if(player) return res.status(400).send('Player with entered email already exists.')

    player = new Player(lodash.pick(req.body, ['name', 'email', 'password']))

    const salt = await bcrypt.genSalt(10)
    player.password = await bcrypt.hash(player.password, salt)

    await player.save()
    
    return res.status(200).send(lodash.pick(player, ["_id", "name", "email"]))
})

export default router
