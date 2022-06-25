"use strict";
const { RawMessagePersister } = require("./src/RawMessagePersister");
const { consumer } = require("./src/receiver");
const { receiverErrorHandling } = require("./src/receiverErrorHandling");
module.exports = { RawMessagePersister, consumer, receiverErrorHandling };

// check log: serverless logs -f receiver
