import { useRedirectAfterLoginContext } from "@/app/contexts/redirectAfterLoginContext";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  const {route} = useRedirectAfterLoginContext()
  return (
    <div className="flex justify-center">
      <SignIn afterSignInUrl={route} />
    </div>
  );
};

export default SignInPage;