"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("./trpc");
const standalone_1 = require("@trpc/server/adapters/standalone");
const zod_1 = require("zod");
const todoInput = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
});
const singupInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
const appRouter = (0, trpc_1.router)({
    // equivalnet to router.post("/createTodo",(req,res)=>{})
    createTodo: trpc_1.publicProcedure.input(todoInput).mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const title = opts.input.title;
        const description = opts.input.description;
        //do db stuffs here
        return {
            id: "1",
            tittle: title,
            description: description,
        };
    })),
    getTodo: trpc_1.publicProcedure.input(todoInput).query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        //all database stuffs here - we find the title and description but for example -
        const title = opts.input.title;
        const description = opts.input.description;
        return {
            message: "This is get req",
            id: "1",
            title: title,
            description: description,
        };
    })),
    signUp: trpc_1.publicProcedure.input(singupInput).mutation((opts) => {
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
    createUserTodo: trpc_1.publicProcedure.input(todoInput).mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const username = opts.ctx.username;
        console.log("from mutation ", username);
        return { username };
    })),
});
const server = (0, standalone_1.createHTTPServer)({
    router: appRouter,
    createContext(opts) {
        console.log("context called");
        //do all the verify thingys here
        return {
            username: "Omi",
        };
    },
});
server.listen(3000);
