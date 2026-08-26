import {
  useEffect,
  useState,
} from "react";
import {
  Navigate,
  Outlet,
} from "react-router-dom";

import {
  API_URL,
  clearAdminSession,
  getAdminToken,
} from "../../utils/adminAuth";

export default function AdminProtectedRoute() {
  const [loading, setLoading] =
    useState(true);

  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = getAdminToken();

      if (!token) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/admin/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Authentication failed"
          );
        }

        setAuthenticated(true);
      } catch (error) {
        console.error(
          "Admin authentication error:",
          error
        );

        clearAdminSession();
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111111]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#c4a454]" />

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            Checking Access
          </p>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return <Outlet />;
}