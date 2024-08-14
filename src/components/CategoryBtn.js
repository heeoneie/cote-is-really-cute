import React from 'react';
import { CATEGORIES } from '../utils/categories';
import { getAlgorithmCourse } from '../axios/openai';
import { CircularProgress, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

const CategoryBtn = () => {
  const navigate = useNavigate();
  const { setProblems } = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const getCourse = async (category) => {
    setLoading(true);
    setError('');
    try {
      const response = await getAlgorithmCourse(category);
      const parsedProblems = parseProblems(response.data);
      setProblems(parsedProblems);
      navigate(`/solve/${category}/beginner/0`);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const parseProblems = (data) => {
    const problems = {
      beginner: [],
      intermediate: [],
      advanced: [],
    };

    const lines = data.split('\n').filter((line) => line.trim() !== '');
    let currentLevel = '';

    lines.forEach((line) => {
      if (line.includes('초급')) {
        currentLevel = 'beginner';
      } else if (line.includes('중급')) {
        currentLevel = 'intermediate';
      } else if (line.includes('고급')) {
        currentLevel = 'advanced';
      } else if (currentLevel) {
        let [problemNumber, title] = line.split(' - ');
        if (problemNumber && title) {
          problemNumber = problemNumber.replace('[', '').trim();
          title = title.replace(']', '').replace(',', '').trim();

          problems[currentLevel].push({
            problemNumber,
            title,
            url: `https://www.acmicpc.net/problem/${problemNumber}`,
          });
        }
      }
    });

    return problems;
  };

  return (
    <div>
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          }}
        >
          <CircularProgress size={60} color="primary" />
        </Box>
      )}

      <div>
        {CATEGORIES.map((category, idx) => (
          <Button
            key={idx}
            onClick={() => getCourse(category)}
            variant="contained"
            color="primary"
            style={{ margin: '5px' }}
          >
            {category}
          </Button>
        ))}
        {error && <Typography color="error">{error}</Typography>}
      </div>
    </div>
  );
};

export default CategoryBtn;
