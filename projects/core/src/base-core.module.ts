/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CmsModule } from './cms/cms.module';
import { ConfigInitializerModule } from './config/config-initializer/config-initializer.module';
import { ConfigValidatorModule } from './config/config-validator/config-validator.module';
import { ConfigModule } from './config/config.module';
import { ErrorHandlingModule } from './error-handling';
import { FeaturesConfigModule } from './features-config/features-config.module';
import { GlobalMessageModule } from './global-message/global-message.module';
import { HttpModule } from './http/http.module';
import { I18nModule } from './i18n/i18n.module';
import { LazyLoadingModule } from './lazy-loading/lazy-loading.module';
import { BaseOccModule } from './occ/base-occ.module';
import { MetaTagConfigModule } from './occ/config/meta-tag-config.module';
import { ProcessModule } from './process/process.module';
import { SiteContextModule } from './site-context/site-context.module';
import { StateModule } from './state/state.module';
import { SiteThemeModule } from './site-theme/site-theme.module';

@NgModule({
  imports: [
    ErrorHandlingModule.forRoot(), // Import this module before any other interceptor to handle HTTP errors efficiently
    StateModule.forRoot(),
    ConfigModule.forRoot(),
    ConfigInitializerModule.forRoot(),
    ConfigValidatorModule.forRoot(),
    I18nModule.forRoot(),
    CmsModule.forRoot(),
    GlobalMessageModule.forRoot(),
    ProcessModule.forRoot(),
    FeaturesConfigModule.forRoot(),
    SiteContextModule.forRoot(), // should be imported after RouterModule.forRoot, because it overwrites UrlSerializer
    MetaTagConfigModule.forRoot(),
    BaseOccModule.forRoot(),
    LazyLoadingModule.forRoot(),
    HttpModule.forRoot(),
    SiteThemeModule.forRoot(),
  ],
})
export class BaseCoreModule {
  static forRoot(): ModuleWithProviders<BaseCoreModule> {
    return {
      ngModule: BaseCoreModule,
    };
  }
}
