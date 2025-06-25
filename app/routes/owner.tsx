import type { Route } from "./+types/owner";
// import { useFetcher } from "react-router";
// import type { loader } from "./search";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Owner" },
  ];
}

export default function Owner() {
  return (
    <body>
        <h1>Owner</h1>
    </body>
  )
}
