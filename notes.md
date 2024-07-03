# Package.json
The provided code is a JSON configuration file typically found in a JavaScript/TypeScript project using Next.js and other related libraries. Let's break down each section:

### `private`: true
This field indicates that the project is private, meaning it should not be published to the npm registry.

### `scripts`
This section defines custom commands that can be run using npm or yarn:

- `"dev": "next dev --turbo"`: This command starts the development server with turbo mode enabled.
- `"build": "next build"`: This command builds the application for production.
- `"start": "next start"`: This command starts the Next.js application in production mode.
- `"lint": "next lint"`: This command runs the linter to check for code quality and style issues.

### `dependencies`
This section lists the packages required for the project to run. Here is a brief description of each:

- `@radix-ui/react-slot`: A utility for composing components in React.
- `@types/node`: Type definitions for Node.js.
- `@types/react`: Type definitions for React.
- `@types/react-dom`: Type definitions for React DOM.
- `@vercel/analytics`: Analytics integration from Vercel.
- `autoprefixer`: A PostCSS plugin that adds vendor prefixes to CSS rules.
- `class-variance-authority`: Utility for managing CSS class names.
- `clsx`: Utility for constructing `className` strings conditionally.
- `drizzle-kit`: Tooling for working with Drizzle ORM.
- `drizzle-orm`: An ORM for TypeScript.
- `lucide-react`: React components for Lucide icons.
- `next`: The Next.js framework.
- `next-auth`: Authentication library for Next.js.
- `pg`: PostgreSQL client for Node.js.
- `postcss`: A tool for transforming CSS with JavaScript plugins.
- `prettier`: Code formatter.
- `prop-types`: Runtime type checking for React props.
- `react`: The React library.
- `react-dom`: React package for working with the DOM.
- `server-only`: A utility for server-only code in a Next.js application.
- `tailwind-merge`: A utility to merge Tailwind CSS classes.
- `tailwindcss`: A utility-first CSS framework.
- `tailwindcss-animate`: Tailwind CSS plugin for animations.
- `typescript`: The TypeScript language.

### `prettier`
This section defines Prettier configuration options for code formatting:

- `"arrowParens": "always"`: Always include parentheses around arrow function parameters.
- `"singleQuote": true`: Use single quotes instead of double quotes.
- `"tabWidth": 2`: Set the number of spaces per indentation level to 2.
- `"trailingComma": "none"`: Do not add trailing commas.

This JSON configuration file sets up a robust development environment with Next.js, TypeScript, and various other tools and libraries to ensure code quality, manage dependencies, and streamline development workflows.

# Config
This code is a configuration file for a Next.js project. It configures the Next.js framework to handle specific settings related to image optimization. Here's a detailed explanation of each part:

### Type Annotations
```javascript
/** @type {import('next').NextConfig} */
```
This is a JSDoc comment that provides type information for the `nextConfig` object using TypeScript. It indicates that `nextConfig` conforms to the `NextConfig` type from the Next.js library.

### `nextConfig` Object
```javascript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh'
      }
    ]
  }
};
```
This object defines the configuration for the Next.js application. In this case, it specifically configures the image optimization feature.

- `images`: This property is used to configure image optimization in Next.js.

  - `remotePatterns`: This property is an array of objects that define patterns for external image sources. Next.js will allow these patterns when optimizing images.

    - Each object in the `remotePatterns` array specifies a protocol and a hostname that are allowed:
      - The first object allows images from `https://avatars.githubusercontent.com`.
      - The second object allows images from `https://avatar.vercel.sh`.

### Exporting the Configuration
```javascript
module.exports = nextConfig;
```
This line exports the `nextConfig` object, making it available to Next.js when it starts up. This way, Next.js knows to apply the specified image optimization settings.

### Summary
In summary, this configuration allows the Next.js application to optimize images that are loaded from `https://avatars.githubusercontent.com` and `https://avatar.vercel.sh`. By specifying these remote patterns, the application can fetch and optimize images from these external sources, improving performance and ensuring that images are served in an efficient manner.

# Search
This code is a React component called `Search` written in TypeScript, intended to be used in a Next.js application. This component provides a search input field with some advanced functionalities, including handling input changes, URL query parameters, and displaying a spinner while a search is in progress. Let's break down each part of the code:

### 'use client'
```javascript
'use client';
```
This directive indicates that the file contains client-side code. In Next.js, this ensures the component runs in the browser and not on the server.

### Imports
```javascript
import { Input } from '@/components/ui/input';
import { SearchIcon, Spinner } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { useTransition, useEffect, useRef, useState } from 'react';
```
- `Input`: A custom input component, likely styled or enhanced with specific UI features.
- `SearchIcon` and `Spinner`: Custom icons used within the component.
- `useRouter`: A hook from Next.js to manipulate the navigation programmatically.
- `useTransition`, `useEffect`, `useRef`, `useState`: React hooks used for various state and lifecycle management tasks.

### Component Definition
```javascript
export function Search(props: { value?: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(props.value);
  const [isPending, startTransition] = useTransition();
```
- `router`: Used for navigation and URL manipulation.
- `inputRef`: A reference to the input element.
- `value`: State to hold the current value of the input field, initialized with the prop `value`.
- `isPending` and `startTransition`: Used to manage and track transitions.

### `useEffect` Hook
```javascript
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  console.log('value', value);
  if (value === undefined) {
    return;
  } else if (value) {
    params.set('q', value);
  } else {
    params.delete('q');
  }

  startTransition(() => {
    // All navigations are transitions automatically
    // But wrapping this allows us to observe the pending state
    router.replace(`/?${params.toString()}`);
  });
}, [router, value]);
```
- This effect runs whenever `router` or `value` changes.
- It updates the URL query parameter `q` based on the `value`.
- `startTransition` ensures that the navigation is treated as a transition, allowing the component to track the pending state (`isPending`).

