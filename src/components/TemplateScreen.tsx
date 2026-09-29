import React from 'react';
import { CATEGORIES } from '../data/categories';
import { ResumeCategoryKey } from '../types/resume';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

interface TemplateScreenProps {
  categoryKey: ResumeCategoryKey;
  currentTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  onBackToCategories: () => void;
}

export const TemplateScreen: React.FC<TemplateScreenProps> = ({
  categoryKey,
  currentTemplateId,
  onSelectTemplate,
  onBackToCategories
}) => {
  const cat = CATEGORIES[categoryKey] || CATEGORIES.student;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {cat.icon} {cat.name}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Choose Your Resume Style
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pick a layout format. You can switch templates anytime without losing your entered data.
          </p>
        </div>

        <button 
          type="button" 
          onClick={onBackToCategories}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 self-start transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cat.templates.map(tpl => {
          const isSelected = currentTemplateId === tpl.id;
          return (
            <div 
              key={tpl.id}
              onClick={() => onSelectTemplate(tpl.id)}
              className={`bg-white rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-200 flex flex-col hover:shadow-xl hover:-translate-y-1 ${
                isSelected ? 'border-blue-600 ring-4 ring-blue-50' : 'border-slate-200 hover:border-slate-400'
              }`}
            >
              {/* Mini Preview Mockup Graphic */}
              <div className="h-44 bg-slate-50 border-b border-slate-100 flex items-center justify-center p-4">
                <div className="w-36 h-36 bg-white shadow-md rounded p-3 flex flex-col gap-1.5 pointer-events-none border border-slate-200">
                  <div className="h-2 w-3/4 bg-blue-700 rounded-sm"></div>
                  <div className="h-1.5 w-1/2 bg-slate-300 rounded-sm"></div>
                  <div className="h-0.5 w-full bg-slate-200 my-1"></div>
                  
                  {tpl.id.includes('modern') ? (
                    <div className="grid grid-cols-3 gap-1 flex-1">
                      <div className="bg-slate-100 rounded p-1 space-y-1">
                        <div className="h-1 w-full bg-slate-300 rounded-xs"></div>
                        <div className="h-1 w-3/4 bg-slate-300 rounded-xs"></div>
                        <div className="h-1 w-5/6 bg-slate-300 rounded-xs"></div>
                      </div>
                      <div className="col-span-2 space-y-1">
                        <div className="h-1.5 w-full bg-slate-300 rounded-xs"></div>
                        <div className="h-1 w-full bg-slate-200 rounded-xs"></div>
                        <div className="h-1 w-4/5 bg-slate-200 rounded-xs"></div>
                        <div className="h-1 w-full bg-slate-200 rounded-xs"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 flex-1">
                      <div className="h-1.5 w-full bg-blue-100 rounded-xs"></div>
                      <div className="h-1 w-full bg-slate-200 rounded-xs"></div>
                      <div className="h-1 w-5/6 bg-slate-200 rounded-xs"></div>
                      <div className="h-1.5 w-full bg-blue-100 rounded-xs mt-1"></div>
                      <div className="h-1 w-full bg-slate-200 rounded-xs"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Template details */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-bold text-slate-900 text-base">
                      {tpl.name}
                    </h3>
                    {isSelected && (
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {tpl.desc}
                  </p>
                </div>

                <button 
                  type="button" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTemplate(tpl.id);
                  }}
                  className={`w-full text-xs font-bold py-2 px-3 rounded-lg transition flex items-center justify-center gap-1.5 ${
                    isSelected 
                      ? 'bg-blue-600 text-white shadow' 
                      : 'bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isSelected ? '✓ Current Layout' : 'Apply Layout'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
