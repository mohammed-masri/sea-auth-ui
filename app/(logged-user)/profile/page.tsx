import { Paper } from "sea-react-components";
import UpdateProfileForm from "./update-profile-form";

export default function Profile() {
  return (
    <div>
      <Paper>
        <div className="flex flex-col gap-10">
          <h3 className="text-3xl">Update your profile</h3>
          <UpdateProfileForm />
        </div>
      </Paper>
    </div>
  );
}
