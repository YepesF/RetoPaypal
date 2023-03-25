import { PAYPAL_API, CLIENT, SECRET } from "../config";

const request = require("request");

const auth = {
  user: CLIENT,
  pass: SECRET,
};

const createPayment = async (req, res) => {
  console.log(auth);
  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "25",
        },
      },
    ],
    application_context: {
      brand_name: "Mercado Tech",
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: `http://localhost:3700/api/execute-payment`,
      cancel_url: `http://localhost:3700/api/cancel-payment`,
    },
  };
  await request.post(
    `${PAYPAL_API}/v2/checkout/orders`,
    {
      auth,
      body,
      json: true,
    },
    (err, response) => {
      if (err) res.status(500).send({ error: err });
      if (!response)
        res.status(404).send({ message: "No se pudo comunicar con Paypal" });
      if (response) res.status(200).send({ data: response.body });
    }
  );
};

const executePayment = async (req, res) => {
  const { token } = req.query;
  console.log(token);
  console.log(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`);
  await request.post(
    `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
    {
      auth,
      body: {},
      json: true,
    },
    (err, response) => {
      console.log(response.body);
      //res.redirect("/payed.html");
      res.json({ data: response.body });
    }
  );
};

module.exports = {
  createPayment,
  executePayment,
};
