
	// Valida el rut con su cadena completa "XXXXXXXX-X"
const validateRut =  ( rut ) => {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rut )) {
        return false;
    }
    const tmp  = rutCompleto.split('-');
    const digv = tmp[1]; 
    const rut  = tmp[0];
    if ( digv == 'K' ) digv = 'k' ;
    return (Fn.dv(rut) == digv );
}
const dv = ( t ) => {
    var M=0,S=1;
    for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
    return S?S-1:'k';
}

// Uso de la función
alert( Fn.validaRut('11111111-1') ? 'Valido' : 'inválido');