const consumer = async (event) => {
  try {
    for (const record of event.Records) {
      const messageAttributes = record.messageAttributes;
      console.log(
        "Message Attributtes -->  ",
        messageAttributes.AttributeNameHere.stringValue
      );
      console.log("Message Body -->  ", record.body);
      // Do something
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { consumer };

// var AWS = require('aws-sdk');
// // Set the region
// AWS.config.update({region: 'REGION'});

// // Create an SQS service object
// var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

// var queueURL = "SQS_QUEUE_URL";

// var params = {
//  AttributeNames: [
//     "SentTimestamp"
//  ],
//  MaxNumberOfMessages: 10,
//  MessageAttributeNames: [
//     "All"
//  ],
//  QueueUrl: queueURL,
//  VisibilityTimeout: 20,
//  WaitTimeSeconds: 0
// };

// sqs.receiveMessage(params, function(err, data) {
//   if (err) {
//     console.log("Receive Error", err);
//   } else if (data.Messages) {
//     var deleteParams = {
//       QueueUrl: queueURL,
//       ReceiptHandle: data.Messages[0].ReceiptHandle
//     };
//     sqs.deleteMessage(deleteParams, function(err, data) {
//       if (err) {
//         console.log("Delete Error", err);
//       } else {
//         console.log("Message Deleted", data);
//       }
//     });
//   }
// });
