// src/components/admin/AdminBoundaryModal.tsx
import React from 'react';
import { ShieldAlert, X, Lock, CheckCircle2 } from 'lucide-react';

interface AdminBoundaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionTitle: string;
  actionDescription?: string;
  requiredProductionPrerequisites?: string[];
}

export const AdminBoundaryModal: React.FC<AdminBoundaryModalProps> = ({
  isOpen,
  onClose,
  actionTitle,
  actionDescription,
  requiredProductionPrerequisites
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-white border border-stone-200 rounded-3xl shadow-2xl p-6 text-stone-900 overflow-hidden">
        {/* Amber accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-500 to-orange-400" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-2 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-3xs shrink-0 mt-0.5">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wide uppercase bg-amber-50 text-amber-800 border border-amber-200 shadow-3xs mb-2">
              <ShieldAlert className="w-3 h-3 text-amber-700" />
              Administrative Boundary Guard
            </div>
            <h3 className="text-lg font-extrabold text-stone-900 font-sans tracking-tight">
              {actionTitle || 'Production Administration Not Connected'}
            </h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              {actionDescription || 
                'In this simulation environment, administrative modifications are restricted to protect system governance. Direct write operations, source disconnects, and conflict arbitrations cannot mutate production infrastructure.'}
            </p>
          </div>
        </div>

        {/* Production Requirements Notice */}
        <div className="mt-5 p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5 shadow-3xs">
          <h4 className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <Lock className="w-3.5 h-3.5 text-[#F97316]" />
            Production Deployment Requirements
          </h4>
          <ul className="space-y-2 text-xs text-stone-600">
            {(requiredProductionPrerequisites || [
              'Authenticated system administrator SSO session with MFA',
              'Dual-custody approval for cryptographic identifier mutations',
              'Signed audit webhook delivery to enterprise SIEM'
            ]).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-stone-200">
          <span className="text-[11px] text-stone-500 font-mono font-medium">
            STATUS: RESTRICTED_PREVIEW
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4.5 py-2 bg-[#F97316] hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
