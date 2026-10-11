import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  FileSpreadsheet, 
  Info 
} from 'lucide-react';
import { CommercialOffer } from '../../types/offers';

interface ExportOffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  offers: CommercialOffer[];
}

export const ExportOffersModal: React.FC<ExportOffersModalProps> = ({
  isOpen,
  onClose,
  offers
}) => {
  const [format, setFormat] = useState<'json' | 'csv'>('json');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate Schema.org JSON representation
  const schemaOrgOffers = offers.slice(0, 10).map((o) => ({
    "@context": "https://schema.org",
    "@type": "Offer",
    "sku": o.sku,
    "gtin13": o.gtin,
    "name": `${o.productName} - Offer by ${o.seller}`,
    "price": o.offerPrice,
    "priceCurrency": o.currency,
    "priceValidUntil": o.validUntil,
    "availability": o.availability === 'In Stock' 
      ? 'https://schema.org/InStock' 
      : o.availability === 'Limited' 
      ? 'https://schema.org/LimitedAvailability' 
      : 'https://schema.org/OutOfStock',
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "Organization",
      "name": o.seller,
      "sellerType": o.sellerType,
      "isAuthorized": o.sellerAuthorization === 'MERCHANT_VERIFIED'
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": o.returns.returnWindowDays || 30,
      "state": o.returns.state
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": o.shipping.cost,
        "currency": o.currency
      }
    },
    "aixshopIntelligence": {
      "evidenceState": o.dominantEvidenceState,
      "confidence": o.confidence,
      "detectedAt": o.observedAt,
      "observedSource": o.source
    }
  }));

  const jsonContent = JSON.stringify(schemaOrgOffers, null, 2);

  // Generate CSV representation
  const csvHeader = "Offer_ID,Product_Name,Brand,SKU,GTIN,Seller,Seller_Type,Price,Currency,Availability,Evidence_State,Observed_At,Confidence\n";
  const csvRows = offers.map(o => 
    `"${o.id}","${o.productName}","${o.brand}","${o.sku}","${o.gtin}","${o.seller}","${o.sellerType}",${o.offerPrice},"${o.currency}","${o.availability}","${o.dominantEvidenceState}","${o.observedAt}","${o.confidence}"`
  ).join("\n");
  const csvContent = csvHeader + csvRows;

  const currentContent = format === 'json' ? jsonContent : csvContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentContent], { 
      type: format === 'json' ? 'application/json' : 'text/csv' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = format === 'json' ? 'aixshop-offers-intelligence.json' : 'aixshop-offers-intelligence.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-3xl bg-white border border-stone-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[88vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-[#F97316]" />
              <h3 className="text-base font-bold text-stone-900 tracking-tight">
                Export Offer Intelligence
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-semibold">
                Preview Payload
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Download structured Schema.org Offer JSON-LD or catalog CSV export.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Format selection & actions */}
        <div className="p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-stone-50/40">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFormat('json')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                format === 'json'
                  ? 'bg-orange-50 text-[#F97316] border border-orange-200 font-bold shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Schema.org JSON-LD ({offers.length} offers)</span>
            </button>

            <button
              type="button"
              onClick={() => setFormat('csv')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                format === 'csv'
                  ? 'bg-orange-50 text-[#F97316] border border-orange-200 font-bold shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>CSV Spreadsheet</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200 shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-400" />
                  <span>Copy Payload</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 overflow-auto p-4 bg-stone-900 font-mono text-xs text-stone-200">
          <pre className="whitespace-pre overflow-x-auto leading-relaxed">
            {currentContent}
          </pre>
        </div>

        {/* Footer info */}
        <div className="p-3.5 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Format complies with Schema.org Offer & Google Merchant Center feed expectations.</span>
          </div>
          <span className="text-[10px] font-mono text-stone-400">Representative preview values</span>
        </div>
      </div>
    </div>
  );
};
