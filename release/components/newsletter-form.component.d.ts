import 'rxjs/add/operator/delay';
import { AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NewsletterConfig, NewsletterData } from '../config/interfaces';
import { LocaleService } from 'kio-ng2-i18n';
import { Http } from '@angular/http';
export declare class NewsletterFormComponent implements AfterViewInit {
    protected formBuilder: FormBuilder;
    protected http: Http;
    protected localeService: LocaleService;
    protected newsletterConfig: NewsletterConfig;
    constructor(formBuilder: FormBuilder, http: Http, localeService: LocaleService, newsletterConfig: NewsletterConfig);
    sending: boolean;
    sent: boolean;
    formAction: string;
    formMethod: "POST" | "GET";
    hidden: boolean;
    email: string;
    error: string;
    emailInput: FormGroup;
    onSubmit(event: Event): void;
    ngAfterViewInit(): void;
    protected buildFormGroup(): FormGroup;
    protected formatData(): NewsletterData;
    protected sendData(): void;
    protected updateLocale(locale: string): void;
    private localeSubscription;
}
