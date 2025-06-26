// import twilio from "twilio";

export async function loader({ request }: { request: Request}) {
    let url = new URL(request.url);
    let missingPetId = url.searchParams.get("missingPetId");

    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // const twilioAPI = twilio(accountSid, authToken);

    // const fromPhoneNumber = "+18666257307";
    // const toPhoneNumber = "+18777804236";

    // const message = await twilioAPI.messages.create({
    //   body: "From Pet Directory Admin Console - Will be 'Found pet' notification",
    //   from: fromPhoneNumber,
    //   to: toPhoneNumber,
    // });
  
    return { message: `Notify owner via SMS that pet with ID ${missingPetId} was found!` };
}
