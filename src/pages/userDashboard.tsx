import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import PersonalizedPlaylists from "../components/PersonalizedPlaylists";

const UserDashboard: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/signin/signinpage");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <PersonalizedPlaylists userId={user.id} />
    </div>
  );
};

export default UserDashboard;
