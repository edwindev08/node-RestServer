
const { Router } = require('express')
const { 
    getUsers, 
    postUser, 
    putUser,
    patchUser,
    deleteUser
} = require('../controllers/user')

const router = Router()

router.get('/', getUsers)
router.post('/', postUser )
router.put('/:id', putUser)
router.delete('/', deleteUser )
router.patch('/', patchUser )


module.exports = router;