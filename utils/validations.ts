import * as Yup from 'yup';

import type { ValidationSchemaObject } from '~/models/validation';
import { YupTypes } from '~/models/validation';

import regexUtil from '@/utils/regex';

const processFormatConstraint = (
  fieldValidation: any,
  format: any,
  errorField: any
) => {
  const labelText = errorField;

  return errorField
    ? fieldValidation[format](`${labelText} must be a valid ${format}`)
    : fieldValidation[format]();
};

const processMatchesConstraint = (fieldValidation: any, matchProps: any) => {
  const [pattern, message, formatOnly] = matchProps;
  return fieldValidation.matches(pattern, {
    message: formatOnly ? `Please use this format: ${message}` : message,
    excludeEmptyString: true,
  });
};

const processMaxConstraint = (fieldValidation: any, matchProps: any) => {
  const [max, message] = matchProps;
  if (typeof max == 'string') {
    return fieldValidation.min(
      Yup.ref(max),
      message || `Value should not exceed ${max}`
    );
  }

  return fieldValidation.max(max, message || `Value should not exceed ${max}`);
};

const processMinConstraint = (fieldValidation: any, matchProps: any) => {
  const [min, message] = matchProps;
  console.log('min', min);
  if (typeof min == 'string') {
    return fieldValidation.min(
      Yup.ref(min),
      message || `Value should not be less than ${min}`
    );
  }

  return fieldValidation.min(
    min,
    message || `Value should not be less than ${min}`
  );
};

const processOneOfConstraint = (fieldValidation: any, oneOfProps: any) => {
  const [basisField, errorMessage] = oneOfProps;
  return fieldValidation.oneOf([Yup.ref(basisField), undefined], errorMessage);
};

const processRequiredConstraint = (
  fieldValidation: any,
  field: any,
  errorTextFieldLabel: any
) => {
  let labelText: string | null = null;
  if (errorTextFieldLabel) {
    labelText = errorTextFieldLabel;
    return fieldValidation.required(`${labelText} is required`);
  }

  const fieldHasUnderScores = field.includes('_');

  if (fieldHasUnderScores) {
    labelText = field.replace(/_/g, ' ').trim();
    return fieldValidation.required(`${labelText} is required`);
  }

  return fieldValidation.required().label(field);
};

const processTestConstraint = (fieldValidation: any, testObject: any) =>
  fieldValidation.test(testObject);

const processTransformConstraint = (
  fieldValidation: any,
  transformFunction: any
) => fieldValidation.transform(transformFunction);

export const createValidationObjectSchema = (
  validationSchemaObject: ValidationSchemaObject,
  returnYupObject = true
) => {
  const validationObjectSchema = {} as any;

  Object.entries(validationSchemaObject).forEach(
    ([field, validationObject]) => {
      let fieldValidation = Yup[
        // eslint-disable-next-line
        (validationObject.type || YupTypes.STRING) as unknown as any
      ]()
        .label(field)
        .nullable(true)
        .typeError(
          `Value must be a ${validationObject.type || YupTypes.STRING}`
        );

      // REQUIRED
      if (validationObject.required) {
        fieldValidation = processRequiredConstraint(
          fieldValidation,
          field,
          validationObject.errorTextFieldLabel
        );
      }

      // FORMAT
      if (validationObject.format) {
        fieldValidation = processFormatConstraint(
          fieldValidation,
          validationObject.format,
          validationObject.errorTextFieldLabel ||
            field
              .split('_')
              .filter((word) => word !== 'id')
              .join(' ')
        );
      }

      // MATCHES
      if (validationObject.match) {
        fieldValidation = processMatchesConstraint(
          fieldValidation,
          validationObject.match
        );
      }

      // TRANSFORM
      if (validationObject.transform) {
        fieldValidation = processTransformConstraint(
          fieldValidation,
          validationObject.transform
        );
      }

      // MAX
      if (validationObject.max) {
        fieldValidation = processMaxConstraint(
          fieldValidation,
          validationObject.max
        );
      }

      // MIN
      if (validationObject.min) {
        fieldValidation = processMinConstraint(
          fieldValidation,
          validationObject.min
        );
      }

      // ONE OF
      if (validationObject.oneOf) {
        fieldValidation = processOneOfConstraint(
          fieldValidation,
          validationObject.oneOf
        );
      }

      // TEST
      if (validationObject.test) {
        fieldValidation = processTestConstraint(
          fieldValidation,
          validationObject.test
        );
      }

      validationObjectSchema[field] = fieldValidation;
    }
  );

  if (!returnYupObject) return validationObjectSchema;

  return Yup.object(validationObjectSchema);
};

export const formatMatches = {
  float: [regexUtil.float, 'Please enter a valid number'],
  alphabet: [regexUtil.alphabet, 'Please enter a valid string'],
  numerical: [regexUtil.numeric, 'Please enter a valid numerical value'],
  number: [regexUtil.numeric, 'Please enter a valid number'],
  phone: {
    generic: [regexUtil.phone.generic, 'XXXXXXXXXX', true],
    ph: [regexUtil.phone.php, 'XXXX XXX XXX', true],
  },
  mobile: {
    generic: [regexUtil.mobile.generic, 'XXXXXXXXXX', true],
    ph: [regexUtil.mobile.php, 'XXXX XXX XXX', true],
  },
  postalCode: {
    php: [regexUtil.postalCode.php, 'XXXX', true],
  },
  voip: [regexUtil.voip, 'XX XXXX XXXX', true],
};

export const reusables = {
  fields: {
    todayMinDate: [new Date(), "You can't use any date on or before today"],
  },
  forms: {
    accountDetails: {
      email: {
        format: 'email',
        required: true,
      },
      password: {
        required: true,
        match: [
          regexUtil.password,
          'The password does not match the requirements',
        ],
      },
      password_confirmation: {
        required: true,
        oneOf: ['password', 'Passwords must match'],
      },
    },
  },
};

export const transformations = {
  stringToDate: (curr: string) => {
    if (!curr || !curr.length) return new Date();

    return new Date(curr);
  },
  numberTo2Decimal: (number: string | number) => {
    const stringNumber = number.toString();

    return parseFloat(stringNumber).toFixed(2);
  },
};
