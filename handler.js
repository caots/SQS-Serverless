"use strict";
const { producer } = require("./sqs/sender");
const { consumer } = require("./sqs/receiver");
module.exports = { producer, consumer };

// check log: serverless logs -f receiver
