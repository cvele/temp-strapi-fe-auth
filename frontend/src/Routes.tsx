import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import SignIn from "./pages/Security/SignIn/SignIn";
import SignUp from "./pages/Security/SignUp/SignUp";
import EmailVerification from "./pages/Security/EmailVerification/EmailVerification";
import ResendVerification from "./pages/Security/ResendVerification/ResendVerification";
import {PrivateRoute} from "./components/PrivateRoute";
import ForgotPassword from "./pages/Security/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Security/ResetPassword/ResetPassword";
import ResetPasswordLinkSent from "./pages/Security/ResetPasswordLinkSent/ResetPasswordLinkSent";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route path="/resend-verification" element={<ResendVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password/:code" element={<ResetPassword />} />
      <Route path="/reset-password-link-sent" element={<ResetPasswordLinkSent />} />
      <Route path="/profile" element={<PrivateRoute />} >
        <Route index element={<Profile />} />
      </Route>
    </Routes>
  );
};


export default AppRoutes;
