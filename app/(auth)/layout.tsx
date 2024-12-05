import Footer from "@/components/footer";

import AuthPageBanner from "@/components/auth-page-banner";
import AlertHandler from "@/components/alert-handler";

export default function LoggedUserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Content Area */}
      <div className="flex flex-1">
        <div className="w-full md:w-7/12 overflow-y-auto py-10">
          <div className="flex flex-col gap-10">
            <div className="px-5">
              <AlertHandler />
            </div>

            {children}
          </div>
        </div>

        {/* Fixed Banner */}
        <div className="fixed w-5/12 right-0 top-0 h-[90%] hidden md:block">
          <AuthPageBanner />
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 right-0 w-full text-center">
        <Footer />
      </div>
    </div>
  );
}
