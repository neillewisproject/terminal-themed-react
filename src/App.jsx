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
  ResumeOutput,
  HobbiesOutput,
  AlbumsOutput,
  NeofetchOutput,
  HistoryOutput,
  LSOutput,
  ManOutput
} from './TerminalOutputs';

const SESSION_START = Date.now();

const COMMANDS = {
  help:           'List all available commands',
  about:          'Display objective and summary',
  skills:         'List technical skills and proficiencies',
  experience:     'Display work experience',
  education:      'Show education background',
  certifications: 'Display certifications',
  achievements:   'Show achievements and recognition',
  contact:        'Show contact information',
  resume:         'Display complete resume',
  hobbies:        'Show hobbies and interests',
  albums:         'Display favourite albums with cover art',
  neofetch:       'Display system and session information',
  history:        'Show command history',
  ls:             'List directory contents',
  pwd:            'Print current working directory',
  cat:            'Display file contents  (e.g. cat readme.md)',
  echo:           'Print arguments to terminal  (e.g. echo hello)',
  man:            'Show manual for a command  (e.g. man skills)',
  banner:         'Display the ASCII art banner',
  uptime:         'Show session uptime',
  date:           'Display current date and time',
  whoami:         'Print current user',
  clear:          'Clear the terminal screen',
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
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [savedInput, setSavedInput] = useState('');
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
        content: (
          <div className="line-muted">
            Welcome to <span className="line-highlight">{resumeData.personal.name}</span>'s interactive terminal portfolio&nbsp;&nbsp;v2.0.0
          </div>
        )
      },
      {
        type: 'output',
        content: (
          <div className="line-faint">
            Type <span className="line-highlight">help</span> to see available commands.&nbsp;&nbsp;
            Use <span className="line-highlight">↑↓</span> arrow keys for history.&nbsp;&nbsp;
            Press <span className="line-highlight">Tab</span> to autocomplete.
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

  const getUptime = () => {
    const elapsed = Math.floor((Date.now() - SESSION_START) / 1000);
    const hrs = Math.floor(elapsed / 3600);
    const mins = Math.floor((elapsed % 3600) / 60);
    const secs = elapsed % 60;
    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    const lowerCmd = trimmedCmd.toLowerCase();

    if (trimmedCmd === '') {
      setHistory((prev) => [...prev, { type: 'command', content: cmd }]);
      return;
    }

    setCmdHistory((prev) => [...prev, trimmedCmd]);

    if (lowerCmd === 'clear') {
      setHistory([]);
      return;
    }

    const parts = trimmedCmd.split(/\s+/);
    const baseCmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let output;

    // Commands that take arguments
    if (baseCmd === 'echo') {
      output = <div className="line-muted">{args}</div>;
    } else if (baseCmd === 'man') {
      if (!args) {
        output = <div className="line-error">Usage: man &lt;command&gt;  (e.g. man skills)</div>;
      } else if (COMMANDS[args.toLowerCase()]) {
        output = <ManOutput cmd={args.toLowerCase()} commands={COMMANDS} />;
      } else {
        output = <div className="line-error">No manual entry for '{args}'. Try 'help' to list commands.</div>;
      }
    } else if (baseCmd === 'cat') {
      const catFiles = {
        'readme.md': (
          <div className="stacked-copy">
            <p className="line-highlight"># Neil Lewis — Portfolio Terminal</p>
            <p>This interactive terminal showcases my professional background, skills, and passions.</p>
            <p className="line-faint">Run <span className="line-highlight">help</span> to explore all available commands.</p>
          </div>
        ),
        'about.txt': <AboutOutput />,
        'hobbies.txt': <HobbiesOutput />,
        'skills.json': <SkillsOutput />,
        'experience.md': <ExperienceOutput />,
        'education.md': <EducationOutput />,
        'achievements.txt': <AchievementsOutput />,
        'resume.pdf': (
          <div className="line-faint">Binary file. Use the <span className="line-highlight">resume</span> command instead.</div>
        ),
      };
      const file = args.toLowerCase();
      output = catFiles[file] ?? (
        <div className="line-error">cat: {args || '(none)'}: No such file or directory</div>
      );
    } else {
      switch (lowerCmd) {
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
        case 'hobbies':
          output = <HobbiesOutput />;
          break;
        case 'albums':
          output = <AlbumsOutput />;
          break;
        case 'neofetch':
          output = <NeofetchOutput uptime={getUptime()} />;
          break;
        case 'history':
          output = <HistoryOutput commands={cmdHistory} />;
          break;
        case 'ls':
          output = <LSOutput />;
          break;
        case 'pwd':
          output = <div className="line-muted">/home/neil_lewis/portfolio</div>;
          break;
        case 'banner':
          output = <pre className="ascii-art">{ASCII_ART}</pre>;
          break;
        case 'whoami':
          output = <div className="line-muted">{resumeData.personal.name.toLowerCase().replace(' ', '_')}</div>;
          break;
        case 'date':
          output = <div className="line-muted">{new Date().toString()}</div>;
          break;
        case 'uptime': {
          const uptimeStr = getUptime();
          output = (
            <div className="line-muted">
              up <span className="line-highlight">{uptimeStr}</span> — 1 user, load avg: 0.42, 0.37, 0.28
            </div>
          );
          break;
        }
        case 'sudo':
          output = <div className="line-error">neil_lewis is not in the sudoers file. This incident will be reported.</div>;
          break;
        case 'exit':
          output = <div className="line-error">There's no escape from this portfolio. Nice try. 👀</div>;
          break;
        case '42':
          output = <div className="line-highlight">The answer to life, the universe, and everything.</div>;
          break;
        default:
          output = (
            <div className="line-error">
              command not found: <strong>{trimmedCmd}</strong>.&nbsp;
              Type <span style={{ color: 'var(--green)' }}>help</span> to see available commands.
            </div>
          );
          break;
      }
    }

    appendOutput(cmd, output);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setHistoryIdx(-1);
      setSavedInput('');
      handleCommand(input);
      setInput('');
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      if (historyIdx === -1) setSavedInput(input);
      setHistoryIdx(newIdx);
      setInput(cmdHistory[newIdx]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIdx === -1) return;
      if (historyIdx < cmdHistory.length - 1) {
        const newIdx = historyIdx + 1;
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput(savedInput);
      }
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === 'c') {
      setHistory((prev) => [...prev, { type: 'command', content: `${input}^C` }]);
      setInput('');
      setHistoryIdx(-1);
      setSavedInput('');
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      setHistory([]);
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === 'u') {
      event.preventDefault();
      setInput('');
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const allCmds = Object.keys(COMMANDS);
      const matches = allCmds.filter((c) => c.startsWith(input.toLowerCase()));
      if (matches.length === 0) return;
      if (matches.length === 1) {
        setInput(matches[0]);
      } else {
        // Show all completions without consuming the input
        setHistory((prev) => [
          ...prev,
          {
            type: 'output',
            content: (
              <div className="completions-row">
                {matches.map((m) => (
                  <span key={m} className="completion-item">{m}</span>
                ))}
              </div>
            )
          }
        ]);
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
            <span>neil_lewis@portfolio:~</span>
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
