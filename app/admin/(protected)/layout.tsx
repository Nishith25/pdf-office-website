import {
  redirect,
} from "next/navigation";

import AdminShell from "../../../components/admin/AdminShell";

import {
  getCurrentAdmin,
} from "../../../lib/auth/current-admin";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const admin =
    await getCurrentAdmin();

  if (!admin) {
    redirect(
      "/admin/login",
    );
  }

  return (
    <AdminShell
      adminEmail={
        admin.email
      }
    >
      {children}
    </AdminShell>
  );
}