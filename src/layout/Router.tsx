import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppShell } from 'layout/AppShell';

const Home = React.lazy(() => import('pages/home/HomePage'));
const Add = React.lazy(() => import('pages/add/AddPage'));
const Customers = React.lazy(() => import('pages/customers/CustomerPage'));
const Hugs = React.lazy(() => import('pages/hugs/HugsPage'));
const Tags = React.lazy(() => import('pages/tags/TagPage'));
const Users = React.lazy(() => import('pages/users/UserPage'));
const NotFound = React.lazy(() => import('pages/NotFound'));

export const Router: React.FC = () => (
  <React.Suspense fallback={null}>
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="add" element={<Add />} />
        <Route path="customers" element={<Customers />} />
        <Route path="hugs" element={<Hugs />} />
        <Route path="tags" element={<Tags />} />
        <Route path="users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </React.Suspense>
);
