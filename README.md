# Whiteboard Application

You can try the live demo at [https://vidext.daviddh.dev/](https://vidext.daviddh.dev/) where all AI functionalities are working.

## Prerequisites

- Node.js
- pnpm
- Git

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/daviddhdev/VIDEXT-challenge.git
cd VIDEXT-challenge
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="file:./db.sqlite"
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

The Cloudflare API token and account ID are used to make AI calls. https://developers.cloudflare.com/workers-ai/get-started/rest-api/

4. Initialize the database:

```bash
pnpm run db:push
```

## Running the Application

1. Start the development server:

```bash
pnpm run dev
```

2. Open your browser and navigate to:

```
http://localhost:3000
```

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
