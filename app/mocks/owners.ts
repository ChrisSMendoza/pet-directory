import type { Owner } from "~/owner-types";

export const OWNERS_MOCK: Owner[] = [
    {
        id: 1,
        name: "John Dough",
        // Note, real Twilio virtual phone number (not sure if expires)
        phoneNumber: "+18777804236",
        missingPet: {
            id: 1,
            name: "Sparky",
            age: 4
        }
    },
    {
        id: 2,
        name: "Chris M",
        phoneNumber: "+12092704012",
        missingPet: null
    }
];

export function findOwnerById(ownerId: string) {
    const owner = OWNERS_MOCK.find(owner => owner.id === Number(ownerId));

    return owner;
}
