import { rest } from "msw";

export const handlers = [
  rest.get("/ping", (req, res, ctx) => {
    return res(ctx.json("pong"));
  }),

  rest.get("/todos", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),

  rest.post("/todos", (req, res, ctx) => {
    todos.push(req.body);
    return res(ctx.status(201));
  }),
];
