const SellServices = require("../services/SellServices");


module.exports = {
    sellProductFirstWay(req, res, next){
        const { purchase } = SellServices;
        purchase.byBoleto(req, res, next);
    },
    sellProductSecondWay(req, res, next){
        const { purchase } = SellServices;
        purchase.byCreditCard(req, res, next);
    },
    sellProductMercadoPago(req, res, next){
        const { purchase_mercado_pago } = SellServices;
        purchase_mercado_pago.byCreditCard(req, res, next);
    }
}