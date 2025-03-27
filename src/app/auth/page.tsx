import InstallButton from "@/components/molecules/install-button";
import { Login } from "@/components/Organisms/auth";

export default function LoginPage() {
  return (
    <div className="max-h-screen max-w-screen flex items-center justify-center">
      <Login />
      <div className="absolute top-4 right-4">
        <InstallButton />
      </div>
    </div>
  );
}
