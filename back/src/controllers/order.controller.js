const OrderService = require("../services/order.service");
const orderService = new OrderService();

class OrderController {
    
    async getAll( req, res ) {
        console.log('entrando')
        try {
            const orders = await orderService.getAll();
            res.status(200).send( orders );
        } catch ( err ) {
            console.log('[CONTROLLERS-ORDERS] getAllOrders ERROR', err);
            return res.status(500).json( err );
        }
    }
    
    async getById( req, res ) {
        const { id } = req.params;
        try {
            const order = await orderService.getById( id );
            res.status(200).json( order );
        } catch ( err ) {
            console.log('[CONTROLLERS-ORDERS] getOrder ERROR', err);
            return res.status(500).json( err );
        }
    }
    
    async create( req, res ) {
        try {
            const order = await orderService.create( req.body );
            res.status(201).json( order );
            
        } catch ( err ) {
            console.log('[CONTROLLERS-ORDERS] createOrder ERROR', err);
            return res.status(500).json( err );
        }
            
    }
    
    async update( req, res ) {
        const { id } = req.params;
        try {
            const order = await orderService.update( id, req.body );
            res.status(200).json( order );
        } catch ( err ) {
            console.log('[CONTROLLERS-ORDERS] updateOrder ERROR', err);
            return res.status(500).json( err );
        }
    }
    
    async delete( req, res ) {

        const { id } = req.params;
        try {
            await orderService.delete( id );
            res.status(204).json({ message: 'Order deleted' });
        } catch ( err ) {
            console.log('[CONTROLLERS-ORDERS] deleteOrder ERROR', err);
            return res.status(500).json( err );
        }
    }
}

module.exports = OrderController;