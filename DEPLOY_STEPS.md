# Pyrecrest Deployment Guide

## Quick Deploy to Azure (Easiest Method)

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named "pyrecrest"
3. Do NOT initialize with README (we already have code)
4. Click "Create repository"

### Step 2: Push Code to GitHub
Run these commands in your terminal:
```bash
git remote add origin https://github.com/YOUR_USERNAME/pyrecrest.git
git branch -M main
git push -u origin main
```

### Step 3: Create Azure Resources

#### A. Create Azure Static Web App
1. Go to Azure Portal: https://portal.azure.com
2. Click "Create a resource"
3. Search for "Static Web App" and click Create
4. Fill in:
   - Subscription: Your Azure subscription
   - Resource Group: Create new "pyrecrest-rg"
   - Name: "pyrecrest"
   - Region: Choose closest (e.g., West Europe)
   - Deployment: Choose "GitHub"
   - Sign in to GitHub and authorize
   - Select your repository: "pyrecrest"
   - Branch: "main"
   - Build Presets: "React"
   - App location: "/" (root)
   - Api location: "api"
   - Output location: "dist"
5. Click "Review + Create" then "Create"

**This will:**
- Deploy your frontend automatically
- Deploy your Azure Functions API
- Set up CI/CD (auto-deploy on git push)
- Give you a live URL (e.g., https://pyrecrest.azurestaticapps.net)

#### B. Create Azure Table Storage
1. In Azure Portal, click "Create a resource"
2. Search for "Storage account" and click Create
3. Fill in:
   - Resource Group: "pyrecrest-rg" (same as above)
   - Storage account name: "pyrecreststorage" (must be unique globally)
   - Region: Same as Static Web App
   - Performance: Standard
   - Redundancy: LRS (cheapest)
4. Click "Review + Create" then "Create"
5. After creation:
   - Go to the storage account
   - Click "Access keys" in left menu
   - Copy "Connection string" (key1)

#### C. Set Up SendGrid for Emails
1. Sign up at https://sendgrid.com (Free tier: 100 emails/day)
2. Verify your email
3. Create API Key:
   - Go to Settings > API Keys
   - Click "Create API Key"
   - Name: "Pyrecrest Production"
   - Select "Full Access"
   - Copy the API key (save it - you won't see it again!)

### Step 4: Configure Environment Variables

1. Go to your Azure Static Web App in Azure Portal
2. Click "Configuration" in left menu
3. Add these Application Settings:

| Name | Value | Notes |
|------|-------|-------|
| `AZURE_STORAGE_CONNECTION_STRING` | Your storage connection string from Step 3B | Required for bookings |
| `SENDGRID_API_KEY` | Your SendGrid API key from Step 3C | Required for emails |
| `ADMIN_EMAIL` | admin@pyrecrest.com | Where booking notifications go |
| `BANK_ACCOUNT_NAME` | Pyrecrest Limited | Your bank details |
| `BANK_ACCOUNT_NUMBER` | 1234567890 | Your account number |
| `BANK_NAME` | Your Bank Name | Your bank name |
| `SENDGRID_FROM_EMAIL` | noreply@pyrecrest.com | Must be verified in SendGrid |

4. Click "Save"

### Step 5: Verify Deployment

1. Wait 2-3 minutes for deployment to complete
2. Go to your Static Web App in Azure Portal
3. Click "Browse" to open your live website
4. Test the booking flow:
   - Select dates
   - Fill in guest details
   - Submit booking
   - Check if confirmation page shows bank details
   - Check your admin email for notification

### Step 6: (Optional) Add Custom Domain

1. In Azure Portal, go to your Static Web App
2. Click "Custom domains"
3. Click "Add"
4. Enter your domain (e.g., www.pyrecrest.com)
5. Follow DNS configuration instructions
6. Azure provides free SSL certificate automatically

## Cost Estimate

**Monthly Costs:**
- Azure Static Web Apps: **FREE** (Free tier)
- Azure Functions: **FREE** (1M executions/month free)
- Azure Table Storage: **~₦100** (~$0.05/month)
- Azure Blob Storage: **~₦500** (~$0.50/month for images)
- SendGrid: **FREE** (100 emails/day)

**Total: ~₦600/month (~$0.55/month)** 🎉

## Troubleshooting

### Emails not sending?
- Verify your sender email in SendGrid (Settings > Sender Authentication)
- Check SendGrid API key is correct in Azure configuration
- Check Activity feed in SendGrid dashboard

### Bookings not saving?
- Verify Azure Storage connection string is correct
- Check Azure Functions logs in Azure Portal

### API not working?
- Check Azure Functions are deployed (should see them in Portal)
- Verify API location is set to "api" in Static Web App config

## Support

For issues, check:
- Azure Static Web App deployment logs
- Azure Functions logs (Monitor > Logs)
- Browser DevTools console for frontend errors

---

**You're done!** 🚀 Your site is live with:
✅ Professional website
✅ Working booking system
✅ Automated email notifications
✅ Bank transfer payment instructions
✅ Admin dashboard access
✅ Free SSL certificate
✅ Global CDN
✅ Auto-deploy on git push
