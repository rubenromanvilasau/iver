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

    updatePassword( id, password ) {
        return new Promise( ( resolve, reject ) => {
            bcrypt.hash( password, 10, ( err, hash ) => {
                if( err ) reject( err );

                prisma.user.update({
                    where: { rut: id },
                    data: { password: hash }
                }).then( response => {
                    resolve( response );
                }).catch( err => {
                    reject( err );
                });
            });
        });
    }

    createAddress( data ) {
        return prisma.userAddress.create({
            data: {
                street: data.address,
                number: data.number,
                city:   data.city,
                comuna: data.comuna,
                street: data.street,
                aditional_instructions: data.aditional_instructions,
                user: {
                    connect: {
                        rut: data.user_id
                    }
                }
            },
        });
    }

    getAddresses( id ) {
        return prisma.userAddress.findMany({
            where: { user_id: id }
        });
    }

    deleteAddress( id, user_id ) {
        return prisma.userAddress.delete({
            where: {
                user_id,
                id: parseInt(id),
            }
        });
    }
    
    updateAddress( id, data ) {
        return prisma.userAddress.update({
            where: { id },
            data,
        });
    }
}

module.exports = UsersService;