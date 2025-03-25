import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Box, Typography, Alert } from '@mui/material';
import Timer from '@components/Timer';
import '../styles/ProblemSolving.css';
import CodeEditor from '@components/CodeEditor';
import { gradeCode } from '@api/openai';
import useProblemStore from '@store/problemStore';

const ProblemSolving = () => {
  const { category, level } = useParams();
  const navigate = useNavigate();
  const { problems, currentProblemIndex, setCurrentProblemIndex } =
    useProblemStore();

  const [showAlert, setShowAlert] = React.useState(false);
  const [showCodeEditor, setShowCodeEditor] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [language, setLanguage] = React.useState('python');
  const [isGrading, setIsGrading] = React.useState(false);

  const levelSequence = ['beginner', 'intermediate', 'advanced'];
  const currentLevelIndex = level ? levelSequence.indexOf(level) : 0;
  const currentProblems = problems[level ?? 'beginner'] || [];

  useEffect(() => {
    setCurrentProblemIndex(0);
  }, [level, category]);

  const nextProblem = () => {
    const nextIndex = currentProblemIndex + 1;

    if (nextIndex < currentProblems.length) {
      setCurrentProblemIndex(nextIndex);
    } else {
      const nextLevelIndex = currentLevelIndex + 1;
      if (nextLevelIndex < levelSequence.length) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate(`/solve/${category}/${levelSequence[nextLevelIndex]}/0`);
          setCurrentProblemIndex(0);
        }, 2000);
      } else {
        alert('모든 문제를 풀었습니다! 축하합니다!');
        navigate('/');
      }
    }
    setCode('');
    setIsGrading(false);
  };

  const handleProblemSolving = () => {
    window.open(currentProblems[currentProblemIndex]?.url, '_blank');
    setShowCodeEditor(true);
  };

  const handleCodeSubmit = async () => {
    try {
      const result = await gradeCode({
        problemTitle: currentProblems[currentProblemIndex]?.title,
        userLanguage: language,
        userCode: code,
      });
      setIsGrading(result);
      if (result) {
        alert('정답입니다!');
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

  return (
    <Grid container sx={{ width: 'calc(100vw - 290px)', marginLeft: '290px' }}>
      <Grid item xs>
        <Box
          sx={{
            display: 'flex',
            flexDirection: showCodeEditor ? 'row' : 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
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
                onChange={setCode}
                onLanguageChange={setLanguage}
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
            {currentProblems[currentProblemIndex] ? (
              <>
                <Typography variant="h6">
                  문제번호:{' '}
                  {currentProblems[currentProblemIndex]?.problemNumber}
                </Typography>
                <Typography variant="h6">
                  {currentProblems[currentProblemIndex]?.title}
                </Typography>
                <Timer initialMinutes={30} />

                <button className="pro-btn" onClick={handleProblemSolving}>
                  문제 풀기
                </button>
                <button
                  className={`pro-btn ${!isGrading ? 'notGrade' : ''}`}
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
      </Grid>
    </Grid>
  );
};

export default ProblemSolving;
