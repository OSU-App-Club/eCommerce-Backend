require('dotenv').config()
const braintree = require('braintree');

async function processPayment(transaction, nonce) {
    const gateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId: process.env.BRAINTREE_API_MERCHANT_ID,
        publicKey: process.env.BRAINTREE_API_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_API_PRIVATE_KEY
    });
    const newTransactionResult = await gateway.transaction.sale({
        amount: String(transaction['Total_Cost']),
        paymentMethodNonce: nonce,
        options: {
            // This option requests the funds from the transaction
            // once it has been authorized successfully
            submitForSettlement: true
        }
    })
    return newTransactionResult;
}

module.exports = processPayment;