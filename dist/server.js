"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server/server.ts
var import_fastify = __toESM(require("fastify"));
var import_client = require("@prisma/client");
var import_zod = require("zod");
var prisma = new import_client.PrismaClient();
var app = (0, import_fastify.default)();
app.get("/users", async (request, reply) => {
  const users = await prisma.user.findMany();
  return reply.status(200).send(users);
});
app.put("/users/:id", async (request, reply) => {
  const updateUserschema = import_zod.z.object({
    name: import_zod.z.string(),
    email: import_zod.z.string(),
    password: import_zod.z.string()
  });
});
app.post("/users", async (request, reply) => {
  const createUserSchema = import_zod.z.object({
    name: import_zod.z.string(),
    email: import_zod.z.string().email(),
    password: import_zod.z.string()
  });
  const { name, email, password } = createUserSchema.parse(request.body);
  await prisma.user.create({
    data: {
      name,
      email,
      password
    }
  });
  return reply.status(201).send({ message: "criou o viado" });
});
app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log("HTTP server listening on port 3000");
});
