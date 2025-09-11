import { account } from './general';

declare global {
  namespace Express {
    interface Request {
      user?: account;
    }
  }
}

export {};
