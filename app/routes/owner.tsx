import { useFetcher } from "react-router";
import type { Route } from "./+types/owner";
// import { useFetcher } from "react-router";
import type { loader as notifyOwnerLoader } from "./notify-owner";

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

// TODO: Improve 404 page, like what's missing?
export default function Owner({ loaderData, params }: Route.ComponentProps) {
    const { owner } = loaderData;

    let notifyOwnerFetch = useFetcher<typeof notifyOwnerLoader>();

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

                {/* NOTE: Had issues running it through JS, onSubmit, data wouldn't appear.. */}
                {/* TODO: Does doing this via JS / React Router make it more trustworthy? I'm leaning towards "No", but idk.. */}
                <notifyOwnerFetch.Form method="get" action="/notify">
                    <input type="hidden" name="ownerId" value={owner.id} />
                    <input type="hidden" name="missingPetId" value={owner.missingPet?.id} />
                    <button>Notify owner</button>
                </notifyOwnerFetch.Form>

                {notifyOwnerFetch.data && (
                    <p>{JSON.stringify(notifyOwnerFetch.data)}</p>
                )}
            </body>
        )
    }

    return <body>
        <h1>Owner with ID {params.ownerId} is missing</h1>
    </body>
  }
