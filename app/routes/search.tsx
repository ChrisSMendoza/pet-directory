import twilio from "twilio";

  // @ts-expect-error Type needs to be set, use Node types?
  export async function loader({ request }) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioAPI = twilio(accountSid, authToken);

    const fromPhoneNumber = "+18666257307";
    const toPhoneNumber = "+18777804236";

    const message = await twilioAPI.messages.create({
      body: "From Pet Directory Admin Console - Will be 'Found pet' notification",
      from: fromPhoneNumber,
      to: toPhoneNumber,
    });
  
    return { message };
  }
