import { data } from "react-router";
import twilio from "twilio";
// TODO: Shared in 2 places, when this is a DB call, they should come from the same place
import { findOwnerById } from "~/mocks/owners";


// TODO: How we can we verify this is the right owner and pet? Like we can't trust the form right? Unless it has some timed hash? JWT?
// Notify owner "request handler"
// Find owner, validate missing pet, notify via SMS
export async function loader({ request }: { request: Request }) {
    let url = new URL(request.url);
    let ownerId = url.searchParams.get("ownerId");
    let missingPetId = url.searchParams.get("missingPetId");

    // throw'ing errors to have `message` be a consistent return value: { body, from, to, ... }, instead of string
    // also seems better suited for a general error handler?

    if(!ownerId) {
        // TODO?: Attach `ownerId`?
        // TODO: Look into NOT using `data`, why not throw a regular error?
        throw data("Owner ID was not provided in request form data.", { status: 404 });
    }

    if(!missingPetId) {
        // Shows error on screen with stacktrace.. Should be 404? Should just never happen?
        throw Error("Missing pet ID was not provided in request form data");
    }

    const owner = findOwnerById(ownerId);

    if(!owner) {
        throw Error(`Owner with ID, ${ownerId}, was not found.`);
    }

    if(owner.missingPet === null || owner.missingPet.id !== Number(missingPetId)) {
        throw Error("No missing pet tied to user, or it didn't match the provided Missing Pet ID");
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioAPI = twilio(accountSid, authToken);

    const fromPhoneNumber = "+18666257307";
    const toPhoneNumber = owner.phoneNumber;

    // TODO: Get type from Twilio, or create one, but just have it be the SAME!
    const notifyOwnerMessage = {
        body: `
            Hello ${owner.name},
            You're pet ${owner.missingPet.name} has been found!
            They're being looked after at this location:
            [Insert location details]
        `,
        from: fromPhoneNumber,
        to: toPhoneNumber,
    };
    // TODO: Just depend on our env? Like dev shouldn't be charging anyway..?
    if(process.env.TWILIO_ENV === "production") {
        const message = await twilioAPI.messages.create(notifyOwnerMessage);
        // TODO: To avoid `message` being returned, causes "cyclic object being serialized"
        const { body, status, from, to, dateCreated } = message;

        // TODO: Restrict view of `from` number? Only admins? Way into the future???
        // TODO: Check message status? Try catch?
        return { message: { body, status, from, to, dateCreated }};
    }

    // ASSUMING DEV ENVIRONMENT! (Less types for message in response (like "unknown SMS env"), which we're missing out on? How do we know for sure??
    return { message: { ...notifyOwnerMessage, dateCreated: new Date(), status: 'queued' }, SMS_ENV: process.env.TWILIO_ENV }
}


// NOTE: Why are we using TSX for endpoints? Can I return components?