### Return Statement
```javascript
return (
  <div className="relative">
    <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
    <Input
      ref={inputRef}
      value={value ?? ''}
      onInput={(e) => {
        setValue(e.currentTarget.value);
      }}
      spellCheck={false}
      className="w-full bg-white shadow-none appearance-none pl-8"
      placeholder="Search users..."
    />
    {isPending && <Spinner />}
  </div>
);
```
- The component renders a `div` containing:
  - `SearchIcon` positioned absolutely within the `div`.
  - `Input` field with:
    - `ref`: Reference to the input element.
    - `value`: Controlled input value.
    - `onInput`: Event handler to update `value` state.
    - `spellCheck`: Disabled spell checking.
    - `className`: Styling classes.
    - `placeholder`: Placeholder text for the input field.
  - `Spinner` component, conditionally rendered if `isPending` is `true`.

### Summary
This `Search` component:
1. Displays a search input field with an icon.
2. Updates the URL query parameter `q` based on the input value.
3. Uses transitions to manage state changes and show a spinner while a search is in progress.
4. Provides a clean and interactive search experience with controlled input and real-time URL updates.

# UsersTable
This code is a React component named `UsersTable`, designed to render a table of users with pagination functionality and an option to delete users. It utilizes various custom UI components and hooks from a Next.js application. Let's break down each part of the code:

### 'use client'
```javascript
'use client';
```
This directive specifies that the code is intended to run on the client side.

### Imports
```javascript
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SelectUser } from '@/lib/db';
import { deleteUser } from './actions';
import { useRouter } from 'next/navigation';
```
- `TableHead`, `TableRow`, `TableHeader`, `TableCell`, `TableBody`, `Table`: Custom table components for rendering the user table.
- `Button`: Custom button component.
- `SelectUser`: Type definition for a user object.
- `deleteUser`: Function to delete a user.
- `useRouter`: Hook from Next.js to handle navigation.

### UsersTable Component
```javascript
export function UsersTable({
  users,
  offset
}: {
  users: SelectUser[];
  offset: number | null;
}) {
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Username</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
          Next Page
        </Button>
      )}
    </>
  );
}
```
- **Props**:
  - `users`: An array of user objects to display in the table.
  - `offset`: A number indicating the current pagination offset.
- **Router**:
  - `useRouter`: Hook used to get the router instance.
  - `onClick`: Function that updates the URL with the new offset for pagination.
- **Rendering**:
  - The table headers (`Name`, `Email`, `Username`).
  - A `UserRow` component for each user.
  - A button to navigate to the next page if `offset` is not `null`.

### UserRow Component
```javascript
function UserRow({ user }: { user: SelectUser }) {
  const userId = user.id;
  const deleteUserWithId = deleteUser.bind(null, userId);

  return (
    <TableRow>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          formAction={deleteUserWithId}
          disabled
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
```
- **Props**:
  - `user`: A user object to display in the table row.
- **Binding**:
  - `deleteUserWithId`: A function bound to the specific user's ID, to delete the user.
- **Rendering**:
  - Table cells displaying the user's `name`, `email`, and `username`.
  - A delete button for each user (currently disabled).

### Summary
- **UsersTable** component:
  - Displays a table with user data.
  - Supports pagination with a "Next Page" button that updates the URL.
- **UserRow** component:
  - Displays individual user details in a table row.
  - Includes a delete button (currently disabled) to delete the user.
- **Routing**:
  - Uses `useRouter` from Next.js to handle navigation.
- **Styling and Layout**:
  - Uses custom UI components for table and button elements.
  - Applies classes for styling (`border`, `shadow-sm`, `rounded-lg`, etc.).

This setup allows for a clean and efficient display of user data with pagination and potential deletion functionality.

# IndexPage
This code defines an `IndexPage` component, which serves as the main entry point for rendering a page displaying a list of users with search and pagination functionalities. It utilizes the `getUsers` function to fetch user data based on search parameters and an offset value. Let's break down the code in detail:

### Imports
```javascript
import { getUsers } from '@/lib/db';
import { UsersTable } from './users-table';
import { Search } from './search';
```
- `getUsers`: A function that fetches users from the database, likely with filtering and pagination support.
- `UsersTable`: A component that renders a table of users.
- `Search`: A component that provides a search input field.

### IndexPage Component
```javascript
export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { users, newOffset } = await getUsers(search, Number(offset));
```
- **Props**:
  - `searchParams`: An object containing the search query (`q`) and pagination offset (`offset`).
- **Local Variables**:
  - `search`: Extracts the search query from `searchParams` or defaults to an empty string.
  - `offset`: Extracts the offset from `searchParams` or defaults to `0`.
  - `users` and `newOffset`: Destructured from the result of `getUsers`, where `users` is the list of users, and `newOffset` is the updated offset for pagination.

### JSX Return
```javascript
  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Users</h1>
      </div>
      <div className="w-full mb-4">
        <Search value={searchParams.q} />
      </div>
      <UsersTable users={users} offset={newOffset} />
    </main>
  );
}
```
- **Layout**:
  - The component returns a `main` element with flexbox layout classes for responsive design (`flex`, `flex-1`, `flex-col`, `p-4`, `md:p-6`).
  - Inside `main`, a `div` contains the page title "Users" with styling classes for margins and font size.
- **Search Component**:
  - Rendered within a `div` that takes full width and has a bottom margin.
  - The `Search` component is initialized with the current search query (`searchParams.q`).
- **UsersTable Component**:
  - Rendered with the list of users and the updated offset for pagination.

### Summary
- **Data Fetching**:
  - `getUsers` is called with the search query and offset to fetch the relevant user data.
- **Search and Pagination**:
  - The `Search` component allows users to input search terms.
  - The `UsersTable` component displays the fetched users and handles pagination using the offset.
- **Responsive Design**:
  - Flexbox and padding classes ensure the layout adjusts to different screen sizes.

This setup provides a user-friendly interface for searching and browsing users with clear navigation and pagination controls. The use of async functions and React components allows for efficient data fetching and rendering.

# NavItem
This code defines a `NavItem` component in a React application using Next.js. This component is used for navigation links and highlights the current active link based on the current URL path. Here is a detailed explanation of the code:

