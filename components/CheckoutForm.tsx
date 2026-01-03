import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface CheckoutFormProps {
  onSubmit: (formData: any) => void;
  onBack: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  specialInstructions?: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    shippingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    specialInstructions: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.shippingAddress.trim()) newErrors.shippingAddress = 'Shipping address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
        onSubmit(formData);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-6">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Delivery Information</h2>
        <p className="text-gray-500 mt-2">Complete your details for Model π delivery</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl ${errors.firstName ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl ${errors.lastName ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Shipping Address *</label>
          <input
            type="text"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl ${errors.shippingAddress ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Street address, P.O. box, company name"
          />
          {errors.shippingAddress && <p className="text-red-500 text-xs mt-1">{errors.shippingAddress}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl ${errors.city ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="City"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">State *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl ${errors.state ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="State"
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">ZIP Code *</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl ${errors.zipCode ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="ZIP"
            />
            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Country *</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl ${errors.country ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Country"
          />
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Special Delivery Instructions (Optional)</label>
          <textarea
            name="specialInstructions"
            value={formData.specialInstructions || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any special delivery instructions or notes..."
          />
        </div>

        <div className="pt-8 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center gap-2 px-6 py-4 border border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Bag
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-black text-white px-6 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                Continue to Payment
                <CheckCircle2 className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;