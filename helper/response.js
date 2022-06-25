const responseFormat = (statusCode, body) => {
  return {
    statusCode,
    body,
  };
};

module.exports = { responseFormat };
