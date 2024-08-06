import React from 'react';
import { CATEGORIES } from '../utils/categories';
import { getAlgorithmCourse } from '../axios/openai';
import { CircularProgress, Button, Typography, Box } from '@mui/material';

const CategoryBtn = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const getCourse = async (category) => {
    setLoading(true);
    setError('');
    try {
      const response = await getAlgorithmCourse(category);
      console.log(response.data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
