# PayPal Integration Guide for Tesla Model π

## Account Type Requirements

For the Tesla Model π pre-order platform, we recommend using a **PayPal Personal Account** rather than a Business Account for the following reasons:

### Why Personal Account is Recommended:

1. **Simple Setup**: Personal accounts are easier to set up without requiring business information or documentation.

2. **Cost Effective**: No business verification requirements or additional business fees.

3. **Sufficient Features**: Personal accounts provide all necessary features for the pre-order system:
   - Standard transaction processing
   - Basic transaction reporting
   - Standard dispute resolution tools
   - Customer service support

4. **Quick Deployment**: Personal accounts can be created and verified faster, allowing for quicker deployment of the pre-order system.

5. **Adequate Volume Handling**: Sufficient for initial pre-order volume with option to upgrade if needed.

### Minimum Requirements:

- **Recommended**: PayPal Personal Account (for simplicity and quick setup)
- **Alternative**: PayPal Business Account (for high-volume scenarios or advanced features)

### PayPal Configuration:

The system uses the following environment variable:
- `PAYPAL_CLIENT_ID`: Your PayPal Personal or Business account client ID

### Integration Details:

The PayPal integration in `PreOrderPortal.tsx` currently:
- Processes 30% deposits for pre-orders
- Uses PayPal's JavaScript SDK
- Supports USD currency
- Implements proper error handling

### Setup Instructions:

1. Create a PayPal Personal Account at [PayPal](https://www.paypal.com)
2. Navigate to Developer Dashboard
3. Create a new application or enable payments for your account
4. Copy the Client ID
5. Set the `PAYPAL_CLIENT_ID` environment variable in your deployment platform

### Sandbox Testing:

For development and testing, you can use PayPal's sandbox environment with test accounts before going live.

### Important Notes:

- Personal accounts are sufficient for most pre-order scenarios
- Business accounts can be considered if transaction volume increases significantly
- Ensure your account is verified and in good standing before going live
- Personal accounts may have standard transaction limits that are adequate for most use cases