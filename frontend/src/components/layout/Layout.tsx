import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar - Top */}
      <Navbar />

      {/* Sidebar - Left */}
      <Sidebar />

      {/* Main Content - Right of Sidebar */}
      <main className="ml-64 pt-26 p-8">
        {children}
      </main>
    </div>
  );
}

export default Layout;