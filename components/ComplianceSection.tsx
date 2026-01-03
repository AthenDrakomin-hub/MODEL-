import React from 'react';

interface ComplianceBadgeProps {
  standard: string;
  description: string;
  validUntil?: string;
}

const ComplianceBadge: React.FC<ComplianceBadgeProps> = ({ standard, description, validUntil }) => {
  return (
    <div className="inline-flex flex-col items-center p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="text-lg font-bold text-gray-800 mb-1">{standard}</div>
      <div className="text-xs text-gray-600 text-center">{description}</div>
      {validUntil && (
        <div className="text-[10px] text-gray-500 mt-2">Valid until: {validUntil}</div>
      )}
    </div>
  );
};

const ComplianceSection: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Compliance Certifications</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Tesla Model π meets international safety and quality standards across multiple regions and markets.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <ComplianceBadge 
            standard="FCC ID" 
            description="USA Radio Equipment Compliance" 
            validUntil="Dec 31, 2031" 
          />
          <ComplianceBadge 
            standard="CE" 
            description="EU Safety & EMC Standards" 
            validUntil="Jan 1, 2031" 
          />
          <ComplianceBadge 
            standard="UKCA" 
            description="UK Product Safety Mark" 
            validUntil="Jan 1, 2031" 
          />
          <ComplianceBadge 
            standard="PSE" 
            description="Japan Safety Certification" 
            validUntil="Dec 31, 2031" 
          />
          <ComplianceBadge 
            standard="KC" 
            description="South Korea Safety Mark" 
            validUntil="Dec 31, 2031" 
          />
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            Our products comply with international standards for electromagnetic compatibility, 
            safety, and radio frequency exposure. Full certification documents are available 
            in our legal section.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplianceSection;