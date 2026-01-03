import React from 'react';

const LegalDocuments: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-black tracking-tighter italic mb-6">Legal Information</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Important legal information about Tesla Model π, including compliance certificates, privacy policy, terms of service, and warranty information.
        </p>
      </section>

      <section id="compliance" className="scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Product Compliance Certificates</h2>
        
        <div className="space-y-12">
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-blue-600">FCC ID Certification (USA)</h3>
            <p className="text-gray-700 mb-3">
              <strong>Certificate Number:</strong> FCC-ID-MPI-202601
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Product:</strong> Tesla Model π 5G Smart Phone (Standard Edition/Foldable Limited AI Edition)
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Standards:</strong> Complies with 47 CFR Part 15 (low-power radio frequency devices) and Part 25 (satellite communication terminal equipment), including electromagnetic compatibility (EMC), radio frequency exposure (RF Exposure), satellite communication frequency band adaptation, information security encryption, and biometric technology data security requirements.
            </p>
            <p className="text-gray-700">
              <strong>Validity:</strong> January 1, 2026 - December 31, 2031
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-blue-600">EU CE Declaration of Conformity</h3>
            <p className="text-gray-700 mb-3">
              <strong>Declaration Number:</strong> CE-MPI-202601
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Standards:</strong> Complies with Radio Equipment Directive (RED) 2014/53/EU, Low Voltage Directive (LVD) 2014/35/EU, Electromagnetic Compatibility Directive (EMC) 2014/30/EU, Battery Directive 2006/66/EC, and General Data Protection Regulation (GDPR).
            </p>
            <p className="text-gray-700">
              <strong>Applicable Harmonized Standards:</strong> EN 301 549, EN 62368-1:2018, EN 300 328, EN 301 839, EN 62133:2017, EN ISO/IEC 27001:2022.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-blue-600">UK UKCA Declaration of Conformity</h3>
            <p className="text-gray-700 mb-3">
              <strong>Declaration Number:</strong> UKCA-MPI-202601
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Standards:</strong> Complies with The Radio Equipment Regulations 2017, The Electrical Equipment (Safety) Regulations 2016, The Electromagnetic Compatibility Regulations 2016.
            </p>
            <p className="text-gray-700">
              <strong>Applicable Standards:</strong> BS EN 301 549, BS EN 62368-1:2018, BS EN 300 328, BS EN 301 839, BS EN 62133:2017, BS EN ISO/IEC 27001:2022.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Japan PSE Certificate</h3>
            <p className="text-gray-700 mb-3">
              <strong>Certificate Number:</strong> PSE-MPI-202601
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Type:</strong> Specified Electrical Appliance (S-Mark)
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Standards:</strong> Complies with Japan's Electrical Appliance and Material Safety Law (DENAN), JIS C 61000 series electromagnetic compatibility standards, JIS C 62368-1 safety standards, JIS C 62133:2018 built-in secondary battery safety standards, JIS X 5031:2014 information security management standards.
            </p>
            <p className="text-gray-700">
              <strong>Validity:</strong> January 1, 2026 - December 31, 2031
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-blue-600">South Korea KC Certificate</h3>
            <p className="text-gray-700 mb-3">
              <strong>Certificate Number:</strong> KC-MPI-202601
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Standards:</strong> Complies with South Korea's Electrical Appliance Safety Control Act, Radio Wave Act, Personal Information Protection Act, including KS C IEC 62368-1:2019, KS C IEC 61000 series, and KS X 1546:2020 for biometric information protection.
            </p>
            <p className="text-gray-700">
              <strong>Validity:</strong> January 1, 2026 - December 31, 2031
            </p>
          </div>
        </div>
      </section>

      <section id="privacy" className="scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Privacy Policy</h2>
        <div className="bg-gray-50 p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Information Collection and Use</h3>
          <p className="text-gray-700 mb-4">
            We collect personal information necessary to realize the service functions of our website, including:
          </p>
          <ul className="list-disc pl-8 text-gray-700 mb-4 space-y-2">
            <li>Information provided during registration or order placement: name, contact information (telephone number, email), shipping address, payment account information (such as PayPal account, USDT receiving address related identifiers)</li>
            <li>Information automatically collected during website use: IP address, browser type, access time, visited pages, device information</li>
            <li>Information provided by third-party partners: payment status information, logistics and distribution information</li>
          </ul>
          <p className="text-gray-700">
            We use this information to provide core services, verify identity, ensure transaction security, send necessary notifications, and optimize website functions. Your personal information is protected using industry-standard security measures.
          </p>
        </div>
      </section>

      <section id="terms" className="scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Terms of Service</h2>
        <div className="bg-gray-50 p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Pre-order and Transaction Rules</h3>
          <p className="text-gray-700 mb-4">
            When pre-ordering products through our website:
          </p>
          <ul className="list-disc pl-8 text-gray-700 mb-4 space-y-2">
            <li>You need to pay 30% of the total product price as a deposit to lock the pre-order quota</li>
            <li>The remaining 70% balance must be paid within the payment period notified by us</li>
            <li>Payment methods support USDT (ERC20/TRC20 network) and PayPal</li>
            <li>If the balance is not paid within the time limit, it will be deemed that you voluntarily give up the pre-order, the deposit will not be refunded</li>
          </ul>
          <p className="text-gray-700">
            Global free air freight and distribution services are provided. Delivery time is 7-15 working days for standard version and 5-10 working days for foldable limited AI version.
          </p>
        </div>
      </section>

      <section id="warranty" className="scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Warranty Policy</h2>
        <div className="bg-gray-50 p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Warranty Scope and Period</h3>
          <p className="text-gray-700 mb-4">
            We provide a global unified limited warranty service for Model π mobile phones:
          </p>
          <ul className="list-disc pl-8 text-gray-700 mb-4 space-y-2">
            <li>Warranty period: 12 months from the date of product signing and receipt</li>
            <li>Covers faults caused by product quality issues (non-human damage to core components)</li>
            <li>Does not cover human damage, force majeure, appearance wear, or non-original accessories</li>
          </ul>
          <p className="text-gray-700">
            To apply for warranty service, provide order number, product serial number, fault description, and photos/videos of the fault location. We will review within 3 working days after receiving the application.
          </p>
        </div>
      </section>

      <section id="returns" className="scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Return & Refund Policy</h2>
        <div className="bg-gray-50 p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Return Conditions</h3>
          <p className="text-gray-700 mb-4">
            Deposit refund is only available under specific circumstances:
          </p>
          <ul className="list-disc pl-8 text-gray-700 mb-4 space-y-2">
            <li>If unable to purchase due to our reasons (product defects, shipping delays over 30 days)</li>
            <li>For personal cancellation within 7 working days after deposit payment (with 10% liquidated damages)</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Full refund for return is available if:
          </p>
          <ul className="list-disc pl-8 text-gray-700 mb-4 space-y-2">
            <li>Product has serious quality problems verified by us</li>
            <li>Received product doesn't match ordered model/color</li>
            <li>Application submitted within 7 working days of receipt</li>
            <li>Product kept in brand-new unused state with complete packaging</li>
          </ul>
          <p className="text-gray-700">
            Note: Foldable limited AI version products do not support return for non-quality problems once sold.
          </p>
        </div>
      </section>

      <section id="legal" className="scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Legal Notice</h2>
        <div className="bg-gray-50 p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Ownership and Limitation of Liability</h3>
          <p className="text-gray-700 mb-4">
            All contents of this website (text, pictures, logos, trademarks, software, etc.) are owned by Tesla Model π Exclusive Store and protected by relevant laws. We are not liable for losses caused by technical failures, network problems, or market risks.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Dispute Resolution:</strong> Any disputes shall first be resolved through friendly negotiation; if unsuccessful, either party may file a lawsuit with the people's court with jurisdiction in our location.
          </p>
          <p className="text-gray-700">
            <strong>Applicable Law:</strong> These legal documents are governed by the laws of the People's Republic of China (excluding conflict of laws rules).
          </p>
        </div>
      </section>

      <div className="text-center pt-12 border-t border-gray-200">
        <p className="text-gray-500 text-sm">
          For questions about these legal documents, contact us at: model-pi@protonmail.com
        </p>
      </div>
    </div>
  );
};

export default LegalDocuments;