/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit, Optional, inject } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import {
  ServiceDateTime,
  CheckoutServiceSchedulePickerService,
} from '@spartacus/s4-service/root';
import { Card, OutletContextData } from '@spartacus/storefront';
import { Observable, Subscription, map } from 'rxjs';

@Component({
  selector: 'cx-card-service-details',
  templateUrl: './service-details-card.component.html',
})
export class ServiceDetailsCardComponent implements OnInit, OnDestroy {
  protected translationService = inject(TranslationService);
  protected checkoutServiceSchedulePickerService = inject(
    CheckoutServiceSchedulePickerService
  );
  @Optional() protected orderOutlet = inject(OutletContextData);
  protected subscription = new Subscription();
  order: Order;
  ngOnInit(): void {
    if (this.orderOutlet?.context$) {
      this.subscription.add(
        this.orderOutlet.context$.subscribe(
          (context) => (this.order = context?.item)
        )
      );
    }
  }

  getServiceDetailsCard(
    scheduledAt: ServiceDateTime | undefined
  ): Observable<Card> {
    return this.translationService
      .translate('serviceOrderCheckout.serviceDetails')
      .pipe(
        map((textTitle) => {
          if (scheduledAt) {
            scheduledAt =
              this.checkoutServiceSchedulePickerService.convertDateTimeToReadableString(
                scheduledAt
              );
          }
          return {
            title: textTitle,
            textBold: scheduledAt?.split(',')[0],
            text: [scheduledAt?.split(',')[1].trim() ?? ''],
          };
        })
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}