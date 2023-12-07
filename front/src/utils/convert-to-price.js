export const convertToPrice = ( price ) => {
    return price.toLocaleString('es-cl', {currency: 'CLP', style: 'currency'});
}