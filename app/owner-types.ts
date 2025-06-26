
// TODO: Handle multiple missing pets
export interface Owner {
    id: number,
    name: string,
    phoneNumber: string,
    missingPet: Pet | null
}

export interface Pet {
    id: number,
    name: string,
    age: number
}