### 'use client'
```javascript
'use client';
```
This directive indicates that this file contains client-side code and should run in the browser.

### Imports
```javascript
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
```
- `clsx`: A utility for conditionally joining class names.
- `Link`: The Link component from Next.js for client-side navigation.
- `usePathname`: A hook from Next.js that retrieves the current path.

### NavItem Component
```javascript
export function NavItem({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
```
- **Props**:
  - `href`: The URL the link should navigate to.
  - `children`: The content to be displayed inside the link, typically text or icons.
- **Hook**:
  - `usePathname()`: Retrieves the current URL path, allowing the component to determine if it matches the `href` prop.

### JSX Return
```javascript
  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50',
        {
          'bg-gray-100 dark:bg-gray-800': pathname === href
        }
      )}
    >
      {children}
    </Link>
  );
}
```
- **Link Component**:
  - `href={href}`: Sets the destination URL for the link.
  - `className`: Uses `clsx` to conditionally apply CSS classes:
    - `'flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50'`: Default classes for styling the link, including flexbox layout, padding, text color, and hover effects.
    - `{'bg-gray-100 dark:bg-gray-800': pathname === href}`: Additional classes applied when the current path matches the link's `href`, changing the background color to highlight the active link.
- **Children**:
  - `{children}`: Renders the children passed to the `NavItem`, allowing for flexible content inside the link.

### Summary
The `NavItem` component is a styled navigation link that highlights the current active link based on the current URL path. It uses the `usePathname` hook from Next.js to get the current path and `clsx` to conditionally apply classes for styling. When the link's `href` matches the current path, it applies additional styles to indicate the active link. This component provides a responsive and visually consistent navigation element for the application.

# RootLayout
This code defines the `RootLayout` component for a Next.js application, which sets up the overall structure and layout of the application, including navigation, header, and main content areas. It uses various custom components and Tailwind CSS for styling. Here's a detailed breakdown of the code:

### Imports
```javascript
import './globals.css';

import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';
import { Logo, SettingsIcon, UsersIcon, VercelLogo } from '@/components/icons';
import { User } from './user';
import { NavItem } from './nav-item';
```
- `./globals.css`: Global CSS styles for the application.
- `Link`: The Link component from Next.js for client-side navigation.
- `Analytics`: Vercel Analytics component for tracking usage and performance.
- `Logo`, `SettingsIcon`, `UsersIcon`, `VercelLogo`: Custom icon components.
- `User`: A custom component for displaying user information.
- `NavItem`: A custom component for navigation items.

### Metadata
```javascript
export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description: 'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};
```
- `metadata`: An object containing the title and description for the HTML document.

### RootLayout Component
```javascript
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body>
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-[60px] items-center border-b px-5">
                <Link className="flex items-center gap-2 font-semibold" href="/">
                  <Logo />
                  <span className="">ACME</span>
                </Link>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <NavItem href="/">
                    <UsersIcon className="h-4 w-4" />
                    Users
                  </NavItem>
                  <NavItem href="/settings">
                    <SettingsIcon className="h-4 w-4" />
                    Settings
                  </NavItem>
                  <NavItem href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs">
                    <VercelLogo className="h-4 w-4" />
                    Deploy
                  </NavItem>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
              <Link className="flex items-center gap-2 font-semibold lg:hidden" href="/">
                <Logo />
                <span className="">ACME</span>
              </Link>
              <User />
            </header>
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
```
- **Component Props**:
  - `children`: The content to be rendered inside the main layout.

### HTML Structure
- `<html lang="en" className="h-full bg-gray-50">`: Sets the language attribute and applies full height and background color.
- `<body>`: Contains the main layout structure.

### Main Layout
```javascript
<div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
```
- A CSS grid layout with two columns on large screens: a sidebar and a main content area.

#### Sidebar
```javascript
<div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
  <div className="flex h-full max-h-screen flex-col gap-2">
    <div className="flex h-[60px] items-center border-b px-5">
      <Link className="flex items-center gap-2 font-semibold" href="/">
        <Logo />
        <span className="">ACME</span>
      </Link>
    </div>
    <div className="flex-1 overflow-auto py-2">
      <nav className="grid items-start px-4 text-sm font-medium">
        <NavItem href="/">
          <UsersIcon className="h-4 w-4" />
          Users
        </NavItem>
        <NavItem href="/settings">
          <SettingsIcon className="h-4 w-4" />
          Settings
        </NavItem>
        <NavItem href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs">
          <VercelLogo className="h-4 w-4" />
          Deploy
        </NavItem>
      </nav>
    </div>
  </div>
</div>
```
- **Sidebar Visibility**:
  - Hidden on smaller screens (`lg:block` and `lg:hidden` classes).
  - Contains a logo, a navigation section with `NavItem` components, and is styled with Tailwind CSS classes.

#### Main Content Area
```javascript
<div className="flex flex-col">
  <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
    <Link className="flex items-center gap-2 font-semibold lg:hidden" href="/">
      <Logo />
      <span className="">ACME</span>
    </Link>
    <User />
  </header>
  {children}
</div>
```
- **Header**:
  - Contains a link to the homepage (visible on small screens) and the `User` component.
  - Styled with flexbox for layout and various Tailwind CSS classes for appearance.

#### Analytics
```javascript
<Analytics />
```
- Integrates Vercel Analytics to track usage and performance.

### Summary
- **RootLayout** sets up a responsive layout with a sidebar for navigation and a main content area.
- The sidebar includes links to different sections of the application.
- The header contains a link to the homepage and a user component.
- The layout is styled using Tailwind CSS for a consistent look and feel.
- Vercel Analytics is included to monitor the application's usage.

# useInfiniteScroll
This code defines a custom React hook called `useInfiniteScroll`, which is designed to implement infinite scrolling in a React application. Infinite scrolling is a technique where more content is loaded as the user scrolls down, often used in social media feeds or content-heavy websites.

Here is a detailed breakdown of the code:

