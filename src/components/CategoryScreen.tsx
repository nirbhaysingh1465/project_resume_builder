import React from 'react';
import { CATEGORIES } from '../data/categories';
import { ResumeCategoryKey } from '../types/resume';
import { ArrowRight, Check } from 'lucide-react';

interface CategoryScreenProps {
  onSelectCategory: (categoryKey: ResumeCategoryKey) => void;
  currentCategory: ResumeCategoryKey;
}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({
  onSelectCategory,
  currentCategory
}) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Step 1 &bull; Persona Selection
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
          Choose Your Resume Type
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-2">
          Select who this resume is for to get tailored professional templates, specialized fields, and role-specific sections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(CATEGORIES).map(cat => {
          const isCurrent = currentCategory === cat.id;
          return (
            <div 
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                isCurrent ? 'border-blue-600 ring-4 ring-blue-50' : 'border-slate-200 hover:border-blue-400'
              }`}
            >
              <div>
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                    {cat.icon}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                      {cat.badge}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {cat.description}
                </p>

                <ul className="space-y-1.5 mb-6 text-xs text-slate-700">
                  {cat.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {cat.templates.length} Tailored Formats
                </span>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(cat.id);
                  }}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                    isCurrent 
                      ? 'bg-blue-600 text-white shadow' 
                      : 'bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800'
                  }`}
                >
                  <span>{isCurrent ? 'Active Category' : 'Select'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
