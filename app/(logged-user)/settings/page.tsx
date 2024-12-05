import { Paper } from "sea-react-components";
import ChangePasswordForm from "./change-password-form";

export default function Settings() {
  return (
    <div>
      <Paper>
        <div className="flex flex-col gap-10">
          <h3 className="text-3xl">Change your password</h3>
          <ChangePasswordForm />
        </div>
      </Paper>
    </div>
  );
}
