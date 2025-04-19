import { Level } from './level';

export interface User {
  userId: number;
  email: string;
  nickName: string;
  experience: number;
  level: Level;
  isRival: boolean;
}
