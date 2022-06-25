"use strict";

var AWS = require("aws-sdk");
var sqs = new AWS.SQS();

const receiverErrorHandling = (event, context, callback) => {
  const NUM_OF_RETRIES = 3;
  try {
    console.log("event: ", JSON.stringify(event));
    throw new Error("simulated error");
  } catch (e) {
    console.log("Handled error", e);
    var message = JSON.parse(event.Records[0].body); // message body arrives as string JSON
    var retried = message.retryCount | 0; // we've set batchSize=1 in sls config so it's save to get by index.
    if (retried > NUM_OF_RETRIES - 1) {
      const response = "Failed after retries";
      console.log(response);
      callback(null, response);
      // send to QLD 
      // process
    } else {
      retried++;
      message.retryCount = retried;

      // push message to Error Queue
      const region = context.invokedFunctionArn.split(":")[3];
      const accountId = context.invokedFunctionArn.split(":")[4];
      const queueName = "receiverQueue";

      const queueUrl = `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`;

      var params = {
        MessageBody: JSON.stringify(message),
        QueueUrl: queueUrl,
        DelaySeconds: 10,
      };

      sqs.sendMessage(params, function (err, data) {
        if (err) {
          console.log(err);
          callback("Failed to retry after error");
        } else {
          const response = "Failed, but will retry " + retried + " time";
          console.log(response);
          callback(null, response);
        }
      });
    }
  }
};

module.exports = { receiverErrorHandling };
