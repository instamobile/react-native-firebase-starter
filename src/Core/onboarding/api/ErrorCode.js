export const ErrorCode = {
  passwordInUse: 'passwordInUse',
  badEmailFormat: 'badEmailFormat',
  emailInUse: 'emailInUse',
  phoneInUse: 'phoneInUse',
  usernameInUse: 'usernameInUse',
  invalidPassword: 'invalidPassword',
  noUser: 'noUser',
  rateLimited: 'rateLimited',
  serverError: 'serverError',
  photoUploadFailed: 'photoUploadFailed',
  fbAuthCancelled: 'fbAuthCancelled',
  fbAuthFailed: 'fbAuthFailed',
  appleAuthFailed: 'appleAuthFailed',
  smsNotSent: 'smsNotSent',
  invalidSMSCode: 'invalidSMSCode',
  googleSigninFailed: 'googleSigninFailed',
  requiresRecentLogin: 'requiresRecentLogin',
}

export const localizedErrorMessage = (errorCode, localized) => {
  switch (errorCode) {
    case ErrorCode.passwordInUse:
      return localized(
        'The password is invalid or the user does not have a password',
      )
    case ErrorCode.badEmailFormat:
      return localized('The email address is badly formatted')
    case ErrorCode.emailInUse:
      return localized(
        'The email address is already in use by another account.',
      )
    case ErrorCode.phoneInUse:
      return localized(
        'The phone number is already registered. Please try to log in instead of signing up.',
      )
    case ErrorCode.usernameInUse:
      return localized('The username is already taken')
    case ErrorCode.invalidPassword:
      return localized('The given password is invalid')
    case ErrorCode.noUser:
      return localized(
        'There is no user record corresponding to this identifier. The user may have been deleted.',
      )
    case ErrorCode.rateLimited:
      return localized('Too many unsuccessful login attempts')
    case ErrorCode.photoUploadFailed:
      return localized('Profile photo failed to upload')
    case ErrorCode.smsNotSent:
      return localized(
        'The SMS was not sent due to an error. Please try again.',
      )
    case ErrorCode.invalidSMSCode:
      return localized('The verification code is invalid. Please try again.')
    case ErrorCode.googleSigninFailed:
      return localized('Google Sign In Failed')
    case ErrorCode.requiresRecentLogin:
      return localized('You may need to log out and login again')
    default:
      return localized('An error came up. Please try again. ' + errorCode)
  }
}
