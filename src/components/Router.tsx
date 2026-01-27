import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import UploadPage from '@/components/pages/UploadPage';
import BuilderPage from '@/components/pages/BuilderPage';
import PreviewPage from '@/components/pages/PreviewPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Layout component that includes ScrollToTop, Header, and Footer
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "upload",
        element: <UploadPage />,
        routeMetadata: {
          pageIdentifier: 'upload',
        },
      },
      {
        path: "builder",
        element: <BuilderPage />,
        routeMetadata: {
          pageIdentifier: 'builder',
        },
      },
      {
        path: "preview",
        element: <PreviewPage />,
        routeMetadata: {
          pageIdentifier: 'preview',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
