import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-twilight';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from '@mui/material';
import { recordAttendance } from '../api/user';

const CodeEditor = ({ code, onChange, onSubmit, onLanguageChange }) => {
  const languages = [
    { label: 'Python', mode: 'python' },
    { label: 'Java', mode: 'java' },
    { label: 'C++', mode: 'c_cpp' },
  ];
  const [mode, setMode] = React.useState(languages[0].mode);
  const [theme, setTheme] = React.useState('github');

  const handleLanguageChange = (event) => {
    const newMode = event.target.value;
    setMode(newMode);
    onLanguageChange(newMode);
  };
  const handleThemeChange = (event) =>
    setTheme(event.target.checked ? 'twilight' : 'github');

  const handleSubmit = async () => {
    const isCorrect = await onSubmit();
    if (isCorrect) await recordAttendance(localStorage.getItem('email'));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mb: 2,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="language-select-label">언어</InputLabel>
          <Select
            labelId="language-select-label"
            value={mode}
            onChange={handleLanguageChange}
            label="언어"
          >
            {languages.map((lang) => (
              <MenuItem key={lang.mode} value={lang.mode}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={theme === 'twilight'}
              onChange={handleThemeChange}
              color="primary"
            />
          }
          label="야간 모드"
        />
      </Box>

      <AceEditor
        mode={mode}
        theme={theme}
        name="code_editor"
        onChange={onChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        style={{ width: '100%', height: '500px' }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
      >
        채점
      </Button>
    </Box>
  );
};

export default CodeEditor;
