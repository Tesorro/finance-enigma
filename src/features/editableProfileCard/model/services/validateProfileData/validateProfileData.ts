import { ValidateProfileError } from '../../consts/consts';

import { Profile } from '@/entities/Profile';

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }
  const {
    firstname, lastname, age, country,
  } = profile;
  const errors: ValidateProfileError[] = [];
  if (!firstname || !lastname) {
    errors.push(ValidateProfileError.INCORRECT_USERDATA);
  }
  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileError.INCORRECT_AGE);
  }
  if (!country) {
    errors.push(ValidateProfileError.INCORRECT_COUNTRY);
  }
  return errors;
};
