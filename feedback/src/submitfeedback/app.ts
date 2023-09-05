import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handleSubmit } from ".";

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const returned = await handleSubmit(JSON.parse(event.body!));
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: returned,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "some error happened",
      }),
    };
  }
};