### Imports
```javascript
import { useEffect, useRef, useState } from 'react';
```
- `useEffect`: React hook that allows you to perform side effects in function components.
- `useRef`: React hook that returns a mutable ref object.
- `useState`: React hook that returns a stateful value and a function to update it.

### useInfiniteScroll Hook
```javascript
export function useInfiniteScroll(onIntersect: () => void) {
  const sentinelRef = useRef<HTMLElement | null>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer) {
      observer.disconnect();
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        rootMargin: '50px 0px 0px 0px'
      }
    );

    setObserver(obs);

    if (sentinelRef.current) {
      obs.observe(sentinelRef.current);
    }

    return () => obs.disconnect();
  }, [onIntersect]);

  return sentinelRef;
}
```
- **Function Definition**:
  - `useInfiniteScroll` is a function that accepts a callback function `onIntersect` to be called when the intersection occurs.

### State and Refs
- `sentinelRef`: A ref to the sentinel element that will trigger loading more content when it comes into view.
- `observer`: State to hold the instance of `IntersectionObserver`.

### useEffect Hook
```javascript
useEffect(() => {
  if (observer) {
    observer.disconnect();
  }

  const obs = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    },
    {
      rootMargin: '50px 0px 0px 0px'
    }
  );

  setObserver(obs);

  if (sentinelRef.current) {
    obs.observe(sentinelRef.current);
  }

  return () => obs.disconnect();
}, [onIntersect]);
```
- **Effect Dependencies**:
  - The effect runs whenever the `onIntersect` callback changes.
- **Observer Setup**:
  - If an existing observer is present, it is disconnected.
  - A new `IntersectionObserver` instance is created.
  - The callback function checks if the sentinel element is intersecting (visible within the viewport).
    - If it is, the `onIntersect` function is called.
- **rootMargin**:
  - Sets a margin around the root (viewport) to trigger the intersection before the element actually enters the viewport. Here, it triggers when the sentinel is 50px away from entering the viewport.
- **Observer Assignment and Observation**:
  - The observer is stored in state with `setObserver`.
  - If the sentinel element is present, the observer starts observing it.
- **Cleanup**:
  - The effect returns a cleanup function that disconnects the observer when the component unmounts or the dependencies change.

### Return Value
```javascript
return sentinelRef;
```
- The hook returns `sentinelRef`, which should be attached to the DOM element that acts as the sentinel (usually a `div` at the bottom of the list of content).

### Usage Example
Here is how you might use `useInfiniteScroll` in a component:

```javascript
import React, { useState } from 'react';
import { useInfiniteScroll } from './useInfiniteScroll';

function InfiniteScrollComponent() {
  const [items, setItems] = useState(initialItems);

  const loadMoreItems = () => {
    // Fetch or generate more items and update state
    setItems(prevItems => [...prevItems, ...newItems]);
  };

  const sentinelRef = useInfiniteScroll(loadMoreItems);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.content}</div>
      ))}
      <div ref={sentinelRef}></div>
    </div>
  );
}
```
- The `loadMoreItems` function is passed to `useInfiniteScroll` as `onIntersect`.
- The returned `sentinelRef` is attached to a `div` at the bottom of the list, triggering `loadMoreItems` when it comes into view.

This hook makes it easy to implement infinite scrolling in a React component by handling the setup and management of the `IntersectionObserver` internally.

# CSS
This CSS code snippet configures a Tailwind CSS setup, defining a set of custom CSS variables for both light and dark themes. It also applies some base styles using the `@apply` directive from Tailwind CSS. Here's a detailed breakdown of each part:

### Importing Tailwind Base, Components, and Utilities
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- `@tailwind base`: Imports Tailwind's base styles.
- `@tailwind components`: Imports Tailwind's component styles.
- `@tailwind utilities`: Imports Tailwind's utility classes.

### Custom CSS Variables
#### Light Theme Variables
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;
  }
