export function extractEnabledCategories(
  categories: Record<string, boolean>
): string[] {
  const learningKeys = [
    'speaking',
    'grammar',
    'listening',
    'reading',
    'vocabulary',
  ];

  return learningKeys.filter((key) => categories[key] === true);
}
