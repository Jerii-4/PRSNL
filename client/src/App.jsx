import { useEffect, useState } from "react";
import { MainLayout } from "./components/MainLayout";
import { useIndexedDB } from "./hooks/useIndexedDB";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { db } = useIndexedDB();

  useEffect(() => {
    // Always run with a default dev user (auth bypass)
    const defaultUser = {
      uid: "dev-user",
      email: "dev@example.com",
      name: "Dev User",
      token: "dev-token",
    };
    localStorage.setItem("stickyAiUser", JSON.stringify(defaultUser));
    localStorage.setItem("stickyAiToken", defaultUser.token);
    setUser(defaultUser);
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
    <MainLayout user={user} onLogout={() => setUser(null)} />
  );
}

export default App;
