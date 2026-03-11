import { useEffect, useMemo, useRef, useState } from 'react';
import { Terminal, Maximize2, Minus, X } from 'lucide-react';
import { resumeData, ASCII_ART } from './resumeData';
import {
  HelpOutput,
  AboutOutput,
  SkillsOutput,
  ExperienceOutput,
  EducationOutput,
  CertificationsOutput,
  AchievementsOutput,
  ContactOutput,
  ResumeOutput
} from './TerminalOutputs';

const COMMANDS = {
  help: 'List all available commands',
  about: 'Display objective and summary',
  skills: 'List technical skills and proficiencies',
  experience: 'Display work experience',
  education: 'Show education background',
  certifications: 'Display certifications',
  achievements: 'Show achievements and recognition',
  contact: 'Show contact information',
  resume: 'Display complete resume',
  clear: 'Clear the terminal screen',
  whoami: 'Print current user',
  date: 'Display current system date and time'
};

function Prompt() {
  return (
    <div className="prompt">
      <span className="prompt-user">neil_lewis</span>
      <span className="prompt-divider">@</span>
      <span className="prompt-host">portfolio</span>
      <span className="prompt-divider">:</span>
      <span className="prompt-path">~</span>
      <span className="prompt-divider">$</span>
    </div>
  );
}

export default function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const welcomeEntries = useMemo(
    () => [
      {
        type: 'output',
        content: <pre className="ascii-art">{ASCII_ART}</pre>
      },
      {
        type: 'output',
        content: <div className="line-muted">Welcome to {resumeData.personal.name}'s interactive terminal portfolio. v1.0.0</div>
      },
      {
        type: 'output',
        content: (
          <div className="line-faint">
            Type <span className="line-highlight">help</span> to see a list of available commands.
          </div>
        )
      }
    ],
    []
  );

  useEffect(() => {
    setHistory(welcomeEntries);
  }, [welcomeEntries]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const appendOutput = (cmd, output) => {
    setHistory((prev) => [
      ...prev,
      { type: 'command', content: cmd },
      { type: 'output', content: output }
    ]);
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === '') {
      setHistory((prev) => [...prev, { type: 'command', content: cmd }]);
      return;
    }

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    let output;

    switch (trimmedCmd) {
      case 'help':
        output = <HelpOutput commands={COMMANDS} />;
        break;
      case 'about':
        output = <AboutOutput />;
        break;
      case 'skills':
        output = <SkillsOutput />;
        break;
      case 'experience':
        output = <ExperienceOutput />;
        break;
      case 'education':
        output = <EducationOutput />;
        break;
      case 'certifications':
        output = <CertificationsOutput />;
        break;
      case 'achievements':
        output = <AchievementsOutput />;
        break;
      case 'contact':
        output = <ContactOutput />;
        break;
      case 'resume':
        output = <ResumeOutput />;
        break;
      case 'whoami':
        output = <div className="line-muted">{resumeData.personal.name.toLowerCase().replace(' ', '_')}</div>;
        break;
      case 'date':
        output = <div className="line-muted">{new Date().toString()}</div>;
        break;
      case 'sudo':
        output = <div className="line-error">nice try. this incident will be reported.</div>;
        break;
      default:
        output = <div className="line-error">Command not found: {cmd}. Type 'help' to see available commands.</div>;
        break;
    }

    appendOutput(cmd, output);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleCommand(input);
      setInput('');
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === 'c') {
      setHistory((prev) => [...prev, { type: 'command', content: `${input}^C` }]);
      setInput('');
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const match = Object.keys(COMMANDS).find((command) => command.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match);
      }
    }
  };

  return (
    <div className="app-shell">
      <div className="terminal-window" onClick={handleTerminalClick}>
        <header className="terminal-header">
          <div className="window-controls" aria-hidden="true">
            <span className="window-dot red" />
            <span className="window-dot yellow" />
            <span className="window-dot green" />
          </div>

          <div className="terminal-title">
            <Terminal size={14} />
            <span>bob@engineer:~</span>
          </div>

          <div className="header-icons" aria-hidden="true">
            <Minus size={14} />
            <Maximize2 size={14} />
            <X size={14} />
          </div>
        </header>

        <main className="terminal-body">
          {history.map((entry, index) => (
            <div key={`${entry.type}-${index}`} className="history-row">
              {entry.type === 'command' ? (
                <div className="command-row">
                  <Prompt />
                  <span className="command-text">{entry.content}</span>
                </div>
              ) : (
                <div className="output-row">{entry.content}</div>
              )}
            </div>
          ))}

          <div className="input-row">
            <Prompt />
            <div className="input-wrap">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input"
                autoComplete="off"
                spellCheck="false"
                autoFocus
              />
              <span className="input-ghost">{input || ' '}</span>
            </div>
          </div>

          <div ref={bottomRef} className="scroll-anchor" />
        </main>
      </div>
    </div>
  );
}
