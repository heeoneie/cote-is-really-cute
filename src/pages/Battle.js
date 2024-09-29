import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import CodeEditor from '../components/CodeEditor';
import { getGrading } from '../axios/openai';
import socket from '../utils/socket';

const Battle = () => {
  const location = useLocation();
  const problem = location.state?.problem;
  const [code, setCode] = React.useState('');
  const [language, setLanguage] = React.useState('python');
  const [showCodeEditor, setShowCodeEditor] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    socket.on('battleEnded', (data) => {
      if (data.problemId === problem.problemNumber)
        alert(
          `배틀 종료! 승리자는 ${data.winner}입니다. 경험치 ${data.experience}를 얻었습니다.`,
        );
      navigate('/');
    });
    return () => {
      socket.off('battleEnded');
    };
  }, [problem]);

  const handleCodeSubmit = async () => {
    try {
      const result = await getGrading({
        problemTitle: problem.title,
        userLanguage: language,
        userCode: code,
      });
      if (result.data) {
        alert('정답입니다!');
        socket.emit('submitSolution', {
          problemNumber: problem.problemNumber,
          userEmail: localStorage.getItem('email'),
          isCorrect: true,
        });
      } else {
        alert('틀렸습니다. 다시 시도해보세요.');
      }
    } catch (error) {
      console.error('채점 중 오류가 발생했습니다:', error);
      alert('채점 중 오류가 발생했습니다.');
    }
  };

  const handleProblemSolving = () => {
    if (problem) {
      window.open(
        `https://www.acmicpc.net/problem/${problem.problemNumber}`,
        '_blank',
      );
      setShowCodeEditor(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      {problem ? (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {problem.problemNumber} {problem.problemTitle}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleProblemSolving}
            sx={{ mb: 2 }}
          >
            문제 풀기
          </Button>

          {showCodeEditor && (
            <CodeEditor
              code={code}
              onChange={(newValue) => setCode(newValue)}
              onLanguageChange={setLanguage}
              onSubmit={handleCodeSubmit}
            />
          )}
        </>
      ) : (
        <Typography variant="h6">문제를 불러오는 중...</Typography>
      )}
    </Box>
  );
};

export default Battle;
