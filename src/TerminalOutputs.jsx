import { Mail, Phone, MapPin } from 'lucide-react';
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
