import { useFetcher } from "react-router";
import type { Route } from "./+types/owner";

import type { Owner } from "~/owner-types";
import type { loader as notifyOwnerLoader } from "./notify-owner";
import { findOwnerById } from "~/mocks/owners";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Owner" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
    const owner = findOwnerById(params.ownerId);

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
                    <>
                        <p>{notifyOwnerFetch.data.message.body}</p>
                        <p>{notifyOwnerFetch.data.message.dateCreated.toDateString()}</p>
                        <p>{notifyOwnerFetch.data.message.to}</p>
                        <p>{notifyOwnerFetch.data.message.from}</p>

                        {/* Omit `status` */}
                    </>
                )}
            </body>
        )
    }

    return <body>
        <h1>Owner with ID {params.ownerId} is missing</h1>
    </body>
  }
