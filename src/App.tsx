import React, { useRef, useState } from 'react';
import { GlobalJourneyBar, UserJourney } from './components/common/GlobalJourneyBar';
import { ShopperExperience } from './components/shopper/ShopperExperience';
import { MerchantExperience, MerchantTab } from './components/merchant/MerchantExperience';
import { AdminExperience } from './components/admin/AdminExperience';
import { HeroSection } from './components/HeroSection';
import { ValueChainSection } from './components/landing/ValueChainSection';
import { CatalogPricingSection } from './components/landing/CatalogPricingSection';
import { FragmentationProblemSection } from './components/FragmentationProblemSection';
import { ProductIntelligencePreview } from './components/ProductIntelligencePreview';
import { EvidencePrinciplesSection } from './components/EvidencePrinciplesSection';
import { MerchantWorkflowSection } from './components/MerchantWorkflowSection';
import { Footer } from './components/Footer';

export default function App() {
  // Primary Journey State: 'merchant' (Default Store-First Merchant Console working surface) | 'landing' | 'shopper' | 'admin'
  const [currentJourney, setCurrentJourney] = useState<UserJourney>('merchant');
  
  // Secondary sub-tab states for merchant console: 'home' is the default Store-First view
  const [merchantSubTab, setMerchantSubTab] = useState<MerchantTab>('home');
  const [submittedUrl, setSubmittedUrl] = useState<string>('https://shop.aeropulse.com/products/vaporstride-carbon-elite');
  const urlInputRef = useRef<HTMLInputElement>(null);

  const handleSelectJourney = (journey: UserJourney) => {
    setCurrentJourney(journey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAnalysis = (url: string) => {
    setSubmittedUrl(url || 'https://shop.aeropulse.com/products/vaporstride-carbon-elite');
    setCurrentJourney('merchant');
    setMerchantSubTab('visibility');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFocusUrlInput = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      urlInputRef.current?.focus();
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-950">
      
      {/* 1. Global Navigation Bar adhering to Top Bar Contract */}
      {currentJourney !== 'merchant' && (
        <GlobalJourneyBar
          currentJourney={currentJourney}
          onSelectJourney={handleSelectJourney}
          onNavigateLanding={() => {
            setCurrentJourney('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigatePricing={handleScrollToPricing}
        />
      )}

      {/* 2. ROLE JOURNEY A: SHOPPER EXPERIENCE */}
      {currentJourney === 'shopper' && (
        <div className="flex-1 flex flex-col">
          <ShopperExperience
            onNavigateMerchant={() => {
              setCurrentJourney('merchant');
              setMerchantSubTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {/* 3. ROLE JOURNEY B: MERCHANT EXPERIENCE */}
      {currentJourney === 'merchant' && (
        <div className="flex-1 flex flex-col">
          <MerchantExperience
            initialTab={merchantSubTab}
          />
        </div>
      )}

      {/* 4. ROLE JOURNEY C: ADMIN EXPERIENCE */}
      {currentJourney === 'admin' && (
        <div className="flex-1 flex flex-col">
          <AdminExperience
            onNavigateMerchant={() => {
              setCurrentJourney('merchant');
              setMerchantSubTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateShopper={() => {
              setCurrentJourney('shopper');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {/* 5. LANDING PAGE & PRICING PRESENTATION */}
      {currentJourney === 'landing' && (
        <div className="flex-1 flex flex-col bg-[#FAF8F5] text-stone-900">
          <main className="flex-1 space-y-16 pb-24">
            
            {/* Hero Section */}
            <HeroSection
              onStartAnalysis={handleStartAnalysis}
              onNavigateDashboard={() => {
                setCurrentJourney('merchant');
                setMerchantSubTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateReport={() => {
                setCurrentJourney('merchant');
                setMerchantSubTab('visibility');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigatePricing={handleScrollToPricing}
              inputRef={urlInputRef}
            />

            {/* Quick 3-Journey Gateway Block */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-2xs space-y-6">
                <div className="text-center space-y-2 max-w-2xl mx-auto">
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold text-orange-800 bg-orange-50 border border-orange-200">
                    ONE PRODUCT TRUTH · THREE INTERACTIVE EXPERIENCES
                  </span>
                  <h2 className="text-2xl font-extrabold text-stone-900">Experience AIXSHOP Live</h2>
                  <p className="text-xs sm:text-sm text-stone-500">
                    Explore how product data truth powers shopper trust, merchant catalog optimization, and algorithmic governance.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {/* Card 1: Shopper */}
                  <div
                    onClick={() => handleSelectJourney('shopper')}
                    className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-orange-500 hover:shadow-md transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="text-2xl">🛍️</div>
                    <h3 className="font-bold text-stone-900 group-hover:text-orange-600 text-lg">Shopper Journey</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Understand, verify, compare offers, and buy with authentic confidence. Plain-language specifications and verified seller links.
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600">
                      Open Buyer Experience →
                    </span>
                  </div>

                  {/* Card 2: Merchant */}
                  <div
                    onClick={() => handleSelectJourney('merchant')}
                    className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-orange-500 hover:shadow-md transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="text-2xl">🏪</div>
                    <h3 className="font-bold text-stone-900 group-hover:text-orange-600 text-lg">Merchant SaaS</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Improve, optimize, monitor, and discover. 78% intelligence coverage, 79% discovery readiness, and actionable issues workspace.
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600">
                      Open Merchant Console →
                    </span>
                  </div>

                  {/* Card 3: Admin */}
                  <div
                    onClick={() => handleSelectJourney('admin')}
                    className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-orange-500 hover:shadow-md transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="text-2xl">⚡</div>
                    <h3 className="font-bold text-stone-900 group-hover:text-orange-600 text-lg">Admin Control Tower</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Govern, audit, control, and protect. 384 raw observation signals, 194 evidence records, identity resolution, and security logs.
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600">
                      Open Control Tower →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* The 9-Stage AIXSHOP Value Chain */}
            <ValueChainSection 
              onAnalyzeClick={handleFocusUrlInput}
              onExplorePricingClick={handleScrollToPricing}
            />

            {/* Catalog-Limit Pricing Section (10, 50, 150, 500, 1000, 1000+) */}
            <CatalogPricingSection
              onSelectTier={(plan) => {
                setCurrentJourney('merchant');
                setMerchantSubTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateConsole={() => {
                setCurrentJourney('merchant');
                setMerchantSubTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Fragmentation Problem Breakdown */}
            <FragmentationProblemSection />

            {/* Canonical Product Intelligence Card Preview */}
            <ProductIntelligencePreview 
              onNavigateShopper={() => {
                setCurrentJourney('shopper');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />

            {/* Evidence Principles Section */}
            <EvidencePrinciplesSection />

            {/* Merchant Workflow Section */}
            <MerchantWorkflowSection onAnalyzeClick={handleFocusUrlInput} />

          </main>
          
          <Footer />
        </div>
      )}

    </div>
  );
}
