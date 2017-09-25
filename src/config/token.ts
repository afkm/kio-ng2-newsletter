import { InjectionToken } from '@angular/core'
import { NewsletterConfig } from './interfaces'

export const NEWSLETTER_CONFIG = new InjectionToken<NewsletterConfig>('newsletter_config')