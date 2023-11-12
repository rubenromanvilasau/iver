const UserService = require('../services/users.service');
const userService = new UserService();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async( req, res ) => {
    try {
        const { 
            rut, 
            name, 
            last_name,
            username,
            password, 
            email, 
            phone,
        } = req.body;
        const user = await userService.register( rut, name, last_name, username, password, email, phone );
        res.status(201).send( user );
    } catch ( err ) {
        console.log('[CONTROLLERS-USERS] register ERROR', err);
        res.status(500).send( err );
    }
}

const login = async ( req, res ) => {
    try {
        const { email, password } = req.body;

        const user = await userService.getByEmail( email );
        if( user.length === 0 ) {
            res.status(404).send({ message: 'User not found' });
            return;
        }

        const match = await bcrypt.compare( password, user[0].password );
        if( !match ) {
            res.status(401).send({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign( { rut: user[0].rut, email: user[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' } );

        //TODO AGREGAR LAST LOGIN

        res.status(200).send({ ...user[0], token });

    } catch ( err ) {
        console.log('[CONTROLLERS-USERS] login ERROR', err);
        res.status(500).send( err );
    }
}


const getAllUsers = async( req, res ) => {
    try {
        const users = await userService.getAllUsers();
        
        if( users.length === 0 ) res.status(404).send([]); 

        res.status(200).send( users );
    } catch ( err ) {
        console.log('[CONTROLLERS-USERS] getAllUsers ERROR', err);
        res.status(500).send( err );
    }
}

module.exports = {
    getAllUsers,
    register,
    login,
};