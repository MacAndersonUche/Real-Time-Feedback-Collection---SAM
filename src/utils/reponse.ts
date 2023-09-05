export const shapeResponse = (statusCode: number, body: Object = {}) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  body: JSON.stringify(body),
});

export const shapeErrorResponse = (
  statusCode: number,
  errorMessage: unknown
) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  body: JSON.stringify({ error: errorMessage }),
});
