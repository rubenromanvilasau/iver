const UserService = require('../services/user.service');
const userService = new UserService();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {

    async register( req, res ) {
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
            if( err.code === '23505' ) {
                res.status(409).send({ message: 'User already exists' });
                return;
            }
            res.status(500).send( err );
        }
    }
    
    async login( req, res ) {
        try {
            const { email, password } = req.body;
    
            const user = await userService.getByEmail( email );
            if( !user ) {
                res.status(404).send({ message: 'User not found' });
                return;
            }
    
            const match = await bcrypt.compare( password, user.password );
            if( !match ) {
                res.status(401).send({ message: 'Invalid credentials' });
                return;
            }
    
            const token = jwt.sign( { rut: user.rut, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' } );
    
            //TODO AGREGAR LAST LOGIN
    
            res.status(200).send({ ...user, token });
    
        } catch ( err ) {
            console.log('[CONTROLLERS-USERS] login ERROR', err);
            res.status(500).send( err );
        }
    }
    
    
    async getAll( req, res ) {
        try {
            const users = await userService.getAllUsers();
            
            if( users.length === 0 ) {
                res.status(404).send([]); 
                return;
            }
    
            res.status(200).send( users );
        } catch ( err ) {
            console.log('[CONTROLLERS-USERS] getAllUsers ERROR', err);
            res.status(500).send( err );
        }
    }
    
    async getById( req, res ) {
    
        const { id } = req.params;
    
        try {
            const user = await userService.getById( id );
    
            if( !user ) {
                res.status(404).send({ message: 'User not found' });
                return;
            }
    
            res.status(200).send( user );
        }catch( err ) {
            console.log('[CONTROLLERS_USERS] getUserById ERROR', err);
            res.status(500).send( err );
        }
    }

    async getByEmail( req, res ) {
        const { email } = req.params;
    
        try {
            const user = await userService.getByEmail( email );
    
            if( !user ) {
                res.status(404).send({ message: 'User not found' });
                return;
            }
    
            res.status(200).send( user );
        }catch( err ) {
            console.log('[CONTROLLERS_USERS] getUserByEmail ERROR', err);
            res.status(500).send( err );
        }
    }

    async update( req, res ) {
        const { id } = req.params;
        const data = req.body;
    
        try {
            const user = await userService.update( id, data );
            res.status(200).send( user );
        }catch( err ) {
            console.log('[CONTROLLERS_USERS] updateUser ERROR', err);
            res.status(500).send( err );
        }
    }

    async updatePreferences( req, res ) {
        const { id } = req.params;
        const data = req.body;

        try {
            const user = await userService.updatePreferences( id, data );
            res.status(200).send( user );
        } catch ( err ) {
            console.log('[CONTROLLERS_USERS] updatePreferences ERROR', err);
            res.status(500).send( err );
        }
    }
}

module.exports = UserController;