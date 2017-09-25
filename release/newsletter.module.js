import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NEWSLETTER_CONFIG } from './config/token';
import { KioNg2i18nModule } from 'kio-ng2-i18n';
import { HttpModule } from '@angular/http';
import { NewsletterFormComponent } from './components/newsletter-form.component';
var KioNg2NewsletterModule = /** @class */ (function () {
    function KioNg2NewsletterModule() {
    }
    KioNg2NewsletterModule.forRoot = function (config) {
        return {
            ngModule: KioNg2NewsletterModule,
            providers: [
                {
                    provide: NEWSLETTER_CONFIG,
                    useValue: config
                }
            ]
        };
    };
    KioNg2NewsletterModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    KioNg2NewsletterModule.ctorParameters = function () { return []; };
    return KioNg2NewsletterModule;
}());
export { KioNg2NewsletterModule };
//# sourceMappingURL=newsletter.module.js.map