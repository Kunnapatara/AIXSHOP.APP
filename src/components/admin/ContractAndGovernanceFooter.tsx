// src/components/admin/ContractAndGovernanceFooter.tsx
import React from 'react';
import { ShieldCheck, BookOpen, Lock, Terminal, Cpu } from 'lucide-react';
import { intelligenceContractStatements } from '../../data/sampleAdminData';

export const ContractAndGovernanceFooter: React.FC = () => {
  return (
    <footer className="w-full bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shadow-3xs shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-stone-900 font-sans tracking-tight">
              The AIXSHOP Intelligence Contract
            </h3>
            <p className="text-xs text-stone-500">
              Foundational Architectural Axioms Governing Data Integrity & Catalog Truth
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-orange-50 text-[#F97316] border border-orange-200 uppercase shadow-3xs">
            IMMUTABLE ARCHITECTURE
          </span>
        </div>
      </div>

      {/* 10 Core Contract Axioms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {intelligenceContractStatements.map((statement) => (
          <div
            key={statement.id}
            className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-1.5 flex flex-col justify-between shadow-3xs hover:border-orange-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#F97316] font-bold mb-1">
                <span>AXIOM 0{statement.id}</span>
                <Cpu className="w-3.5 h-3.5 text-stone-400" />
              </div>
              <div className="text-xs font-bold text-stone-900 font-sans tracking-tight">
                {statement.principle}
              </div>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed mt-2 pt-2 border-t border-stone-200 font-sans">
              {statement.axiom}
            </p>
          </div>
        ))}
      </div>

      {/* Operational Disclaimer Banner */}
      <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500 font-mono">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#F97316]" />
          <span>AIXSHOP.APP · PAGE 15 · ADMIN CONTROL TOWER & EVIDENCE CONSOLE</span>
        </div>
        <div>
          Data Integrity Signature: <span className="text-[#F97316] font-bold">sha256:d82f7c00e19a4f21</span> · Preview Environment
        </div>
      </div>
    </footer>
  );
};
