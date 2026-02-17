
import React, { useState, useCallback } from 'react';
import { AppState, MedicineDetails } from './types';
import { getMedicineDetails } from './services/geminiService';
import CameraCapture from './components/CameraCapture';
import MedicineResult from './components/MedicineResult';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.HOME);
  const [medicine, setMedicine] = useState<MedicineDetails | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = async (base64: string) => {
    setCapturedImage(base64);
    setState(AppState.PROCESSING);
    try {
      const details = await getMedicineDetails(base64);
      setMedicine(details);
      setState(AppState.RESULT);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("عذراً، لم نتمكن من التعرف على الدواء. يرجى المحاولة بصورة أوضح.");
      setState(AppState.ERROR);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleCapture(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const reset = () => {
    setState(AppState.HOME);
    setMedicine(null);
    setErrorMsg('');
    setCapturedImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-l from-blue-700 to-indigo-800 bg-clip-text text-transparent">
            مد-سكان AI
          </span>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto">
        {state === AppState.HOME && (
          <div className="p-6 max-w-lg mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold text-slate-800 leading-tight">
                تعرف على دوائك <br/>
                <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">في ثوانٍ</span>
              </h1>
              <p className="text-slate-500 text-lg">
                ببساطة قم بتصوير العبوة أو مسح الباركود، وسيتولى الذكاء الاصطناعي الباقي.
              </p>
            </div>

            <div className="grid grid-cols-1 w-full gap-4">
              <button
                onClick={() => setState(AppState.SCANNING)}
                className="group w-full bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-3xl shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-4"
              >
                <div className="bg-white/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">ابدأ المسح الضوئي</p>
                  <p className="text-blue-100 text-sm">استخدم كاميرا هاتفك</p>
                </div>
              </button>

              <label className="group w-full bg-white border-2 border-slate-200 hover:border-blue-200 text-slate-700 p-6 rounded-3xl transition-all cursor-pointer flex items-center justify-center gap-4">
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                <div className="bg-slate-50 p-3 rounded-2xl group-hover:bg-blue-50 transition-colors">
                  <svg className="w-8 h-8 text-slate-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">تحميل صورة</p>
                  <p className="text-slate-400 text-sm">اختر من المعرض</p>
                </div>
              </label>
            </div>

            <div className="pt-8 border-t border-slate-100 w-full">
              <div className="flex items-center justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                <span className="text-xs font-medium text-slate-400">يدعم جميع أنواع الأدوية</span>
                <span className="text-xs font-medium text-slate-400">قارئ باركود ذكي</span>
                <span className="text-xs font-medium text-slate-400">تقارير مفصلة</span>
              </div>
            </div>
          </div>
        )}

        {state === AppState.SCANNING && (
          <CameraCapture onCapture={handleCapture} onCancel={() => setState(AppState.HOME)} />
        )}

        {state === AppState.PROCESSING && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
            {capturedImage && (
              <img src={capturedImage} alt="Captured" className="w-48 h-48 object-cover rounded-3xl shadow-2xl mb-12 border-4 border-blue-50" />
            )}
            <div className="relative">
              <div className="w-24 h-24 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-8"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">جاري التحليل...</h2>
            <p className="text-slate-500 max-w-xs mx-auto leading-relaxed">
              يقوم الذكاء الاصطناعي الآن بالتعرف على الدواء واستخراج المعلومات الطبية اللازمة.
            </p>
            <div className="mt-8 flex gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}

        {state === AppState.RESULT && medicine && (
          <MedicineResult data={medicine} onReset={reset} />
        )}

        {state === AppState.ERROR && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{errorMsg}</h2>
            <p className="text-slate-500 mb-8 max-w-xs leading-relaxed">
              تأكد من أن علبة الدواء واضحة تماماً وفي إضاءة جيدة، وحاول التصوير مرة أخرى.
            </p>
            <button
              onClick={reset}
              className="bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>حاول مرة أخرى</span>
            </button>
          </div>
        )}
      </main>

      <footer className="bg-slate-50 p-6 text-center border-t border-slate-200">
        <p className="text-slate-400 text-sm">
          تطبيق مد-سكان يعمل بواسطة Gemini AI &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default App;
