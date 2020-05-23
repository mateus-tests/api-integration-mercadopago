const pagarme = require('pagarme');
const mercadopago = require('mercadopago');
require('../config/getEnv');

module.exports = {
    purchase: {
        async byCreditCard(req, res, next) {
            const client = await pagarme.client.connect({ api_key: `${process.env.PAGARME_API_KEY}` }).catch(err => { console.log(err) });
            const response = await client.transactions.create({
                amount: 21000,
                card_number: '4111111111111111',
                card_cvv: '123',
                card_expiration_date: '0922',
                card_holder_name: 'Morpheus Fishburne',
                customer: {
                    external_id: '#3311',
                    name: 'Morpheus Fishburne',
                    type: 'individual',
                    country: 'br',
                    email: 'mopheus@nabucodonozor.com',
                    documents: [
                        {
                            type: 'cpf',
                            number: '00000000000'
                        }
                    ],
                    phone_numbers: ['+5511999998888', '+5511888889999'],
                    birthday: '1965-01-01'
                },
                billing: {
                    name: 'Trinity Moss',
                    address: {
                        country: 'br',
                        state: 'sp',
                        city: 'Cotia',
                        neighborhood: 'Rio Cotia',
                        street: 'Rua Matrix',
                        street_number: '9999',
                        zipcode: '06714360'
                    }
                },
                shipping: {
                    name: 'Neo Reeves',
                    fee: 1000,
                    delivery_date: '2000-12-21',
                    expedited: true,
                    address: {
                        country: 'br',
                        state: 'sp',
                        city: 'Cotia',
                        neighborhood: 'Rio Cotia',
                        street: 'Rua Matrix',
                        street_number: '9999',
                        zipcode: '06714360'
                    }
                },
                items: [
                    {
                        id: 'r123',
                        title: 'Red pill',
                        unit_price: 10000,
                        quantity: 1,
                        tangible: true
                    },
                    {
                        id: 'b123',
                        title: 'Blue pill',
                        unit_price: 10000,
                        quantity: 1,
                        tangible: true
                    }
                ]
            }).catch(err => { console.log(err.response.errors) })
            res.json({ success: response });
        },
        async byBoleto(req, res, next) {
            const client = await pagarme.client.connect({ api_key: `${process.env.PAGARME_API_KEY}` }).catch(err => { console.log(err) });
            const response = await client.transactions.create({
                amount: 1000,
                payment_method: 'boleto',
                postback_url: 'http://requestb.in/pkt7pgpk',
                customer: {
                    type: 'individual',
                    country: 'br',
                    name: 'Aardvark Silva',
                    documents: [
                        {
                            type: 'cpf',
                            number: '00000000000',
                        },
                    ],
                },
            }).catch(err => { console.log(err.response.errors) })
            res.json({ success: response });
        }
    },
    purchase_mercado_pago: {
        async byCreditCard(req, res, next) {
            mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN);
            const { transaction_amount, token, description, installments, payment_method_id, email } = req.body;

            const payment_data = {
                transaction_amount: transaction_amount,
                token: token,
                description: description,
                installments: installments,
                payment_method_id: payment_method_id,
                payer: {
                    email: email
                }
            };
            
            const data = await mercadopago.payment.save(payment_data);
            if(data){
                console.log(data);
                return res.json(data);
            }
            return res.json({ status : 400 });
        },
    }
}