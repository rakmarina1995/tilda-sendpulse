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

    const sendPulseAPIUrl = 'https://events.sendpulse.com/events/id/399417d44db44038ec32672c96f1c912/8888586'; 
    const response = await axios.post(sendPulseAPIUrl, {
      email: data.email,
      name: data.Name,
      phone: data.phone,
      products: data.payment.products,
      total_price: data.payment.amount
    });

    console.log('SendPulse response:', response.data);
    res.status(200).send('Webhook processed');
  } catch (error) {
    console.error('Error processing webhook:', error.message);
    console.error('Error details:', error.response?.data || error.stack); 
    res.status(500).send('Error processing webhook');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});