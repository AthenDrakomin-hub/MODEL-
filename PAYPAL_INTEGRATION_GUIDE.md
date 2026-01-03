# PayPal Integration Guide for Tesla Model π

## Account Type Requirements

For the Tesla Model π pre-order platform, we recommend using a **PayPal Business Account** rather than a Personal Account for the following reasons:

### Why Business Account is Recommended:

1. **Higher Transaction Limits**: Business accounts typically have higher transaction limits than personal accounts, which is important for a high-volume pre-order system.

2. **Professional Appearance**: Business accounts provide a more professional appearance to customers during the checkout process.

3. **Enhanced Features**: Business accounts have access to additional features such as:
   - Detailed transaction reporting
   - Advanced dispute resolution tools
   - Enhanced customer service
   - Recurring payment options (if needed for future features)

4. **Compliance**: Business accounts often have better compliance features for handling customer data and processing payments, which is important for a pre-order system.

5. **Volume Handling**: Better equipped to handle the expected volume of pre-orders for the Tesla Model π.

### Minimum Requirements:

- **Acceptable**: PayPal Personal Account (for initial testing and small volumes)
- **Recommended**: PayPal Business Account (for production deployment)

### PayPal Configuration:

The system uses the following environment variable:
- `PAYPAL_CLIENT_ID`: Your PayPal Business or Personal account client ID

### Integration Details:

The PayPal integration in `PreOrderPortal.tsx` currently:
- Processes 30% deposits for pre-orders
- Uses PayPal's JavaScript SDK
- Supports USD currency
- Implements proper error handling

### Setup Instructions:

1. Create a PayPal Business Account at [PayPal Business](https://www.paypal.com/business)
2. Navigate to Developer Dashboard
3. Create a new application
4. Copy the Client ID
5. Set the `PAYPAL_CLIENT_ID` environment variable in your deployment platform

### Sandbox Testing:

For development and testing, you can use PayPal's sandbox environment with test accounts before going live.

### Important Notes:

- Personal accounts may have limitations on transaction amounts and volumes
- Business accounts provide better analytics and reporting for your pre-order platform
- Ensure your account is verified and in good standing before going live