```
- These variables define a color palette and some UI-related variables for the light theme.
- The colors are defined using HSL notation (Hue, Saturation, Lightness).

#### Dark Theme Variables
```css
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
```
- These variables define the color palette for the dark theme.
- The dark theme colors are applied when the `.dark` class is present on an element.

### Applying Base Styles
```css
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```
- **`*` selector**: Applies a border color defined by the `--border` variable to all elements.
  ```css
  * {
    @apply border-border;
  }
  ```
  - The `@apply` directive is used to apply the `border-border` utility class (which is assumed to be defined by Tailwind CSS with the value of the `--border` variable).

- **`body` selector**: Applies background and text color to the body element using the `--background` and `--foreground` variables, respectively.
  ```css
  body {
    @apply bg-background text-foreground;
  }
  ```

### Summary
- This setup customizes Tailwind CSS with a set of CSS variables for both light and dark themes.
- The `:root` defines the default (light theme) variables, and the `.dark` class defines the dark theme variables.
- Base styles apply these variables globally to all elements and the body using the `@apply` directive.
- This approach allows for easy theming and consistent use of colors and styles across the application.

# Error
This React component named `Error` is designed to handle and display errors within a Next.js application. It provides a user-friendly message and instructions for setting up a database table, which can be helpful during the development phase. Here's a detailed breakdown of the code:

### 'use client'
```javascript
'use client';
```
This directive indicates that the code is intended to run on the client side.

### Imports
```javascript
import { useEffect } from 'react';
```
- `useEffect`: A React hook that allows you to perform side effects in function components.

### Error Component
```javascript
export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="p-4 md:p-6">
      <div className="mb-8 space-y-4">
        <h1 className="font-semibold text-lg md:text-2xl">
          Please complete setup
        </h1>
        <p>
          Inside the Vercel Postgres dashboard, create a table based on the
          schema defined in this repository.
        </p>
        <pre className="my-4 px-3 py-4 bg-black text-white rounded-lg max-w-2xl overflow-scroll flex text-wrap">
          <code>
            {`CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  username VARCHAR(255)
);`}
          </code>
        </pre>
        <p>Insert a row for testing:</p>
        <pre className="my-4 px-3 py-4 bg-black text-white rounded-lg max-w-2xl overflow-scroll flex text-wrap">
          <code>
            {`INSERT INTO users (id, email, name, username) VALUES (1, 'me@site.com', 'Me', 'username');`}
          </code>
        </pre>
      </div>
    </main>
  );
}
```
### Props
- `error`: An error object, which may include an optional `digest` property.
- `reset`: A function to reset the error state, likely provided by the error boundary handling the error.

### `useEffect` Hook
```javascript
useEffect(() => {
  // Log the error to an error reporting service
  console.error(error);
}, [error]);
```
- The `useEffect` hook logs the error to the console whenever the `error` prop changes. This could be extended to send the error information to an external error reporting service.

### JSX Return
```javascript
return (
  <main className="p-4 md:p-6">
    <div className="mb-8 space-y-4">
      <h1 className="font-semibold text-lg md:text-2xl">
        Please complete setup
      </h1>
      <p>
        Inside the Vercel Postgres dashboard, create a table based on the
        schema defined in this repository.
      </p>
      <pre className="my-4 px-3 py-4 bg-black text-white rounded-lg max-w-2xl overflow-scroll flex text-wrap">
        <code>
          {`CREATE TABLE users (
id SERIAL PRIMARY KEY,
email VARCHAR(255) NOT NULL,
name VARCHAR(255),
username VARCHAR(255)
);`}
        </code>
      </pre>
      <p>Insert a row for testing:</p>
      <pre className="my-4 px-3 py-4 bg-black text-white rounded-lg max-w-2xl overflow-scroll flex text-wrap">
        <code>
          {`INSERT INTO users (id, email, name, username) VALUES (1, 'me@site.com', 'Me', 'username');`}
        </code>
      </pre>
    </div>
  </main>
);
```
- **Main Container**: The `main` element contains padding for spacing (`p-4 md:p-6`).
- **Content Container**: The `div` inside `main` has margin bottom (`mb-8`) and vertical spacing between elements (`space-y-4`).
- **Title**: An `h1` element with font size and weight (`font-semibold text-lg md:text-2xl`).
- **Instructions**: A `p` element providing instructions for creating a table in the Vercel Postgres dashboard.
- **SQL Code Blocks**: 
  - `pre` and `code` elements are used to display code snippets with background color (`bg-black text-white`), padding (`px-3 py-4`), rounded corners (`rounded-lg`), max width (`max-w-2xl`), and scrollable overflow (`overflow-scroll`).
  - SQL code for creating the `users` table and inserting a test row.

### Summary
- This component is used to display an error message along with specific instructions for setting up a database table.
- The `useEffect` hook logs the error to the console.
- The layout includes a main container with padding and a content container with spaced elements.
- Provides SQL snippets to guide the user in creating the necessary database table and inserting a test row.
- This setup is particularly useful during the development phase to ensure that necessary database configurations are correctly set up.

# Settings
This code defines an asynchronous function component named `SettingsPage`, which renders a settings page layout for a Next.js application. Let's break down the code step-by-step:

### Component Definition
```javascript
export default async function SettingsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Settings</h1>
      </div>
    </main>
  );
}
```
- **Function Declaration**:
  - `SettingsPage` is declared as an `async` function, although it does not perform any asynchronous operations. This might be in preparation for future asynchronous data fetching or other operations.

### JSX Return
```javascript
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Settings</h1>
      </div>
    </main>
  );
```
- **Main Container**:
  - The `main` element is used as the primary container for the page content.
  - `className` includes several Tailwind CSS classes:
    - `flex`: Applies a flexbox layout.
    - `flex-1`: Makes the `main` element take up the remaining space in the flex container.
    - `flex-col`: Arranges children elements in a column.
    - `gap-4`: Applies a gap of `1rem` between children elements.
    - `p-4`: Applies padding of `1rem` on all sides.
    - `md:gap-8`: Applies a larger gap (`2rem`) between children elements on medium and larger screens.
    - `md:p-6`: Applies larger padding (`1.5rem`) on all sides on medium and larger screens.

- **Title Container**:
  - A `div` that wraps the heading element, applying flexbox layout to align items.
  - `className` includes:
    - `flex`: Applies a flexbox layout.
    - `items-center`: Vertically centers the children elements.

- **Heading**:
  - An `h1` element displaying the text "Settings".
  - `className` includes:
    - `font-semibold`: Applies a semibold font weight.
    - `text-lg`: Applies a font size of `1.125rem`.
    - `md:text-2xl`: Applies a larger font size (`1.5rem`) on medium and larger screens.

### Summary
- **SettingsPage Component**:
  - A simple layout for a settings page with a main container and a heading.
  - Utilizes Tailwind CSS classes for responsive design and spacing.
  - Although declared as `async`, it currently doesn't perform any asynchronous operations, allowing for future enhancements or data fetching.
- **Styling and Layout**:
  - The flexbox layout ensures that elements are arranged in a column and centered vertically.
  - Responsive design adjusts gaps and padding for different screen sizes.
- **Future Enhancements**:
  - The `async` keyword suggests potential for asynchronous data fetching or other operations to be added later.

This component sets up a basic, responsive settings page layout that can be easily extended with additional settings options or asynchronous data operations.

# Route
This code snippet demonstrates how to import and re-export specific HTTP request handlers from a module, allowing these handlers to be easily used in other parts of a Next.js application. Let's break down the code:

### Imports
```javascript
import { handlers } from '@/lib/auth';
```
- This line imports the `handlers` object from the `auth` module located in the `lib` directory.
- The `@/lib/auth` path uses an alias (typically configured in the `jsconfig.json` or `tsconfig.json` file) to refer to the `lib` directory within the project structure.

### Re-exports
```javascript
export const { GET, POST } = handlers;
```
- This line destructures the `handlers` object to extract the `GET` and `POST` properties.
- It then re-exports these properties as named exports, allowing them to be imported and used elsewhere in the application.

### Usage

By re-exporting `GET` and `POST`, you can use these handlers in other parts of your application more conveniently. Here's an example of how you might use them in an API route or a server-side function:

#### Example: API Route
Suppose you have an API route in `pages/api/auth.js` or `pages/api/auth.ts`:

```javascript
import { GET, POST } from '@/lib/auth';

