export enum YupTypes {
  MIXED = 'mixed',
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
  OBJECT = 'object',
  ARRAY = 'array',
}

export interface ValidationSchema {
  errorTextFieldLabel?: string;
  format?: string;
  match?: Array<string | RegExp | boolean>;
  oneOf?: string[];
  required?: boolean;
  type?: YupTypes;
  max?: Array<Date | string | number>;
  min?: Array<Date | string | number>;
  transform?: (curr: string) => Date | string | number;
  // eslint-disable-next-line
  test?: any;
}

export interface ValidationSchemaObject {
  [key: string]: ValidationSchema;
}
