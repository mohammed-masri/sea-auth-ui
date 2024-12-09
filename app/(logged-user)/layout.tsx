import LoggedUserLayoutUI from "@/components/logged-user-layout-ui";
import MustAuth from "@/middleware/must-auth.middleware";
import RedirectToApp from "@/middleware/redirect-to-app.middleware";

export default function LoggedUserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MustAuth>
      <RedirectToApp>
        <LoggedUserLayoutUI>{children}</LoggedUserLayoutUI>
      </RedirectToApp>
    </MustAuth>
  );
}
