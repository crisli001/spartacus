/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccUserProfileConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        userRegister: 'users',
        userForgotPassword: 'forgottenpasswordtokens',
        userRestoreToken: 'passwordRestoreToken',
        userResetPassword: 'resetpassword',
        userUpdateLoginId: 'users/${userId}/login',
        userUpdatePassword: 'users/${userId}/password',
        titles: 'titles',
      },
    },
  },
};
