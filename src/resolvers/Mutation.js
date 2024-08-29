const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

export async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.pawword, 10);

  const user = await context.prisma.user.create({ data: {...args, password} });

  const token = jwt.sign({ userId: user.id}, APP_SECRET);

  return {
    token, 
    user
  }
}

export async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({ where: { email: args.email } });
  if (!user) {
    throw new Error('User not found');
  }

  const valid = bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Credentials are wrong');
  }

  const token = jwt.sign({userId: user.id}, APP_SECRET);

  return {
    token,
    user
  }
}

export async function post(parent, args, context, info) {
  const { userId } = context;

  return await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } }
    }
  });
}
