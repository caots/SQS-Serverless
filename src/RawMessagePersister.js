const { SQS } = require("aws-sdk");
const sqs = new SQS();
const configDb = require("../config/db");

const saveRawMessageSuccess = async (message) => {
  await configDb.db
    .put({
      TableName: configDb.TableName,
      Item: message,
    })
    .promise();
  return {
    statusCode: 200,
    body: JSON.stringify(message),
  };
};

const RawMessagePersister = async (event, context) => {
  let statusCode = 200;
  let message;
  const bodyData = JSON.parse(event.body);
  let errorMessage = true;
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "No body was found" }),
    };
  }

  if (!errorMessage) {
    // save data message to DB
    const messageBody = {
      id: bodyData.idMessage,
      content: "body message",
      status: "inprogress",
    };
    return saveRawMessageSuccess(messageBody);
  }
  // push message to Error Queue
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
            StringValue: "Attribute Value",
            DataType: "String",
          },
        },
      })
      .promise();
    message = "Message placed in the Queue!";
  } catch (error) {
    console.log('error: ', error);
    message = error;
    statusCode = 500;
  }
  console.log("body: ", message);
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      message,
      queueUrl,
    }),
  };
};

module.exports = { RawMessagePersister };
