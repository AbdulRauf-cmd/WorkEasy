import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Download, ChevronRight, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AnimatedPage from '../../components/AnimatedPage';
import StarRating from '../../components/StarRating';
import LanguageSwitch from '../../components/LanguageSwitch';

export const JobComplete: React.FC = () => {
  const navigate = useNavigate();
  const { state, rateJob, t } = useApp();
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([t('tagOnTime'), t('tagPolite')]);
  const [feedback, setFeedback] = useState('');
  const [selectedTip, setSelectedTip] = useState<number>(30);
  const [customTip, setCustomTip] = useState('');
  const [isCustomTip, setIsCustomTip] = useState(false);

  const worker = state.workers.find(w => w.id === state.currentJob?.workerId) || state.workers[0];
  const baseBudget = state.currentJob?.budget || 450;
  const activeTip = isCustomTip ? (Number(customTip) || 0) : selectedTip;
  const totalSettled = baseBudget + activeTip;

  const tipOptions = [0, 20, 30, 40, 50];
  const tags = [t('tagOnTime'), t('tagPolite'), t('tagClean')];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(item => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDone = () => {
    const fullFeedback = `${selectedTags.join(', ')}. ${feedback}`.trim();
    rateJob(rating, fullFeedback, activeTip);
    navigate('/');
  };

  return (
    <AnimatedPage className="min-h-screen bg-slate-50 flex flex-col p-4 pt-4 pb-16">
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        {/* Top Language Switch */}
        <div className="flex justify-end mb-2">
          <LanguageSwitch />
        </div>

        {/* Success Header */}
        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-2 shadow-2xs">
            <Check size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">{t('jobFinished')}</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            ₹{totalSettled} {t('paymentReleasedTitle')} ({worker.name})
          </p>
        </div>

        {/* WORKER TIPPING CARD */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs mb-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Heart size={15} className="text-rose-600 fill-rose-500" />
              <h2 className="text-xs font-bold text-slate-900">{t('addTipOptional')}</h2>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-1.5 py-0.5 rounded border border-emerald-200">
              100% to Partner
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mb-3">
            {t('tipGuarantee')}
          </p>

          {/* Tip Chips */}
          <div className="grid grid-cols-5 gap-1.5 mb-2.5">
            {tipOptions.map((tipVal) => (
              <button
                key={tipVal}
                type="button"
                onClick={() => {
                  setSelectedTip(tipVal);
                  setIsCustomTip(false);
                }}
                className={`py-2 rounded-lg text-xs font-bold transition ${
                  !isCustomTip && selectedTip === tipVal
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tipVal === 0 ? '₹0' : `₹${tipVal}`}
              </button>
            ))}
          </div>

          {/* Custom Tip Input */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCustomTip(true)}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                isCustomTip ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Custom
            </button>
            {isCustomTip && (
              <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                <span className="text-xs text-slate-500 font-semibold mr-1">₹</span>
                <input
                  type="number"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  placeholder="75"
                  className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none"
                />
              </div>
            )}
          </div>

          {/* Breakdown pill */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-between items-center text-[11px]">
            <span className="text-slate-500">{t('total')} Fare ₹{baseBudget} + Tip ₹{activeTip}</span>
            <span className="font-bold text-slate-900">Total: ₹{totalSettled}</span>
          </div>
        </div>

        {/* Rating & Feedback Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs mb-3.5">
          <h2 className="text-xs font-bold text-slate-900 text-center mb-1">
            {t('rateExperience')}
          </h2>
          <p className="text-[11px] text-slate-400 text-center mb-2.5">
            {t('tipGuarantee')}
          </p>
          
          <div className="mb-3 flex justify-center">
            <StarRating rating={rating} onChange={setRating} size="md" />
          </div>

          {/* Feedback Tag Chips */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-2.5">
            {tags.map((tagItem) => (
              <button
                key={tagItem}
                onClick={() => toggleTag(tagItem)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  selectedTags.includes(tagItem)
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tagItem}
              </button>
            ))}
          </div>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Feedback..."
            rows={2}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-slate-900 outline-none text-xs text-slate-900 resize-none"
          />
        </div>

        {/* Receipt info */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 flex items-center justify-between text-xs text-slate-600 mb-4">
          <span>Invoice #INV-2026-09</span>
          <span 
            onClick={() => alert(`Receipt downloaded. Total: ₹${totalSettled}`)}
            className="text-blue-600 font-semibold cursor-pointer hover:underline flex items-center gap-1"
          >
            <Download size={12} /> {t('viewReceipt')}
          </span>
        </div>

        <button
          onClick={handleDone}
          className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs shadow-xs transition active:scale-98 mt-auto flex items-center justify-center gap-1.5"
        >
          <span>{t('backToHome')}</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </AnimatedPage>
  );
};
export default JobComplete;
