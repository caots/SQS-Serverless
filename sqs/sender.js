const { SQS } = require("aws-sdk");

const sqs = new SQS();

const producer = async (event, context) => {
  let statusCode = 200;
  let message;

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No body was found",
      }),
    };
  }

  const region = context.invokedFunctionArn.split(":")[3];
  const accountId = context.invokedFunctionArn.split(":")[4];
  const queueName = "receiverQueue";

  const queueUrl = `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`;

  try {
    await sqs
      .sendMessage({
        QueueUrl: queueUrl,
        MessageBody: event.body,
        MessageAttributes: {
          AttributeNameHere: {
            StringValue: "Attribute Value Here",
            DataType: "String",
          },
        },
      })
      .promise();

    message = "Message placed in the Queue!";
  } catch (error) {
    console.log(error);
    message = error;
    statusCode = 500;
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
    }),
  };
};

module.exports = { producer };