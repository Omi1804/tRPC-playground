import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";
//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

const createdTodo = async () => {
  const response = await trpc.createTodo.mutate({
    title: "Go to gym",
    description: "Hit the gym this summer with all your strength",
  });

  console.log(response);
};

const getTodo = async () => {
  const response = await trpc.getTodo.query({
    title: "Go to gym",
    description: "Hit the gym this summer with all your strength",
  });

  console.log(response);
};

const signupUser = async () => {
  const response = await trpc.signUp.mutate({
    email: "user@gmail.com",
    password: "password",
  });

  console.log(response);
};

signupUser();
createdTodo();
getTodo();
