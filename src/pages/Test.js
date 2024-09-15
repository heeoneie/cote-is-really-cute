import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

const CATEGORIES = {
  초급: ['문자열', '배열', '정렬', '해시'],
  중급: ['완전탐색(brute force)', '스택/큐', '탐욕법(greedy)'],
  고급: [
    '동적계획법(DP)',
    '깊이/너비 우선 탐색 (DFS/BFS)',
    '이분탐색',
    '그래프',
  ],
};

function Test() {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setSelectedAlgorithm(null); // 난이도 변경 시 알고리즘 초기화
  };

  const handleAlgorithmClick = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    // 알고리즘에 대한 코스 로직 처리
    console.log(`Selected course for ${algorithm}`);
  };

  const handleScreenClick = () => {
    setSelectedDifficulty(null);
    setSelectedAlgorithm(null);
  };

  return (
    <Box
      onClick={handleScreenClick}
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        overflow: 'hidden',
      }}
    >
      {/* 난이도 버튼들 */}
      {!selectedDifficulty && (
        <div>
          {Object.keys(CATEGORIES).map((difficulty) => (
            <Button
              key={difficulty}
              onClick={(e) => {
                e.stopPropagation(); // 클릭 이벤트가 상위 Box로 전파되지 않도록 함
                handleDifficultyClick(difficulty);
              }}
              variant="contained"
              color="primary"
              style={{ margin: '5px' }}
            >
              {difficulty}
            </Button>
          ))}
        </div>
      )}

      {/* 알고리즘 버튼들 */}
      {selectedDifficulty && (
        <div style={{ marginTop: '10px' }}>
          {CATEGORIES[selectedDifficulty].map((algorithm, idx) => (
            <Button
              key={idx}
              onClick={(e) => {
                e.stopPropagation(); // 클릭 이벤트가 상위 Box로 전파되지 않도록 함
                handleAlgorithmClick(algorithm);
              }}
              variant="contained"
              color={selectedAlgorithm === algorithm ? 'secondary' : 'primary'}
              style={{ margin: '5px' }}
            >
              {algorithm}
            </Button>
          ))}
        </div>
      )}
    </Box>
  );
}

export default Test;
