import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../App';
import { Box, Button, Typography, Alert } from '@mui/material';
import Timer from '../components/Timer';
import CodeEditor from '../components/CodeEditor';
import { getGrading } from '../axios/openai';

const ProblemSolving = () => {
  const { problems } = React.useContext(AppContext);
  const navigate = useNavigate();
  const { category, level, index } = useParams();
  const [showAlert, setShowAlert] = React.useState(false);
  const [showCodeEditor, setShowCodeEditor] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [language, setLanguage] = React.useState('python');
  const [isGrading, setIsGrading] = React.useState(false);

  const levelSequence = ['beginner', 'intermediate', 'advanced'];
  const currentLevelIndex = levelSequence.indexOf(level);
  const currentProblems = problems[level];
  const currentIndex = parseInt(index, 10);

  const nextProblem = () => {
    if (currentIndex + 1 < currentProblems.length) {
      navigate(`/solve/${category}/${level}/${currentIndex + 1}`);
    } else {
      const nextLevelIndex = currentLevelIndex + 1;

      if (nextLevelIndex < levelSequence.length) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          const nextLevel = levelSequence[nextLevelIndex];
          navigate(`/solve/${category}/${nextLevel}/0`);
        }, 2000);
      } else {
        alert('모든 문제를 풀었습니다! 축하합니다!');
        navigate('/');
      }
    }
    setCode('');
    setIsGrading(false);
  };

  const currentProblem = currentProblems[currentIndex];

  const handleProblemSolving = () => {
    window.open(currentProblem.url, '_blank');
    setShowCodeEditor(true);
  };

  const handleLanguageChange = (newLanguage) => setLanguage(newLanguage);

  const handleCodeSubmit = async () => {
    try {
      const result = await getGrading({
        problemTitle: currentProblem.title,
        userLanguage: language,
        userCode: code,
      });
      setIsGrading(result);
      if (result) {
        alert('정답입니다!');
      } else {
        alert('틀렸습니다. 다시 시도해보세요.');
      }
    } catch (error) {
      console.error('채점 중 오류가 발생했습니다:', error);
      alert('채점 중 오류가 발생했습니다.');
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
      {showAlert && (
        <Alert severity="success" sx={{ mb: 2 }}>
          다음 단계로 넘어갑니다!
        </Alert>
      )}
      {currentProblem ? (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {currentProblem.problemNumber} {currentProblem.title}
          </Typography>

          <Timer initialMinutes={30} />

          <Button
            variant="contained"
            color="primary"
            onClick={handleProblemSolving}
            sx={{ mb: 2 }}
          >
            문제 풀기
          </Button>
          <Button
            variant="outlined"
            disabled={!isGrading}
            onClick={nextProblem}
          >
            다음 문제
          </Button>
          {showCodeEditor && (
            <CodeEditor
              code={code}
              onChange={(newValue) => setCode(newValue)}
              onLanguageChange={handleLanguageChange}
              onSubmit={handleCodeSubmit}
            />
          )}
        </>
      ) : (
        <Typography variant="h6">No problems available.</Typography>
      )}
    </Box>
  );
};

export default ProblemSolving;
