import React, { useState, useEffect } from 'react';
import { ResumeRecord, ResumeCategoryKey } from './types/resume';
import { CATEGORIES, SAMPLE_DATA } from './data/categories';
import { Navbar } from './components/Navbar';
import { CategoryScreen } from './components/CategoryScreen';
import { TemplateScreen } from './components/TemplateScreen';
import { ResumeEditor } from './components/ResumeEditor';
import { ResumePreview } from './components/ResumePreview';
import { MyResumesModal } from './components/MyResumesModal';
import { NewResumeModal } from './components/NewResumeModal';
import { 
  ZoomIn, ZoomOut, RotateCcw, Maximize2, Printer, Eye, Edit3, CheckCircle2, FileDown 
} from 'lucide-react';
import { generateWordDocument } from './utils/exportWord';

const STORAGE_KEY = 'pro_resume_builder_v2';

const createInitialResume = (categoryKey: ResumeCategoryKey = 'student', title?: string, withDemoData = true): ResumeRecord => {
  const cat = CATEGORIES[categoryKey] || CATEGORIES.student;
  return {
    id: `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: title || `My ${cat.name}`,
    category: cat.id,
    templateId: cat.templates[0].id,
    themeColor: '#163a5f',
    fontFamily: "'Inter', sans-serif",
    spacingScale: 'normal',
    headerStyle: 'banner',
    photoShape: 'rounded',
    showPageGuides: false,
    enabledSections: JSON.parse(JSON.stringify(cat.defaultSections)),
    data: withDemoData ? JSON.parse(JSON.stringify(SAMPLE_DATA[categoryKey] || SAMPLE_DATA.student)) : {
      educationList: [],
      experienceList: [],
      projectsList: []
    },
    updatedAt: Date.now()
  };
};

export default function App() {
  const [resumes, setResumes] = useState<ResumeRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load resumes from localStorage', e);
    }
    return [createInitialResume('student', 'Nirbhay Singh - Student Resume', true)];
  });

  const [activeResumeId, setActiveResumeId] = useState<string>(() => {
    return resumes[0]?.id || '';
  });

  const [currentScreen, setCurrentScreen] = useState<'editor' | 'categories' | 'templates'>('editor');
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  const [zoomScale, setZoomScale] = useState<number>(0.92);
  const [isMyResumesOpen, setIsMyResumesOpen] = useState(false);
  const [isNewResumeOpen, setIsNewResumeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active Resume instance
  const activeResume = resumes.find(r => r.id === activeResumeId) || resumes[0];

  // Save to localStorage whenever resumes state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [resumes]);

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Update Resume metadata / settings
  const handleUpdateResume = (updates: Partial<ResumeRecord>) => {
    setResumes(prev => prev.map(res => {
      if (res.id === activeResume.id) {
        return {
          ...res,
          ...updates,
          updatedAt: Date.now()
        };
      }
      return res;
    }));
  };

  // Update Resume Form Data
  const handleUpdateData = (dataUpdates: Partial<ResumeRecord['data']>) => {
    setResumes(prev => prev.map(res => {
      if (res.id === activeResume.id) {
        return {
          ...res,
          data: {
            ...res.data,
            ...dataUpdates
          },
          updatedAt: Date.now()
        };
      }
      return res;
    }));
  };

  // Category change
  const handleSelectCategory = (categoryKey: ResumeCategoryKey) => {
    const cat = CATEGORIES[categoryKey] || CATEGORIES.student;
    handleUpdateResume({
      category: categoryKey,
      templateId: cat.templates[0].id,
      enabledSections: JSON.parse(JSON.stringify(cat.defaultSections))
    });
    setCurrentScreen('templates');
    showToast(`Category switched to ${cat.name}`);
  };

  // Template change
  const handleSelectTemplate = (templateId: string) => {
    handleUpdateResume({ templateId });
    setCurrentScreen('editor');
    showToast('Layout template updated!');
  };

  // Create New Resume
  const handleCreateNewResume = (category: ResumeCategoryKey, title: string, withDemoData: boolean) => {
    const newRes = createInitialResume(category, title, withDemoData);
    setResumes(prev => [newRes, ...prev]);
    setActiveResumeId(newRes.id);
    setCurrentScreen('editor');
    showToast(`Created new resume: "${title}"`);
  };

  // Duplicate Resume
  const handleDuplicateResume = (id: string) => {
    const target = resumes.find(r => r.id === id);
    if (!target) return;
    const cloned: ResumeRecord = {
      ...JSON.parse(JSON.stringify(target)),
      id: `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: `${target.title} (Copy)`,
      updatedAt: Date.now()
    };
    setResumes(prev => [cloned, ...prev]);
    setActiveResumeId(cloned.id);
    showToast(`Duplicated "${target.title}"`);
  };

  // Delete Resume
  const handleDeleteResume = (id: string) => {
    if (resumes.length <= 1) {
      alert('You must have at least one resume.');
      return;
    }
    const target = resumes.find(r => r.id === id);
    if (!target) return;

    if (window.confirm(`Delete "${target.title}"?`)) {
      setResumes(prev => {
        const filtered = prev.filter(r => r.id !== id);
        if (activeResumeId === id) {
          setActiveResumeId(filtered[0].id);
        }
        return filtered;
      });
      showToast('Resume deleted.');
    }
  };

  // Auto-fit zoom on window resize if needed
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setZoomScale(0.48);
      } else if (window.innerWidth < 1200) {
        setZoomScale(0.72);
      } else if (window.innerWidth < 1440) {
        setZoomScale(0.85);
      } else {
        setZoomScale(0.92);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      {/* Top Navbar */}
      <Navbar 
        activeResume={activeResume}
        resumeCount={resumes.length}
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenMyResumes={() => setIsMyResumesOpen(true)}
        onOpenNewResume={() => setIsNewResumeOpen(true)}
      />

      {/* Screen 1: Categories */}
      {currentScreen === 'categories' && (
        <main className="flex-1 overflow-y-auto">
          <CategoryScreen 
            onSelectCategory={handleSelectCategory}
            currentCategory={activeResume.category}
          />
        </main>
      )}

      {/* Screen 2: Templates */}
      {currentScreen === 'templates' && (
        <main className="flex-1 overflow-y-auto">
          <TemplateScreen 
            categoryKey={activeResume.category}
            currentTemplateId={activeResume.templateId}
            onSelectTemplate={handleSelectTemplate}
            onBackToCategories={() => setCurrentScreen('categories')}
          />
        </main>
      )}

      {/* Screen 3: Studio / Live Editor */}
      {currentScreen === 'editor' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Switcher Tab (Edit Details vs Live Preview) */}
          <div className="mobile-tab-bar md:hidden flex border-b border-slate-200 bg-white sticky top-16 z-30">
            <button
              type="button"
              onClick={() => setMobileTab('edit')}
              className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${
                mobileTab === 'edit'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${
                mobileTab === 'preview'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live A4 Preview</span>
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-[460px_1fr] lg:grid-cols-[500px_1fr] overflow-hidden">
            {/* Left: Editor Panel */}
            <aside 
              className={`editor-aside bg-white border-r border-slate-200 overflow-y-auto h-full ${
                mobileTab === 'edit' ? 'block' : 'hidden md:block'
              }`}
            >
              <ResumeEditor 
                resume={activeResume}
                onUpdateResume={handleUpdateResume}
                onUpdateData={handleUpdateData}
                onShowToast={showToast}
              />
            </aside>

            {/* Right: Live A4 Preview Panel */}
            <main 
              className={`bg-slate-300/80 overflow-y-auto h-full flex flex-col items-center p-4 sm:p-8 relative ${
                mobileTab === 'preview' ? 'block' : 'hidden md:flex'
              }`}
            >
              {/* Sticky Preview Toolbar */}
              <div className="preview-toolbar sticky top-0 z-30 bg-white/95 backdrop-blur-xs px-4 py-2 rounded-full shadow-md border border-slate-200 flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="hidden sm:inline">Live A4 Preview</span>
                </div>

                <div className="h-4 w-px bg-slate-200" />

                {/* Zoom Controls */}
                <div className="flex items-center gap-1">
                  <button 
                    type="button"
                    onClick={() => setZoomScale(prev => Math.max(0.4, Number((prev - 0.08).toFixed(2))))}
                    className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono font-medium text-slate-600 w-12 text-center select-none">
                    {Math.round(zoomScale * 100)}%
                  </span>

                  <button 
                    type="button"
                    onClick={() => setZoomScale(prev => Math.min(1.4, Number((prev + 0.08).toFixed(2))))}
                    className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>

                  <button 
                    type="button"
                    onClick={() => setZoomScale(0.92)}
                    className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 ml-1"
                    title="Reset Zoom (100%)"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="h-4 w-px bg-slate-200" />

                <button 
                  type="button"
                  onClick={() => window.print()}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>

                <button 
                  type="button"
                  onClick={() => {
                    generateWordDocument(activeResume)
                      .then(() => showToast('Word document downloaded!'))
                      .catch((err) => {
                        console.error('Word export error:', err);
                        showToast('Failed to generate Word document.');
                      });
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs transition"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download Word</span>
                </button>
              </div>

              {/* A4 Paper Container */}
              <div className="w-full flex justify-center pb-20">
                <ResumePreview 
                  resume={activeResume}
                  zoomScale={zoomScale}
                />
              </div>
            </main>
          </div>
        </div>
      )}

      {/* Modals */}
      <MyResumesModal 
        isOpen={isMyResumesOpen}
        onClose={() => setIsMyResumesOpen(false)}
        resumes={resumes}
        activeResumeId={activeResume.id}
        onSelectResume={(id) => {
          setActiveResumeId(id);
          setIsMyResumesOpen(false);
          setCurrentScreen('editor');
          showToast('Resume opened!');
        }}
        onDuplicateResume={handleDuplicateResume}
        onDeleteResume={handleDeleteResume}
        onOpenNewResumeModal={() => setIsNewResumeOpen(true)}
      />

      <NewResumeModal 
        isOpen={isNewResumeOpen}
        onClose={() => setIsNewResumeOpen(false)}
        onCreateResume={handleCreateNewResume}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
