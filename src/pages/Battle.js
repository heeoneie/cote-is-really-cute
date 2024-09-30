import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import CodeEditor from '../components/CodeEditor';
import { getGrading } from '../axios/openai';
import socket from '../utils/socket';
import styled from '@emotion/styled/macro';
import Timer from '../components/Timer';

const ProTitle = styled.h4`
  font-size: 24px;
  margin: 10px;
`;

const ProBtn = styled.button`
  width: 150px;
  padding: 10px 20px;
  border: 4px solid #d9d9d9;
  border-radius: 50px;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  margin: 10px;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    background-color: #61ecff78;
    border-color: #61ecff;
  }
`;

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
        return true;
      } else {
        alert('틀렸습니다. 다시 시도해보세요.');
        return false;
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
    <Grid
      container
      sx={{
        width: 'calc(100vw - 290px)',
        marginLeft: '290px',
        height: '90vh',
        display: 'flex',
        flexWrap: 'nowrap',
      }}
    >
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90%',
            width: '90%',
          }}
        >
          {problem ? (
            <>
              {!showCodeEditor ? (
                <>
                  <ProTitle>문제번호 : {problem.problemNumber}</ProTitle>
                  <ProTitle>{problem.problemTitle}</ProTitle>
                  <ProBtn onClick={handleProblemSolving}>문제 풀기</ProBtn>
                </>
              ) : null}

              {showCodeEditor && (
                <Box
                  sx={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                  }}
                >
                  <CodeEditor
                    code={code}
                    onChange={(newValue) => setCode(newValue)}
                    onLanguageChange={setLanguage}
                    onSubmit={handleCodeSubmit}
                  />
                </Box>
              )}
            </>
          ) : (
            <Typography variant="h6">문제를 불러오는 중...</Typography>
          )}
        </Box>
      </Grid>
      <Grid
        item
        sx={{
          width: '290px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderLeft: '5px solid #00000027',
          height: '100%',
          minWidth: '290px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {showCodeEditor ? (
            <>
              <ProTitle>문제번호 : {problem.problemNumber}</ProTitle>
              <ProTitle>{problem.problemTitle}</ProTitle>
            </>
          ) : (
            ''
          )}
          <Timer initialMinutes={30} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Battle;
