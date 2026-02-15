# Pyrecrest - Azure Deployment Guide

## Prerequisites

1. Azure account ([Create free account](https://azure.microsoft.com/free/))
2. GitHub account
3. SendGrid account for emails (or Azure Communication Services)
4. Node.js 18+ installed locally
5. Azure Functions Core Tools (`npm install -g azure-functions-core-tools@4`)

## Step 1: Create Azure Resources

### 1.1 Create Azure Storage Account

```bash
# Login to Azure
az login

# Create resource group
az group create --name pyrecrest-rg --location eastus

# Create storage account
az storage account create \
  --name pyrecreststorage \
  --resource-group pyrecrest-rg \
  --location eastus \
  --sku Standard_LRS

# Get connection string
az storage account show-connection-string \
  --name pyrecreststorage \
  --resource-group pyrecrest-rg \
  --output tsv
```

Save the connection string - you'll need it later.

### 1.2 Create Azure Static Web App

1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource" → Search for "Static Web App"
3. Fill in:
   - **Resource Group**: pyrecrest-rg
   - **Name**: pyrecrest
   - **Plan type**: Free
   - **Region**: East US 2
   - **Source**: GitHub
   - **Repository**: Select your pyrecrest repository
   - **Branch**: main
   - **Build Presets**: React
   - **App location**: `/`
   - **Api location**: `/api`
   - **Output location**: `/dist`
4. Click "Review + Create" → "Create"

Azure will automatically:
- Create a GitHub Actions workflow
- Deploy your app on every push to main
- Provide a URL like `https://pyrecrest.azurestaticapps.net`

## Step 2: Configure Environment Variables

### 2.1 Backend (Azure Functions)

In Azure Portal:
1. Go to your Static Web App resource
2. Click "Configuration" in the left menu
3. Add these application settings:

```
AZURE_STORAGE_CONNECTION_STRING=<your_storage_connection_string>
AZURE_STORAGE_ACCOUNT_NAME=pyrecreststorage
SENDGRID_API_KEY=<your_sendgrid_api_key>
ADMIN_EMAIL=admin@pyrecrest.com
ADMIN_PASSWORD_HASH=<generate_using_bcrypt>
JWT_SECRET=<random_string_32_characters>
BANK_ACCOUNT_NAME=Pyrecrest Limited
BANK_ACCOUNT_NUMBER=1234567890
BANK_NAME=GTBank
FRONTEND_URL=https://pyrecrest.azurestaticapps.net
```

### 2.2 Generate Admin Password Hash

```bash
# Install bcryptjs
npm install -g bcryptjs

# In Node REPL
node
> const bcrypt = require('bcryptjs')
> bcrypt.hashSync('your_admin_password', 10)
```

Copy the output hash to `ADMIN_PASSWORD_HASH`.

### 2.3 Frontend Environment Variables

Create `.env.local` file in project root:

```
VITE_API_BASE_URL=/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## Step 3: Set Up SendGrid

1. Create account at [SendGrid.com](https://sendgrid.com)
2. Verify your sender email/domain
3. Create an API key with "Mail Send" permissions
4. Add the API key to Azure configuration as `SENDGRID_API_KEY`

## Step 4: Initialize Database Tables

The Azure Table Storage tables will be created automatically when the first API call is made.

Alternatively, create them manually:

```bash
az storage table create \
  --name properties \
  --account-name pyrecreststorage \
  --connection-string "<your_connection_string>"

az storage table create \
  --name bookings \
  --account-name pyrecreststorage \
  --connection-string "<your_connection_string>"

az storage table create \
  --name blockedDates \
  --account-name pyrecreststorage \
  --connection-string "<your_connection_string>"

az storage table create \
  --name settings \
  --account-name pyrecreststorage \
  --connection-string "<your_connection_string>"
```

## Step 5: Add Property Data

Add your apartment data to Azure Table Storage:

```javascript
// Use Azure Storage Explorer or run this script
const { TableClient } = require("@azure/data-tables");

const client = TableClient.fromConnectionString(
  "your_connection_string",
  "properties"
);

const property = {
  partitionKey: "PROPERTY",
  rowKey: "apartment-001",
  name: "Luxury 1-Bedroom Apartment",
  description: "Beautiful serviced apartment in Lagos",
  address: JSON.stringify({
    street: "Your Street",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    coordinates: { lat: 6.5244, lng: 3.3792 }
  }),
  amenities: JSON.stringify([
    "WiFi", "AC", "Kitchen", "TV", "Hot Shower",
    "Backup Power", "Parking", "Security"
  ]),
  maxGuests: 2,
  bedrooms: 1,
  bathrooms: 1,
  images: JSON.stringify([
    "https://your-storage/image1.jpg",
    "https://your-storage/image2.jpg"
  ]),
  basePrice: 15000,
  currency: "NGN",
  cleaningFee: 5000,
  minStay: 2,
  checkInTime: "14:00",
  checkOutTime: "12:00",
  isActive: true
};

await client.createEntity(property);
```

## Step 6: Deploy

Push your code to GitHub:

```bash
git add -A
git commit -m "Configure for Azure deployment"
git push origin main
```

GitHub Actions will automatically build and deploy your app.

## Step 7: Custom Domain (Optional)

1. In Azure Portal, go to your Static Web App
2. Click "Custom domains"
3. Click "Add"
4. Choose "Custom domain on other DNS"
5. Enter your domain (e.g., `pyrecrest.com`)
6. Add the provided CNAME record to your DNS provider
7. Azure will automatically provision SSL certificate

## Step 8: Test Your Deployment

1. Visit your Static Web App URL
2. Test the booking flow
3. Verify emails are sent
4. Check that bookings appear in Azure Table Storage

## Local Development

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - API
cd api
func start

# Access at http://localhost:5173
```

## Monitoring

- **Application Insights**: Automatically enabled for Azure Static Web Apps
- **Logs**: View in Azure Portal under "Log stream"
- **Analytics**: View in Application Insights dashboard

## Troubleshooting

### Emails not sending
- Check SendGrid API key is correct
- Verify sender email is verified in SendGrid
- Check Azure Functions logs

### Bookings not saving
- Verify Azure Storage connection string
- Check API logs in Azure Portal
- Ensure tables exist in Storage Account

### Build failures
- Check GitHub Actions logs
- Verify Node.js version matches (18+)
- Clear npm cache: `npm clean-install`

## Cost Estimate

- **Azure Static Web Apps**: Free tier
- **Azure Functions**: Free tier (1M executions/month)
- **Azure Storage**: ~$0.05-1/month
- **SendGrid**: Free tier (100 emails/day)

**Total**: ~$1-3/month for MVP

## Next Steps

1. Add professional property photos
2. Configure Google Maps API
3. Set up monitoring alerts
4. Create admin dashboard
5. Test payment flow thoroughly
6. Launch marketing campaign

## Support

For issues:
- Check Azure Portal logs
- Review GitHub Actions build logs
- Check API function logs in Azure

## Security Checklist

- [x] HTTPS enabled (automatic with Azure)
- [ ] Admin password is strong and hashed
- [ ] JWT secret is random and secure
- [ ] SendGrid API key is protected
- [ ] Bank details are correct
- [ ] Test booking flow end-to-end
- [ ] Verify email delivery

---

**Your Pyrecrest website is now live! 🎉**

Visit: `https://your-app-name.azurestaticapps.net`
