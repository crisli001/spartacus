import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CpqQuoteOfferComponent } from './cpq-quote-offer.component';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { Observable, ReplaySubject, of, take } from 'rxjs';
import { Component, Input } from '@angular/core';
import { LanguageService } from '@spartacus/core';
import { I18nTestingModule, TranslationService } from 'projects/core/src/i18n';
import { CpqDiscounts } from '@spartacus/cpq-quote/root';

class MockCartItemContext implements Partial<CartItemContext> {
  item$ = new ReplaySubject<OrderEntry>(1);
}
class MockTranslationService implements Partial<TranslationService> {
  translate(): Observable<string> {
    return of('');
  }
}
class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}
@Component({
  selector: 'cx-cpq-quote-offer',
  template: '',
})
class MockConfigureCpqDiscountsComponent {
  @Input() cartEntry: Partial<OrderEntry & Array<CpqDiscounts>>;
}

describe('CpqQuoteOfferComponent', () => {
  let component: CpqQuoteOfferComponent;
  let fixture: ComponentFixture<CpqQuoteOfferComponent>;
  let mockCartItemContext: MockCartItemContext;
  let htmlElem: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        CpqQuoteOfferComponent,
        MockConfigureCpqDiscountsComponent,
      ],
      providers: [
        { provide: CartItemContext, useClass: MockCartItemContext },
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CpqQuoteOfferComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    mockCartItemContext = TestBed.inject(CartItemContext) as any;

    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should expose orderEntry$', (done) => {
    const orderEntry: Partial<OrderEntry & Array<CpqDiscounts>> = {
      cpqDiscounts: [],
    };
    component.orderEntry$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(orderEntry);
      done();
    });

    mockCartItemContext.item$.next(orderEntry);
  });

  describe('estimated delivery date', () => {
    it('should not be displayed if model provides empty array', () => {
      mockCartItemContext.item$.next({
        cpqDiscounts: undefined,
      });

      // const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-offer').length).toBe(0);
    });
    it('should be displayed if model provides data', () => {
      mockCartItemContext.item$.next({
        cpqDiscounts: [
          {
            appliedValue: 1,
            isoCode: 2,
            value: 2,
          },
          {
            appliedValue: 1,
            isoCode: 2,
            value: 3,
          },
        ],
      });

      fixture.detectChanges();
      // const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-offer').length).toBe(2);
    });

    it('should set quoteDiscountData to null if cartItemContext is null', () => {
      (component as any).cartItemContext = null;
      component.ngOnInit();
      expect(component.quoteDiscountData).toBeNull();
    });
  });
});