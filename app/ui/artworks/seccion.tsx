import { useSession } from "next-auth/react";

interface UserData {
  name?: string;
  email?: string;
}

const useUserData = () => {
  const { data: session } = useSession();
  const userData = session?.user as UserData;
  return userData;
};

const MyComponent = () => {
  const userData = useUserData();

  return (
    <div>
      <h1>Welcome, {userData.name}</h1>
      <p>Email: {userData.email}</p>
    </div>
  );
};