import React, { useRef } from 'react';
import { ResumeRecord, EducationItem, ExperienceItem, ProjectItem } from '../types/resume';
import { CATEGORIES, SAMPLE_DATA } from '../data/categories';
import { 
  Palette, Sparkles, Trash2, Download, Upload, Copy, Check, Plus, 
  X, AlertCircle, ChevronDown, CheckCircle2, User, BookOpen, Briefcase, 
  Code, Award, ShieldCheck, FileText, Image as ImageIcon, Sliders
} from 'lucide-react';

interface ResumeEditorProps {
  resume: ResumeRecord;
  onUpdateResume: (updated: Partial<ResumeRecord>) => void;
  onUpdateData: (dataUpdates: Partial<ResumeRecord['data']>) => void;
  onShowToast: (msg: string) => void;
}

const PRESET_COLORS = [
  { name: 'Navy Blue', hex: '#163a5f' },
  { name: 'Crimson Red', hex: '#991b1b' },
  { name: 'Emerald Green', hex: '#065f46' },
  { name: 'Royal Purple', hex: '#581c87' },
  { name: 'Teal Ocean', hex: '#0f766e' },
  { name: 'Amber Bronze', hex: '#854d0e' },
  { name: 'Slate Charcoal', hex: '#334155' },
  { name: 'Midnight Dark', hex: '#18181b' },
];

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  resume,
  onUpdateResume,
  onUpdateData,
  onShowToast
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const cat = CATEGORIES[resume.category] || CATEGORIES.student;
  const { data, enabledSections } = resume;

  // Calculate ATS Score & Tips
  const calculateATS = () => {
    let score = 0;
    const tips: string[] = [];

    if (data.fullName && data.fullName.trim().length > 2) {
      score += 10;
    } else {
      tips.push('Add your Full Name (+10%)');
    }

    if (data.email && data.email.includes('@')) {
      score += 10;
    } else {
      tips.push('Add a valid Email address (+10%)');
    }

    if (data.phone && data.phone.trim().length > 5) {
      score += 5;
    } else {
      tips.push('Add a contact Phone number (+5%)');
    }

    if (data.summaryText && data.summaryText.trim().length > 25) {
      score += 15;
    } else {
      tips.push('Add a 2-3 sentence Profile / Summary (+15%)');
    }

    if (data.educationList && data.educationList.some(e => e.degree && e.institute)) {
      score += 20;
    } else {
      tips.push('Add at least 1 Education qualification (+20%)');
    }

    const hasExp = data.experienceList && data.experienceList.some(e => e.role && e.company);
    const hasProj = data.projectsList && data.projectsList.some(p => p.title);
    if (hasExp || hasProj) {
      score += 20;
    } else {
      tips.push('Add Work Experience or Key Projects (+20%)');
    }

    const hasSkills = data.skillsText || data.devLanguages;
    if (hasSkills && hasSkills.trim().length > 10) {
      score += 15;
    } else {
      tips.push('List core Technical or Professional Skills (+15%)');
    }

    if (data.certificationsText || data.achievementsText || data.publicationsList) {
      score += 5;
    }

    return { score: Math.min(100, score), tips };
  };

  const { score: atsScore, tips: atsTips } = calculateATS();

  // Photo handlers
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      onUpdateResume({ photo: evt.target?.result as string });
      onShowToast('Profile photo uploaded!');
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    onUpdateResume({ photo: undefined });
    if (photoInputRef.current) photoInputRef.current.value = '';
    onShowToast('Profile photo removed.');
  };

  // Section toggle
  const toggleSection = (sectionKey: string) => {
    const updated = {
      ...enabledSections,
      [sectionKey]: enabledSections[sectionKey] === false ? true : false
    };
    onUpdateResume({ enabledSections: updated });
  };

  // Demo Data loader
  const handleLoadDemo = () => {
    const sample = SAMPLE_DATA[resume.category] || SAMPLE_DATA.student;
    onUpdateData(sample);
    onShowToast(`Loaded realistic demo data for ${cat.name}!`);
  };

  // Clear Form
  const handleClear = () => {
    if (window.confirm('Clear all information from this resume? This cannot be undone.')) {
      onUpdateData({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        summaryText: '',
        educationList: [],
        experienceList: [],
        projectsList: [],
        skillsText: '',
        devLanguages: '',
        devFrameworks: '',
        devDatabases: '',
        devTools: '',
        publicationsList: '',
        patentsList: '',
        grantsList: '',
        fdpList: '',
        certificationsText: '',
        workshopsText: '',
        achievementsText: '',
        strengthsText: '',
        hobbiesText: '',
        fatherName: '',
        motherName: '',
        dob: '',
        languages: '',
        permanentAddress: '',
        declarationText: ''
      });
      onUpdateResume({ photo: undefined });
      if (photoInputRef.current) photoInputRef.current.value = '';
      onShowToast('Form cleared.');
    }
  };

  // Backup & Export JSON
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const namePart = (data.fullName || resume.title || 'resume').replace(/[^a-zA-Z0-9]/g, '_');
    a.download = `${namePart}_backup.json`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Resume backup JSON exported!');
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (parsed && (parsed.data || parsed.category)) {
          if (parsed.data) onUpdateData(parsed.data);
          if (parsed.themeColor) onUpdateResume({ themeColor: parsed.themeColor });
          if (parsed.fontFamily) onUpdateResume({ fontFamily: parsed.fontFamily });
          if (parsed.enabledSections) onUpdateResume({ enabledSections: parsed.enabledSections });
          onShowToast('Resume imported successfully!');
        } else {
          alert('Invalid resume JSON structure.');
        }
      } catch (err: any) {
        alert('Could not parse JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Copy Plain Text
  const handleCopyPlainText = () => {
    let text = '';
    if (data.fullName) text += `${data.fullName.toUpperCase()}\n`;
    const contactRow = [data.email, data.phone, data.location, data.linkedin, data.github].filter(Boolean);
    if (contactRow.length) text += `${contactRow.join(' | ')}\n\n`;

    if (data.summaryText) {
      text += `PROFESSIONAL SUMMARY\n${data.summaryText}\n\n`;
    }

    if (data.educationList && data.educationList.length) {
      text += `EDUCATION\n`;
      data.educationList.forEach(e => {
        text += `• ${e.degree} - ${e.institute} (${e.year}) ${e.score ? `[${e.score}]` : ''}\n`;
      });
      text += '\n';
    }

    if (data.experienceList && data.experienceList.length) {
      text += `EXPERIENCE\n`;
      data.experienceList.forEach(e => {
        text += `${e.role} at ${e.company} (${e.period})\n${e.details}\n\n`;
      });
    }

    if (data.skillsText || data.devLanguages) {
      text += `SKILLS\n${data.skillsText || data.devLanguages}\n\n`;
    }

    if (data.projectsList && data.projectsList.length) {
      text += `PROJECTS\n`;
      data.projectsList.forEach(p => {
        text += `${p.title} [${p.stack || ''}]\n${p.desc}\n\n`;
      });
    }

    navigator.clipboard.writeText(text);
    onShowToast('Copied ATS-friendly plain text to clipboard!');
  };

  // Repeatable Education Helpers
  const addEducation = () => {
    const list = [...(data.educationList || [])];
    list.push({
      id: `edu-${Date.now()}`,
      degree: '',
      institute: '',
      board: '',
      year: '',
      score: ''
    });
    onUpdateData({ educationList: list });
  };

  const updateEducation = (index: number, updates: Partial<EducationItem>) => {
    const list = [...(data.educationList || [])];
    list[index] = { ...list[index], ...updates };
    onUpdateData({ educationList: list });
  };

  const removeEducation = (index: number) => {
    const list = [...(data.educationList || [])];
    list.splice(index, 1);
    onUpdateData({ educationList: list });
  };

  // Repeatable Experience Helpers
  const addExperience = () => {
    const list = [...(data.experienceList || [])];
    list.push({
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      period: '',
      location: '',
      details: ''
    });
    onUpdateData({ experienceList: list });
  };

  const updateExperience = (index: number, updates: Partial<ExperienceItem>) => {
    const list = [...(data.experienceList || [])];
    list[index] = { ...list[index], ...updates };
    onUpdateData({ experienceList: list });
  };

  const removeExperience = (index: number) => {
    const list = [...(data.experienceList || [])];
    list.splice(index, 1);
    onUpdateData({ experienceList: list });
  };

  // Repeatable Projects Helpers
  const addProject = () => {
    const list = [...(data.projectsList || [])];
    list.push({
      id: `proj-${Date.now()}`,
      title: '',
      stack: '',
      link: '',
      desc: ''
    });
    onUpdateData({ projectsList: list });
  };

  const updateProject = (index: number, updates: Partial<ProjectItem>) => {
    const list = [...(data.projectsList || [])];
    list[index] = { ...list[index], ...updates };
    onUpdateData({ projectsList: list });
  };

  const removeProject = (index: number) => {
    const list = [...(data.projectsList || [])];
    list.splice(index, 1);
    onUpdateData({ projectsList: list });
  };

  return (
    <div className="flex flex-col gap-5 p-5 max-w-xl pb-28">

      {/* ----------------- ATS STRENGTH SCORE CARD ----------------- */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1.5 font-bold text-xs text-slate-700 uppercase tracking-wide">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>ATS Resume Strength</span>
          </div>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
            atsScore >= 80 ? 'bg-emerald-100 text-emerald-800' :
            atsScore >= 50 ? 'bg-amber-100 text-amber-800' :
            'bg-rose-100 text-rose-800'
          }`}>
            {atsScore}% Strength
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2.5">
          <div 
            className={`h-full transition-all duration-300 rounded-full ${
              atsScore >= 80 ? 'bg-emerald-500' :
              atsScore >= 50 ? 'bg-amber-500' :
              'bg-rose-500'
            }`}
            style={{ width: `${atsScore}%` }}
          />
        </div>
        <ul className="text-xs text-slate-500 space-y-1">
          {atsTips.length === 0 ? (
            <li className="text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Resume is ATS-compliant & comprehensive!</span>
            </li>
          ) : (
            atsTips.slice(0, 3).map((tip, idx) => (
              <li key={idx} className="flex items-center gap-1.5 text-slate-600">
                <span className="text-amber-500 font-bold">⚡</span>
                <span>{tip}</span>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* ----------------- THEME & VISUAL STYLING ----------------- */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-xs text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-indigo-600" />
            <span>Theme & Styling Options</span>
          </span>
        </div>

        {/* Color Picker & Presets */}
        <div className="mb-3.5">
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">Theme Color</label>
          <div className="flex items-center gap-2 mb-2">
            <input 
              type="color" 
              value={resume.themeColor}
              onChange={(e) => onUpdateResume({ themeColor: e.target.value })}
              className="w-8 h-8 rounded border border-slate-300 cursor-pointer p-0.5 bg-white"
            />
            <span className="text-xs font-mono text-slate-500">{resume.themeColor}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_COLORS.map(c => (
              <button
                key={c.hex}
                type="button"
                onClick={() => onUpdateResume({ themeColor: c.hex })}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${
                  resume.themeColor.toLowerCase() === c.hex.toLowerCase() ? 'scale-110 border-slate-800 ring-2 ring-blue-400' : 'border-white hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Font Family & Spacing */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Font Family</label>
            <select 
              value={resume.fontFamily}
              onChange={(e) => onUpdateResume({ fontFamily: e.target.value })}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-blue-500"
            >
              <option value="'Inter', sans-serif">Modern Sans (Inter)</option>
              <option value="'Georgia', serif">Academic Serif (Georgia)</option>
              <option value="'Merriweather', serif">Classic Scholarly (Merriweather)</option>
              <option value="'Fira Code', monospace">Developer Monospace (Fira)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Page Spacing / Fit</label>
            <select 
              value={resume.spacingScale}
              onChange={(e) => onUpdateResume({ spacingScale: e.target.value as any })}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-blue-500"
            >
              <option value="compact">Compact (Fit 1 Page)</option>
              <option value="normal">Standard (Balanced)</option>
              <option value="spacious">Spacious (Relaxed)</option>
            </select>
          </div>
        </div>

        {/* Header Style & Photo Shape */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Header Style</label>
            <select 
              value={resume.headerStyle}
              onChange={(e) => onUpdateResume({ headerStyle: e.target.value as any })}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-blue-500"
            >
              <option value="banner">Filled Banner Bar</option>
              <option value="line">Underline Accent Line</option>
              <option value="left-border">Left Accent Bar</option>
              <option value="minimal">Minimal Clean Uppercase</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Photo Shape</label>
            <select 
              value={resume.photoShape}
              onChange={(e) => onUpdateResume({ photoShape: e.target.value as any })}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-blue-500"
            >
              <option value="rounded">Rounded Corners</option>
              <option value="circle">Circular Avatar</option>
              <option value="square">Classic Square</option>
            </select>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex-1">
            <label className="text-xs font-semibold text-slate-600 block mb-1">Profile Photo</label>
            <input 
              ref={photoInputRef}
              type="file" 
              accept="image/*"
              onChange={handlePhotoUpload}
              className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>
          {resume.photo && (
            <button 
              type="button" 
              onClick={handleRemovePhoto}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-2 py-1 rounded border border-rose-200 hover:bg-rose-50"
            >
              Remove
            </button>
          )}
        </div>

        {/* Page Guide Toggle */}
        <div className="pt-3 mt-3 border-t border-slate-100">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input 
              type="checkbox"
              checked={resume.showPageGuides}
              onChange={(e) => onUpdateResume({ showPageGuides: e.target.checked })}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>📏 Show A4 Page 1 Break Indicator</span>
          </label>
        </div>

        {/* Quick Demo & Clear Buttons */}
        <div className="flex gap-2 pt-3 mt-3 border-t border-slate-100">
          <button 
            type="button" 
            onClick={handleLoadDemo}
            className="flex-1 text-xs py-1.5 px-3 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold rounded-lg border border-blue-200 flex items-center justify-center gap-1 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Load Demo Data</span>
          </button>
          <button 
            type="button" 
            onClick={handleClear}
            className="text-xs py-1.5 px-3 text-rose-600 hover:bg-rose-50 font-semibold rounded-lg border border-rose-200 flex items-center gap-1 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* ----------------- DATA & BACKUP TOOLS ----------------- */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <span className="font-bold text-xs text-slate-700 uppercase tracking-wide block mb-3">
          💾 Backup & Data Tools
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button 
            type="button" 
            onClick={handleExportJSON}
            className="text-xs py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded border border-slate-200 flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save Backup (JSON)</span>
          </button>

          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="text-xs py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded border border-slate-200 flex items-center justify-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import Backup</span>
          </button>

          <button 
            type="button" 
            onClick={handleCopyPlainText}
            className="col-span-2 text-xs py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded border border-slate-200 flex items-center justify-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy as ATS Plain Text</span>
          </button>

          <input 
            ref={fileInputRef}
            type="file" 
            accept=".json"
            onChange={handleImportJSON}
            className="hidden" 
          />
        </div>
      </div>

      {/* ----------------- OPTIONAL SECTIONS TOGGLES ----------------- */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-xs text-slate-700 uppercase tracking-wide">
            ☑️ Optional Sections
          </span>
          <span className="text-[11px] text-slate-400">Toggle to include/hide</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.keys(cat.defaultSections).map(secKey => {
            const isEnabled = enabledSections[secKey] !== false;
            return (
              <label 
                key={secKey}
                className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition ${
                  isEnabled ? 'bg-blue-50/50 border-blue-200 text-slate-800' : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <input 
                  type="checkbox"
                  checked={isEnabled}
                  onChange={() => toggleSection(secKey)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="capitalize font-medium">{secKey.replace(/_/g, ' ')}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ----------------- 1. BASIC & CONTACT INFO ----------------- */}
      {enabledSections.contact !== false && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-1.5">
            <User className="w-4 h-4 text-blue-600" />
            <span>Personal & Contact Information</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
              <input 
                type="text"
                value={data.fullName || ''}
                onChange={(e) => onUpdateData({ fullName: e.target.value })}
                placeholder="e.g. Nirbhay Singh"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {resume.category === 'developer' ? 'Specialization / Role' :
                 resume.category === 'professor' ? 'Designation / Title' :
                 resume.category === 'professional' ? 'Job Title / Position' :
                 'Current Degree / Title'}
              </label>
              <input 
                type="text"
                value={
                  data.devRole || data.designation || data.jobTitle || data.currentDegree || data.academicTitle || ''
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (resume.category === 'developer') onUpdateData({ devRole: val });
                  else if (resume.category === 'professor') onUpdateData({ designation: val });
                  else if (resume.category === 'professional') onUpdateData({ jobTitle: val });
                  else onUpdateData({ currentDegree: val });
                }}
                placeholder="e.g. Full Stack Developer / B.Tech CSE"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
              <input 
                type="email"
                value={data.email || ''}
                onChange={(e) => onUpdateData({ email: e.target.value })}
                placeholder="e.g. nirbhay.singh@example.com"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
              <input 
                type="tel"
                value={data.phone || ''}
                onChange={(e) => onUpdateData({ phone: e.target.value })}
                placeholder="e.g. +91 9876543210"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Location / City</label>
              <input 
                type="text"
                value={data.location || ''}
                onChange={(e) => onUpdateData({ location: e.target.value })}
                placeholder="e.g. New Delhi, India"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">LinkedIn Profile</label>
              <input 
                type="text"
                value={data.linkedin || ''}
                onChange={(e) => onUpdateData({ linkedin: e.target.value })}
                placeholder="e.g. linkedin.com/in/nirbhay-singh"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-blue-500"
              />
            </div>
          </div>

          {/* Category specific fields */}
          {(resume.category === 'developer' || resume.category === 'student' || resume.category === 'fresher') && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">GitHub Profile</label>
                <input 
                  type="text"
                  value={data.github || ''}
                  onChange={(e) => onUpdateData({ github: e.target.value })}
                  placeholder="e.g. github.com/username"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Portfolio / Website</label>
                <input 
                  type="text"
                  value={data.portfolio || data.webLink || ''}
                  onChange={(e) => onUpdateData({ portfolio: e.target.value, webLink: e.target.value })}
                  placeholder="e.g. nirbhaysingh.dev"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-blue-500"
                />
              </div>
            </div>
          )}

          {(resume.category === 'professor' || resume.category === 'researcher') && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Department</label>
                  <input 
                    type="text"
                    value={data.department || ''}
                    onChange={(e) => onUpdateData({ department: e.target.value })}
                    placeholder="e.g. Dept. of Computer Science"
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Institution / University</label>
                  <input 
                    type="text"
                    value={data.institution || ''}
                    onChange={(e) => onUpdateData({ institution: e.target.value })}
                    placeholder="e.g. IIT Delhi"
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Google Scholar URL</label>
                  <input 
                    type="text"
                    value={data.scholar || ''}
                    onChange={(e) => onUpdateData({ scholar: e.target.value })}
                    placeholder="scholar.google.com/citations?user=..."
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">ORCID ID</label>
                  <input 
                    type="text"
                    value={data.orcid || ''}
                    onChange={(e) => onUpdateData({ orcid: e.target.value })}
                    placeholder="0000-0002-1825-0097"
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-blue-500"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ----------------- 2. SUMMARY / OBJECTIVE ----------------- */}
      {(enabledSections.objective !== false || enabledSections.summary !== false) && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <label className="font-bold text-sm text-slate-800 block mb-1.5 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>
              {resume.category === 'student' || resume.category === 'fresher' ? 'Career Objective' : 'Professional Summary'}
            </span>
          </label>
          <textarea 
            rows={3}
            value={data.summaryText || ''}
            onChange={(e) => onUpdateData({ summaryText: e.target.value })}
            placeholder="Write a clear, concise professional statement highlighting your core strengths, experience, and goals..."
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-blue-500"
          />
        </div>
      )}

      {/* ----------------- 3. EDUCATION QUALIFICATIONS ----------------- */}
      {enabledSections.education !== false && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Education & Qualifications</span>
            </span>
            <button 
              type="button" 
              onClick={addEducation}
              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-2.5 py-1 rounded flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Degree</span>
            </button>
          </div>

          <div className="space-y-3">
            {(!data.educationList || data.educationList.length === 0) ? (
              <p className="text-xs text-slate-400 italic">No education entries added yet. Click "+ Add Degree" above.</p>
            ) : (
              data.educationList.map((edu, idx) => (
                <div key={edu.id || idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2 relative">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
                    <span>Qualification #{idx + 1}</span>
                    <button 
                      type="button" 
                      onClick={() => removeEducation(idx)}
                      className="text-rose-500 hover:text-rose-700 font-normal flex items-center gap-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block">Degree / Course</label>
                      <input 
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(idx, { degree: e.target.value })}
                        placeholder="e.g. B.Tech in CSE / Ph.D."
                        className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block">Institute / College</label>
                      <input 
                        type="text"
                        value={edu.institute}
                        onChange={(e) => updateEducation(idx, { institute: e.target.value })}
                        placeholder="e.g. IIT Delhi"
                        className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block">Board / Univ</label>
                      <input 
                        type="text"
                        value={edu.board || ''}
                        onChange={(e) => updateEducation(idx, { board: e.target.value })}
                        placeholder="e.g. CBSE / Delhi Univ"
                        className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block">Year / Period</label>
                      <input 
                        type="text"
                        value={edu.year}
                        onChange={(e) => updateEducation(idx, { year: e.target.value })}
                        placeholder="e.g. 2022 - 2026"
                        className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block">Score / CGPA</label>
                      <input 
                        type="text"
                        value={edu.score || ''}
                        onChange={(e) => updateEducation(idx, { score: e.target.value })}
                        placeholder="e.g. 8.9 CGPA / 94%"
                        className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ----------------- 4. WORK / TEACHING EXPERIENCE ----------------- */}
      {(enabledSections.experience !== false || enabledSections.teaching !== false) && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>
                {resume.category === 'professor' ? 'Teaching & Academic Experience' : 'Work Experience'}
              </span>
            </span>
            <button 
              type="button" 
              onClick={addExperience}
              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-2.5 py-1 rounded flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Position</span>
            </button>
          </div>

          <div className="space-y-3">
            {(!data.experienceList || data.experienceList.length === 0) ? (
              <p className="text-xs text-slate-400 italic">No experience entries added. Click "+ Add Position" above.</p>
            ) : (
              data.experienceList.map((exp, idx) => (
                <div key={exp.id || idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2 relative">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
                    <span>Position #{idx + 1}</span>
                    <button 
                      type="button" 
                      onClick={() => removeExperience(idx)}
                      className="text-rose-500 hover:text-rose-700 font-normal flex items-center gap-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block">Role / Designation</label>
                      <input 
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(idx, { role: e.target.value })}
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block">Company / University</label>
                      <input 
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(idx, { company: e.target.value })}
                        placeholder="e.g. Google / IIT Delhi"
                        className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block">Duration / Period</label>
                      <input 
                        type="text"
                        value={exp.period}
                        onChange={(e) => updateExperience(idx, { period: e.target.value })}
                        placeholder="e.g. Jan 2022 - Present"
                        className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block">Location</label>
                      <input 
                        type="text"
                        value={exp.location || ''}
                        onChange={(e) => updateExperience(idx, { location: e.target.value })}
                        placeholder="e.g. Bangalore, India"
                        className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block">Responsibilities & Achievements (one bullet per line)</label>
                    <textarea 
                      rows={2}
                      value={exp.details}
                      onChange={(e) => updateExperience(idx, { details: e.target.value })}
                      placeholder="• Spearheaded development of core microservices&#10;• Reduced latency by 35%&#10;• Mentored 4 junior engineers"
                      className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ----------------- 5. DEVELOPER TECH SKILLS ----------------- */}
      {resume.category === 'developer' && enabledSections.tech_skills !== false && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2.5">
          <div className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-1.5">
            <Code className="w-4 h-4 text-blue-600" />
            <span>Technical Skills Stack</span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Programming Languages</label>
            <input 
              type="text"
              value={data.devLanguages || ''}
              onChange={(e) => onUpdateData({ devLanguages: e.target.value })}
              placeholder="e.g. TypeScript, JavaScript, Python, Go, C++"
              className="w-full text-xs p-2 rounded-lg border border-slate-300"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Frameworks & Libraries</label>
            <input 
              type="text"
              value={data.devFrameworks || ''}
              onChange={(e) => onUpdateData({ devFrameworks: e.target.value })}
              placeholder="e.g. React.js, Next.js, Node.js, Express, Tailwind CSS"
              className="w-full text-xs p-2 rounded-lg border border-slate-300"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Databases & Cloud</label>
            <input 
              type="text"
              value={data.devDatabases || ''}
              onChange={(e) => onUpdateData({ devDatabases: e.target.value })}
              placeholder="e.g. PostgreSQL, Redis, MongoDB, AWS (S3, EC2, Lambda)"
              className="w-full text-xs p-2 rounded-lg border border-slate-300"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Developer Tools & Platforms</label>
            <input 
              type="text"
              value={data.devTools || ''}
              onChange={(e) => onUpdateData({ devTools: e.target.value })}
              placeholder="e.g. Docker, Kubernetes, Git, Linux, Jest, Vite"
              className="w-full text-xs p-2 rounded-lg border border-slate-300"
            />
          </div>
        </div>
      )}

      {/* ----------------- 6. PROJECTS ----------------- */}
      {(enabledSections.projects !== false || enabledSections.academic_projects !== false) && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-blue-600" />
              <span>Key Projects</span>
            </span>
            <button 
              type="button" 
              onClick={addProject}
              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-2.5 py-1 rounded flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>

          <div className="space-y-3">
            {(!data.projectsList || data.projectsList.length === 0) ? (
              <p className="text-xs text-slate-400 italic">No projects added. Click "+ Add Project" above.</p>
            ) : (
              data.projectsList.map((proj, idx) => (
                <div key={proj.id || idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
                    <span>Project #{idx + 1}</span>
                    <button 
                      type="button" 
                      onClick={() => removeProject(idx)}
                      className="text-rose-500 hover:text-rose-700 font-normal flex items-center gap-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block">Project Title</label>
                      <input 
                        type="text"
                        value={proj.title}
                        onChange={(e) => updateProject(idx, { title: e.target.value })}
                        placeholder="e.g. Distributed In-Memory Cache"
                        className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block">Tech Stack / Tools</label>
                      <input 
                        type="text"
                        value={proj.stack || ''}
                        onChange={(e) => updateProject(idx, { stack: e.target.value })}
                        placeholder="e.g. Go, Raft, Docker, Redis"
                        className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block">Project / GitHub URL</label>
                    <input 
                      type="text"
                      value={proj.link || ''}
                      onChange={(e) => updateProject(idx, { link: e.target.value })}
                      placeholder="e.g. github.com/username/project"
                      className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block">Key Highlights (one per line)</label>
                    <textarea 
                      rows={2}
                      value={proj.desc}
                      onChange={(e) => updateProject(idx, { desc: e.target.value })}
                      placeholder="• Engineered high-throughput key-value engine with LRU eviction&#10;• Reduced memory footprint by 45%"
                      className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ----------------- 7. SKILLS (GENERAL) ----------------- */}
      {resume.category !== 'developer' && enabledSections.skills !== false && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <label className="font-bold text-sm text-slate-800 block mb-1.5 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Skills & Core Competencies</span>
          </label>
          <textarea 
            rows={3}
            value={data.skillsText || ''}
            onChange={(e) => onUpdateData({ skillsText: e.target.value })}
            placeholder="• Front-End: HTML5, CSS3, JavaScript, React&#10;• Core: Algorithms, Data Structures, OOP&#10;• Soft Skills: Problem Solving, Team Collaboration"
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-blue-500"
          />
        </div>
      )}

      {/* ----------------- 8. PUBLICATIONS & ACADEMIC ----------------- */}
      {(resume.category === 'professor' || resume.category === 'researcher') && enabledSections.publications !== false && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2">
          <label className="font-bold text-sm text-slate-800 block flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Publications & Research Papers (One per line)</span>
          </label>
          <textarea 
            rows={4}
            value={data.publicationsList || ''}
            onChange={(e) => onUpdateData({ publicationsList: e.target.value })}
            placeholder="1. Verma, A. 'Decentralized Scheduling in Edge Computing.' IEEE Trans. on Cloud, 2023.&#10;2. Author. 'Conference Paper.' IEEE ICSE, 2022."
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 font-serif"
          />
        </div>
      )}

      {/* ----------------- 9. CERTIFICATIONS & WORKSHOPS ----------------- */}
      {enabledSections.certifications !== false && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <label className="font-bold text-sm text-slate-800 block mb-1.5 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Certifications (One per line)</span>
          </label>
          <textarea 
            rows={2}
            value={data.certificationsText || ''}
            onChange={(e) => onUpdateData({ certificationsText: e.target.value })}
            placeholder="• AWS Certified Solutions Architect&#10;• Meta Front-End Developer Professional Certificate"
            className="w-full text-xs p-2 rounded-lg border border-slate-300"
          />
        </div>
      )}

      {/* ----------------- 10. ACHIEVEMENTS & AWARDS ----------------- */}
      {enabledSections.achievements !== false && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <label className="font-bold text-sm text-slate-800 block mb-1.5 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Achievements & Awards (One per line)</span>
          </label>
          <textarea 
            rows={2}
            value={data.achievementsText || ''}
            onChange={(e) => onUpdateData({ achievementsText: e.target.value })}
            placeholder="• Winner, Smart India Hackathon 2023&#10;• Top 1% LeetCode contest rating"
            className="w-full text-xs p-2 rounded-lg border border-slate-300"
          />
        </div>
      )}

      {/* ----------------- 11. PERSONAL DETAILS & DECLARATION ----------------- */}
      {enabledSections.personal !== false && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2.5">
          <span className="font-bold text-sm text-slate-800 block pb-1 border-b border-slate-100 flex items-center gap-1.5">
            <User className="w-4 h-4 text-blue-600" />
            <span>Personal Details</span>
          </span>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-600 block">Father's Name</label>
              <input 
                type="text"
                value={data.fatherName || ''}
                onChange={(e) => onUpdateData({ fatherName: e.target.value })}
                className="w-full text-xs p-1.5 rounded border border-slate-300"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block">Date of Birth</label>
              <input 
                type="text"
                value={data.dob || ''}
                onChange={(e) => onUpdateData({ dob: e.target.value })}
                placeholder="DD/MM/YYYY"
                className="w-full text-xs p-1.5 rounded border border-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-600 block">Languages Known</label>
              <input 
                type="text"
                value={data.languages || ''}
                onChange={(e) => onUpdateData({ languages: e.target.value })}
                placeholder="e.g. English, Hindi"
                className="w-full text-xs p-1.5 rounded border border-slate-300"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block">Permanent Address</label>
              <input 
                type="text"
                value={data.permanentAddress || ''}
                onChange={(e) => onUpdateData({ permanentAddress: e.target.value })}
                placeholder="City, State, PIN"
                className="w-full text-xs p-1.5 rounded border border-slate-300"
              />
            </div>
          </div>
        </div>
      )}

      {enabledSections.declaration !== false && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2">
          <label className="font-bold text-sm text-slate-800 block flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Declaration</span>
          </label>
          <textarea 
            rows={2}
            value={data.declarationText || ''}
            onChange={(e) => onUpdateData({ declarationText: e.target.value })}
            placeholder="I hereby declare that the information provided above is true to the best of my knowledge."
            className="w-full text-xs p-2 rounded-lg border border-slate-300"
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-600 block">Date</label>
              <input 
                type="text"
                value={data.decDate || ''}
                onChange={(e) => onUpdateData({ decDate: e.target.value })}
                placeholder="DD/MM/YYYY"
                className="w-full text-xs p-1.5 rounded border border-slate-300"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block">Place</label>
              <input 
                type="text"
                value={data.decPlace || ''}
                onChange={(e) => onUpdateData({ decPlace: e.target.value })}
                placeholder="City"
                className="w-full text-xs p-1.5 rounded border border-slate-300"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
