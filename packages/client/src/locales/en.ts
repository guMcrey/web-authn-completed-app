export default {
  nav: {
    product: 'Product',
    example: 'Example',
    github: 'Github',
    userGuide: 'User Guide',
    deviceType: 'Device Type',
  },
  product: {
    title: 'WebAuthn Completed App',
    subtitle1: 'A complete application based on',
    subtitle2:
      'It is a new way to sign in that works completely without passwords, it allows websites to authenticate users using built-in authenticators such as Apple TouchID and Windows Hello or mobile device biometric sensor; and provide users with a more secure and easy login experience.',
    tryDemo: 'Try the Demo',
    viewGithub: 'View on Github',
    and: 'and',
    users: 'users have experienced it',
    workBestTitle: 'Working with the best',
  },
  login: {
    howToUse: 'How to use the demo?',
    learnMore: 'Learn More',
    signIn: 'Sign in',
    signInWithPasskey: 'Sign in with passkey',
    or: 'or',
    username: 'Username',
    usernamePlaceholder: 'Enter your username',
    usernameRequired: 'Username is required',
    usernameValidate:
      'Please enter 4-8 characters starting with a letter and consisting of letters, numbers and underscores',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    passwordRequired: 'Password is required',
    passwordValidate:
      'Please enter 6-10 characters starting with a letter and consisting of letters, numbers and underscores',
    tips:
      'Feel free to enter a username and password that matches the rules, we will register and log in for you',
    usernamePrompt:
      'Please enter the username of the WebAuthn device that has been added. If not, please log in with the username and password first.',
    noPasskey: 'No passkey',
    noPassKeyDescription:
      "You don't have a passkey yet. Please log in with the username and password first, and then try again after add the WebAuthn device.",
  },
  home: {
    hello: 'Hello, ',
    cardTitle: 'Passwordless Authentication',
    cardSubtitle: 'Follow the',
    cardSubtitle2:
      'standard to set up your account for passwordless authentication.',
    deviceTitle: 'The following devices are configured for your account',
    addDeviceBtn: 'Add WebAuthn Device',
    noData: 'No devices are configured',
    logout: 'Logout',
    noSupport:
      'This device or browser does not support User Verifying Platform Authenticator',
    noAdd: ", You can't add a WebAuthn device.",
  },
  message: {
    loginSuccess: 'Login successful',
    deleteSuccess: 'Delete completed',
    passkeyNotAvailableTitle: 'Passkey is not available',
    passkeyNotAvailableSubtitle:
      'Please log in with username and password, then add the webAuthn device again.',
    passkeyNotAvailableNoCatch:
      '( Passkey is unavailable because data may not exist due to clearing cache )',
    noPublicKey: 'No valid public key was matched',
    noPublicKeyDescription:
      'The public key associated with the user was not found. Unable to authenticate login now. Please log in with another method and register the passkey and try again.',
    confirmData: 'OK',
    logoutConfirm: 'Confirm to logout?',
    tips: 'Tips',
    confirmBtn: 'Confirm',
    cancelBtn: 'Cancel',
    deleteDescription:
      'Deleting the public key from the server. After deletion, you will not be able to use this passkey to log in. Do you want to continue?',
  },
}
