const bcrypt = require('bcrypt');
const { prisma } = require('../db');

class UsersService {

    //TODO WE NEED TO CREATE USER PREFRENCE REGISTER
    register( rut, name, last_name, username, password, email, phone ){
        return new Promise( ( resolve, reject ) => {
            bcrypt.hash( password, 10, ( err, hash ) => {
                if( err ) reject( err );

                console.log(rut, name, last_name, username, hash, email, phone);

                prisma.user.create({
                    data: {
                        rut,
                        name,
                        last_name,
                        username,
                        password: hash,
                        email,
                        phone,
                    }
                }).then( response => {
                    resolve( response );
                }).catch( err => {
                    reject( err );
                });
            });
        });
    }
    
    getAllUsers(){
        return prisma.user.findMany();
    }
    
    getById( rut ){
        return prisma.user.findFirst({
            where: {
                rut: rut,
            }
        });
    }

    getByEmail( email ){
        return prisma.user.findFirst({
            where: {
                email: email,
            },
            include: {
                preferences: true,
            }
        });
    }

    update( id, data ) {
        return prisma.user.update({
            where: { rut: id },
            data,
        });
    }

    updatePreferences( id, data ) {
        return prisma.userPreference.update({
            where: { user_id: id },
            data,
        });
    }

    createAddress( id, data ) {
        return prisma.userAddress.create({
            data: {
                user_id: id,
                ...data,
            }
        });
    }

    getAddresses( id ) {
        return prisma.userAddress.findMany({
            where: {
                user_id: id,
            }
        });
    }
}

module.exports = UsersService;