// Using the imported handlers
export { GET, POST };
```

#### Example: Server-Side Function
You might also use the handlers in a server-side function:

```javascript
import { GET, POST } from '@/lib/auth';

async function handleRequest(req, res) {
  if (req.method === 'GET') {
    return GET(req, res);
  } else if (req.method === 'POST') {
    return POST(req, res);
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
```

### Summary

- **Modularization**: By importing and re-exporting specific handlers, the code promotes modularity and separation of concerns. It makes the `GET` and `POST` handlers reusable across different parts of the application.
- **Convenience**: It simplifies the import statements in other files, reducing repetition and making the codebase easier to maintain.
- **Flexibility**: The re-exported handlers can be used in various contexts, such as API routes or other server-side logic, facilitating consistent request handling throughout the application.

This approach aligns with modern JavaScript practices of modularization and code reuse, enhancing the maintainability and readability of the codebase.

# Auth
This code sets up authentication in a Next.js application using NextAuth.js and the GitHub provider. It also exports the handlers, signIn, signOut, and auth functions for use in other parts of the application. Here’s a detailed explanation of each part:

### Imports
```javascript
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
```
- `NextAuth`: The main function from NextAuth.js used to configure authentication.
- `GitHub`: The GitHub provider from NextAuth.js, used to authenticate users via GitHub.

### NextAuth Configuration
```javascript
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub]
});
```
- `NextAuth` is called with a configuration object.
- **providers**: An array containing the `GitHub` provider, which is used to enable GitHub authentication.
- **Exported Objects**:
  - `handlers`: Various built-in handlers provided by NextAuth.js for handling authentication-related routes and operations.
  - `signIn`: A function to programmatically trigger the sign-in process.
  - `signOut`: A function to programmatically trigger the sign-out process.
  - `auth`: The main authentication function from NextAuth.js.

### Usage
The exported objects can be used in different parts of your application. Here's how you might use them:

#### API Route
In an API route, you can use the `handlers` to handle authentication requests:

```javascript
// pages/api/auth/[...nextauth].js
import { handlers } from '@/lib/auth'; // Assuming the code is in lib/auth.js

export default handlers;
```

#### Sign-In and Sign-Out
In your components or pages, you can use `signIn` and `signOut` functions:

```javascript
import { signIn, signOut } from '@/lib/auth'; // Assuming the code is in lib/auth.js

function AuthButtons() {
  return (
    <div>
      <button onClick={() => signIn('github')}>Sign in with GitHub</button>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

export default AuthButtons;
```

### Summary
- **Configuration**: Sets up NextAuth.js with the GitHub provider for authentication.
- **Exports**: Re-exports `handlers`, `signIn`, `signOut`, and `auth` for use in other parts of the application.
  - `handlers`: Contains built-in NextAuth.js handlers for authentication routes.
  - `signIn`: Function to initiate sign-in.
  - `signOut`: Function to initiate sign-out.
  - `auth`: Main NextAuth.js function.

This setup allows you to easily integrate GitHub authentication into your Next.js application and use the authentication functions and handlers throughout your application.

# DB
This code sets up a PostgreSQL client and ORM using Drizzle ORM for a Next.js application. It provides functions to get users from the database and delete a user by their ID. Here's a detailed explanation of the code:

### Imports
```javascript
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { eq, ilike } from 'drizzle-orm';
```
- `Pool` from `pg`: Used to create a connection pool for PostgreSQL.
- `drizzle` from `drizzle-orm/node-postgres`: Initializes Drizzle ORM with a PostgreSQL client.
- `pgTable`, `serial`, `varchar` from `drizzle-orm/pg-core`: Utilities to define PostgreSQL table schemas.
- `eq`, `ilike` from `drizzle-orm`: Functions for SQL query conditions.

### Setting Up the PostgreSQL Client
```javascript
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL // Ensure you have this environment variable set
});
```
- Creates a new PostgreSQL connection pool using the connection string from the environment variable `POSTGRES_URL`.

### Initializing Drizzle ORM
```javascript
export const db = drizzle(pool);
```
- Initializes Drizzle ORM with the PostgreSQL connection pool.

### Defining the Users Table
```javascript
const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),
  username: varchar('username', { length: 50 }),
  email: varchar('email', { length: 50 })
});
```
- Defines a `users` table with columns `id`, `name`, `username`, and `email`.

### Type Definition for User Selection
```javascript
export type SelectUser = typeof users.$inferSelect;
```
- Infers the type for selecting users from the `users` table.

### Function to Get Users
```javascript
export async function getUsers(
  search: string,
  offset: number
): Promise<{
  users: SelectUser[];
  newOffset: number | null;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      users: await db
        .select()
        .from(users)
        .where(ilike(users.name, `%${search}%`))
        .limit(1000),
      newOffset: null
    };
  }

  if (offset === null) {
    return { users: [], newOffset: null };
  }

  const moreUsers = await db.select().from(users).limit(20).offset(offset);
  const newOffset = moreUsers.length >= 20 ? offset + 20 : null;
  return { users: moreUsers, newOffset };
}
```
- `getUsers`: Fetches users from the database based on search criteria and pagination.
  - If `search` is provided, it fetches up to 1000 users whose names match the search term (case-insensitive).
  - If `search` is not provided, it fetches users based on the `offset` for pagination.
  - Returns an object containing the users and the new offset for the next page.

### Function to Delete a User by ID
```javascript
export async function deleteUserById(id: number) {
  await db.delete(users).where(eq(users.id, id));
}
```
- `deleteUserById`: Deletes a user from the `users` table by their ID.

### Summary
- **Database Connection**: Sets up a PostgreSQL connection pool using the `pg` library.
- **ORM Initialization**: Uses Drizzle ORM to interact with the PostgreSQL database.
- **Table Definition**: Defines the `users` table schema with columns for ID, name, username, and email.
- **User Query Functions**:
  - `getUsers`: Fetches users based on a search term or pagination offset.
  - `deleteUserById`: Deletes a user by their ID.
- **Type Safety**: Infers types for selecting users, providing type safety for database operations.

This setup allows for efficient and type-safe interaction with a PostgreSQL database, supporting common operations like querying and deleting users.

# Utils 
This code snippet defines a utility function named `cn` that combines class names and merges Tailwind CSS class conflicts. It uses the `clsx` and `tailwind-merge` libraries to achieve this. Here's a detailed breakdown of the code:

### Imports
```javascript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
```
- `clsx`: A utility for constructing `className` strings conditionally. It allows for easy combination and conditional inclusion of class names.
  - `type ClassValue`: This import is used for TypeScript type annotations, ensuring that the `cn` function accepts valid class name values.
- `twMerge`: A utility from the `tailwind-merge` library that merges Tailwind CSS class names, resolving conflicts such as duplicate classes and ensuring the correct application of utilities.

### `cn` Function
```javascript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
- The `cn` function accepts a variable number of arguments (`...inputs`), each of which can be a class name string, an array of class names, an object, or other values that `clsx` can handle.
- **clsx**: Combines the provided class names into a single string.
- **twMerge**: Merges the combined class names, resolving any conflicts according to Tailwind CSS rules.
- The function returns the merged class name string.

