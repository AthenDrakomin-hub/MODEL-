import React from 'react';

const LegalDocuments: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-black tracking-tighter italic mb-6">Legal Information</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Important legal information about Model π, including compliance certificates, privacy policy, terms of service, and warranty information.
        </p>
      </section>

      <section id="compliance" className="scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Product Compliance Certificates</h2>
        
        <div className="space-y-12">
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-blue-600">U.S. FCC ID Certification Certificate</h3>
            <p className="text-gray-700 mb-3">
              <strong>Certificate Number:</strong> FCC-ID-MPI-202601
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Product Name:</strong> Model π 5G Smart Phone (Standard Edition/Foldable Limited AI Edition)
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Manufacturer:</strong> Model π Exclusive Store
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Standards:</strong> Complies with the technical requirements of the U.S. Federal Communications Commission (FCC) 47 CFR Part 15 (low-power radio frequency devices, including Wi-Fi 6, 5G functions, corresponding to Subpart C/D/E) and 47 CFR Part 25 (satellite communication terminal equipment, compatible with Starlink Satellite Internet), including electromagnetic compatibility (EMC), radio frequency exposure (RF Exposure), satellite communication frequency band adaptation, information security encryption and other relevant specifications; also complies with the supplementary data security and privacy protection requirements related to biometric technology.
            </p>
            <p className="text-gray-700">
              <strong>Validity Period:</strong> January 1, 2026 - December 31, 2031
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-blue-600">EU CE Declaration of Conformity</h3>
            <p className="text-gray-700 mb-3">
              <strong>Declaration Number:</strong> CE-MPI-202601
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Manufacturer:</strong> Model π Exclusive Store Europe Branch
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Product Name:</strong> Model π 5G Smart Phone
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Compliance:</strong> Complies with Radio Equipment Directive (RED) 2014/53/EU, Low Voltage Directive (LVD) 2014/35/EU, Electromagnetic Compatibility Directive (EMC) 2014/30/EU, Battery Directive 2006/66/EC, and General Data Protection Regulation (GDPR).
            </p>
            <p className="text-gray-700">
              <strong>Applicable Harmonized Standards:</strong> EN 301 549 v2.2.1, EN 62368-1:2018, EN 300 328 v2.2.2, EN 301 839 v1.1.1, EN 62133:2017, EN ISO/IEC 27001:2022.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-blue-600">UK UKCA Declaration of Conformity</h3>
            <p className="text-gray-700 mb-3">
              <strong>Declaration Number:</strong> UKCA-MPI-202601
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Manufacturer:</strong> Model π Exclusive Store
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Product Name:</strong> Model π 5G Smart Phone
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Compliance:</strong> Complies with The Radio Equipment Regulations 2017, The Electrical Equipment (Safety) Regulations 2016, The Electromagnetic Compatibility Regulations 2016.
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
              <strong>Product Name:</strong> Model π 5G Smart Phone
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Certification Type:</strong> Specified Electrical Appliance (S-Mark)
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Standards:</strong> Complies with Japan's Electrical Appliance and Material Safety Law (DENAN), JIS C 61000 series electromagnetic compatibility standards, JIS C 62368-1 safety standards, JIS C 62133:2018 built-in secondary battery safety standards, JIS X 5031:2014 information security management standards; also complies with the frequency band usage and RF exposure requirements for satellite communication terminal equipment specified by Japan's Ministry of Internal Affairs and Communications (compatible with Starlink Satellite Internet).
            </p>
            <p className="text-gray-700">
              <strong>Validity Period:</strong> January 1, 2026 - December 31, 2031
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-blue-600">South Korea KC Certificate</h3>
            <p className="text-gray-700 mb-3">
              <strong>Certificate Number:</strong> KC-MPI-202601
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Product Name:</strong> Model π 5G Smart Phone
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Standards:</strong> Complies with South Korea's Electrical Appliance Safety Control Act, Radio Wave Act, Personal Information Protection Act and relevant standards, including KS C IEC 62368-1:2019 (Safety requirements), KS C IEC 61000 series (Electromagnetic compatibility requirements), and KS X 1546:2020 (Technical requirements for personal biometric information protection).
            </p>
            <p className="text-gray-700">
              <strong>Validity Period:</strong> January 1, 2026 - December 31, 2031
            </p>
          </div>
        </div>
      </section>

      <section id="privacy" className="scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Privacy Policy</h2>
        <div className="bg-gray-50 p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Introduction</h3>
          <p className="text-gray-700 mb-4">
            Model π Exclusive Store (hereinafter referred to as "we") respects and protects the personal privacy of all users of this website (hereinafter referred to as "the Website"). This Privacy Policy aims to inform you about how we collect, use, store, protect your personal information and the rights you enjoy. Please carefully read this Policy before using the Website; your use of the Website will be deemed as your acceptance of the contents of this Policy.
          </p>
          <h3 className="text-xl font-bold mb-4 mt-6">Scope of Information Collection</h3>
          <p className="text-gray-700 mb-4">
            We only collect personal information necessary to realize the service functions of the Website, mainly including:
          </p>
          <ul className="list-disc pl-8 text-gray-700 mb-4 space-y-2">
            <li>Information actively provided by you during registration or order placement: name, contact information (telephone number, email), shipping address, payment account information (such as PayPal account, USDT receiving address related identifiers)</li>
            <li>Information automatically collected during website use: IP address, browser type, access time, visited pages, device information (such as device model, operating system version)</li>
            <li>Information provided by third-party partners: such as payment status information fed back by payment institutions, logistics and distribution information provided by logistics service providers (the collection of such information has obtained your authorization)</li>
          </ul>
          <h3 className="text-xl font-bold mb-4 mt-6">Purpose of Information Use</h3>
          <p className="text-gray-700 mb-4">
            The personal information we collect will be used for the following purposes:
          </p>
          <ul className="list-disc pl-8 text-gray-700 mb-4 space-y-2">
            <li>Provide you with core services such as product pre-order, order processing, and logistics distribution</li>
            <li>Verify your identity information, ensure transaction security, and prevent fraud risks</li>
            <li>Send you necessary notifications such as order status updates and logistics information reminders</li>
            <li>Optimize website functions and user experience, and analyze website usage data to improve service quality</li>
            <li>Recommend relevant product information, promotional activities, etc. to you with your explicit authorization</li>
          </ul>
          <h3 className="text-xl font-bold mb-4 mt-6">Information Storage and Protection</h3>
          <p className="text-gray-700 mb-4">
            We will adopt industry-standard security technologies and measures (such as encrypted storage, access permission control, firewalls, etc.) to protect your personal information and prevent it from being unauthorized accessed, disclosed, altered or damaged. Your personal information will be stored on secure servers, and the storage period will be determined according to the purpose of information use and relevant laws and regulations. After the storage period expires, we will delete or anonymize the relevant information in accordance with the law.
          </p>
          <h3 className="text-xl font-bold mb-4 mt-6">Information Sharing and Disclosure</h3>
          <p className="text-gray-700 mb-4">
            We promise not to arbitrarily share, sell or rent your personal information to any third party, except in the following circumstances:
          </p>
          <ul className="list-disc pl-8 text-gray-700 mb-4 space-y-2">
            <li>Obtain your explicit written authorization</li>
            <li>Provide relevant information to necessary partners (such as logistics service providers, payment institutions) for the purpose of completing transactions, and such partners have committed to complying with strict privacy protection obligations</li>
            <li>Comply with mandatory requirements of laws and regulations, judicial organs or administrative authorities</li>
            <li>Protect our legitimate rights and interests, website security or the legitimate rights and interests of other users from infringement</li>
          </ul>
          <h3 className="text-xl font-bold mb-4 mt-6">User Rights</h3>
          <p className="text-gray-700 mb-4">
            You have the right to access, correct and supplement your personal information, and also have the right to apply for deletion of your personal information or account cancellation. If you need to exercise the above rights, please contact us through the contact information at the end of this Policy. We will process it in a timely manner after verifying your identity.
          </p>
        </div>
      </section>

      <section id="terms" className="scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Terms of Service</h2>
        <div className="bg-gray-50 p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Subject and Scope of Application</h3>
          <p className="text-gray-700 mb-4">
            This Agreement is a contractual agreement on the rights and obligations between you (hereinafter referred to as "User") and Model π Exclusive Store (hereinafter referred to as "we") regarding the use of this website's services and the purchase of related products. Your access to and use of this website or pre-order of products through this website shall be deemed as your reading, understanding and acceptance of all contents of this Agreement. If you do not agree to this Agreement, please do not use the website's services.
          </p>
          <h3 className="text-xl font-bold mb-4 mt-6">Product Pre-order and Transaction Rules</h3>
          <p className="text-gray-700 mb-4">
            When pre-ordering products through this website:
          </p>
          <ul className="list-disc pl-8 text-gray-700 mb-4 space-y-2">
            <li>You need to pay 30% of the total product price as a deposit to lock the pre-order quota. The order will take effect after the deposit is paid. The remaining 70% balance must be paid within the payment period notified by us. If the balance is not paid within the time limit, it shall be deemed that you voluntarily give up the pre-order, the deposit will not be refunded, and the product inventory will be released.</li>
            <li>Payment Methods: Supports USDT (ERC20/TRC20 network) and PayPal payment. You shall choose a legal and compliant payment channel to complete the payment. If payment failure or losses occur due to payment channel issues, it has nothing to do with us.</li>
            <li>Global free air freight and distribution services are provided. The delivery time is 7-15 working days for the standard version and 5-10 working days for the foldable limited AI version (priority shipping). The specific time may be delayed due to customs clearance in the destination country/region, logistics peak seasons and other factors.</li>
          </ul>
          <h3 className="text-xl font-bold mb-4 mt-6">User Obligations</h3>
          <ul className="list-disc pl-8 text-gray-700 mb-4 space-y-2">
            <li>Comply with this Agreement and relevant laws and regulations, and shall not use this website to engage in any illegal or irregular activities that damage the legitimate rights and interests of others</li>
            <li>Respect the intellectual property rights of the website, and shall not copy, disseminate, modify website content or embezzle relevant website logos without authorization</li>
            <li>Shall not interfere with the normal operation of the website, nor maliciously attack or invade the website server through technical means</li>
          </ul>
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
            <li>Warranty Scope: Only covers faults caused by product quality issues (such as non-human damage to core components such as motherboards, screens, batteries)</li>
            <li>Non-warranty Scope: Human damage (such as falling, collision, water ingress, unauthorized disassembly, Root/jailbreak, etc.), damage caused by force majeure, non-functional damage such as product appearance wear and scratches, faults caused by not using original accessories, product faults beyond the warranty period</li>
          </ul>
          <h3 className="text-xl font-bold mb-4 mt-6">Warranty Application Process</h3>
          <p className="text-gray-700 mb-4">
            If your product has a fault within the warranty scope during the warranty period, you need to provide the following materials: order number, product serial number, fault description, photos/videos of the fault location. We will review within 3 working days after receiving the application. After the review is passed, we will inform you of the specific warranty processing plan (such as mail-in repair, repair at the nearest authorized repair point, etc.). The logistics cost of returning the product during the warranty repair process shall be borne by us. After the repair is completed, we will send the product back to you for free (globally).
          </p>
        </div>
      </section>

      <section id="returns" className="scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Return & Refund Policy</h2>
        <div className="bg-gray-50 p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Return Conditions</h3>
          <p className="text-gray-700 mb-4">
            Deposit refund can only be applied for in the following circumstances:
          </p>
          <ul className="list-disc pl-8 text-gray-700 mb-4 space-y-2">
            <li>You are unable to purchase the product normally due to our reasons (such as serious product quality defects, failure to ship within the agreed time and delay exceeding 30 days)</li>
            <li>After paying the deposit, if you apply to cancel the pre-order due to personal reasons before paying the balance, you must submit the application within 7 working days after paying the deposit, and 10% of the deposit amount will be deducted as liquidated damages, and the remaining part will be refunded. If you apply to cancel the pre-order after 7 working days, the deposit will not be refunded.</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Full Refund for Return: After receiving the product, you can apply for a full refund for return if the following conditions are met:
          </p>
          <ul className="list-disc pl-8 text-gray-700 mb-4 space-y-2">
            <li>The product has serious quality problems (such as failure to start, lack of core functions, etc.), which have been verified and confirmed by us</li>
            <li>The received product does not match the model and color agreed in the order, and it is not caused by your personal reasons</li>
            <li>The return application must be submitted within 7 working days from the date of product signing and receipt, and the product must be kept in a brand-new unused state with complete packaging and accessories</li>
          </ul>
          <p className="text-gray-700">
            Note: Foldable limited AI version products (such products are customized limited editions and do not support return for non-quality problems once sold).
          </p>
        </div>
      </section>

      <section id="legal" className="scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Legal Notice</h2>
        <div className="bg-gray-50 p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Ownership Statement</h3>
          <p className="text-gray-700 mb-4">
            All contents of this website (including but not limited to text, pictures, logos, trademarks, software, etc.) are owned by Model π Exclusive Store or have been authorized for use by the relevant rights holders, and are protected by international copyright and trademark laws. Without our written authorization, no unit or individual shall arbitrarily use, copy, disseminate, modify or commercially exploit the website content.
          </p>
          <h3 className="text-xl font-bold mb-4 mt-6">Limitation of Liability</h3>
          <p className="text-gray-700 mb-4">
            We will try our best to ensure the normal operation and service quality of the website, but we do not make absolute commitments to the uninterrupted nature, timeliness and accuracy of the website service. If the website cannot be used normally or the service is delayed due to technical failures, network problems, third-party service interruptions and other reasons, we will try our best to repair it, but will not bear the direct or indirect losses arising therefrom (unless caused by our intentional or gross negligence).
          </p>
          <h3 className="text-xl font-bold mb-4 mt-6">Dispute Resolution</h3>
          <p className="text-gray-700 mb-4">
            Any dispute arising from the use of the website's services or the performance of this Agreement shall first be resolved through friendly negotiation between both parties; if the negotiation fails, either party has the right to file a lawsuit with the competent court in our jurisdiction.
          </p>
          <p className="text-gray-700">
            <strong>Applicable Law:</strong> This Legal Notice and relevant website legal documents shall be governed by international commercial law and the laws of the jurisdiction where the service provider is established.
          </p>
        </div>
      </section>

      <div className="text-center pt-12 border-t border-gray-200">
        <p className="text-gray-500 text-sm">
          For questions about these legal documents, contact us at: model-pi@protonmail.com
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Contact Address: Model π Exclusive Store, 1234 Silicon Valley Parkway, San Francisco, California 94103, USA
        </p>
      </div>
    </div>
  );
};

export default LegalDocuments;