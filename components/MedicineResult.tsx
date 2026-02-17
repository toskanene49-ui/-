
import React from 'react';
import { MedicineDetails } from '../types';

interface MedicineResultProps {
  data: MedicineDetails;
  onReset: () => void;
}

const MedicineResult: React.FC<MedicineResultProps> = ({ data, onReset }) => {
  return (
    <div className="max-w-2xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-l from-blue-600 to-indigo-700 p-8 text-white relative">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-3 backdrop-blur-sm">
                تم التعرف بنجاح
              </span>
              <h1 className="text-3xl font-bold mb-1">{data.name}</h1>
              <p className="text-blue-100 font-medium italic opacity-90">{data.scientificName}</p>
            </div>
            <button 
              onClick={onReset}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-md">
              <p className="text-blue-200 text-xs mb-1">الشركة</p>
              <p className="font-semibold">{data.manufacturer}</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-md">
              <p className="text-blue-200 text-xs mb-1">التركيز</p>
              <p className="font-semibold">{data.strength || 'غير محدد'}</p>
            </div>
          </div>
        </div>

        {/* Prescription Badge */}
        {data.isPrescriptionNeeded && (
          <div className="bg-amber-50 border-y border-amber-100 px-8 py-3 flex items-center gap-3">
            <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-amber-800 text-sm font-semibold">يتطلب وصفة طبية</span>
          </div>
        )}

        <div className="p-8 space-y-8">
          {/* Active Ingredients */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
              المواد الفعالة
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.activeIngredients.map((ing, idx) => (
                <span key={idx} className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-xl text-sm font-medium border border-blue-100">
                  {ing}
                </span>
              ))}
            </div>
          </section>

          {/* Indications */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              دواعي الاستعمال
            </h3>
            <ul className="space-y-3">
              {data.indications.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-slate-50 p-3 rounded-2xl">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></div>
                  <span className="text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Dosage */}
          <section className="bg-blue-50/50 rounded-3xl p-6 border border-blue-100/50">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              الجرعة وطريقة الاستخدام
            </h3>
            <p className="text-slate-700 leading-relaxed">{data.dosage}</p>
          </section>

          {/* Warnings & Side Effects */}
          <div className="grid md:grid-cols-2 gap-6">
            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-500 rounded-full"></span>
                تحذيرات
              </h3>
              <ul className="space-y-2">
                {data.warnings.map((item, idx) => (
                  <li key={idx} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-red-500">•</span> {item}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-orange-400 rounded-full"></span>
                الآثار الجانبية
              </h3>
              <ul className="space-y-2">
                {data.sideEffects.map((item, idx) => (
                  <li key={idx} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-orange-400">•</span> {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
              <p className="text-xs text-red-700 font-bold mb-1 uppercase tracking-wider">تنبيه طبي هام</p>
              <p className="text-xs text-red-600 leading-relaxed">
                هذه المعلومات مقدمة لأغراض إرشادية فقط ولا تغني بأي حال من الأحوال عن استشارة الطبيب المختص أو الصيدلي. لا تقم بتغيير جرعتك أو التوقف عن تناول الدواء دون الرجوع للطبيب.
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full mt-8 py-4 bg-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-300 transition-all flex items-center justify-center gap-2 mb-12"
      >
        <span>مسح دواء جديد</span>
      </button>
    </div>
  );
};

export default MedicineResult;
