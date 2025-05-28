import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from 'hono/cors'
import auth from "@/features/auth/server/route";
import members from "@/features/members/server/route"
import workspaces from "@/features/workspaces/server/route"
import projects from "@/features/projects/server/route"
import tasks from "@/features/tasks/server/route"

const app = new Hono().basePath("/api");

app.use('*', cors({
  origin: process.env.NEXT_PUBLIC_APP_PUBLIC!,
  allowHeaders: ['Content-Type', 'Authorization'],
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
    .route("/auth", auth)
    .route("/workspaces", workspaces)
    .route("/members", members)
    .route("/projects", projects)
    .route("/tasks", tasks)

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);


export type AppType = typeof routes;