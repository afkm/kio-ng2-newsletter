import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/operator/delay'

import { Component, Inject, AfterViewInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, NavigationStart, NavigationEnd } from '@angular/router'
import { NEWSLETTER_CONFIG } from '../config/token'
import { NewsletterConfig, NewsletterData } from '../config/interfaces'
import { LocaleService } from 'kio-ng2-i18n'
import { Http, Headers } from '@angular/http'
import { NewsletterFormState } from '../enums/form-state.enum'

@Component({
  selector: 'newsletter-form',
  templateUrl: './newsletter-form.component.html'
})
export class NewsletterFormComponent implements AfterViewInit {

  constructor(
    protected formBuilder:FormBuilder,
    protected http:Http,
    protected localeService:LocaleService,
    @Inject(NEWSLETTER_CONFIG) protected newsletterConfig:NewsletterConfig,
    private router:Router
    ){

  }

  public sending:boolean=false
  public sent:boolean=false

  public formAction=this.newsletterConfig.formAction
  public formMethod=this.newsletterConfig.method
  public hidden:boolean=true
  public isNavigating:Observable<boolean>=this.router.events.filter ( (event:any) => {
    return ( event instanceof NavigationEnd ) || ( event instanceof NavigationStart )
  }  ).concatMap ( (event:NavigationStart|NavigationEnd) => {
    if ( event instanceof NavigationStart ) {
      return Observable.of(true)
    } else {
      return Observable.of(false).delay(500)
    }
  } )

  public email:string
  public error:string
  public emailInput=this.buildFormGroup()

  onSubmit ( event:Event ) {
    this.sendData()
  }

  ngAfterViewInit(){

  }

  protected buildFormGroup () {
    return this.formBuilder.group({
      email: [
        '', 
        [ Validators.required, Validators.minLength(2), Validators.email ]
      ]
    })    
  }

  protected formatData ():NewsletterData {
    const {
      email
    } = this.emailInput.value
    return {
      email ,
      ...this.newsletterConfig.metadata,
      locale: this.localeService.currentLocale
    }
  }

  protected sendData ( ) {
    this.sending = true
    const data = this.formatData()
    //console.log('send data: ', data )
    const h:Headers = new Headers()
    //h.append('Accept','q=0.8;application/json;q=0.9')
    h.append( 'Content-Type', 'application/x-www-form-urlencoded')
    this.http.post(this.newsletterConfig.formAction, data, {
      headers: h
    })
    .subscribe ( result => {
      this.sending = false
      this.sent = true
    }, error => {
      this.sending = false
      this.error = `${error}`
    } )
  }

  protected updateLocale ( locale:string ) {
    if ( this.newsletterConfig.locales ) {
      this.hidden = this.newsletterConfig.locales.indexOf(locale) === -1
    } else {
      this.hidden = false
      this.emailInput = this.buildFormGroup()
    }
  }


  private localeSubscription=this.localeService.changes.startWith(this.localeService.current)
  .delay(5000)
  .subscribe ( (locale:string) => {
    this.updateLocale(locale)
  } )

}