### Usage Example
Here's how you might use the `cn` function in a React component:

```javascript
import React from 'react';
import { cn } from './path/to/cn-function';

function Button({ className, primary, disabled, children }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded',
        primary && 'bg-blue-500 text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
```
In this example:
- `cn` is used to conditionally apply class names based on the `primary` and `disabled` props.
- Any additional classes passed via the `className` prop are also included.
- The `twMerge` function ensures that any conflicting Tailwind CSS classes are resolved correctly.

### Summary
- **Utility Function**: `cn` simplifies the combination and merging of class names, particularly when using Tailwind CSS.
- **`clsx`**: Handles conditional and dynamic class name construction.
- **`twMerge`**: Resolves Tailwind CSS class conflicts, ensuring that the final class string applies styles correctly.
- **TypeScript**: Utilizes TypeScript for type safety, ensuring the function accepts valid class name inputs.

This utility function enhances code readability and maintainability when dealing with dynamic and conditional class names in a Tailwind CSS project.

# Table
This code defines a set of React components for building a styled table using Tailwind CSS and the utility function `cn` (a combination of `clsx` and `twMerge`). Each component is created using `React.forwardRef` to forward refs to the underlying DOM elements, allowing for greater flexibility and composition in React applications.

Here’s a detailed breakdown of each component and its implementation:

### Utility Function `cn`
The `cn` function is used to combine and merge class names, handling Tailwind CSS class conflicts:
```javascript
import { cn } from "@/lib/utils";
```

### Table Component
A wrapper for the table element, ensuring it is fully responsive and scrollable if needed:
```javascript
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";
```

### TableHeader Component
Represents the `<thead>` section of the table, with additional styling for table rows within it:
```javascript
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";
```

### TableBody Component
Represents the `<tbody>` section of the table, with styling for the last table row:
```javascript
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";
```

### TableFooter Component
Represents the `<tfoot>` section of the table, with styling for borders and background color:
```javascript
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";
```

### TableRow Component
Represents a table row (`<tr>`) with transition effects and hover state styling:
```javascript
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";
```

### TableHead Component
Represents a table header cell (`<th>`) with specific padding and text alignment:
```javascript
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";
```

### TableCell Component
Represents a table cell (`<td>`) with specific padding and alignment:
```javascript
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";
```

### TableCaption Component
Represents a table caption (`<caption>`) with margin and text styling:
```javascript
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";
```

### Exporting Components
Finally, all the components are exported for use in other parts of the application:
```javascript
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
```

### Summary
- **Reusable Components**: The components provide a flexible and reusable way to build tables with consistent styling.
- **Forwarding Refs**: `React.forwardRef` is used to forward refs to the underlying DOM elements, making it easier to work with these components in complex layouts.
- **Tailwind CSS**: The `cn` utility merges Tailwind CSS classes dynamically, allowing for easy styling and customization.
- **Component Display Names**: Each component is given a `displayName` for easier debugging and better development experience.

These components help maintain a consistent and clean approach to building tables in a React application with Tailwind CSS.

# Input
This code defines a reusable `Input` component using React and TypeScript. It extends the default HTML input attributes and uses Tailwind CSS for styling. The component also utilizes the `cn` utility function for handling class names, which merges class names and resolves Tailwind CSS class conflicts. Here is a detailed explanation:

### Imports
```javascript
import * as React from "react"
import { cn } from "@/lib/utils"
```
- `React`: Imported from `react` to use React functionalities.
- `cn`: A utility function that merges class names, combining `clsx` and `twMerge`.

### InputProps Interface
```javascript
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
```
- This interface extends the standard HTML input attributes for an `HTMLInputElement`. This ensures that all standard input attributes (like `type`, `value`, `onChange`, etc.) can be used with the `Input` component.

### Input Component
```javascript
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
```
- **React.forwardRef**:
  - Wraps the component to forward refs to the underlying `input` element. This is useful for parent components that need direct access to the input element, for example, to focus it programmatically.
- **Props**:
  - `className`: Additional class names passed to the component.
  - `type`: The input type (e.g., `text`, `password`, `email`, etc.).
  - `...props`: Spread operator to include any other passed properties.
  - `ref`: Ref forwarded to the `input` element.
- **JSX**:
  - `type={type}`: Sets the input type.
  - `className={cn(...)}`
    - Uses the `cn` function to combine the base class names with any additional class names passed via the `className` prop.
    - The base class names define the input's appearance and behavior, including height, width, padding, font size, border styles, focus styles, disabled state, and placeholder text.
  - `ref={ref}`: Forwards the ref to the `input` element.
  - `{...props}`: Spreads the remaining props onto the `input` element.

