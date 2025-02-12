/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { KeyboardFocusModule } from '../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { PopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    KeyboardFocusModule,
    IconModule,
    I18nModule,
  ],
  declarations: [PopoverDirective, PopoverComponent],
  exports: [PopoverDirective, PopoverComponent],
})
export class PopoverModule {}
