import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";

const todoInput = z.object({
  title: z.string(),
  description: z.string(),
});

const singupInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

const appRouter = router({
  // equivalnet to router.post("/createTodo",(req,res)=>{})
  createTodo: publicProcedure.input(todoInput).mutation(async (opts) => {
    const title = opts.input.title;
    const description = opts.input.description;

    //do db stuffs here

    return {
      id: "1",
      tittle: title,
      description: description,
    };
  }),

  getTodo: publicProcedure.input(todoInput).query(async (opts) => {
    //all database stuffs here - we find the title and description but for example -
    const title = opts.input.title;
    const description = opts.input.description;

    return {
      message: "This is get req",
      id: "1",
      title: title,
      description: description,
    };
  }),

  signUp: publicProcedure.input(singupInput).mutation((opts) => {
    const email = opts.input.email;
    const password = opts.input.password;

    //db stuffs

    //jwt sign here
    let token = "12344321";
    return {
      message: "User singup successfully",
      token,
    };
  }),
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);

export type AppRouter = typeof appRouter;
