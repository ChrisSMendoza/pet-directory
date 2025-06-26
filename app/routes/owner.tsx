import type { Route } from "./+types/owner";
// import { useFetcher } from "react-router";
// import type { loader } from "./search";

interface Owner {
    id: number,
    name: string,
    phoneNumber: string,
}
const OWNERS_MOCK: Owner[] = [
    {
        id: 1,
        name: "Angel M",
        phoneNumber: "+18777804236"
    },
    {
        id: 2,
        name: "Chris M",
        phoneNumber: "+12092704012"
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
                <h2>{owner.name}</h2>
                <h2>{owner.phoneNumber}</h2>
            </body>
        )
    }

    return <body>
        <h1>Owner with ID {params.ownerId} is missing</h1>
    </body>
  }
