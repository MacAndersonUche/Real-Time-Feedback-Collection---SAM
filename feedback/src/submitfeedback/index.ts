import { validateJson } from "../utils/ajv";
import { Feedback, SubmittedByUser } from "../types";
import { v4 } from "uuid";
import { submit } from "../utils/dynamodb";

export const handleSubmit = async (body: SubmittedByUser) => {
  const feedbackSchema = {
    type: "object",
    properties: {
      author: {
        type: "string",
      },
      feedbacktext: {
        type: "string",
      },
      email: {
        type: "string",
      },
    },
    required: ["author", "feedbacktext", "email"],
  };

  const errors = validateJson(feedbackSchema, body);

  const tableName = process.env.TABLE_NAME;

  if (errors) throw Error("Invalid Format");

  if (!tableName) throw Error("Table Name not set");

  //create uuid as key for feedback
  //create feedback object that will be put in dynamodb

  const feedbackToSubmit = generateFeedbackObject(body);

  await submit(feedbackSchema, "", "id");

  return "Feedback successfully submitted";
};

function generateFeedbackObject(body: SubmittedByUser): Feedback {
  const id = v4();
  const { email, feedbacktext, author } = body;

  return {
    id,
    status: "Submitted",
    feedbacktext,
    author,
    email,
  };
}
