// có cách export như thế này 
// const LOCATORS = {
//     username: '#username',
//     password: '#password',
//     signInButton: 'Sign in',
//    //passwordLocator : 'xpath=//input[contains(@id,"password")]',

// };
// module.exports = LOCATORS;

//nên viết như này
export const usernameloc = '#username'
export const passwordloc = '#password'
export const signInButtonloc = '//button[contains(@data-test,"signin-submit")]'


