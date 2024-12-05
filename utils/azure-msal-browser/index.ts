import { EnvConfig } from "@/config";
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: EnvConfig.MICROSOFT_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${EnvConfig.MICROSOFT_TENANT_ID}`,
    redirectUri: EnvConfig.MICROSOFT_REDIRECT_URI,
  },
};

const MSALInstance = new PublicClientApplication(msalConfig);

export default MSALInstance;
