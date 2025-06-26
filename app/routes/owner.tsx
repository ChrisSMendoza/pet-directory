import type { Route } from "./+types/owner";
// import { useFetcher } from "react-router";
// import type { loader } from "./search";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Owner" },
  ];
}

export default function Owner({ params }: Route.ComponentProps) {
    return (
        <body>
            <h1>Owner ({params.ownerId})</h1>
        </body>
      )
  }
