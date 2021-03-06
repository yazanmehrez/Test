import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app.routes';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './views/home/home.component';
import {HeaderComponent} from './views/header/header.component';
import {FooterComponent} from './views/footer/footer.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StartingComponent} from './views/home/starting/starting.component';
import {NavbarComponent} from './views/header/navbar/navbar.component';
import {LatestNewsComponent} from './views/home/latest-news/latest-news.component';
import {ServicesComponent} from './views/home/services/services.component';
import {MoreAboutDcaaComponent} from './views/home/more-about-dcaa/more-about-dcaa.component';
import {TrustedByComponent} from './views/home/trusted-by/trusted-by.component';
import {PartnersComponent} from './views/home/partners/partners.component';
import {XgalleryComponent} from './views/footer/xgallery/xgallery.component';
import {ServiceCategoriesComponent} from './views/home/services/service-categories/service-categories.component';
import {
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatSelectModule
} from '@angular/material';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AutosizeModule} from 'ngx-autosize';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import {NgxGalleryModule} from 'ngx-gallery';
import {Ng5SliderModule} from 'ng5-slider';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {JWTService} from './shared/utils/JWTtoken.service';
import {UserService} from './shared/services/user.service';
import {ConfigService} from './shared/utils/config.service';
import {TransporterService} from './shared/transporter/transporter';
import {XhrService} from './shared/services/xhr.service';
import {MainRestService} from './shared/API/main.rest';
import {ErrorDialogService} from './shared/error-dialog/errordialog.service';
import {AccountServiceService} from './views/Accounts/account-service.service';
import {InterceptorProvider} from './providers/interceptor/interceptor';
import {MainSharedModule} from './shared/modules/shared.module';
import {DialogModule} from './shared/modules/dialog.module';
import {ErrorDialogComponent} from './shared/error-dialog/errordialog.component';
import {EmailValidatorDirective} from './directives/email.validator.directive';
import {MyFocusDirective} from './directives/focus.directive';
import {LoginComponent} from './views/Accounts/login/login.component';
import {UserProfileComponent} from './views/Accounts/user-profile/user-profile.component';
import {AccountRootComponent} from './views/Accounts/account-root/account-root.component';
import {ChangePasswordComponent} from './views/Accounts/change-password/change-password.component';
import {ChangeEmailComponent} from './views/Accounts/change-email/change-email.component';
import {BlogShimmerComponent} from './Partials/blog-shimmer/blog-shimmer.component';
import {MobileNavbarComponent} from './views/header/navbar/mobile-navbar/mobile-navbar.component';
import {ClickOutSideElementDirective} from './directives/click-out-side-element.directive';
import { AboutUsComponent } from './views/pages/about-us/about-us.component';
import { PageBannerComponent } from './views/pages/shared/page-banner/page-banner.component';
import { PageContentComponent } from './views/pages/shared/page-content/page-content.component';
import { OverviewComponent } from './views/pages/about-us/overview/overview.component';
import { MostViewedServicesComponent } from './views/home/most-viewed-services/most-viewed-services.component';
import { DcaaSectorsComponent } from './views/pages/about-us/dcaa-sectors/dcaa-sectors.component';
import { DcaaStrategiesComponent } from './views/pages/about-us/dcaa-strategies/dcaa-strategies.component';
import { FaqComponent } from './views/pages/faq/faq.component';
import { OrganizationalStructureComponent } from './views/pages/about-us/organizational-structure/organizational-structure.component';
import { FeedbackComponent } from './views/pages/feedback/feedback.component';
import { ContactDgComponent } from './views/pages/feedback/contact-dg/contact-dg.component';
import { YourFeedbackComponent } from './views/pages/feedback/your-feedback/your-feedback.component';
import { StatisticsComponent } from './views/pages/statistics/statistics.component';
import { IssuedPermitsComponent } from './views/pages/statistics/issued-permits/issued-permits.component';
import { InspectionsComponent } from './views/pages/statistics/inspections/inspections.component';
import { SafetyInspectionsComponent } from './views/pages/statistics/safety-inspections/safety-inspections.component';
import {DateTimePickerComponent} from './components/date-time-picker/date-time-picker.component';
import { TextPagesComponent } from './views/pages/text-pages/text-pages.component';
import { DisclaimerComponent } from './views/pages/text-pages/disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './views/pages/text-pages/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './views/pages/text-pages/terms-conditions/terms-conditions.component';
import { PersonalDetailsComponent } from './views/Accounts/Forms/personal-details/personal-details.component';
import { ContactDetailsComponent } from './views/Accounts/Forms/contact-details/contact-details.component';
import { CompanyDetailsComponent } from './views/Accounts/Forms/company-details/company-details.component';
import { TokenResetComponent } from './views/pages/token-reset/token-reset.component';
import { EmailconfirmationComponent } from './Partials/emailconfirmation/emailconfirmation.component';
import { DocumentsDetailsComponent } from './views/Accounts/Forms/documents-details/documents-details.component';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import {NatureOfBusinessComponent} from './views/Accounts/nature-of-business/nature-of-business.component';
import { ViewRegisterAircraftComponent } from './views/Accounts/view-register-aircraft/view-register-aircraft.component';
import { RegisterAircraftComponent } from './views/Accounts/nature-of-business/register-aircraft/register-aircraft.component';
import { CompanyAssociationComponent } from './views/Accounts/company-association/company-association.component';
import { RegisterAgencyComponent } from './modals/register-agency/register-agency.component';
import { AutocompleteSearchComponent } from './components/autocomplete-search/autocomplete-search.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new MultiTranslateHttpLoader(httpClient, [
    {prefix: './assets/i18n/', suffix: '.json'}
  ]);
}

