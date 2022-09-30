import type { DidUri } from '@kiltprotocol/types';

import { CType } from '@kiltprotocol/core';

export const ctype = CType.fromSchema(
  {
    $id: 'kilt:ctype:0x6a98418680509604f9fec7f540e9f62d60a2d54d966db2f5a0067c45cd941607',
    type: 'object',
    title: 'zCloak Example',
    $schema: 'http://kilt-protocol.org/draft-01/ctype#',
    properties: {
      Name: {
        type: 'string'
      },
      Level: {
        type: 'integer'
      },
      Birthday: {
        type: 'integer'
      }
    }
  },
  'did:kilt:4osqyMJEMTWL75V5JkVqJWWzxkY8UC5y4aRMweRaGQjcZhfQ'
);
export const attester: DidUri = 'did:kilt:4osqyMJEMTWL75V5JkVqJWWzxkY8UC5y4aRMweRaGQjcZhfQ';