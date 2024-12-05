import LoggedUserLayoutUI from "@/components/logged-user-layout-ui";
import MustAuth from "@/middleware/must-auth.middleware";

export default function LoggedUserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MustAuth>
      <LoggedUserLayoutUI>{children}</LoggedUserLayoutUI>
    </MustAuth>
  );
}
