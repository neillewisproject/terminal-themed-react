import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Terminal,
  Maximize2,
  Minus,
  X,
  ExternalLink,
  Github,
  Mail,
  Linkedin
} from 'lucide-react';

const ASCII_ART = `
  ____        _          ____
 |  _ \\      | |        |  _ \\
 | |_) | ___ | |__      | |_) | ___  _ __
 |  _ < / _ \\| '_ \\     |  _ < / _ \\| '__|
 | |_) | (_) | |_) |    | |_) | (_) | |
 |____/ \\___/|_.__/     |____/ \\___/|_|
`;

const COMMANDS = {
  help: 'List all available commands',
  about: 'Display information about me',
  skills: 'List technical skills and proficiencies',
  projects: 'Show recent projects and repositories',
  experience: 'Display work experience',
  contact: 'Show contact information and social links',
  clear: 'Clear the terminal screen',
  whoami: 'Print current user',
  date: 'Display current system date and time'
};

const PROJECTS = [
  {
    name: 'Nebula.js',
    description: 'A lightweight 3D particle engine built on WebGL.',
    tech: ['JavaScript', 'WebGL', 'Three.js'],
    link: 'https://github.com/example/nebula'
  },
  {
    name: 'Go-MicroAuth',
    description: 'High-performance JWT authentication microservice.',
    tech: ['Golang', 'Redis', 'Docker'],
    link: 'https://github.com/example/go-auth'
  },
  {
    name: 'TermFolio',
    description: 'The terminal emulator portfolio you are currently viewing.',
    tech: ['React', 'CSS', 'Vite'],
    link: '#'
  }
];

const SKILLS = {
  frontend: ['React', 'TypeScript', 'Next.js', 'Redux', 'CSS'],
  backend: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis'],
  devops: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Linux'],
  tools: ['Git', 'Vim', 'Figma', 'Jest']
};

function Prompt() {
  return (
    <div className="prompt">
      <span className="prompt-user">visitor</span>
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
        content: <div className="line-muted">Welcome to Bob's interactive terminal portfolio. v2.0.4</div>
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
        output = (
          <div className="help-grid">
            {Object.entries(COMMANDS).map(([key, desc]) => (
              <div key={key} className="help-row">
                <span className="help-command">{key}</span>
                <span className="help-description">- {desc}</span>
              </div>
            ))}
          </div>
        );
        break;
      case 'about':
        output = (
          <div className="stacked-copy">
            <p>
              Hi, I am Bob, a full-stack software engineer with 5+ years of experience building scalable
              web applications and distributed systems.
            </p>
            <p>
              I specialize in modern JavaScript and TypeScript ecosystems, backend microservices, and cloud
              infrastructure.
            </p>
            <p>
              When I am not coding, I am usually reading sci-fi, tinkering with mechanical keyboards, or
              brewing overly complicated coffee.
            </p>
          </div>
        );
        break;
      case 'skills':
        output = (
          <div className="skills-output">
            <span className="line-faint">// skills.json</span>
            <pre>{JSON.stringify(SKILLS, null, 2).replace(/"/g, '')}</pre>
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="projects-list">
            {PROJECTS.map((project) => (
              <article key={project.name} className="project-card">
                <div className="project-head">
                  <h3>{project.name}</h3>
                  <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}>
                    <ExternalLink size={16} />
                  </a>
                </div>
                <p>{project.description}</p>
                <div className="badge-row">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        );
        break;
      case 'experience':
        output = (
          <div className="stacked-copy">
            <section>
              <div className="experience-head">
                <span className="line-highlight">Senior Software Engineer @ TechCorp</span>
                <span className="line-faint">2021 - Present</span>
              </div>
              <ul>
                <li>Led migration from monolithic architecture to Go microservices.</li>
                <li>Reduced API latency by 40% through Redis caching optimization.</li>
                <li>Mentored junior engineers and established CI/CD best practices.</li>
              </ul>
            </section>
            <section>
              <div className="experience-head">
                <span className="line-highlight">Full Stack Developer @ StartupX</span>
                <span className="line-faint">2018 - 2021</span>
              </div>
              <ul>
                <li>Developed high-traffic React dashboard serving 50k+ daily users.</li>
                <li>Designed and implemented RESTful APIs using Node.js and Express.</li>
              </ul>
            </section>
          </div>
        );
        break;
      case 'contact':
        output = (
          <div className="contact-list">
            <div className="contact-row">
              <Mail size={16} />
              <a href="mailto:hello@example.com">hello@example.com</a>
            </div>
            <div className="contact-row">
              <Github size={16} />
              <a href="https://github.com/example" target="_blank" rel="noreferrer">
                github.com/example
              </a>
            </div>
            <div className="contact-row">
              <Linkedin size={16} />
              <a href="https://linkedin.com/in/example" target="_blank" rel="noreferrer">
                linkedin.com/in/example
              </a>
            </div>
          </div>
        );
        break;
      case 'whoami':
        output = <div className="line-muted">visitor</div>;
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