### Styling Details
- **Base Classes**:
  - `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background`: Defines the basic dimensions, border, background, padding, and text size.
  - `file:border-0 file:bg-transparent file:text-sm file:font-medium`: Styles for file input elements.
  - `placeholder:text-muted-foreground`: Styles for placeholder text.
  - `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`: Styles applied when the input is focused, including the ring and outline.
  - `disabled:cursor-not-allowed disabled:opacity-50`: Styles for the disabled state.

### Display Name
```javascript
Input.displayName = "Input"
```
- Sets a display name for the component to enhance debugging and development experience.

### Export
```javascript
export { Input }
```
- Exports the `Input` component for use in other parts of the application.

### Summary
- **Reusable Component**: The `Input` component is reusable and flexible, supporting all standard input attributes through TypeScript's `InputHTMLAttributes`.
- **Styling**: Tailwind CSS classes are used for consistent and customizable styling.
- **Utility Function**: The `cn` function ensures that class names are merged correctly and Tailwind CSS conflicts are resolved.
- **Forwarding Refs**: `React.forwardRef` is used to forward refs to the underlying `input` element, allowing for more advanced use cases.

This setup provides a robust and customizable input component that fits well into a modern React and Tailwind CSS codebase.

# Button
This code defines a reusable and highly customizable `Button` component in a React application using TypeScript, Tailwind CSS, and the `class-variance-authority` library for variant and size management. Here's a detailed breakdown of the code:

### Imports
```javascript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
```
- **React**: The core React library for creating components.
- **Slot**: A component from the `@radix-ui/react-slot` library that allows rendering another component or element as a child.
- **cva**: A utility from `class-variance-authority` for managing CSS class variants.
- **cn**: A utility function to merge and handle CSS class names.

### Button Variants
```javascript
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```
- **Base Styles**: The base styles for the button are defined in the first argument of `cva`. These styles ensure the button has consistent appearance and behavior.
- **Variants**: Defines different styles for `variant` and `size`.
  - **variant**: Different types of buttons like `default`, `destructive`, `outline`, `secondary`, `ghost`, and `link`.
  - **size**: Different sizes for the button such as `default`, `sm`, `lg`, and `icon`.
- **defaultVariants**: Specifies the default `variant` and `size` when none are provided.

### ButtonProps Interface
```javascript
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```
- Extends the default HTML button attributes and includes variant properties from `buttonVariants`.
- `asChild`: An optional boolean prop to determine if the button should render a custom component or element as a child.

### Button Component
```javascript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```
- **React.forwardRef**: Wraps the component to forward refs to the underlying DOM element.
- **Props**:
  - `className`: Additional class names to apply.
  - `variant`: The style variant of the button.
  - `size`: The size variant of the button.
  - `asChild`: If true, renders the `Slot` component, allowing for custom child components or elements.
  - `...props`: Spread operator to include other button attributes.
  - `ref`: Ref forwarded to the button element.
- **JSX**:
  - **Comp**: Determines the component to render, either `Slot` or `button`.
  - **className**: Combines the button variants and any additional class names.
  - **ref**: Forwards the ref.
  - **props**: Spreads other props onto the component.

### Display Name
```javascript
Button.displayName = "Button";
```
- Sets the display name for easier debugging and development experience.

### Export
```javascript
export { Button, buttonVariants };
```
- Exports the `Button` component and `buttonVariants` for use in other parts of the application.

### Summary
- **Customizable Button**: The `Button` component is highly customizable with different variants and sizes using Tailwind CSS.
- **Class Management**: Uses `class-variance-authority` to handle class variants and the `cn` utility to merge class names.
- **Forwarding Refs**: Uses `React.forwardRef` for forwarding refs to the DOM element.
- **Radix UI Slot**: Supports rendering custom components or elements as children using `Slot`.

This setup provides a flexible and reusable button component that can be easily adapted to different styles and sizes, fitting well within a modern React and Tailwind CSS codebase.

# Middleware
This code is configuring middleware for a Next.js application, using an authentication function from the `auth` module. It also specifies paths where the middleware should not be invoked. Here's a detailed breakdown of the code:

### Exports Middleware
```javascript
export { auth as middleware } from '@/lib/auth';
```
- This line imports the `auth` function from the `auth` module located at `@/lib/auth` and re-exports it as `middleware`.
- This `auth` function is likely a middleware function used for handling authentication in the application.

### Middleware Configuration
```javascript
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
```
- **config**: An export that provides configuration for the middleware.
- **matcher**: A key within the config object that specifies paths where the middleware should be applied or excluded.
  - The value is an array with a single string, which is a regular expression pattern.
  - `'/((?!api|_next/static|_next/image|favicon.ico).*)'`:
    - This regular expression uses negative lookahead assertions `(?!...)` to exclude certain paths from invoking the middleware.
    - Paths that start with `api`, `_next/static`, `_next/image`, and `favicon.ico` will not invoke the middleware.
    - For all other paths, the middleware will be invoked.

### Summary
- **Middleware Export**: The `auth` function from `@/lib/auth` is exported as `middleware`.
- **Path Matcher**: The `matcher` configuration specifies which paths should or should not invoke the middleware, using a regular expression to exclude certain paths.
  - This setup ensures that the middleware is applied to all paths except those related to API routes, static assets, Next.js images, and the favicon.

### Practical Example
In a Next.js application, this setup could be used to ensure that authentication middleware is only applied to the necessary pages and not to static assets or API routes. For example:

1. **`auth` Middleware**: This could be a function that checks if a user is authenticated before allowing access to certain pages.

2. **Configuration**: The middleware will be skipped for paths related to API endpoints, static files served by Next.js, images, and the favicon, ensuring that these requests are handled quickly without unnecessary authentication checks.

By setting up the middleware and its configuration in this way, the application can efficiently handle authentication while avoiding unnecessary checks for paths that don't require it.