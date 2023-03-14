import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { REPL_MODE_SLOPPY } from "repl";

const prisma = new PrismaClient();
const app = fastify();

// interface User {
//   id: number;
//   data: {
//     name: string;
//     email: string;
//     password: string;
//   };
// }

// interface Post {
//   id: number;
//   title: string;
//   content: string;
//   createdAt: Date;
//   updatedAt: Date;
//   comments: Comment[];
// }

// interface Comment {
//   id: number;
//   content: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

app.get("/users", async (request, reply) => {
  const users = await prisma.user.findMany();
  return reply.status(200).send(users);
});

app.post("/users", async (request, reply) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { name, email, password } = createUserSchema.parse(request.body);

  await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return reply.status(201).send({ message: "criou o viado" });
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log("HTTP server listening on port 3000");
  });
