
import { target } from './Enums'
export interface IRating {
  id: string
  userId: string;
  target: target;
  targetId: string;
  score: number;
  review: string;
}

export interface IRatingResponse extends IRating{

}