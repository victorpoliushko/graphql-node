import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../utils.js';

export async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

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

  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } }
    }
  });
  // context.pubsub.publish("NEW_LINK", newLink);

  return newLink;
}

export const Mutation = {
  signup,
  login,
  post,
};