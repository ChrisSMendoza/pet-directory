import twilio from "twilio";

import { findOwnerById } from "~/mocks/owners";


export async function loader({ request }: { request: Request}) {
    let url = new URL(request.url);
    let ownerId = url.searchParams.get("ownerId");
    let missingPetId = url.searchParams.get("missingPetId");

    if(!ownerId) {
        return { message: "Owner ID was not provided in request form data."}
    }
    if(!missingPetId) {
        return { message: "Missing pet ID was not provided in request form data."}
    }

    const owner = findOwnerById(ownerId);

    if(!owner) {
        return { message: `Owner with ID, ${ownerId}, was not found.`}
    }

    if(owner.missingPet === null || owner.missingPet.id !== Number(missingPetId)) {
        return { message: "No missing pet tied to user, or it didn't match the provided Missing Pet ID"}
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioAPI = twilio(accountSid, authToken);

    const fromPhoneNumber = "+18666257307";
    const toPhoneNumber = owner.phoneNumber;

    const message = await twilioAPI.messages.create({
        body: `Hello ${owner.name},
            You're pet ${owner.missingPet.name} has been found!
            He is being looked after at this facility:
            [Insert facility details]
        `,
        from: fromPhoneNumber,
        to: toPhoneNumber,
    });

    return { message: `Notify owner (ID: ${ownerId}) via SMS that pet with ID ${missingPetId} was found!` };
}
