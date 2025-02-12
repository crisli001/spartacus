/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Converter, Occ, B2BApprovalProcess } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class OccOrgUnitApprovalProcessNormalizer
  implements Converter<Occ.B2BApprovalProcessList, B2BApprovalProcess[]>
{
  constructor() {
    // Intentional empty constructor
  }

  convert(
    source: Occ.B2BApprovalProcessList,
    target?: B2BApprovalProcess[]
  ): B2BApprovalProcess[] {
    if (target === undefined) {
      target = [...(source.approvalProcesses as any)];
    }
    return target;
  }
}
