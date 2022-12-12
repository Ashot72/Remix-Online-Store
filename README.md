# Remix Online Store
 [Remix](https://remix.run/) is a brand-new full stack web framework. It is used for server-side rendering (SSR). Unlike vanilla React, where data is fetched on the frontend and then rendered on the screen, Remix fetches data on the backend and serves the HTML directly to the user. It was created by the people behind [React Router](https://reactrouter.com/en/main).
 
 In the Remix Online Store app I tried to use some Remix features that makes the app development easier - different Remix hooks (useLoaderData, useAtionData, useFetcher, useMatches, useTransition, useCatch), different routes (layout, dynamic, dot-delimited, pathless, resource etc.), error handling (ErrorBoundary, CatchBoundary) and links, meta, handler, action, loader exported functions. I also use Remix prefetch to fetch data ahead of time. I disable JavaScript on pages where we have static content to avoid unnecessary downloads.
 
 [Prisma](https://www.prisma.io/), a next-generation ORM is used in our application to work with MongoDB. The app uses session cookies for authentication.

```

       # Clone the repository
         git clone https://github.com/Ashot72/Remix-Online-Store.git
         cd Remix-Online-Store

       # Install dependencies
         npm install

       # Start the app in development mode
         npm run dev
       
       # Add MongoDB connection string 
         Add MongoDB connection string in .env file (DATABASE_URL)
       
       # Stripe Card Information for testing
         Card Number: 4242 4242 4242 4242
         CVC: 567
         Expiration Date: 12/34

```

Go to Remix Online Store [Video](https://youtu.be/K56f1Z1Ha7c) page

Go to Remix Online Store [Description](https://ashot72.github.io/Remix-Online-Store/doc.html) page


