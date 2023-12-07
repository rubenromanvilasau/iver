export const convertToCurrency = ( price ) => {
    return price.toLocaleString('es-cl', {currency: 'CLP', style: 'currency'});
}