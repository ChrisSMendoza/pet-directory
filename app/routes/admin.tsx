import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Console" },
  ];
}

export default function Home() {
  return <body>
    <h1>Admin Console</h1>
    <button onClick={(e) => alert("Will send SMS soon")}>Send SMS</button>
  </body>;
}
