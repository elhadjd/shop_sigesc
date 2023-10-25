import { authMiddleware } from "@clerk/nextjs";
import { linksObj } from "./links";

export default authMiddleware({
  publicRoutes: [linksObj.about.href, linksObj.home.href],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};