import { NgModule, ModuleWithProviders } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { NewsletterConfig } from './config/interfaces'
import { NEWSLETTER_CONFIG } from './config/token'
import { KioNg2i18nModule } from 'kio-ng2-i18n'
import { HttpModule } from '@angular/http'

import { NewsletterFormComponent } from './components/newsletter-form.component'

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    KioNg2i18nModule
  ],
  declarations: [
    NewsletterFormComponent
  ],
  entryComponents: [
    NewsletterFormComponent
  ],
  exports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    NewsletterFormComponent
  ]
})
export class KioNg2NewsletterModule {

  public static forRoot ( config:NewsletterConfig ):ModuleWithProviders {
    return {
      ngModule: KioNg2NewsletterModule,
      providers: [
        {
          provide: NEWSLETTER_CONFIG,
          useValue: config
        }
      ]
    }
  }

}