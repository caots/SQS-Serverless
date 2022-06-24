"use strict";
const { producer } = require("./sqs/sender");
const { consumer } = require("./sqs/receiver");
const { DLQ } = require("./sqs/DLQ");
module.exports = { producer, consumer, DLQ };

// check log: serverless logs -f receiver
