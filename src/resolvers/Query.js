

export function feed(parent, args, context) {
  return context.prisma.link.findMany();
}