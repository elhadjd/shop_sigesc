import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  // const {route} = useRedirectAfterLoginContext()
  return (
    <div className="flex justify-center">
      <SignIn/>
    </div>
  );
};

export default SignInPage;