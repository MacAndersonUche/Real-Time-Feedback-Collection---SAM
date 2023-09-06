import { readFileSync } from "fs";
const AWS = require("aws-sdk");
export const handleSQS = async (body: any) => {
  console.log({ body, message: body.message });

  const details = extractEmailAndName(body.message);
  const html = getTemplate();

  await sendEmail(details.email, "", "THANKS FOR SIGNING UP", html);
};

interface Extracted {
  id: string;
  email: string;
  name: string;
}
function extractEmailAndName({ id, email, name }: Extracted) {
  return {
    id,
    email,
    name,
  };
}

function getTemplate(): string {
  return readFileSync("src/processfeed/welcome.html", "utf-8");
}

async function updateDynamoDBStatus(id: string) {}

async function sendEmail(
  toAddress: string,
  fromAddress: string,
  subject: string,
  body: string
) {
  const ses = new AWS.SES({ region: "eu-west-3" });

  const params = {
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: { Data: body },
      },
      Subject: { Data: subject },
    },
    Source: fromAddress,
  };

  return ses.sendEmail(params).promise();
}
