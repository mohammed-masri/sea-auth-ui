import AuthLayoutUI from "@/components/auth-layout-ui";
import RedirectIfAuth from "@/middleware/redirect-if-auth.middleware";

export default function LoggedUserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RedirectIfAuth>
      <AuthLayoutUI>{children}</AuthLayoutUI>;
    </RedirectIfAuth>
  );
}
