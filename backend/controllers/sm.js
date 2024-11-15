const twilioClient = require('./../twilioClient'); // Import the Twilio client

const sendOrderConfirmation = (clientPhoneNumber, message) => {
  twilioClient.messages.create({
    body: 'Your Order is placed ', // Message to send
    from: '+13017684941', // Your Twilio phone number (replace with your actual Twilio number)
    to: clientPhoneNumber, // The phone number you want to send the message to
  })
  .then((message) => {
    console.log('Message sent:', message.sid);
  })
  .catch((error) => {
    console.error('Error sending message:', error);
  });
};

module.exports = { sendOrderConfirmation };