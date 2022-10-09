export default class ValidateService {
  static validateEmail(email: string) {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(email);
  }

  static validatePassword(password: string) {
    if (password.length <= 8) {
      return {type: false, message: "Password is short"}
    }

    return {type: true}
  }

  static validateShotTitle(title: string) {
    if (title === '') return {type: false, message: "Title is required"}
    return {type: true, message: ""}
  }
}