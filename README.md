This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin Panel Setup

1. **Seed the database** (first time only):
   ```bash
   curl -X POST http://localhost:3000/api/seed
   ```

2. **Access admin panel**:
   - URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
   - Email: `admin@youguru.com`
   - Password: `admin123`

3. **Admin Features**:
   - Manage Hero Section content
   - Create/Edit Blog posts
   - Update Session types and pricing
   - Modify Contact information
   - Site settings management

## Environment Variables

Create `.env.local` file with:

```
MONGO_URI=your_mongodb_connection_string
DB_NAME=youguru
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
WHATSAPP_NUMBER=your_whatsapp_number
```

## Dynamic Components

The following components are now dynamic and manageable via admin panel:

- **Hero Section**: Title, subtitle, features, CTA buttons
- **Blog Posts**: Full CRUD operations
- **Session Types**: Pricing, descriptions, packages
- **Contact Info**: Phone, email, address, hours
- **Site Settings**: General configuration

## API Routes

- `POST /api/auth/login` - Admin authentication
- `GET /api/content?type=hero` - Fetch content by type
- `POST /api/content` - Create new content
- `PUT /api/content` - Update existing content
- `POST /api/seed` - Initialize database

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.