import type { Route } from "./+types/home";
import { useFetcher } from "react-router";
import type { loader } from "./search";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Console" },
  ];
}


export default function Home() {
  return <body>
    <h1>Admin Console</h1>
    <button onClick={(e) => alert("Will send SMS soon")}>Send SMS</button>

    <UserSearchCombobox />
  </body>;
}

export function UserSearchCombobox() {
    let fetcher = useFetcher<typeof loader>();
    return (
      <div>
        <fetcher.Form method="get" action="/search">
            <label>Search</label>
            <input type="text" name="q" />
        </fetcher.Form>

        {fetcher.data && (
            <ul>
            {fetcher.data.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
            </ul>
        )}
      </div>
    );
  }