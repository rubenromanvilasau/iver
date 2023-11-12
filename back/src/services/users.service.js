const db = require('../../config/db');
const bcrypt = require('bcrypt');

class UsersService {

    register( rut, name, last_name, username, password, email, phone ){
        return new Promise( ( resolve, reject ) => {
            bcrypt.hash( password, 10, ( err, hash ) => {
                if( err ) reject( err );
                const query = `insert into users (rut, name, last_name, username, password, email, phone) values ('${ rut }', '${ name }', '${ last_name }', '${ username }', '${ hash }', '${ email }', '${ phone }')`;
                db.query(query, ( err, response ) => {
                    console.log( err )
                    if( err ) reject( err );
                    resolve( response.rows );
                });
            });
        });
    }
    
    getAllUsers(){
        const query = 'select * from users';
        return new Promise( ( resolve,reject ) => {
            db.query(query, ( err, response ) => {
                if( err ) reject( err );
                resolve( response.rows );
            });
        })
    }

    getByEmail( email ){
        const query = `select * from users where email='${ email }'`;
        return new Promise( ( resolve,reject ) => {
            db.query(query, ( err, response ) => {
                if( err ) reject( err );
                resolve( response.rows );
            });
        });
    }
    
    getUser( rut ){
        const query = `select * from users where rut='${ rut }'`;
        db.query(query, ( err, response ) => {
            if( err ) throw err;
            return response.rows;
        });
    }
}

module.exports = UsersService;