import { Problems } from '@stores/problemStore';

const parseProblems = (data: string): Problems => {
  const problems: Problems = {
    beginner: [],
    intermediate: [],
    advanced: [],
  };

  const levelMap: Record<string, keyof Problems> = {
    초급: 'beginner',
    중급: 'intermediate',
    고급: 'advanced',
  };

  const lines = data
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  lines.forEach((line) => {
    const levelMatch = line.match(/^(초급|중급|고급):/);

    if (!levelMatch) return;

    const levelKor = levelMatch[1];
    const level = levelMap[levelKor];
    const problemsPart = line.replace(`${levelKor}:`, '').trim();

    const entries = problemsPart.split('],').map((entry) => {
      return entry.replace(/[\[\]]/g, '').trim(); // [10809 - 알파벳 찾기] → 10809 - 알파벳 찾기
    });

    entries.forEach((entry) => {
      const match = entry.match(/^(\d+)\s*-\s*(.+)$/);
      if (!match) return;

      const problemNumber = parseInt(match[1], 10);
      const title = match[2].trim();

      if (!isNaN(problemNumber)) {
        problems[level].push({
          problemNumber,
          title,
          url: `https://www.acmicpc.net/problem/${problemNumber}`,
        });
      }
    });
  });

  return problems;
};

export default parseProblems;
