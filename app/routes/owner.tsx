import type { Route } from "./+types/owner";
// import { useFetcher } from "react-router";
// import type { loader } from "./search";

// TODO: Handle multiple missing pets
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

const OWNERS_MOCK: Owner[] = [
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

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Owner" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
    const owner = OWNERS_MOCK.find(owner => owner.id === Number(params.ownerId));

    return { owner };
}

export default function Owner({ loaderData, params }: Route.ComponentProps) {
    const { owner } = loaderData;

    if(owner) {
        return (
            <body>
                <h1>Owner</h1>
                <p>{owner.name}</p>
                <p>{owner.phoneNumber}</p>

                {/* TODO: Handle when no missing pets */}
                <h2>Missing Pet</h2>
                <p>{owner.missingPet?.name}</p>
                <p>{owner.missingPet?.age}</p>
            </body>
        )
    }

    return <body>
        <h1>Owner with ID {params.ownerId} is missing</h1>
    </body>
  }
