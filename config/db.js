const { DynamoDB } = require("aws-sdk")

const db = new DynamoDB.DocumentClient()
const TableName = "RDS"

exports.db = db;
exports.TableName = TableName;
