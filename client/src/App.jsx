import { useEffect, useState } from "react";
import { AuthPage } from "./components/AuthPage";
import { MainLayout } from "./components/MainLayout";
import { useIndexedDB } from "./hooks/useIndexedDB";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { db } = useIndexedDB();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("stickyAiUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user:", e);
        localStorage.removeItem("stickyAiUser");
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!user ? (
        <AuthPage onAuthSuccess={setUser} />
      ) : (
        <MainLayout user={user} onLogout={() => setUser(null)} />
      )}
    </>
  );
}

export default App;
