var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import 'rxjs/add/operator/delay';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NEWSLETTER_CONFIG } from '../config/token';
import { LocaleService } from 'kio-ng2-i18n';
import { Http } from '@angular/http';
var NewsletterFormComponent = /** @class */ (function () {
    function NewsletterFormComponent(formBuilder, http, localeService, newsletterConfig) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.http = http;
        this.localeService = localeService;
        this.newsletterConfig = newsletterConfig;
        this.sending = false;
        this.sent = false;
        this.formAction = this.newsletterConfig.formAction;
        this.formMethod = this.newsletterConfig.method;
        this.hidden = true;
        this.emailInput = this.buildFormGroup();
        this.localeSubscription = this.localeService.changes.startWith(this.localeService.current)
            .delay(5000)
            .subscribe(function (locale) {
            _this.updateLocale(locale);
        });
    }
    NewsletterFormComponent.prototype.onSubmit = function (event) {
        this.sendData();
    };
    NewsletterFormComponent.prototype.ngAfterViewInit = function () {
    };
    NewsletterFormComponent.prototype.buildFormGroup = function () {
        return this.formBuilder.group({
            email: [
                '',
                [Validators.required, Validators.minLength(2), Validators.email]
            ]
        });
    };
    NewsletterFormComponent.prototype.formatData = function () {
        var email = this.emailInput.value.email;
        return __assign({ email: email }, this.newsletterConfig.metadata, { locale: this.localeService.currentLocale });
    };
    NewsletterFormComponent.prototype.sendData = function () {
        var _this = this;
        this.sending = true;
        var data = this.formatData();
        //console.log('send data: ', data )
        this.http.post(this.newsletterConfig.formAction, data).subscribe(function (result) {
            _this.sending = false;
            _this.sent = true;
        }, function (error) {
            _this.sending = false;
            _this.error = "" + error;
        });
    };
    NewsletterFormComponent.prototype.updateLocale = function (locale) {
        if (this.newsletterConfig.locales) {
            this.hidden = this.newsletterConfig.locales.indexOf(locale) === -1;
        }
        else {
            this.hidden = false;
            this.emailInput = this.buildFormGroup();
        }
    };
    NewsletterFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'newsletter-form',
                    templateUrl: './newsletter-form.component.html'
                },] },
    ];
    /** @nocollapse */
    NewsletterFormComponent.ctorParameters = function () { return [
        { type: FormBuilder, },
        { type: Http, },
        { type: LocaleService, },
        { type: undefined, decorators: [{ type: Inject, args: [NEWSLETTER_CONFIG,] },] },
    ]; };
    return NewsletterFormComponent;
}());
export { NewsletterFormComponent };
//# sourceMappingURL=newsletter-form.component.js.map