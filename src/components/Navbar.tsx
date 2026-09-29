import React from 'react';
import { CATEGORIES } from '../data/categories';
import { ResumeRecord, ResumeCategoryKey } from '../types/resume';
import { 
  Zap, FolderOpen, LayoutTemplate, Plus, Printer, RefreshCw, Layers
} from 'lucide-react';

interface NavbarProps {
  activeResume: ResumeRecord;
  resumeCount: number;
  currentScreen: 'editor' | 'categories' | 'templates';
  onNavigate: (screen: 'editor' | 'categories' | 'templates') => void;
  onOpenMyResumes: () => void;
  onOpenNewResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeResume,
  resumeCount,
  currentScreen,
  onNavigate,
  onOpenMyResumes,
  onOpenNewResume
}) => {
  const cat = CATEGORIES[activeResume.category] || CATEGORIES.student;
  const currentTemplate = cat.templates.find(t => t.id === activeResume.templateId) || cat.templates[0];

  const handlePrint = () => {
    // If not in editor, switch to editor first
    if (currentScreen !== 'editor') {
      onNavigate('editor');
      setTimeout(() => {
        window.print();
      }, 300);
    } else {
      window.print();
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs print:hidden">
      {/* Brand & Identity */}
      <div 
        onClick={() => onNavigate('editor')}
        className="flex items-center gap-2.5 cursor-pointer select-none group"
      >
        <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition">
          <Zap className="w-5 h-5 fill-current" />
        </div>
        <div className="hidden sm:block">
          <div className="font-extrabold text-sm tracking-tight text-slate-900 leading-tight">
            ProResume Builder
          </div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
            Multi-Category Studio
          </div>
        </div>
      </div>

      {/* Nav Status Badges */}
      <div className="hidden md:flex items-center gap-2">
        <button
          type="button"
          onClick={() => onNavigate('categories')}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80 hover:bg-blue-100 transition"
          title="Click to change resume category"
        >
          <span>{cat.icon}</span>
          <span>{cat.name}</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('templates')}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200/80 hover:bg-purple-100 transition"
          title="Click to switch layout template"
        >
          <LayoutTemplate className="w-3 h-3" />
          <span>{currentTemplate.name}</span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={onOpenMyResumes}
          className="text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition"
        >
          <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">My Resumes</span>
          <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">
            {resumeCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('categories')}
          className={`text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
            currentScreen === 'categories'
              ? 'bg-blue-50 border-blue-300 text-blue-700'
              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Category</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('templates')}
          className={`text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
            currentScreen === 'templates'
              ? 'bg-purple-50 border-purple-300 text-purple-700'
              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
          }`}
        >
          <LayoutTemplate className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Templates</span>
        </button>

        <button
          type="button"
          onClick={onOpenNewResume}
          className="text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition"
        >
          <Plus className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden sm:inline">New</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-sm transition active:scale-95"
          title="Print or Save PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / PDF</span>
        </button>
      </div>
    </header>
  );
};
