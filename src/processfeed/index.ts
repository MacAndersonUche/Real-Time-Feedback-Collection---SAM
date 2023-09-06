import { Feedback } from "../types";
const AWS = require("aws-sdk");
export const handleSNS = async (body: any) => {
  //extract email address from object and publish to SNS with a message
  // the sns message should be a text saying they have recieved it.
  //the subscription to sns resource will be a single email address

  const dynamoDbItem = parseBody(body);

  console.log({ dynamoDbItem });

  await publishToSNS(dynamoDbItem as unknown as Feedback);

  /*

  log
  a function that takes the following 
   newItem: {
    feedbacktext: { S: 'Test1' },
    author: { S: 'OSAS' },
    id: { S: 'f53a4b29-8656-4e25-97a6-c02e8a6629f1' },
    email: { S: 'mac1@email.com' },
    status: { S: 'Submited' }
  }, and returns an object
   */
};

interface Val {
  [key: string]: string;
}
function parseBody(body: any) {
  //return array of objects
  //  const object1 = {
  //    a: "somestring",
  //    b: 42,
  //  };
  const bodyToReturn: Record<string, string> = {};
  for (const [key, value] of Object.entries(body)) {
    console.log(`${key}: ${value}`);
    if (value) {
      let choiceItem = value as Val;
      bodyToReturn[key] = choiceItem["S"];
    }
  }

  return bodyToReturn;
}

async function publishToSNS(body: Feedback) {
  const TOPIC_ARN = process.env.TOPIC_ARN!;
  // Create publish parameters
  var params = {
    Message: body /* required */,
    TopicArn: TOPIC_ARN,
  };

  // Create promise and SNS service object
  const publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  publishTextPromise
    .then(function (data: { MessageId: string }) {
      console.log(`Message sent to the topic ${params.TopicArn}`);
      console.log("MessageID is " + data.MessageId);
    })
    .catch(function (err: { stack: any }) {
      console.error(err, err.stack);
    });
}
