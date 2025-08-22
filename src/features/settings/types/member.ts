export interface Member {
  id: number;
  memberId: string;
  name: string;
  levelPoint: number;
  level: string;
  langType: string;
}

export type Level = 'Beginner' | 'Intermediate' | 'Advanced';
