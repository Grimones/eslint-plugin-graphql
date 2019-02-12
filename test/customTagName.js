import schemaJson from './schema.json';

import {
  rule,
  ruleTester,
  parserOptions
} from './helpers';

const options = [
  { schemaJson, tagName: 'myGraphQLTag' },
];

ruleTester.run('custom tag name', rule, {
  valid: [
    {
      options,
      parserOptions,
      code: 'const x = myGraphQLTag`{ number }`',
    },
    {
      options,
      parserOptions,
      code: 'const x = /* GraphQL */ `{ number }`',
    },
  ],

  invalid: [
    {
      options,
      parserOptions,
      code: 'const x = myGraphQLTag``',
      errors: [{
        message: 'Syntax Error: Unexpected <EOF>',
        type: 'TaggedTemplateExpression'
      }]
    },
    {
      options,
      parserOptions,
      code: 'const x = myGraphQLTag`{ nonExistentQuery }`',
      errors: [{
        message: 'Cannot query field "nonExistentQuery" on type "Query".',
        type: 'TaggedTemplateExpression'
      }]
    },
    {
      options,
      parserOptions,
      code: 'const x = myGraphQLTag`{ ${x} }`',
      errors: [{
        type: 'Identifier',
        message: 'Invalid interpolation - fragment interpolation must occur outside of the brackets.'
      }]
    },
  ]
});
