import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    route("owners/:ownerId", "routes/owner.tsx"),
    route("notify", "routes/notify-owner.tsx")
] satisfies RouteConfig;
