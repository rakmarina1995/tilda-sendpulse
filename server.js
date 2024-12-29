const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.post('/webhook', async (req, res) => {
  try {
    const data = req.body;
    console.log('Received data:', data);

    const sendPulseAPIUrl = 'https://api.sendpulse.com/some-endpoint'; 
    const response = await axios.post(sendPulseAPIUrl, {
      email: data.email,
      name: data.name,
      phone: data.phone,
      products: data.payment.products,
      total_price: data.payment.amount
    });

    console.log('SendPulse response:', response.data);
    res.status(200).send('Webhook processed');
  } catch (error) {
    console.error('Error processing webhook:', error.message);
    res.status(500).send('Error processing webhook');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});