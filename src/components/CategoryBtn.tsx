import React, { useState } from 'react';
import { CATEGORIES } from '@utils/categories';
import { getAlgorithmCourse } from '@api/openai';
import { CircularProgress, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/CategoryBtn.css';
import useProblemStore, { Problems } from '@store/problemStore';

const CategoryBtn = () => {
  const navigate = useNavigate();
  const { setProblems } = useProblemStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null,
  );
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(
    null,
  );

  const getCourse = async (category: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await getAlgorithmCourse(category);
      const parsedProblems = parseProblems(response);
      setProblems(parsedProblems);
      navigate(`/solve/${category}/beginner/0`);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const parseProblems = (data: string[]) => {
    const problems: Problems = {
      beginner: [],
      intermediate: [],
      advanced: [],
    };

    const sections = data
      .join('\n')
      .split('\n')
      .filter((line) => line.trim() !== '');
    let currentLevel = '';

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

      if (currentLevel) {
        const problemsList = line
          .split('],')
          .map((item) => item.replace(/[[\]]/g, '').trim())
          .filter(Boolean);

        problemsList.forEach((item) => {
          let [problemNumber, ...titleParts] = item.split(' - ');
          const title = titleParts.join(' - ');

          if (problemNumber.includes('.') || problemNumber.includes('-')) {
            problemNumber = problemNumber.split(' ')[1].trim();
          }

          if (problemNumber && title) {
            problems[currentLevel].push({
              problemNumber: parseInt(problemNumber.trim(), 10), // 타입 변환!
              title: title.trim(),
              url: `https://www.acmicpc.net/problem/${problemNumber.trim()}`,
            });
          }
        });
      }
    });

    return problems;
  };

  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setSelectedAlgorithm(null);
  };

  const handleScreenClick = () => {
    setSelectedDifficulty(null);
    setSelectedAlgorithm(null);
  };

  const renderStars = (difficulty: string) => {
    let starCount = 0;
    switch (difficulty) {
      case '초급':
        starCount = 1;
        break;
      case '중급':
        starCount = 2;
        break;
      case '고급':
        starCount = 3;
        break;
      default:
        starCount = 0;
    }

    return Array.from({ length: starCount }).map((_, idx) => (
      <img key={idx} src="/img/gradestar.png" alt="별" className="btn-img" />
    ));
  };

  return (
    <div className="ctg-container">
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}
        >
          <CircularProgress size={60} color="primary" />
        </Box>
      )}

      <div>
        <Box
          onClick={handleScreenClick}
          sx={{
            width: '100%',
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            overflow: 'hidden',
          }}
        >
          {!selectedDifficulty && (
            <div>
              {Object.keys(CATEGORIES).map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDifficultyClick(difficulty);
                  }}
                  className="diff-btn"
                >
                  {renderStars(difficulty)}
                  <p>{difficulty}</p>
                </button>
              ))}
            </div>
          )}

          {selectedDifficulty && (
            <div style={{ marginTop: '10px' }}>
              {CATEGORIES[selectedDifficulty].map((algorithm, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    getCourse(algorithm);
                  }}
                  color={
                    selectedAlgorithm === algorithm ? 'secondary' : 'primary'
                  }
                  className="ctg-btn"
                >
                  {algorithm}
                </button>
              ))}
            </div>
          )}

          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </div>
    </div>
  );
};

export default CategoryBtn;
