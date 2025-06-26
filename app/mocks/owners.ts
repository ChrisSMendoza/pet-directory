
interface Owner {
    id: number,
    name: string,
    phoneNumber: string,
    missingPet: Pet | null
}

interface Pet {
    id: number,
    name: string,
    age: number
}

export const OWNERS_MOCK: Owner[] = [
    {
        id: 1,
        name: "Angel M",
        phoneNumber: "+18777804236",
        missingPet: {
            id: 1,
            name: "Chico",
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
