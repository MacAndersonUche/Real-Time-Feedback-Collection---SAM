import AWS from "aws-sdk";
import { genericJSON } from "../types";

export const submit = async (
  Item: genericJSON,
  TableName: string,
  _primaryKey?: string
) => {
  const ddb = new AWS.DynamoDB.DocumentClient({
    params: { TableName },
  });

  const requestObject = {
    TableName,
    Item,
  };

  await ddb
    .put(requestObject, function (err, data) {
      if (err) console.error(err, err.stack);
    })
    .promise();
  return requestObject;
};
