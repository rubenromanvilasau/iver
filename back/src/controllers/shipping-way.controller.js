const ShippingWayService = require('../services/shipping-way.service');
const shippingWayService = new ShippingWayService();


class ShippingWayController {
    async getAll( req, res ) {
        try {
            const shippingWays = await shippingWayService.getAll();
            res.status(200).send( shippingWays );
        }catch( err ) {
            console.log('[CONTROLLERS-SHIPPING-WAY] getAll ERROR', err);
            res.status(500).send( err );
        }
    }
}

module.exports = ShippingWayController;