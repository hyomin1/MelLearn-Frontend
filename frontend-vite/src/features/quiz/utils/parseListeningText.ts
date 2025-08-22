export type ParsedTextPart =
  | { type: 'text'; content: string; id: string }
  | {
      type: 'blank';
      index: number;
      id: number;
      correctAnswer: string;
      userAnswer?: string;
    };

interface ParseOptions {
  blankedText?: string;
  answerList: string[];
  userAnswerList?: string[];
}

export function parseListeningText({
  blankedText,
  answerList,
  userAnswerList,
}: ParseOptions): ParsedTextPart[] {
  if (!blankedText) return [];

  let text = blankedText;
  let blankIndex = 0;
  const parts: ParsedTextPart[] = [];

  text = text.replace(/__/g, () => `[BLANK_${blankIndex++}]`);

  const splitParts = text.split(/(\[BLANK_\d+\])/);

  splitParts.forEach((part, index) => {
    const blankMatch = part.match(/\[BLANK_(\d+)\]/);
    if (blankMatch) {
      const blankIdx = parseInt(blankMatch[1]);
      parts.push({
        type: 'blank',
        index: blankIdx,
        id: blankIdx,
        correctAnswer: answerList[blankIdx] || '',
        ...(userAnswerList && {
          userAnswer: userAnswerList[blankIdx] || '',
        }),
      });
    } else if (part.trim() !== '') {
      parts.push({
        type: 'text',
        content: part,
        id: `text_${index}`,
      });
    }
  });

  return parts;
}
