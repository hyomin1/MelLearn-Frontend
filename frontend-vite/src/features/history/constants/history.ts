import { BookOpen, Headphones, Mic, PenTool, Volume2 } from 'lucide-react';

export const QUIZ_TYPE = [
  {
    Icon: PenTool,
    type: 'GRAMMAR',
    color: 'from-green-500 to-emerald-500',
  },
  {
    Icon: BookOpen,
    type: ' VOCABULARY',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    Icon: Headphones,
    type: 'LISTENING',
    color: 'from-yellow-500 to-orange-500',
  },
  { Icon: Volume2, type: 'READING', color: 'from-pink-500 to-rose-500' },
  { Icon: Mic, type: 'SPEAKING', color: 'from-red-500 to-pink-500' },
];
