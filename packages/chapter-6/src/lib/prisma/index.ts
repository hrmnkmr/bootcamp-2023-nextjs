import { PrismaClient, Prisma } from "@prisma/client";

export const prisma = new PrismaClient();

export function isPrismaError(
  err: unknown
): err is
  | Prisma.PrismaClientRustPanicError
  | Prisma.PrismaClientValidationError
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientInitializationError {
  return (
    err instanceof Prisma.PrismaClientRustPanicError ||
    err instanceof Prisma.PrismaClientValidationError ||
    err instanceof Prisma.PrismaClientKnownRequestError ||
    err instanceof Prisma.PrismaClientUnknownRequestError ||
    err instanceof Prisma.PrismaClientInitializationError
  );
}
