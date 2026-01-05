# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

## Project Overview

This is a Tesla Model π Official Pre-order Platform built with React 19 and TypeScript. It's a pre-order and brand showcase platform for Tesla Model π with features including immersive brand display, customizable configurator, pre-order payment system, and global logistics dashboard.

## Development Commands

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues
- `npm run check-types` - Run TypeScript type checking without emitting files

## Architecture

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with responsive design and animations
- **Icons**: Lucide React + Font Awesome
- **Data Visualization**: Recharts
- **Deployment**: Vercel/Netlify
- **Backend**: Supabase Edge Functions for payment processing
- **Storage**: Supabase for media assets

## Key Components

- `App.tsx` - Main application component with hero section, video player, and product showcase
- `PreOrderPortal.tsx` - Main pre-order functionality with cart management and payment processing
- `CheckoutForm.tsx` - Payment and shipping information form
- `CartDrawer.tsx` - Shopping cart interface
- `CountdownTimer.tsx` - Shows time until official release (2026-01-31)
- `InventoryDashboard.tsx` - Tracks product allocations and inventory
- `SEO.tsx` - SEO optimization component with meta tags and schema markup
- `ResourcePreloader.tsx` - Preloads critical resources for performance

## Payment System

- Supports Credit Card, PayPal, and USDT payments
- Pre-order model: 30% deposit to reserve, 70% at release
- USDT supports both ERC20 and TRC20 networks
- PayPal integration via Supabase Edge Functions
- Real-time blockchain verification for USDT payments

## Environment Variables

- `VITE_PAYPAL_CLIENT_ID` - PayPal client ID for payments
- `VITE_USDT_WALLET_ADDR` - USDT wallet address for cryptocurrency payments

## Supabase Functions

- `paypal-create-order.ts` - Creates PayPal orders via API (in supabase/functions/)
- `verify-usdt-payment.ts` - Verifies USDT transactions on TRON blockchain (in supabase/functions/)
- These functions handle secure payment processing on the backend

## Supabase Database Configuration

Project: model
Database URL: postgresql://postgres.rfnrosyfeivcbkimjlwo:[YOUR-PASSWORD]@aws-1-eu-central-1.pooler.supabase.com:6543/postgres
Project URL: https://rfnrosyfeivcbkimjlwo.supabase.co
API Key: sb_publishable_IXgnSjd313VGgwsANyLGYg_sHdoTZtk

## Supabase Deployment Commands

- `supabase functions deploy paypal-create-order` - Deploy PayPal function
- `supabase functions deploy verify-usdt-payment` - Deploy USDT verification function
- `supabase secrets set PAYPAL_CLIENT_ID=your_client_id` - Set PayPal client ID
- `supabase secrets set PAYPAL_CLIENT_SECRET=your_client_secret` - Set PayPal client secret

## API Integration Pattern

- Frontend API calls are made to Supabase Edge Functions to avoid exposing sensitive credentials
- Placeholder project ID `YOUR-PROJECT-ID` needs to be replaced with actual Supabase project ID in:
  - `src/api/paypal/create-order.ts`
  - `src/api/usdt/verify-payment.ts`
  - `components/PreOrderPortal.tsx`

## Project Structure

- `components/` - React components for UI elements
- `src/api/` - API integration files for payment systems
- `supabase/functions/` - Server-side edge functions for payment processing
- `public/` - Static assets
- `types.ts` - TypeScript type definitions
- `constants.tsx` - Product and configuration constants

## Important Notes

- The project implements a pre-order system with 30% deposit model
- All payment processing is handled securely through Supabase Edge Functions
- Media assets are stored in Supabase storage (zlbemopcgjohrnyyiwvs.supabase.co)
- The countdown timer targets January 31, 2026 for official release
- SEO optimization includes schema markup, meta tags, and social sharing tags