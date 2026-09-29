import React from 'react';
import { ResumeRecord, ResumeCategoryKey } from '../types/resume';
import { CATEGORIES } from '../data/categories';
import { X, Copy, Trash2, FolderOpen, Plus, Calendar } from 'lucide-react';

interface MyResumesModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumes: ResumeRecord[];
  activeResumeId: string;
  onSelectResume: (id: string) => void;
  onDuplicateResume: (id: string) => void;
  onDeleteResume: (id: string) => void;
  onOpenNewResumeModal: () => void;
}

export const MyResumesModal: React.FC<MyResumesModalProps> = ({
  isOpen,
  onClose,
  resumes,
  activeResumeId,
  onSelectResume,
  onDuplicateResume,
  onDeleteResume,
  onOpenNewResumeModal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-base text-slate-900">My Saved Resumes</h2>
            <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              {resumes.length}
            </span>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resumes List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {resumes.map(res => {
            const cat = CATEGORIES[res.category] || CATEGORIES.student;
            const isCurrent = res.id === activeResumeId;
            return (
              <div 
                key={res.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition ${
                  isCurrent 
                    ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-100' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="font-bold text-sm text-slate-900 truncate">
                      {res.data.fullName || res.title || 'Untitled Resume'}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                        Editing
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                    <span>{cat.name}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 opacity-60" />
                      {new Date(res.updatedAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {!isCurrent && (
                    <button 
                      type="button" 
                      onClick={() => onSelectResume(res.id)}
                      className="text-xs font-bold text-blue-700 hover:bg-blue-100 bg-blue-50 px-3 py-1.5 rounded-lg transition"
                    >
                      Open
                    </button>
                  )}
                  <button 
                    type="button" 
                    onClick={() => onDuplicateResume(res.id)}
                    title="Duplicate Resume"
                    className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {resumes.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => onDeleteResume(res.id)}
                      title="Delete Resume"
                      className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button 
            type="button" 
            onClick={() => {
              onClose();
              onOpenNewResumeModal();
            }}
            className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Resume</span>
          </button>
          <button 
            type="button" 
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
