import { Problems } from '@stores//problemStore';

const parseProblems = (data: string[]): Problems => {
  const problems: Problems = {
    beginner: [],
    intermediate: [],
    advanced: [],
  };

  let currentLevel = '';
  const sections = data
    .join('\n')
    .split('\n')
    .filter((line) => line.trim() !== '');

  sections.forEach((line) => {
    if (line.includes('초급:')) {
      currentLevel = 'beginner';
      line = line.replace('초급:', '').trim();
    } else if (line.includes('중급:')) {
      currentLevel = 'intermediate';
      line = line.replace('중급:', '').trim();
    } else if (line.includes('고급:')) {
      currentLevel = 'advanced';
      line = line.replace('고급:', '').trim();
    }

    const problemsList = line
      .split('],')
      .map((item) => item.replace(/[[\]]/g, '').trim())
      .filter(Boolean);

    problemsList.forEach((item) => {
      const [numberPart, ...titleParts] = item.split(' - ');
      const title = titleParts.join(' - ').trim();
      const problemNumber = numberPart.split(' ')[1]?.trim();

      if (problemNumber && title) {
        problems[currentLevel].push({
          problemNumber: parseInt(problemNumber, 10),
          title,
          url: `https://www.acmicpc.net/problem/${problemNumber}`,
        });
      }
    });
  });

  return problems;
};

export default parseProblems;
