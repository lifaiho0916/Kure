const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const webpush = require('web-push')
const app = express();
app.use(cors());
app.use(bodyParser.json());
const dummyDb = { subscription: null };
const port = 4000;
const vapidKeys = {
  publicKey:
    'BJ5IxJBWdeqFDJTvrZ4wNRu7UY2XigDXjgiUBYEYVXDudxhEs0ReOJRBcBHsPYgZ5dyV8VjyqzbQKS8V7bUAglk',
  privateKey: 'ERIZmc5T5uWGeRxedxu92k3HnpVwy_RCnQfgek1x2Y4',
}

webpush.setVapidDetails(
  'mailto:myuserid@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend) => {
  webpush.sendNotification(subscription, dataToSend)
}

const saveToDatabase = async subscription => {
  console.log(subscription);
  // Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
  // Here you should be writing your db logic to save it.
  dummyDb.subscription = subscription;
};

// The new /save-subscription endpoint
app.post("/save-subscription", async (req, res) => {
  console.log('save-subscription');

  const subscription = req.body;
  // Method to save the subscription to database.
  await saveToDatabase(subscription);
  res.json({ message: "success" });
});

app.get('/send-notification', (req, res) => {
  const subscription = dummyDb.subscription
  const message = "It freakin' works!";
  console.log(subscription);
  sendNotification(subscription, message)
  res.json({ message: 'message sent' })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.get("/", (req, res) => res.send("Hello World!"));