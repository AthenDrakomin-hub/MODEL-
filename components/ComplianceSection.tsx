import React from 'react';

interface ComplianceBadgeProps {
  standard: string;
  description: string;
  validUntil?: string;
}

const ComplianceBadge: React.FC<ComplianceBadgeProps> = ({ standard, description, validUntil }) => {
  return (
    <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow min-w-[80px]">
      <div className="text-sm font-bold text-gray-800 mb-1">{standard}</div>
      <div className="text-[10px] text-gray-600 text-center">{description}</div>
      {validUntil && (
        <div className="text-[9px] text-gray-500 mt-1">{validUntil}</div>
      )}
    </div>
  );
};

const ComplianceSection: React.FC = () => {
  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Compliance</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm">
            Model π meets international safety and quality standards.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 justify-items-center">
          <ComplianceBadge 
            standard="FCC" 
            description="USA" 
            validUntil="2031" 
          />
          <ComplianceBadge 
            standard="CE" 
            description="EU" 
            validUntil="2031" 
          />
          <ComplianceBadge 
            standard="UKCA" 
            description="UK" 
            validUntil="2031" 
          />
          <ComplianceBadge 
            standard="PSE" 
            description="Japan" 
            validUntil="2031" 
          />
          <ComplianceBadge 
            standard="KC" 
            description="S. Korea" 
            validUntil="2031" 
          />
        </div>
      </div>
    </div>
  );
};

export default ComplianceSection;