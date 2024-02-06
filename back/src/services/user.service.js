const bcrypt = require('bcrypt');
const { prisma } = require('../db');

class UsersService {

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
            }
        });
    }

    update( id, data ) {
        return prisma.user.update({
            where: { rut: id },
            data: data
        });
    }
}

module.exports = UsersService;