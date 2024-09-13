import React from 'react';
import { Box, TextField } from '@mui/material';

const CodeEditor = ({ code, onChange }) => {
  return (
    <Box sx={{ width: '100%', height: '100vh', padding: '2rem' }}>
      <TextField
        fullWidth
        multiline
        minRows={20}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        label="Write your code here"
      />
    </Box>
  );
};

export default CodeEditor;