// using a separate function for AoT, that doesn't likes arrow syntax expressions in @NgModule
export function provideSwal() {
  return import('sweetalert2').then(({default: Swal}) => Swal.mixin({
    buttonsStyling: false,
    customClass: 'mysweet-modal-content',
    confirmButtonClass: 'btn btn-secondary clientApp-style m-lr-10',
    cancelButtonClass: 'btn btn-outline-danger clientApp-style m-lr-10'
  }));
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DialogModule, NgbModule, MatDialogModule, MatDividerModule, MatCheckboxModule, MatListModule,
    AppRoutingModule, HttpClientModule, FormsModule, MatSelectModule, DragDropModule, AutosizeModule,
    MatDatepickerModule, MatMomentDateModule, MatIconModule, MatProgressBarModule,
    NgxMatSelectSearchModule, MatFormFieldModule, RecaptchaModule, RecaptchaFormsModule,
    NgxGalleryModule, Ng5SliderModule, MatAutocompleteModule, MatInputModule,
    ReactiveFormsModule, MainSharedModule, SweetAlert2Module.forRoot({
      provideSwal
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    })
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    DateTimePickerComponent,
    HeaderComponent,
    FooterComponent,
    StartingComponent,
    NavbarComponent,
    LatestNewsComponent,
    ServicesComponent,
    ServiceCategoriesComponent,
    MoreAboutDcaaComponent,
    TrustedByComponent,
    PartnersComponent,
    XgalleryComponent,
    ErrorDialogComponent,
    TokenResetComponent, EmailconfirmationComponent,
    EmailValidatorDirective, MyFocusDirective, LoginComponent,
    UserProfileComponent, AccountRootComponent, ChangePasswordComponent, ChangeEmailComponent, NatureOfBusinessComponent, BlogShimmerComponent, MobileNavbarComponent, ClickOutSideElementDirective, AboutUsComponent, PageBannerComponent, PageContentComponent, OverviewComponent, MostViewedServicesComponent, DcaaSectorsComponent, DcaaStrategiesComponent, FaqComponent, OrganizationalStructureComponent, FeedbackComponent, ContactDgComponent, YourFeedbackComponent, StatisticsComponent, IssuedPermitsComponent, InspectionsComponent, SafetyInspectionsComponent, TextPagesComponent, DisclaimerComponent, PrivacyPolicyComponent, TermsConditionsComponent, PersonalDetailsComponent, ContactDetailsComponent, CompanyDetailsComponent, DocumentsDetailsComponent, ConfirmationModalComponent, ViewRegisterAircraftComponent, RegisterAircraftComponent, CompanyAssociationComponent, RegisterAgencyComponent, AutocompleteSearchComponent,
  ],
  providers: [ErrorDialogService, UserService, ConfigService, TransporterService, JWTService,
    XhrService, MainRestService, AccountServiceService, {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LcgZIwUAAAAAJATEUF_3dz2_1mMpUWwi27kZXGT',
      } as RecaptchaSettings,
    },
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true}],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
