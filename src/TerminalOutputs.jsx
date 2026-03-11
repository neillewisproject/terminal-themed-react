import { useState } from 'react';
import { Mail, Phone, MapPin, Music } from 'lucide-react';
import { resumeData } from './resumeData';

export function HelpOutput({ commands }) {
  return (
    <div className="help-grid">
      {Object.entries(commands).map(([key, desc]) => (
        <div key={key} className="help-row">
          <span className="help-command">{key}</span>
          <span className="help-description">— {desc}</span>
        </div>
      ))}
    </div>
  );
}

export function AboutOutput() {
  return (
    <div className="stacked-copy">
      <h3 className="line-highlight">{resumeData.personal.name}</h3>
      <p className="line-muted">
        <MapPin size={14} style={{ display: 'inline', marginRight: '8px' }} />
        {resumeData.personal.location}
      </p>
      <h4 className="line-highlight">Objective</h4>
      <p>{resumeData.objective}</p>
    </div>
  );
}

export function SkillsOutput() {
  return (
    <div className="skills-output">
      <span className="line-faint">// skills.json</span>
      <pre>{JSON.stringify(resumeData.skills, null, 2).replace(/"/g, '')}</pre>
    </div>
  );
}

export function ExperienceOutput() {
  return (
    <div className="stacked-copy">
      {resumeData.experience.map((exp, idx) => (
        <section key={idx} style={{ marginBottom: '2rem' }}>
          <div className="experience-head">
            <span className="line-highlight">
              {exp.title} @ {exp.company}
            </span>
            <span className="line-faint">{exp.period}</span>
          </div>
          {exp.projects?.map((project, pIdx) => (
            <div key={pIdx} style={{ marginTop: '1rem' }}>
              <h4 style={{ color: 'var(--green)', marginBottom: '0.5rem' }}>
                Project: {project.name}
              </h4>
              <p style={{ marginBottom: '0.5rem' }}>{project.description}</p>
              {project.contributions && (
                <ul>
                  {project.contributions.map((contrib, cIdx) => (
                    <li key={cIdx}>{contrib}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

export function EducationOutput() {
  return (
    <div className="stacked-copy">
      {resumeData.education.map((edu, idx) => (
        <section key={idx}>
          <div className="experience-head">
            <span className="line-highlight">{edu.degree}</span>
            <span className="line-faint">{edu.period}</span>
          </div>
          <p>{edu.institution}</p>
          <p className="line-muted">{edu.cgpa}</p>
        </section>
      ))}
    </div>
  );
}

export function CertificationsOutput() {
  return (
    <div className="stacked-copy">
      {resumeData.certifications.map((cert, idx) => (
        <div key={idx}>
          <p className="line-highlight">{cert.name}</p>
          <p className="line-muted">
            ID: {cert.id} | Passed: {cert.year}
          </p>
        </div>
      ))}
    </div>
  );
}

export function AchievementsOutput() {
  return (
    <div className="stacked-copy">
      <ul>
        {resumeData.achievements.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function ContactOutput() {
  return (
    <div className="contact-list">
      <div className="contact-row">
        <Mail size={16} />
        <a href={`mailto:${resumeData.personal.email}`}>{resumeData.personal.email}</a>
      </div>
      <div className="contact-row">
        <Phone size={16} />
        <span>{resumeData.personal.phone}</span>
      </div>
      <div className="contact-row">
        <MapPin size={16} />
        <span>{resumeData.personal.location}</span>
      </div>
    </div>
  );
}

export function ResumeOutput() {
  return (
    <div className="stacked-copy">
      <h2 className="line-highlight">{resumeData.personal.name}</h2>
      <p className="line-muted">
        {resumeData.personal.email} | {resumeData.personal.phone}
      </p>
      <h3 className="line-highlight">Objective</h3>
      <p>{resumeData.objective}</p>
      <h3 className="line-highlight">Experience</h3>
      {resumeData.experience.map((exp, idx) => (
        <p key={idx}>
          <strong>{exp.title}</strong> @ {exp.company} ({exp.period})
        </p>
      ))}
      <p className="line-faint">Use 'experience' command for a detailed view.</p>
      <h3 className="line-highlight">Education</h3>
      {resumeData.education.map((edu, idx) => (
        <p key={idx}>
          {edu.degree} — {edu.cgpa} ({edu.period})
        </p>
      ))}
      <h3 className="line-highlight">Skills</h3>
      <p className="line-faint">Use 'skills' command for a detailed view.</p>
    </div>
  );
}

export function HobbiesOutput() {
  return (
    <div className="hobbies-section">
      <div className="line-faint" style={{ marginBottom: '0.6rem' }}>// hobbies.txt</div>
      <div className="hobbies-grid">
        {resumeData.hobbies.map((hobby, idx) => (
          <div key={idx} className="hobby-card">
            <span className="hobby-icon">{hobby.icon}</span>
            <div className="hobby-info">
              <span className="hobby-name">{hobby.name}</span>
              <span className="hobby-desc">{hobby.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AlbumsOutput() {
  const [imgErrors, setImgErrors] = useState({});

  const handleImgError = (idx) => {
    setImgErrors((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <div className="albums-section">
      <div className="line-faint" style={{ marginBottom: '0.75rem' }}>
        <Music size={13} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
        favourite_albums — {resumeData.albums.length} records
      </div>
      <div className="albums-grid">
        {resumeData.albums.map((album, idx) => (
          <div key={idx} className="album-card">
            <div className="album-cover-wrap">
              {!imgErrors[idx] ? (
                <img
                  src={album.cover}
                  alt={`${album.title} by ${album.artist}`}
                  className="album-cover"
                  onError={() => handleImgError(idx)}
                />
              ) : (
                <div className="album-cover-fallback">
                  {album.title.charAt(0)}
                </div>
              )}
            </div>
            <div className="album-info">
              <div className="album-title">{album.title}</div>
              <div className="album-artist">{album.artist}</div>
              <div className="album-meta">
                <span className="album-year">{album.year}</span>
                <span className="album-genre">{album.genre}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const NEOFETCH_ART = `   ┌──────────────────┐
   │  > NL _          │
   │  neil lewis      │
   │  ~ $ portfolio   │
   └────────┬─────────┘
            │
   ━━━━━━━━━┷━━━━━━━━━`;

export function NeofetchOutput({ uptime }) {
  const resolution =
    typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'Unknown';

  const rows = [
    ['OS', 'Portfolio Linux x86_64'],
    ['Host', 'Browser Environment'],
    ['Kernel', 'React 18 + Vite 5'],
    ['Shell', 'terminal.jsx 1.0.0'],
    ['Uptime', uptime],
    ['Packages', 'npm (12 installed)'],
    ['Resolution', resolution],
    ['Theme', 'Dark Terminal [Dark]'],
    ['CPU', 'Full Stack Engineer'],
    ['Memory', '∞ Coffee / Unlimited'],
  ];

  const palette = ['#ff5f56', '#ffbd2e', '#27c93f', '#5ef29a', '#61afef', '#c678dd', '#ff6c7a', '#8ba0b7'];

  return (
    <div className="neofetch-container">
      <pre className="neofetch-art">{NEOFETCH_ART}</pre>
      <div className="neofetch-info">
        <div className="neofetch-header">
          <span className="neofetch-user">neil_lewis</span>
          <span className="neofetch-at">@</span>
          <span className="neofetch-host">portfolio</span>
        </div>
        <div className="neofetch-sep">{'─'.repeat(22)}</div>
        {rows.map(([key, val]) => (
          <div key={key} className="neofetch-row">
            <span className="neofetch-key">{key}</span>
            <span className="neofetch-colon">: </span>
            <span className="neofetch-val">{val}</span>
          </div>
        ))}
        <div className="neofetch-palette">
          {palette.map((c) => (
            <span key={c} className="neofetch-dot" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HistoryOutput({ commands }) {
  if (!commands.length) {
    return <div className="line-faint">No commands in history yet.</div>;
  }
  return (
    <div className="history-output">
      {commands.map((cmd, idx) => (
        <div key={idx} className="history-entry">
          <span className="history-num">{String(idx + 1).padStart(4, ' ')}</span>
          <span className="history-cmd">{cmd}</span>
        </div>
      ))}
    </div>
  );
}

export function LSOutput() {
  const entries = [
    { name: 'about.txt',        color: 'var(--text)' },
    { name: 'skills.json',      color: '#95cbff' },
    { name: 'experience.md',    color: 'var(--text)' },
    { name: 'education.md',     color: 'var(--text)' },
    { name: 'certifications/',  color: 'var(--blue)' },
    { name: 'achievements.txt', color: 'var(--text)' },
    { name: 'contact.vcard',    color: 'var(--green)' },
    { name: 'albums/',          color: 'var(--blue)' },
    { name: 'hobbies.txt',      color: 'var(--text)' },
    { name: 'resume.pdf',       color: '#ffbd2e' },
  ];
  return (
    <div className="ls-output">
      {entries.map((f) => (
        <span key={f.name} className="ls-item" style={{ color: f.color }}>
          {f.name}
        </span>
      ))}
    </div>
  );
}

export function ManOutput({ cmd, commands }) {
  const desc = commands[cmd];
  return (
    <div className="man-output">
      <div className="man-header">MANUAL PAGE — {cmd.toUpperCase()}(1)</div>
      <div className="man-section">
        <div className="line-highlight">NAME</div>
        <div className="man-indent">{cmd} — {desc}</div>
      </div>
      <div className="man-section">
        <div className="line-highlight">SYNOPSIS</div>
        <div className="man-indent">{cmd === 'echo' || cmd === 'man' || cmd === 'cat' ? `${cmd} [argument]` : cmd}</div>
      </div>
      <div className="man-section">
        <div className="line-highlight">DESCRIPTION</div>
        <div className="man-indent">{desc}</div>
      </div>
      <div className="man-footer">Type <span className="line-highlight">help</span> to list all commands.</div>
    </div>
  );
}
