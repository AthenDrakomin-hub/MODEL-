import React, { useState } from 'react';

const LegalInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  const renderContent = () => {
    switch(activeTab) {
      case 'privacy':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Privacy Policy</h3>
            <p>Tesla Model π Exclusive Store (hereinafter referred to as "we") respects and protects the personal privacy of all users of this website (hereinafter referred to as "the Website"). This Privacy Policy aims to inform you about how we collect, use, store, protect your personal information and the rights you enjoy. Please carefully read this Policy before using the Website; your use of the Website will be deemed as your acceptance of the contents of this Policy.</p>
            <p>We may update this Privacy Policy in accordance with changes in laws and regulations or adjustments to website services. The updated Policy will be publicly posted in a prominent position on the website and will take effect after posting. If the updated content involves your core rights and interests, we will notify you in advance through reasonable means.</p>
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Terms of Service</h3>
            <p>These Terms of Service govern your access to and use of the Tesla Model π pre-order platform. By accessing or using our website, you agree to be bound by these terms and all applicable laws and regulations.</p>
            <p>By using this website, you confirm that you are at least 18 years old or have legal authorization to enter into this agreement. You agree to use the website in compliance with all applicable laws and regulations and not to engage in any illegal or unauthorized activities.</p>
          </div>
        );
      case 'warranty':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Warranty Policy</h3>
            <p>We provide a global unified limited warranty service for Model π mobile phones. The warranty period is 12 months from the date of product signing and receipt.</p>
            <p>Warranty Scope: Only covers faults caused by product quality issues (such as non-human damage to core components such as motherboards, screens, batteries). The specific warranty components are subject to the product manual.</p>
            <p>Non-warranty Scope: Damage caused by human factors (such as dropping, water damage, disassembly, modification, etc.), product faults beyond the warranty period, and damage caused by force majeure factors.</p>
          </div>
        );
      case 'refund':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Refund Policy</h3>
            <p>Deposit Refund: Deposit refund can only be applied for in specific circumstances. After paying the deposit, if you apply to cancel the pre-order due to personal reasons before paying the balance, you must submit the application within 7 working days after paying the deposit, and 10% of the deposit amount will be deducted as liquidated damages, and the remaining part will be refunded.</p>
            <p>Full Refund for Return: After receiving the product, you can apply for a full refund for return if specific conditions are met. The product must be in its original condition with all accessories and packaging.</p>
          </div>
        );
      case 'certifications':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Product Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-lg">FCC ID Certification</h4>
                <p><strong>Certificate Number:</strong> FCC-ID-MPI-202601</p>
                <p>Complies with U.S. Federal Communications Commission requirements for radio frequency devices, satellite communication equipment, and security standards.</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-lg">EU CE Declaration</h4>
                <p><strong>Declaration Number:</strong> CE-MPI-202601</p>
                <p>Conforms to EU safety, health, and environmental protection standards.</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-lg">UK UKCA Declaration</h4>
                <p><strong>Declaration Number:</strong> UKCA-MPI-202601</p>
                <p>Meets UK standards for products sold in Great Britain.</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-lg">Japan PSE Certificate</h4>
                <p><strong>Certificate Number:</strong> PSE-MPI-202601</p>
                <p>Certified by JET for electrical safety and environmental technology.</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl">
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8 overflow-x-auto">
          {[
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'terms', label: 'Terms of Service' },
            { id: 'warranty', label: 'Warranty' },
            { id: 'refund', label: 'Refund Policy' },
            { id: 'certifications', label: 'Certifications' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`py-4 px-1 text-sm font-bold whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="prose max-w-none">
        {renderContent()}
      </div>
    </div>
  );
};

export default LegalInfo;