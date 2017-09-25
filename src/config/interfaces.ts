export interface LocalizedMap <T> {
  [key: string]: T
}

export interface NewsletterConfig {
  /**
   * url to processing script
   */
  formAction: string

  method:'POST'|'GET'

  metadata: {
    client: string
    digitorial: string
  }
  /**
   * if provided, the form is only displayed for when locale is matching one of these values 
   */
  locales?: string[]
}

export interface NewsletterData {
  client: string
  digitorial: string
  email: string
  locale: string
}