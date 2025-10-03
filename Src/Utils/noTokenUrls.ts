const noTokenUrls = [
    '/User/SendPhoneVerificationOtp',
    // Authentication endpoints (don't require token)
    '/api/Auth/send-registration-otp',
    '/api/Auth/validate-registration-otp',
    '/api/Auth/register',
    '/api/Auth/send-login-otp',
    '/api/Auth/login',
    '/api/Auth/login-with-otp',
    '/api/Auth/reset-password',
    '/api/Auth/forgot-password-otp',
    '/api/Auth/send-bank-otp',
    // Public browsing endpoints (accessible without login)
    '/api/HomeGame/groups',  // Get games list for browsing
    '/api/ResultHistory/all-result',  // Public results
    '/api/Game/by-typeid',  // Game data for browsing
    '/api/Game/by-typeid/quickythree',  // Quick3D game data
  ];
  
  export default noTokenUrls;