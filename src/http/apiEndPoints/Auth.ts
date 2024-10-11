import { ARTIST_BASE_URl } from "../../components/utils/baseUrls";


export const AUTH_ENDPOINTS = {
  SignIn: `${ARTIST_BASE_URl}/login `,
  SignUp: `${ARTIST_BASE_URl}/register` ,
  LogOut: `${ARTIST_BASE_URl}/logout` ,
  ResetPassword: `${ARTIST_BASE_URl}/reset-password` ,
  ForgotPasswordOTP: `${ARTIST_BASE_URl}/forgot-password-otp` ,
  ValidateOTP: `${ARTIST_BASE_URl}/validate-otp` ,
  ResendOTP: `${ARTIST_BASE_URl}/resend-otp` ,
  CheckToken: `${ARTIST_BASE_URl}/get-artist`,
  BecomeAnArtist: `${ARTIST_BASE_URl}/become-artist` ,


};

// all the endpoints will be gonaa edit