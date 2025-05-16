'use client';

import React, { useRef, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-twilight';
import { recordAttendance } from '@api/user';

interface CodeEditorProps {
  onSubmit: (code: string) => Promise<boolean | undefined>;
  onLanguageChange: (mode: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  onSubmit,
  onLanguageChange,
}) => {
  const codeRef = useRef<string>('');
  const languages = [
    { label: 'Python', mode: 'python' },
    { label: 'Java', mode: 'java' },
    { label: 'C++', mode: 'c_cpp' },
  ];
  const [mode, setMode] = useState<string>(languages[0].mode);
  const [theme, setTheme] = useState<string>('github');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value;
    setMode(newMode);
    onLanguageChange(newMode);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? 'twilight' : 'github');
  };

  const handleSubmit = async () => {
    const isCorrect = await onSubmit(codeRef.current);
    if (isCorrect) {
      const email = localStorage.getItem('email');
      if (email) await recordAttendance(email);
    }
  };

  return (
    <div className="w-full flex flex-col items-center relative space-y-4">
      <div className="flex flex-wrap justify-between w-full items-center gap-4">
        <div className="flex flex-col">
          <label htmlFor="language" className="mb-1 text-sm font-medium">
            언어
          </label>
          <select
            id="language"
            value={mode}
            onChange={handleLanguageChange}
            className="px-3 py-2 border rounded-md text-sm bg-white dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
          >
            {languages.map((lang) => (
              <option key={lang.mode} value={lang.mode}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={theme === 'twilight'}
            onChange={handleThemeChange}
            className="accent-blue-500"
          />
          야간 모드
        </label>
      </div>

      <div className="w-full">
        <AceEditor
          mode={mode}
          theme={theme}
          name="code_editor"
          onChange={(newCode) => {
            codeRef.current = newCode;
          }}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          style={{ width: '100%', height: '500px' }}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
      >
        채점
      </button>
    </div>
  );
};

export default CodeEditor;
