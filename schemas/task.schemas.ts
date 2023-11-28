import regexUtil from '@/utils/regex';
import { createValidationObjectSchema } from '~/utils/validations';

export const TaskSchema = createValidationObjectSchema({
  email: {
    format: 'email',
    required: true,
  },
  password: {
    required: true,
    match: [
      regexUtil.password,
      'Please enter a valid password (i.e., Password123!)',
    ],
  },
});
