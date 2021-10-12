function formatResponse({ res, message, status, data, errors }) {
  const response = {
    message,
    status,
    errors,
    data,
  };

  return res.status(status).json(response);
}

module.exports = formatResponse;
