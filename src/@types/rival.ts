import { Level } from './level';

export interface Rival {
  rivalId: number;
  email: string;
  nickName: string;
  level: Level;
}
