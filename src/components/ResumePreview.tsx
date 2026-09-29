import React from 'react';
import { ResumeRecord, ResumeCategoryKey } from '../types/resume';
import { CATEGORIES } from '../data/categories';
import { 
  Mail, Phone, MapPin, Globe, Linkedin, Github, GraduationCap, 
  ExternalLink, Award, BookOpen, Briefcase, Code, CheckCircle, FileText
} from 'lucide-react';

interface ResumePreviewProps {
  resume: ResumeRecord;
  zoomScale: number;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resume, zoomScale }) => {
  const { data, enabledSections, templateId, themeColor, fontFamily, spacingScale, headerStyle, photoShape, showPageGuides, photo } = resume;
  const cat = CATEGORIES[resume.category] || CATEGORIES.student;

  // Split lines into non-empty bullet points
  const getBullets = (text?: string): string[] => {
    if (!text) return [];
    return text.split('\n').map(s => s.trim().replace(/^[•\-\*]\s*/, '')).filter(Boolean);
  };

  const hasData = Boolean(
    data.fullName || data.email || data.phone || data.summaryText ||
    (data.educationList && data.educationList.length > 0) ||
    (data.experienceList && data.experienceList.length > 0) ||
    (data.projectsList && data.projectsList.length > 0) ||
    data.skillsText || data.devLanguages || data.publicationsList
  );

  // Spacing styling classes
  const spacingClass = 
    spacingScale === 'compact' ? 'p-[12mm_15mm] text-[12px] leading-relaxed' :
    spacingScale === 'spacious' ? 'p-[22mm_24mm] text-[13.5px] leading-loose' :
    'p-[18mm_20mm] text-[13px] leading-normal';

  // Photo shape class
  const photoShapeClass = 
    photoShape === 'circle' ? 'rounded-full' :
    photoShape === 'square' ? 'rounded-none' :
    'rounded-lg';

  // Helper for links
  const renderExternalLink = (url?: string, label?: string) => {
    if (!url) return null;
    let href = url;
    if (!/^https?:\/\//i.test(href) && !/^mailto:/i.test(href) && !/^tel:/i.test(href)) {
      href = 'https://' + href;
    }
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center gap-1 hover:underline font-medium text-inherit"
      >
        <span>{label || url}</span>
        <ExternalLink className="w-2.5 h-2.5 opacity-60 inline" />
      </a>
    );
  };

  // Section Header Renderer
  const renderSectionHeader = (title: string, icon?: React.ReactNode) => {
    if (headerStyle === 'banner') {
      return (
        <div 
          className="text-white px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2.5 rounded-sm flex items-center gap-1.5"
          style={{ backgroundColor: themeColor }}
        >
          {icon}
          <span>{title}</span>
        </div>
      );
    }
    if (headerStyle === 'line') {
      return (
        <div 
          className="font-bold text-xs uppercase tracking-wider pb-1 mb-2.5 border-b-2 flex items-center gap-1.5"
          style={{ color: themeColor, borderColor: themeColor }}
        >
          {icon}
          <span>{title}</span>
        </div>
      );
    }
    if (headerStyle === 'left-border') {
      return (
        <div 
          className="font-bold text-xs uppercase tracking-wider pl-2.5 py-0.5 mb-2.5 border-l-4 flex items-center gap-1.5"
          style={{ color: themeColor, borderColor: themeColor }}
        >
          {icon}
          <span>{title}</span>
        </div>
      );
    }
    // minimal
    return (
      <div 
        className="font-extrabold text-xs uppercase tracking-widest pb-1 mb-2.5 border-b border-dashed border-slate-300 flex items-center gap-1.5"
        style={{ color: themeColor }}
      >
        {icon}
        <span>{title}</span>
      </div>
    );
  };

  // Empty state hint
  if (!hasData) {
    return (
      <div 
        style={{ transform: `scale(${zoomScale})`, transformOrigin: 'top center' }}
        className="transition-transform duration-150"
      >
        <div 
          className="bg-white shadow-2xl w-[210mm] min-h-[297mm] p-12 text-center flex flex-col items-center justify-center text-slate-400 border border-slate-200"
          style={{ fontFamily }}
        >
          <div className="text-5xl mb-4">{cat.icon}</div>
          <h2 className="text-xl font-bold text-slate-700">{cat.name}</h2>
          <p className="text-sm mt-2 text-slate-500 max-w-md">
            Start filling in your information on the left panel, or click <strong className="text-blue-600">"✨ Load Demo Data"</strong> to see this template populated with realistic professional content.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-slate-400 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>Zero dummy data printed &mdash; only what you enter will show</span>
          </div>
        </div>
      </div>
    );
  }

  // Choose layout strategy based on templateId
  const isTwoColumn = ['student_modern', 'corp_modern', 'dev_modern', 'fresher_modern'].includes(templateId);
  const isAcademicTraditional = ['prof_traditional', 'res_scholarly', 'student_academic', 'medical'].includes(templateId);
  const isModernAcademic = ['prof_modern', 'prof_research', 'res_modern', 'res_fellow'].includes(templateId);
  const isTerminalDev = templateId === 'dev_terminal';

  return (
    <div 
      style={{ transform: `scale(${zoomScale})`, transformOrigin: 'top center' }}
      className="resume-zoom-wrapper transition-transform duration-150 relative"
    >
      <article 
        id="printable-resume"
        className={`bg-white shadow-2xl w-[210mm] min-h-[297mm] text-slate-800 border border-slate-200 relative print:border-none print:shadow-none print:w-full print:m-0 print:p-0 ${
          isTwoColumn ? 'resume-two-column p-0 grid grid-cols-[68mm_1fr]' : spacingClass
        }`}
        style={{ 
          fontFamily,
          boxSizing: 'border-box'
        }}
      >
        {/* Optional Page 1 Guide line */}
        {showPageGuides && (
          <div className="page-guide-line absolute top-[297mm] left-0 w-full border-b-2 border-dashed border-red-500 pointer-events-none z-50 flex justify-end print:hidden">
            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded -translate-y-full mr-4">
              ✂ Approximate End of A4 Page 1
            </span>
          </div>
        )}

        {/* ----------------- 1. TWO-COLUMN SIDEBAR LAYOUT ----------------- */}
        {isTwoColumn ? (
          <>
            {/* Sidebar Column */}
            <aside 
              className="p-[14mm_10mm] border-r border-slate-200 flex flex-col gap-5"
              style={{ backgroundColor: `${themeColor}0d` }}
            >
              {photo && (
                <div className="flex justify-center mb-1">
                  <img 
                    src={photo} 
                    alt="Profile" 
                    className={`w-28 h-32 object-cover border-2 shadow-sm ${photoShapeClass}`}
                    style={{ borderColor: themeColor }}
                  />
                </div>
              )}

              {/* Contact Info */}
              {enabledSections.contact !== false && (
                <div>
                  <h3 
                    className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b-2 flex items-center gap-1.5"
                    style={{ color: themeColor, borderColor: themeColor }}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </h3>
                  <div className="space-y-2 text-xs text-slate-700 break-words">
                    {data.email && (
                      <div className="flex items-start gap-2">
                        <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-70" />
                        <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a>
                      </div>
                    )}
                    {data.phone && (
                      <div className="flex items-start gap-2">
                        <Phone className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-70" />
                        <a href={`tel:${data.phone}`} className="hover:underline">{data.phone}</a>
                      </div>
                    )}
                    {data.location && (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-70" />
                        <span>{data.location}</span>
                      </div>
                    )}
                    {data.linkedin && (
                      <div className="flex items-start gap-2">
                        <Linkedin className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-70" />
                        {renderExternalLink(data.linkedin, 'LinkedIn Profile')}
                      </div>
                    )}
                    {data.github && (
                      <div className="flex items-start gap-2">
                        <Github className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-70" />
                        {renderExternalLink(data.github, 'GitHub')}
                      </div>
                    )}
                    {data.portfolio && (
                      <div className="flex items-start gap-2">
                        <Globe className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-70" />
                        {renderExternalLink(data.portfolio, 'Portfolio')}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Skills */}
              {enabledSections.skills !== false && data.skillsText && (
                <div>
                  <h3 
                    className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b-2 flex items-center gap-1.5"
                    style={{ color: themeColor, borderColor: themeColor }}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Skills</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {getBullets(data.skillsText).map((s, idx) => (
                      <span 
                        key={idx} 
                        className="text-[11px] font-medium px-2 py-0.5 rounded border"
                        style={{ 
                          backgroundColor: 'white', 
                          borderColor: `${themeColor}40`,
                          color: themeColor
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack for Devs in Sidebar */}
              {enabledSections.tech_skills !== false && (data.devLanguages || data.devFrameworks || data.devDatabases || data.devTools) && (
                <div>
                  <h3 
                    className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b-2 flex items-center gap-1.5"
                    style={{ color: themeColor, borderColor: themeColor }}
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Tech Stack</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    {data.devLanguages && (
                      <div>
                        <div className="font-semibold text-slate-800">Languages:</div>
                        <div className="text-slate-600">{data.devLanguages}</div>
                      </div>
                    )}
                    {data.devFrameworks && (
                      <div>
                        <div className="font-semibold text-slate-800">Frameworks:</div>
                        <div className="text-slate-600">{data.devFrameworks}</div>
                      </div>
                    )}
                    {data.devDatabases && (
                      <div>
                        <div className="font-semibold text-slate-800">Databases & Cloud:</div>
                        <div className="text-slate-600">{data.devDatabases}</div>
                      </div>
                    )}
                    {data.devTools && (
                      <div>
                        <div className="font-semibold text-slate-800">Tools:</div>
                        <div className="text-slate-600">{data.devTools}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Certifications in Sidebar */}
              {enabledSections.certifications !== false && data.certificationsText && (
                <div>
                  <h3 
                    className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b-2 flex items-center gap-1.5"
                    style={{ color: themeColor, borderColor: themeColor }}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Certifications</span>
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {getBullets(data.certificationsText).map((c, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>

            {/* Main Column */}
            <main className="p-[14mm_14mm] flex flex-col gap-4">
              {/* Header Title */}
              <div>
                {data.fullName && (
                  <h1 
                    className="text-2xl font-extrabold tracking-tight"
                    style={{ color: themeColor }}
                  >
                    {data.fullName}
                  </h1>
                )}
                {(data.devRole || data.jobTitle || data.currentDegree || data.designation) && (
                  <div className="text-sm font-semibold uppercase tracking-wider text-slate-500 mt-0.5">
                    {data.devRole || data.jobTitle || data.currentDegree || data.designation}
                  </div>
                )}
              </div>

              {/* Summary / Objective */}
              {(enabledSections.objective !== false || enabledSections.summary !== false) && data.summaryText && (
                <div>
                  {renderSectionHeader('About Me')}
                  <p className="text-xs leading-relaxed text-slate-700 text-justify">
                    {data.summaryText}
                  </p>
                </div>
              )}

              {/* Experience */}
              {enabledSections.experience !== false && data.experienceList && data.experienceList.length > 0 && (
                <div>
                  {renderSectionHeader('Experience', <Briefcase className="w-3 h-3" />)}
                  <div className="space-y-3">
                    {data.experienceList.map(exp => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline text-xs font-bold text-slate-800">
                          <span>{exp.role} {exp.company ? `— ${exp.company}` : ''}</span>
                          <span className="text-slate-500 font-normal shrink-0 ml-2">{exp.period}</span>
                        </div>
                        {exp.location && (
                          <div className="text-[11px] text-slate-500 italic mb-1">{exp.location}</div>
                        )}
                        {exp.details && (
                          <ul className="text-xs text-slate-700 space-y-1 ml-3 list-disc">
                            {getBullets(exp.details).map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {enabledSections.education !== false && data.educationList && data.educationList.length > 0 && (
                <div>
                  {renderSectionHeader('Education', <GraduationCap className="w-3 h-3" />)}
                  <div className="space-y-2.5">
                    {data.educationList.map(edu => (
                      <div key={edu.id} className="text-xs">
                        <div className="flex justify-between items-baseline font-bold text-slate-800">
                          <span>{edu.degree}</span>
                          <span className="text-slate-500 font-normal shrink-0 ml-2">{edu.year}</span>
                        </div>
                        <div className="text-slate-600 flex justify-between">
                          <span>{edu.institute} {edu.board ? `(${edu.board})` : ''}</span>
                          {edu.score && <span className="font-semibold" style={{ color: themeColor }}>{edu.score}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {(enabledSections.projects !== false || enabledSections.academic_projects !== false) && data.projectsList && data.projectsList.length > 0 && (
                <div>
                  {renderSectionHeader('Key Projects', <Code className="w-3 h-3" />)}
                  <div className="space-y-3">
                    {data.projectsList.map(proj => (
                      <div key={proj.id} className="text-xs">
                        <div className="flex justify-between items-baseline font-bold text-slate-800">
                          <span className="flex items-center gap-1.5">
                            <span>{proj.title}</span>
                            {proj.link && renderExternalLink(proj.link, 'Demo / Code')}
                          </span>
                        </div>
                        {proj.stack && (
                          <div className="text-[11px] font-mono text-slate-500 mb-1 font-medium">
                            Stack: {proj.stack}
                          </div>
                        )}
                        {proj.desc && (
                          <ul className="text-slate-700 space-y-1 ml-3 list-disc">
                            {getBullets(proj.desc).map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </>
        ) : isAcademicTraditional ? (
          /* ----------------- 2. TRADITIONAL ACADEMIC / SCHOLARLY CV ----------------- */
          <div className="space-y-4 font-serif">
            {/* Academic Header */}
            <header className="text-center pb-4 border-b-2 border-slate-900 mb-2">
              {data.fullName && (
                <h1 className="text-2xl font-bold tracking-wide uppercase text-slate-900">
                  {data.fullName}
                </h1>
              )}
              {data.designation && (
                <div className="text-sm italic text-slate-700 mt-1 font-medium">
                  {data.designation}
                </div>
              )}
              {(data.department || data.institution) && (
                <div className="text-xs text-slate-600 mt-0.5">
                  {[data.department, data.institution].filter(Boolean).join(', ')}
                </div>
              )}
              <div className="text-xs text-slate-700 mt-2 flex flex-wrap justify-center gap-3">
                {data.email && <span>Email: <a href={`mailto:${data.email}`} className="underline">{data.email}</a></span>}
                {data.phone && <span>Phone: {data.phone}</span>}
                {data.scholar && <span>{renderExternalLink(data.scholar, 'Google Scholar')}</span>}
                {data.orcid && <span>ORCID: {renderExternalLink(`https://orcid.org/${data.orcid}`, data.orcid)}</span>}
                {data.researchGate && <span>{renderExternalLink(data.researchGate, 'ResearchGate')}</span>}
              </div>
            </header>

            {/* Profile / Summary */}
            {data.summaryText && (
              <section>
                {renderSectionHeader('Academic & Professional Profile')}
                <p className="text-xs text-justify leading-relaxed text-slate-800">
                  {data.summaryText}
                </p>
              </section>
            )}

            {/* Education Qualifications */}
            {enabledSections.education !== false && data.educationList && data.educationList.length > 0 && (
              <section>
                {renderSectionHeader('Educational Qualifications')}
                <div className="space-y-2 text-xs">
                  {data.educationList.map(edu => (
                    <div key={edu.id} className="flex justify-between items-baseline">
                      <div>
                        <strong>{edu.degree}</strong>, {edu.institute} {edu.board ? `(${edu.board})` : ''}
                      </div>
                      <div className="shrink-0 ml-2 font-medium">
                        {edu.year} {edu.score ? `— ${edu.score}` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Teaching Experience */}
            {(enabledSections.teaching !== false || enabledSections.experience !== false) && data.experienceList && data.experienceList.length > 0 && (
              <section>
                {renderSectionHeader('Academic & Teaching Experience')}
                <div className="space-y-3 text-xs">
                  {data.experienceList.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{exp.role}, {exp.company}</span>
                        <span className="font-normal">{exp.period}</span>
                      </div>
                      {exp.details && (
                        <ul className="list-disc ml-4 space-y-1 mt-1 text-slate-700">
                          {getBullets(exp.details).map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Publications */}
            {enabledSections.publications !== false && data.publicationsList && (
              <section>
                {renderSectionHeader('Publications & Research Papers')}
                <ol className="list-decimal ml-5 space-y-1.5 text-xs text-slate-800 text-justify">
                  {getBullets(data.publicationsList).map((pub, idx) => (
                    <li key={idx}>{pub}</li>
                  ))}
                </ol>
              </section>
            )}

            {/* Patents */}
            {enabledSections.patents !== false && data.patentsList && (
              <section>
                {renderSectionHeader('Patents & Innovations')}
                <ol className="list-decimal ml-5 space-y-1 text-xs text-slate-800">
                  {getBullets(data.patentsList).map((pat, idx) => (
                    <li key={idx}>{pat}</li>
                  ))}
                </ol>
              </section>
            )}

            {/* Grants */}
            {enabledSections.grants !== false && data.grantsList && (
              <section>
                {renderSectionHeader('Sponsored Research Grants')}
                <ul className="list-disc ml-5 space-y-1 text-xs text-slate-800">
                  {getBullets(data.grantsList).map((grant, idx) => (
                    <li key={idx}>{grant}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* FDPs */}
            {enabledSections.fdp !== false && data.fdpList && (
              <section>
                {renderSectionHeader('Faculty Development Programmes & Workshops')}
                <ul className="list-disc ml-5 space-y-1 text-xs text-slate-800">
                  {getBullets(data.fdpList).map((fdp, idx) => (
                    <li key={idx}>{fdp}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        ) : isModernAcademic ? (
          /* ----------------- 3. MODERN ACADEMIC / RESEARCHER CV ----------------- */
          <div className="space-y-4">
            {/* Header with Hero Banner */}
            <header className="flex justify-between items-start pb-4 border-b-2 gap-4" style={{ borderColor: themeColor }}>
              <div className="space-y-1 flex-1">
                {data.fullName && (
                  <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: themeColor }}>
                    {data.fullName}
                  </h1>
                )}
                {data.designation && (
                  <div className="text-sm font-semibold text-slate-800">
                    {data.designation} {data.department ? `• ${data.department}` : ''}
                  </div>
                )}
                {data.institution && (
                  <div className="text-xs text-slate-600">{data.institution}</div>
                )}
                <div className="flex flex-wrap gap-2 pt-2 text-xs">
                  {data.email && (
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">
                      📧 <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a>
                    </span>
                  )}
                  {data.phone && (
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      📞 {data.phone}
                    </span>
                  )}
                  {data.scholar && (
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">
                      🎓 {renderExternalLink(data.scholar, 'Google Scholar')}
                    </span>
                  )}
                  {data.orcid && (
                    <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-medium">
                      🆔 {renderExternalLink(`https://orcid.org/${data.orcid}`, `ORCID: ${data.orcid}`)}
                    </span>
                  )}
                </div>
              </div>
              {photo && (
                <div className="shrink-0">
                  <img 
                    src={photo} 
                    alt="Faculty" 
                    className={`w-24 h-28 object-cover border-2 shadow-sm ${photoShapeClass}`}
                    style={{ borderColor: themeColor }}
                  />
                </div>
              )}
            </header>

            {/* Profile Summary */}
            {data.summaryText && (
              <section>
                {renderSectionHeader('Academic Profile & Research Summary')}
                <p className="text-xs text-justify leading-relaxed text-slate-700">
                  {data.summaryText}
                </p>
              </section>
            )}

            {/* Education */}
            {enabledSections.education !== false && data.educationList && data.educationList.length > 0 && (
              <section>
                {renderSectionHeader('Educational Qualifications')}
                <div className="space-y-1.5 text-xs">
                  {data.educationList.map(edu => (
                    <div key={edu.id} className="flex justify-between items-baseline border-b border-slate-100 pb-1">
                      <div>
                        <strong className="text-slate-900">{edu.degree}</strong> &mdash; {edu.institute} {edu.board ? `(${edu.board})` : ''}
                      </div>
                      <div className="font-semibold shrink-0 ml-2" style={{ color: themeColor }}>
                        {edu.year} {edu.score ? `• ${edu.score}` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Experience */}
            {(enabledSections.teaching !== false || enabledSections.experience !== false) && data.experienceList && data.experienceList.length > 0 && (
              <section>
                {renderSectionHeader('Academic Appointments & Experience')}
                <div className="space-y-2.5 text-xs">
                  {data.experienceList.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>{exp.role} &mdash; {exp.company}</span>
                        <span className="text-slate-500 font-normal">{exp.period}</span>
                      </div>
                      {exp.details && (
                        <ul className="list-disc ml-4 space-y-1 mt-1 text-slate-700">
                          {getBullets(exp.details).map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Publications */}
            {enabledSections.publications !== false && data.publicationsList && (
              <section>
                {renderSectionHeader('Peer-Reviewed Publications')}
                <ol className="list-decimal ml-5 space-y-1.5 text-xs text-slate-800 text-justify">
                  {getBullets(data.publicationsList).map((pub, idx) => (
                    <li key={idx}>{pub}</li>
                  ))}
                </ol>
              </section>
            )}

            {/* Patents */}
            {enabledSections.patents !== false && data.patentsList && (
              <section>
                {renderSectionHeader('Patents & Intellectual Property')}
                <ol className="list-decimal ml-5 space-y-1 text-xs text-slate-800">
                  {getBullets(data.patentsList).map((pat, idx) => (
                    <li key={idx}>{pat}</li>
                  ))}
                </ol>
              </section>
            )}

            {/* Grants */}
            {enabledSections.grants !== false && data.grantsList && (
              <section>
                {renderSectionHeader('Sponsored Research Grants')}
                <ul className="list-disc ml-5 space-y-1 text-xs text-slate-800">
                  {getBullets(data.grantsList).map((g, idx) => (
                    <li key={idx}>{g}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        ) : (
          /* ----------------- 4. CLASSIC / CORPORATE / STUDENT 1-COLUMN ----------------- */
          <div className="space-y-4">
            {/* Header */}
            <header className="text-center pb-3 border-b" style={{ borderColor: `${themeColor}40` }}>
              {photo && (
                <div className="flex justify-center mb-3">
                  <img 
                    src={photo} 
                    alt="Profile" 
                    className={`w-24 h-28 object-cover border-2 shadow-sm ${photoShapeClass}`}
                    style={{ borderColor: themeColor }}
                  />
                </div>
              )}
              {data.fullName && (
                <h1 
                  className={`text-2xl font-extrabold tracking-wide uppercase ${isTerminalDev ? 'font-mono' : ''}`}
                  style={{ color: themeColor }}
                >
                  {isTerminalDev ? `> ${data.fullName}` : data.fullName}
                </h1>
              )}
              {(data.jobTitle || data.currentDegree || data.devRole || data.designation) && (
                <div className="text-xs font-semibold text-slate-600 uppercase tracking-widest mt-0.5">
                  {data.jobTitle || data.currentDegree || data.devRole || data.designation}
                </div>
              )}

              {/* Contact bar */}
              <div className="text-xs text-slate-600 mt-2 flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
                {data.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    <a href={`mailto:${data.email}`} className="hover:underline font-medium">{data.email}</a>
                  </span>
                )}
                {data.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{data.phone}</span>
                  </span>
                )}
                {data.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{data.location}</span>
                  </span>
                )}
                {data.linkedin && (
                  <span className="flex items-center gap-1">
                    <Linkedin className="w-3 h-3 text-slate-400" />
                    {renderExternalLink(data.linkedin, 'LinkedIn')}
                  </span>
                )}
                {data.github && (
                  <span className="flex items-center gap-1">
                    <Github className="w-3 h-3 text-slate-400" />
                    {renderExternalLink(data.github, 'GitHub')}
                  </span>
                )}
                {data.portfolio && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    {renderExternalLink(data.portfolio, 'Portfolio')}
                  </span>
                )}
              </div>
            </header>

            {/* Objective / Summary */}
            {(enabledSections.objective !== false || enabledSections.summary !== false) && data.summaryText && (
              <section>
                {renderSectionHeader('Objective / Summary')}
                <p className="text-xs text-justify leading-relaxed text-slate-700">
                  {data.summaryText}
                </p>
              </section>
            )}

            {/* Education Table */}
            {enabledSections.education !== false && data.educationList && data.educationList.length > 0 && (
              <section>
                {renderSectionHeader('Education Qualifications', <GraduationCap className="w-3.5 h-3.5" />)}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr 
                        className="text-left font-bold border-b text-slate-800"
                        style={{ backgroundColor: `${themeColor}12` }}
                      >
                        <th className="p-1.5 border border-slate-200">Qualification</th>
                        <th className="p-1.5 border border-slate-200">College / Institute</th>
                        <th className="p-1.5 border border-slate-200">Board / University</th>
                        <th className="p-1.5 border border-slate-200">Year</th>
                        <th className="p-1.5 border border-slate-200">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.educationList.map(edu => (
                        <tr key={edu.id} className="border-b border-slate-200 hover:bg-slate-50">
                          <td className="p-1.5 border border-slate-200 font-semibold">{edu.degree}</td>
                          <td className="p-1.5 border border-slate-200">{edu.institute}</td>
                          <td className="p-1.5 border border-slate-200">{edu.board || '—'}</td>
                          <td className="p-1.5 border border-slate-200">{edu.year}</td>
                          <td className="p-1.5 border border-slate-200 font-medium" style={{ color: themeColor }}>
                            {edu.score || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Work Experience */}
            {enabledSections.experience !== false && data.experienceList && data.experienceList.length > 0 && (
              <section>
                {renderSectionHeader('Work Experience', <Briefcase className="w-3.5 h-3.5" />)}
                <div className="space-y-3">
                  {data.experienceList.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline text-xs font-bold text-slate-800">
                        <span>{exp.role} &mdash; <span className="font-semibold text-slate-700">{exp.company}</span></span>
                        <span className="text-slate-500 font-normal shrink-0 ml-2">{exp.period}</span>
                      </div>
                      {exp.location && (
                        <div className="text-[11px] text-slate-500 italic mb-0.5">{exp.location}</div>
                      )}
                      {exp.details && (
                        <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc">
                          {getBullets(exp.details).map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Technical Skills Stack for Developers */}
            {enabledSections.tech_skills !== false && (data.devLanguages || data.devFrameworks || data.devDatabases || data.devTools) && (
              <section>
                {renderSectionHeader('Technical Skills', <Code className="w-3.5 h-3.5" />)}
                <div className="space-y-1.5 text-xs">
                  {data.devLanguages && (
                    <div><strong className="text-slate-800">Programming Languages:</strong> <span className="text-slate-700">{data.devLanguages}</span></div>
                  )}
                  {data.devFrameworks && (
                    <div><strong className="text-slate-800">Frameworks & Libraries:</strong> <span className="text-slate-700">{data.devFrameworks}</span></div>
                  )}
                  {data.devDatabases && (
                    <div><strong className="text-slate-800">Databases & Cloud:</strong> <span className="text-slate-700">{data.devDatabases}</span></div>
                  )}
                  {data.devTools && (
                    <div><strong className="text-slate-800">Developer Tools:</strong> <span className="text-slate-700">{data.devTools}</span></div>
                  )}
                </div>
              </section>
            )}

            {/* Skills & Competencies (General) */}
            {enabledSections.skills !== false && data.skillsText && (
              <section>
                {renderSectionHeader('Technical & Soft Skills', <Award className="w-3.5 h-3.5" />)}
                <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc">
                  {getBullets(data.skillsText).map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Projects */}
            {(enabledSections.projects !== false || enabledSections.academic_projects !== false) && data.projectsList && data.projectsList.length > 0 && (
              <section>
                {renderSectionHeader('Projects', <Code className="w-3.5 h-3.5" />)}
                <div className="space-y-2.5">
                  {data.projectsList.map(proj => (
                    <div key={proj.id} className="text-xs">
                      <div className="flex justify-between items-baseline font-bold text-slate-800">
                        <span>{proj.title}</span>
                        {proj.link && renderExternalLink(proj.link, 'Project Link')}
                      </div>
                      {proj.stack && (
                        <div className="text-[11px] font-semibold text-slate-500 mb-0.5" style={{ color: themeColor }}>
                          Technologies: {proj.stack}
                        </div>
                      )}
                      {proj.desc && (
                        <ul className="text-slate-700 space-y-0.5 ml-4 list-disc">
                          {getBullets(proj.desc).map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications & Workshops */}
            {enabledSections.certifications !== false && data.certificationsText && (
              <section>
                {renderSectionHeader('Certifications', <BookOpen className="w-3.5 h-3.5" />)}
                <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc">
                  {getBullets(data.certificationsText).map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </section>
            )}

            {enabledSections.workshops !== false && data.workshopsText && (
              <section>
                {renderSectionHeader('Workshops & Training')}
                <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc">
                  {getBullets(data.workshopsText).map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Achievements */}
            {(enabledSections.achievements !== false || enabledSections.awards !== false) && data.achievementsText && (
              <section>
                {renderSectionHeader('Achievements & Awards', <Award className="w-3.5 h-3.5" />)}
                <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc">
                  {getBullets(data.achievementsText).map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Strengths & Hobbies */}
            {enabledSections.strengths !== false && data.strengthsText && (
              <section>
                {renderSectionHeader('Key Strengths')}
                <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc">
                  {getBullets(data.strengthsText).map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </section>
            )}

            {enabledSections.hobbies !== false && data.hobbiesText && (
              <section>
                {renderSectionHeader('Hobbies & Interests')}
                <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc">
                  {getBullets(data.hobbiesText).map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Personal Details */}
            {enabledSections.personal !== false && (data.fatherName || data.motherName || data.dob || data.languages || data.permanentAddress) && (
              <section>
                {renderSectionHeader('Personal Details', <FileText className="w-3.5 h-3.5" />)}
                <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-1 text-xs">
                  {data.fatherName && (<><strong className="text-slate-800">Father's Name:</strong> <span>{data.fatherName}</span></>)}
                  {data.motherName && (<><strong className="text-slate-800">Mother's Name:</strong> <span>{data.motherName}</span></>)}
                  {data.dob && (<><strong className="text-slate-800">Date of Birth:</strong> <span>{data.dob}</span></>)}
                  {data.languages && (<><strong className="text-slate-800">Languages Known:</strong> <span>{data.languages}</span></>)}
                  {data.permanentAddress && (<><strong className="text-slate-800">Permanent Address:</strong> <span>{data.permanentAddress}</span></>)}
                </div>
              </section>
            )}

            {/* Declaration */}
            {enabledSections.declaration !== false && data.declarationText && (
              <section className="pt-2">
                {renderSectionHeader('Declaration')}
                <p className="text-xs text-slate-700 text-justify leading-relaxed">
                  {data.declarationText}
                </p>
                <div className="flex justify-between items-end mt-8 text-xs">
                  <div>
                    {data.decDate && <div><strong>Date:</strong> {data.decDate}</div>}
                    {data.decPlace && <div><strong>Place:</strong> {data.decPlace}</div>}
                  </div>
                  <div className="text-center">
                    <div className="w-40 border-b border-slate-700 mb-1"></div>
                    <span className="font-semibold text-slate-800">Applicant Signature</span>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
      </article>
    </div>
  );
};
