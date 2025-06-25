
const users = [
    { id: 1, name: "Ryan" },
    { id: 2, name: "Michael" },
    // ...
  ];
  
  // @ts-expect-error Type needs to be set, use Node types?
  export async function loader({ request }) {
    let url = new URL(request.url);
    let query = url.searchParams.get("q");

    if(query === null || query === "") {
        return users;
    }

    return users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  }