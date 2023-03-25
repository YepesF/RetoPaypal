const express = require("express");
var api = express.Router();
const paymentController = require("../controllers/payment.controller");

api.post(`/create-payment`, paymentController.createPayment);
api.get(`/execute-payment`, paymentController.executePayment);

module.exports = api;
