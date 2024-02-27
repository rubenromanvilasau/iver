const UserService = require('../services/user.service');
const ItemService = require('../services/item.service');
const itemService = new ItemService();
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
            if( err.code === 'P2002' ) {
                console.log('P2002')
                return res.status(409).send({ message: 'User already exists' });
            }
            res.status(500).send( err );
        }
    }
    
    async login( req, res ) {
        try {
            const { email, password } = req.body;
    
            const user = await userService.getByEmail( email );
            if( !user ) {
                return res.status(404).send({ message: 'User not found' });
            }
    
            const match = await bcrypt.compare( password, user.password );
            if( !match ) {
                return res.status(401).send({ message: 'Invalid credentials' });
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
                return res.status(404).send([]); 
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
                return res.status(404).send({ message: 'User not found' });
            }
    
            res.status(200).send( user );
        }catch( err ) {
            console.log('[CONTROLLERS-USERS] getUserById ERROR', err);
            res.status(500).send( err );
        }
    }

    async getByEmail( req, res ) {
        const { email } = req.params;
    
        try {
            const user = await userService.getByEmail( email );
    
            if( !user ) {
                return res.status(404).send({ message: 'User not found' });
            }
    
            res.status(200).send( user );
        }catch( err ) {
            console.log('[CONTROLLERS-USERS] getUserByEmail ERROR', err);
            res.status(500).send( err );
        }
    }

    async getItems( req, res ) {
        const{ id } = req.params;
        try {

            const user = await userService.getById( id );
            if( !user ) {
                return res.status(404).send({message: 'User not found'});
            }

            const items = await itemService.getUserItems( id );
            console.log( 'items',items );
            return res.status(200).send( items ); 
        } catch ( err ) {
            console.log('[CONTROLLERS-USERS] getItems ERROR ', err);
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
            console.log('[CONTROLLERS-USERS] updateUser ERROR', err);
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
            console.log('[CONTROLLERS-USERS] updatePreferences ERROR', err);
            res.status(500).send( err );
        }
    }

    async createAddress( req, res ) {
        const data = req.body;

        try {
            const user = await userService.createAddress( data );
            res.status(200).send( user );
        } catch ( err ) {
            console.log('[CONTROLLERS-USERS] createAddress ERROR', err);
            res.status(500).send( err );
        }
    }

    async getAddresses( req, res ) {
        const { id } = req.params;
        try {
            const user = await userService.getById( id );
            if( !user ) {
                return res.status(404).send({ message: 'User not found' });
            }
            const addresses = await userService.getAddresses( id );
            res.status(200).send( addresses );
        } catch ( err ) {
            console.log('[CONTROLLERS-USERS] getAddresses ERROR', err);
            res.status(500).send( err );
        }
    }

    async deleteAddress( req, res ) {
        const { id, user_id } = req.params;

        try {
            await userService.deleteAddress( id, user_id );
            res.status(204).send({ message: 'user deleted succesfully' });
        } catch ( err ) {
            console.log('[CONTROLLERS - USER] deleteAddress ERROR ', err);
            res.status(500).send( err );
        }
    }

    async updateAddress( req, res ) {
        const { id } = req.params;
        const { data } = req.body;
        try {
            await userService.updateAddress( id, data );
            res.status(201).send({ message: 'Address updated successfully'});
        } catch ( err ) {
            console.log('[CONTROLLERS - USER ] updateAddress ERROR ', err);
            res.status(500).send( err );
        }
    }
}

module.exports = UserController;