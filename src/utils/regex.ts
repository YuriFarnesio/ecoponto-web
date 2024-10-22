export const passwordRegex = // 8 letters, min 1 uppercase, min 1 lowercase, min 1 number, min 1 special character
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

export const phoneRegex = // +55 11 98888-7777
  /^(\+55)\s?(\(?[1-9][0-9]\)?)\s?((?:9\d|[2-9])\d{3})-?(\d{4})$/
