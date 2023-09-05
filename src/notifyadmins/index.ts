import { validateJson } from "../utils/ajv";
import { Feedback, Status, SubmittedByUser } from "../types";
import { v4 } from "uuid";
import { submit } from "../utils/dynamodb";

export const handleSNS = async (body: any) => {
  //extract email address from object and publish to SNS with a message
  // the sns message should be a text saying they have recieved it.
  //the subscription to sns resource will be a single email address
};
