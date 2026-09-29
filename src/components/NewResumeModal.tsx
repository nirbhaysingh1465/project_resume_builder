import React, { useState } from 'react';
import { ResumeCategoryKey } from '../types/resume';
import { CATEGORIES } from '../data/categories';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface NewResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateResume: (category: ResumeCategoryKey, title: string, withDemoData: boolean) => void;
}

export const NewResumeModal: React.FC<NewResumeModalProps> = ({
  isOpen,
  onClose,
  onCreateResume
}) => {
  const [category, setCategory] = useState<ResumeCategoryKey>('student');
  const [title, setTitle] = useState('');
  const [withDemoData, setWithDemoData] = useState(true);

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateResume(category, title.trim() || `My ${CATEGORIES[category].name}`, withDemoData);
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-base text-slate-900">Create New Resume</h2>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCreate} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Resume Title / Candidate Label
            </label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Nirbhay - Software Engineer"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Who is this resume for? (Persona / Category)
            </label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value as ResumeCategoryKey)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-blue-500 font-semibold text-slate-800 bg-slate-50"
            >
              {Object.values(CATEGORIES).map(c => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name} &mdash; ({c.badge})
                </option>
              ))}
            </select>
            <span className="text-[11px] text-slate-500 block mt-1">
              Tailored layout sections, inputs, and ATS suggestions will be configured.
            </span>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer bg-blue-50/60 p-2.5 rounded-lg border border-blue-100">
              <input 
                type="checkbox"
                checked={withDemoData}
                onChange={(e) => setWithDemoData(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Pre-fill with realistic role sample data for instant preview</span>
            </label>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button 
              type="button" 
              onClick={onClose}
              className="text-xs font-semibold text-slate-600 hover:text-slate-800 px-3.5 py-2 rounded-lg hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition"
            >
              <span>Continue &rarr;</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
