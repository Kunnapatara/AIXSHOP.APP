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
import { QuickStoreCheckSection } from './components/landing/QuickStoreCheckSection';
import { Footer } from './components/Footer';

export default function App() {
  // Primary Journey State: 'landing' (Default Public Entry: Landing / Sales / Store Check) | 'merchant' | 'shopper' | 'admin'
  const [currentJourney, setCurrentJourney] = useState<UserJourney>('landing');
  
  // Secondary sub-tab states for merchant console: 'home' is the default Store-First view
  const [merchantSubTab, setMerchantSubTab] = useState<MerchantTab>('home');
  const [submittedUrl, setSubmittedUrl] = useState<string>('https://shop.aeropulse.com/products/vaporstride-carbon-elite');
  const [isQuickCheckOpen, setIsQuickCheckOpen] = useState<boolean>(false);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const handleSelectJourney = (journey: UserJourney) => {
    setCurrentJourney(journey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAnalysis = (url: string) => {
    const targetUrl = url || 'https://shop.aeropulse.com/products/vaporstride-carbon-elite';
    setSubmittedUrl(targetUrl);
    if (currentJourney === 'landing') {
      setIsQuickCheckOpen(true);
      setTimeout(() => {
        const el = document.getElementById('quick-store-check');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    setCurrentJourney('merchant');
    setMerchantSubTab('audit');
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
            onNavigateLanding={() => {
              setCurrentJourney('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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
                setMerchantSubTab('audit');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigatePricing={handleScrollToPricing}
              inputRef={urlInputRef}
            />

            {/* Quick Store Check (Page 1 Integrated Diagnostic Flow) */}
            {isQuickCheckOpen && (
              <QuickStoreCheckSection
                url={submittedUrl}
                onContinueToAudit={() => {
                  setCurrentJourney('merchant');
                  setMerchantSubTab('audit');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateHome={() => {
                  setCurrentJourney('merchant');
                  setMerchantSubTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onReset={() => {
                  setIsQuickCheckOpen(false);
                  handleFocusUrlInput();
                }}
              />
            )}



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
