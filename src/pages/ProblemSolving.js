import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../App';
import { Box, Typography, Alert } from '@mui/material';
import Timer from '../components/Timer';
import '../styles/ProblemSolving.css';
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
      setIsGrading(result.data);
      if (result.data) {
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
        flexDirection: showCodeEditor ? 'row' : 'column',
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
      {showCodeEditor && (
        <Box sx={{ flex: 1, ml: 4 }}>
          <CodeEditor
            code={code}
            onChange={(newValue) => setCode(newValue)}
            onLanguageChange={handleLanguageChange}
            onSubmit={handleCodeSubmit}
          />
        </Box>
      )}
      <Box
        sx={{
          width: '290px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderLeft: showCodeEditor ? '5px solid #00000027' : '',
          ml: 4,
        }}
      >
        {currentProblem ? (
          <>
            <h4 className="pro-h4">
              문제번호 : {currentProblem.problemNumber}
            </h4>
            <h4 className="pro-h4">{currentProblem.title}</h4>
            <Timer initialMinutes={30} />

            <button className="pro-btn" onClick={handleProblemSolving}>
              문제 풀기
            </button>
            <button
              className="pro-btn"
              onClick={nextProblem}
              disabled={!isGrading}
            >
              다음 문제
            </button>
          </>
        ) : (
          <Typography variant="h6">No problems available.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProblemSolving;
