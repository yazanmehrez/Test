(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/animations'), require('@angular/cdk/a11y'), require('@angular/common'), require('rxjs'), require('rxjs/operators'), require('@angular/material/button'), require('@angular/material/icon')) :
    typeof define === 'function' && define.amd ? define('@ngmodule/material-carousel', ['exports', '@angular/core', '@angular/platform-browser', '@angular/animations', '@angular/cdk/a11y', '@angular/common', 'rxjs', 'rxjs/operators', '@angular/material/button', '@angular/material/icon'], factory) :
    (factory((global.ngmodule = global.ngmodule || {}, global.ngmodule['material-carousel'] = {}),global.ng.core,global.ng.platformBrowser,global.ng.animations,global.ng.cdk.a11y,global.ng.common,global.rxjs,global.rxjs.operators,global.ng.material.button,global.ng.material.icon));
}(this, (function (exports,core,platformBrowser,animations,a11y,common,rxjs,operators,button,icon) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MatCarouselSlideComponent = /** @class */ (function () {
        function MatCarouselSlideComponent(sanitizer) {
            this.sanitizer = sanitizer;
            this.overlayColor = '#00000040';
            this.hideOverlay = false;
            this.disabled = false; // implements ListKeyManagerOption
        }
        /**
         * @return {?}
         */
        MatCarouselSlideComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                if (this.image) {
                    this.image = this.sanitizer.bypassSecurityTrustStyle("url(\"" + this.image + "\")");
                }
            };
        MatCarouselSlideComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-carousel-slide',
                        template: "<ng-template>\n  <div class=\"carousel-slide\" [style.background-image]=\"image\">\n    <div class=\"carousel-slide-content\"><ng-content></ng-content></div>\n    <div\n      *ngIf=\"!hideOverlay\"\n      class=\"carousel-slide-overlay\"\n      [style.background-color]=\"overlayColor\"\n    ></div>\n  </div>\n</ng-template>\n",
                        styles: [".carousel-slide{width:100%;height:100%;position:absolute;z-index:auto;background-size:cover;background-repeat:no-repeat;background-position:center}.carousel-slide-overlay{width:100%;height:100%;position:absolute;z-index:auto}.carousel-slide-content{width:100%;height:100%;position:absolute;z-index:1}"]
                    }] }
        ];
        /** @nocollapse */
        MatCarouselSlideComponent.ctorParameters = function () {
            return [
                { type: platformBrowser.DomSanitizer }
            ];
        };
        MatCarouselSlideComponent.propDecorators = {
            image: [{ type: core.Input }],
            overlayColor: [{ type: core.Input }],
            hideOverlay: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            templateRef: [{ type: core.ViewChild, args: [core.TemplateRef,] }]
        };
        return MatCarouselSlideComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var Direction = {
        Left: 0,
        Right: 1,
        Index: 2,
    };
    Direction[Direction.Left] = 'Left';
    Direction[Direction.Right] = 'Right';
    Direction[Direction.Index] = 'Index';
    var MatCarouselComponent = /** @class */ (function () {
        function MatCarouselComponent(animationBuilder, renderer, platformId) {
            this.animationBuilder = animationBuilder;
            this.renderer = renderer;
            this.platformId = platformId;
            this.timings = '250ms ease-in';
            this.hideArrows = true;
            this.hideIndicators = true;
            this.color = 'accent';
            this.proportion = 25;
            this.useKeyboard = false;
            this.useMouseWheel = false;
            this.change = new core.EventEmitter();
            this._autoplay = true;
            this.autoplay$ = new rxjs.Subject();
            this.interval$ = new rxjs.BehaviorSubject(5000);
            this.slides$ = new rxjs.BehaviorSubject(null);
            this._maxWidth = 'auto';
            this.maxWidth$ = new rxjs.Subject();
            this._loop = true;
            this.loop$ = new rxjs.Subject();
            this._orientation = 'ltr';
            this.orientation$ = new rxjs.Subject();
            this.timerStop$ = new rxjs.Subject();
            this.destroy$ = new rxjs.Subject();
            this.playing = false;
        }
        Object.defineProperty(MatCarouselComponent.prototype, "autoplay", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this.autoplay$.next(value);
                this._autoplay = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCarouselComponent.prototype, "interval", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this.interval$.next(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCarouselComponent.prototype, "loop", {
            get: /**
             * @return {?}
             */ function () {
                return this._loop;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this.loop$.next(value);
                this._loop = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCarouselComponent.prototype, "maxWidth", {
            get: /**
             * @return {?}
             */ function () {
                return this._maxWidth;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._maxWidth = value;
                this.maxWidth$.next();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCarouselComponent.prototype, "slides", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this.slides$.next(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCarouselComponent.prototype, "orientation", {
            get: /**
             * @return {?}
             */ function () {
                return this._orientation;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this.orientation$.next(value);
                this._orientation = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCarouselComponent.prototype, "currentIndex", {
            get: /**
             * @return {?}
             */ function () {
                if (this.listKeyManager) {
                    return this.listKeyManager.activeItemIndex;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCarouselComponent.prototype, "currentSlide", {
            get: /**
             * @return {?}
             */ function () {
                if (this.listKeyManager) {
                    return this.listKeyManager.activeItem;
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        MatCarouselComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.listKeyManager = new a11y.ListKeyManager(this.slidesList)
                    .withVerticalOrientation(false)
                    .withHorizontalOrientation(this._orientation)
                    .withWrap(this._loop);
                this.listKeyManager.updateActiveItem(0);
                this.listKeyManager.change
                    .pipe(operators.takeUntil(this.destroy$))
                    .subscribe(function () { return _this.playAnimation(); });
            };
        /**
         * @return {?}
         */
        MatCarouselComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.autoplay$.pipe(operators.takeUntil(this.destroy$)).subscribe(function (value) {
                    _this.stopTimer();
                    _this.startTimer(value);
                });
                this.interval$.pipe(operators.takeUntil(this.destroy$)).subscribe(function (value) {
                    _this.stopTimer();
                    _this.resetTimer(value);
                    _this.startTimer(_this._autoplay);
                });
                this.maxWidth$
                    .pipe(operators.takeUntil(this.destroy$))
                    .subscribe(function () { return _this.slideTo(0); });
                this.loop$
                    .pipe(operators.takeUntil(this.destroy$))
                    .subscribe(function (value) { return _this.listKeyManager.withWrap(value); });
                this.orientation$
                    .pipe(operators.takeUntil(this.destroy$))
                    .subscribe(function (value) { return _this.listKeyManager.withHorizontalOrientation(value); });
                this.slides$
                    .pipe(operators.takeUntil(this.destroy$), operators.filter(function (value) { return value && value < _this.slidesList.length; }))
                    .subscribe(function (value) { return _this.resetSlides(value); });
            };
        /**
         * @return {?}
         */
        MatCarouselComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.destroy$.next();
                this.destroy$.complete();
            };
        /**
         * @return {?}
         */
        MatCarouselComponent.prototype.next = /**
         * @return {?}
         */
            function () {
                this.goto(Direction.Right);
            };
        /**
         * @return {?}
         */
        MatCarouselComponent.prototype.previous = /**
         * @return {?}
         */
            function () {
                this.goto(Direction.Left);
            };
        /**
         * @param {?} index
         * @return {?}
         */
        MatCarouselComponent.prototype.slideTo = /**
         * @param {?} index
         * @return {?}
         */
            function (index) {
                this.goto(Direction.Index, index);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        MatCarouselComponent.prototype.onKeyUp = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (this.useKeyboard && !this.playing) {
                    this.listKeyManager.onKeydown(event);
                }
            };
        /**
         * @return {?}
         */
        MatCarouselComponent.prototype.onMouseEnter = /**
         * @return {?}
         */
            function () {
                this.stopTimer();
            };
        /**
         * @return {?}
         */
        MatCarouselComponent.prototype.onMouseLeave = /**
         * @return {?}
         */
            function () {
                this.startTimer(this._autoplay);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        MatCarouselComponent.prototype.onMouseWheel = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (this.useMouseWheel) {
                    event.preventDefault(); // prevent window to scroll
                    // prevent window to scroll
                    /** @type {?} */
                    var Δ = Math.sign(event.wheelDelta);
                    if (Δ < 0) {
                        this.next();
                    }
                    else if (Δ > 0) {
                        this.previous();
                    }
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        MatCarouselComponent.prototype.onResize = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                // Reset carousel when window is resized
                // in order to avoid major glitches.
                this.slideTo(0);
            };
        /**
         * @param {?} event
         * @param {?} slideElem
         * @return {?}
         */
        MatCarouselComponent.prototype.onPan = /**
         * @param {?} event
         * @param {?} slideElem
         * @return {?}
         */
            function (event, slideElem) {
                /** @type {?} */
                var Δx = event.deltaX;
                if (this.isOutOfBounds()) {
                    Δx *= 0.2; // decelerate movement;
                }
                this.renderer.setStyle(slideElem, 'cursor', 'grabbing');
                this.renderer.setStyle(this.carouselList.nativeElement, 'transform', this.getTranslation(this.getOffset() + Δx));
            };
        /**
         * @param {?} event
         * @param {?} slideElem
         * @return {?}
         */
        MatCarouselComponent.prototype.onPanEnd = /**
         * @param {?} event
         * @param {?} slideElem
         * @return {?}
         */
            function (event, slideElem) {
                this.renderer.removeStyle(slideElem, 'cursor');
                if (!this.isOutOfBounds() &&
                    Math.abs(event.deltaX) > this.getWidth() * 0.25) {
                    if (event.deltaX <= 0) {
                        this.next();
                        return;
                    }
                    this.previous();
                    return;
                }
                this.playAnimation(); // slide back, don't change current index
            };
        /**
         * @private
         * @return {?}
         */
        MatCarouselComponent.prototype.isOutOfBounds = /**
         * @private
         * @return {?}
         */
            function () {
                /** @type {?} */
                var sign = this.orientation === 'rtl' ? -1 : 1;
                /** @type {?} */
                var left = sign *
                    (this.carouselList.nativeElement.getBoundingClientRect().left -
                        this.carouselList.nativeElement.offsetParent.getBoundingClientRect()
                            .left);
                /** @type {?} */
                var lastIndex = this.slidesList.length - 1;
                /** @type {?} */
                var width = -this.getWidth() * lastIndex;
                return ((this.listKeyManager.activeItemIndex === 0 && left >= 0) ||
                    (this.listKeyManager.activeItemIndex === lastIndex && left <= width));
            };
        /**
         * @private
         * @return {?}
         */
        MatCarouselComponent.prototype.isVisible = /**
         * @private
         * @return {?}
         */
            function () {
                if (!common.isPlatformBrowser(this.platformId)) {
                    return false;
                }
                /** @type {?} */
                var elem = this.carouselContainer.nativeElement;
                /** @type {?} */
                var docViewTop = window.pageYOffset;
                /** @type {?} */
                var docViewBottom = docViewTop + window.innerHeight;
                /** @type {?} */
                var elemOffset = elem.getBoundingClientRect();
                /** @type {?} */
                var elemTop = docViewTop + elemOffset.top;
                /** @type {?} */
                var elemBottom = elemTop + elemOffset.height;
                return elemBottom <= docViewBottom || elemTop >= docViewTop;
            };
        /**
         * @private
         * @return {?}
         */
        MatCarouselComponent.prototype.getOffset = /**
         * @private
         * @return {?}
         */
            function () {
                /** @type {?} */
                var offset = this.listKeyManager.activeItemIndex * this.getWidth();
                /** @type {?} */
                var sign = this.orientation === 'rtl' ? 1 : -1;
                return sign * offset;
            };
        /**
         * @private
         * @param {?} offset
         * @return {?}
         */
        MatCarouselComponent.prototype.getTranslation = /**
         * @private
         * @param {?} offset
         * @return {?}
         */
            function (offset) {
                return "translateX(" + offset + "px)";
            };
        /**
         * @private
         * @return {?}
         */
        MatCarouselComponent.prototype.getWidth = /**
         * @private
         * @return {?}
         */
            function () {
                return this.carouselContainer.nativeElement.clientWidth;
            };
        /**
         * @private
         * @param {?} direction
         * @param {?=} index
         * @return {?}
         */
        MatCarouselComponent.prototype.goto = /**
         * @private
         * @param {?} direction
         * @param {?=} index
         * @return {?}
         */
            function (direction, index) {
                if (!this.playing) {
                    /** @type {?} */
                    var rtl = this.orientation === 'rtl';
                    switch (direction) {
                        case Direction.Left:
                            return rtl
                                ? this.listKeyManager.setNextItemActive()
                                : this.listKeyManager.setPreviousItemActive();
                        case Direction.Right:
                            return rtl
                                ? this.listKeyManager.setPreviousItemActive()
                                : this.listKeyManager.setNextItemActive();
                        case Direction.Index:
                            return this.listKeyManager.setActiveItem(index);
                    }
                }
            };
        /**
         * @private
         * @return {?}
         */
        MatCarouselComponent.prototype.playAnimation = /**
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var translation = this.getTranslation(this.getOffset());
                /** @type {?} */
                var factory = this.animationBuilder.build(animations.animate(this.timings, animations.style({ transform: translation })));
                /** @type {?} */
                var animation = factory.create(this.carouselList.nativeElement);
                animation.onStart(function () { return (_this.playing = true); });
                animation.onDone(function () {
                    _this.change.emit(_this.currentIndex);
                    _this.playing = false;
                    _this.renderer.setStyle(_this.carouselList.nativeElement, 'transform', translation);
                    animation.destroy();
                });
                animation.play();
            };
        /**
         * @private
         * @param {?} slides
         * @return {?}
         */
        MatCarouselComponent.prototype.resetSlides = /**
         * @private
         * @param {?} slides
         * @return {?}
         */
            function (slides) {
                this.slidesList.reset(this.slidesList.toArray().slice(0, slides));
            };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        MatCarouselComponent.prototype.resetTimer = /**
         * @private
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.timer$ = rxjs.interval(value);
            };
        /**
         * @private
         * @param {?} autoplay
         * @return {?}
         */
        MatCarouselComponent.prototype.startTimer = /**
         * @private
         * @param {?} autoplay
         * @return {?}
         */
            function (autoplay) {
                var _this = this;
                if (!autoplay) {
                    return;
                }
                this.timer$
                    .pipe(operators.takeUntil(this.timerStop$), operators.takeUntil(this.destroy$), operators.filter(function () { return _this.isVisible(); }))
                    .subscribe(function () {
                    _this.listKeyManager.withWrap(true).setNextItemActive();
                    _this.listKeyManager.withWrap(_this.loop);
                });
            };
        /**
         * @private
         * @return {?}
         */
        MatCarouselComponent.prototype.stopTimer = /**
         * @private
         * @return {?}
         */
            function () {
                this.timerStop$.next();
            };
        MatCarouselComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-carousel',
                        template: "<div\n  #carouselContainer\n  class=\"carousel\"\n  tabindex=\"0\"\n  [style.max-width]=\"maxWidth\"\n>\n  <ul\n    #carouselList\n    class=\"carousel-list\"\n    role=\"listbox\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n  >\n    <li\n      #carouselSlide\n      *ngFor=\"let slide of slidesList\"\n      class=\"carousel-slide\"\n      role=\"option\"\n      >\n      <ng-container [ngTemplateOutlet]=\"slide.templateRef\"></ng-container>\n    </li>\n  </ul>\n\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == 0\"\n    (click)=\"previous()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowBack; else: defaultArrowBack\"\n      [svgIcon]=\"svgIconOverrides.arrowBack\"\n    ></mat-icon>\n    <ng-template #defaultArrowBack>\n      <mat-icon>arrow_back</mat-icon>\n    </ng-template>\n  </button>\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == slidesList.length - 1\"\n    (click)=\"next()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowForward; else: defaultArrowForward\"\n      [svgIcon]=\"svgIconOverrides.arrowForward\"\n    ></mat-icon>\n    <ng-template #defaultArrowForward>\n      <mat-icon>arrow_forward</mat-icon>\n    </ng-template>\n  </button>\n\n  <div\n    *ngIf=\"!hideIndicators\"\n    class=\"carousel-indicators\"\n    tabindex=\"-1\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n  >\n    <button\n      *ngFor=\"let slide of slidesList; let i = index\"\n      type=\"button\"\n      tabindex=\"-1\"\n      mat-mini-fab\n      [color]=\"color\"\n      [disabled]=\"i == currentIndex\"\n      (click)=\"slideTo(i)\"\n      (focus)=\"carouselContainer.focus()\"\n    ></button>\n  </div>\n</div>\n",

                    }] }
        ];
        /** @nocollapse */
        MatCarouselComponent.ctorParameters = function () {
            return [
                { type: animations.AnimationBuilder },
                { type: core.Renderer2 },
                { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
            ];
        };
        MatCarouselComponent.propDecorators = {
            timings: [{ type: core.Input }],
            svgIconOverrides: [{ type: core.Input }],
            autoplay: [{ type: core.Input }],
            interval: [{ type: core.Input }],
            loop: [{ type: core.Input }],
            hideArrows: [{ type: core.Input }],
            hideIndicators: [{ type: core.Input }],
            color: [{ type: core.Input }],
            maxWidth: [{ type: core.Input }],
            proportion: [{ type: core.Input }],
            slides: [{ type: core.Input }],
            useKeyboard: [{ type: core.Input }],
            useMouseWheel: [{ type: core.Input }],
            orientation: [{ type: core.Input }],
            change: [{ type: core.Output }],
            slidesList: [{ type: core.ContentChildren, args: [MatCarouselSlideComponent,] }],
            carouselContainer: [{ type: core.ViewChild, args: ['carouselContainer',] }],
            carouselList: [{ type: core.ViewChild, args: ['carouselList',] }],
            onKeyUp: [{ type: core.HostListener, args: ['keyup', ['$event'],] }],
            onMouseEnter: [{ type: core.HostListener, args: ['mouseenter',] }],
            onMouseLeave: [{ type: core.HostListener, args: ['mouseleave',] }],
            onMouseWheel: [{ type: core.HostListener, args: ['mousewheel', ['$event'],] }],
            onResize: [{ type: core.HostListener, args: ['window:resize', ['$event'],] }]
        };
        return MatCarouselComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MatCarouselModule = /** @class */ (function () {
        function MatCarouselModule() {
        }
        MatCarouselModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [MatCarouselComponent, MatCarouselSlideComponent],
                        imports: [common.CommonModule, button.MatButtonModule, icon.MatIconModule],
                        exports: [MatCarouselComponent, MatCarouselSlideComponent]
                    },] }
        ];
        return MatCarouselModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.MatCarouselComponent = MatCarouselComponent;
    exports.MatCarouselModule = MatCarouselModule;
    exports.MatCarouselSlideComponent = MatCarouselSlideComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdtb2R1bGUtbWF0ZXJpYWwtY2Fyb3VzZWwudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Abmdtb2R1bGUvbWF0ZXJpYWwtY2Fyb3VzZWwvbGliL2Nhcm91c2VsLXNsaWRlL2Nhcm91c2VsLXNsaWRlLmNvbXBvbmVudC50cyIsIm5nOi8vQG5nbW9kdWxlL21hdGVyaWFsLWNhcm91c2VsL2xpYi9jYXJvdXNlbC5jb21wb25lbnQudHMiLCJuZzovL0BuZ21vZHVsZS9tYXRlcmlhbC1jYXJvdXNlbC9saWIvY2Fyb3VzZWwubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpc3RLZXlNYW5hZ2VyT3B0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlU3R5bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgTWF0Q2Fyb3VzZWxTbGlkZSB9IGZyb20gJy4vY2Fyb3VzZWwtc2xpZGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtY2Fyb3VzZWwtc2xpZGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2Fyb3VzZWwtc2xpZGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYXJvdXNlbC1zbGlkZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcm91c2VsU2xpZGVDb21wb25lbnRcbiAgaW1wbGVtZW50cyBMaXN0S2V5TWFuYWdlck9wdGlvbiwgTWF0Q2Fyb3VzZWxTbGlkZSwgT25Jbml0IHtcbiAgQElucHV0KCkgcHVibGljIGltYWdlOiBTYWZlU3R5bGU7XG4gIEBJbnB1dCgpIHB1YmxpYyBvdmVybGF5Q29sb3IgPSAnIzAwMDAwMDQwJztcbiAgQElucHV0KCkgcHVibGljIGhpZGVPdmVybGF5ID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlOyAvLyBpbXBsZW1lbnRzIExpc3RLZXlNYW5hZ2VyT3B0aW9uXG5cbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZikgcHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIFxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbWFnZSkge1xuICAgICAgdGhpcy5pbWFnZSA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgdXJsKFwiJHt0aGlzLmltYWdlfVwiKWApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgYW5pbWF0ZSwgc3R5bGUsIEFuaW1hdGlvbkJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IExpc3RLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaGVtZVBhbGV0dGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBpbnRlcnZhbCwgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWF0Q2Fyb3VzZWwsIE9yaWVudGF0aW9uLCBTdmdJY29uT3ZlcnJpZGVzIH0gZnJvbSAnLi9jYXJvdXNlbCc7XG5pbXBvcnQgeyBNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJvdXNlbC1zbGlkZS9jYXJvdXNlbC1zbGlkZS5jb21wb25lbnQnO1xuXG5lbnVtIERpcmVjdGlvbiB7XG4gIExlZnQsXG4gIFJpZ2h0LFxuICBJbmRleFxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtY2Fyb3VzZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2Fyb3VzZWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYXJvdXNlbC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcm91c2VsQ29tcG9uZW50XG4gIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgTWF0Q2Fyb3VzZWwsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHB1YmxpYyB0aW1pbmdzID0gJzI1MG1zIGVhc2UtaW4nO1xuICBASW5wdXQoKSBwdWJsaWMgc3ZnSWNvbk92ZXJyaWRlczogU3ZnSWNvbk92ZXJyaWRlcztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGF1dG9wbGF5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5hdXRvcGxheSQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5fYXV0b3BsYXkgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgaW50ZXJ2YWwodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuaW50ZXJ2YWwkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBsb29wKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9sb29wO1xuICB9XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbG9vcCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMubG9vcCQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5fbG9vcCA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KCkgcHVibGljIGhpZGVBcnJvd3MgPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgaGlkZUluZGljYXRvcnMgPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgY29sb3I6IFRoZW1lUGFsZXR0ZSA9ICdhY2NlbnQnO1xuXG4gIHB1YmxpYyBnZXQgbWF4V2lkdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4V2lkdGg7XG4gIH1cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtYXhXaWR0aCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbWF4V2lkdGggPSB2YWx1ZTtcbiAgICB0aGlzLm1heFdpZHRoJC5uZXh0KCk7XG4gIH1cblxuICBASW5wdXQoKSBwdWJsaWMgcHJvcG9ydGlvbiA9IDI1O1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgc2xpZGVzKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnNsaWRlcyQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKSBwdWJsaWMgdXNlS2V5Ym9hcmQgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIHVzZU1vdXNlV2hlZWwgPSBmYWxzZTtcblxuICBwdWJsaWMgZ2V0IG9yaWVudGF0aW9uKCk6IE9yaWVudGF0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb247XG4gIH1cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBvcmllbnRhdGlvbih2YWx1ZTogT3JpZW50YXRpb24pIHtcbiAgICB0aGlzLm9yaWVudGF0aW9uJC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLl9vcmllbnRhdGlvbiA9IHZhbHVlO1xuICB9XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgcHVibGljIGdldCBjdXJyZW50SW5kZXgoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5saXN0S2V5TWFuYWdlcikge1xuICAgICAgcmV0dXJuIHRoaXMubGlzdEtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG4gIHB1YmxpYyBnZXQgY3VycmVudFNsaWRlKCk6IE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQge1xuICAgIGlmICh0aGlzLmxpc3RLZXlNYW5hZ2VyKSB7XG4gICAgICByZXR1cm4gdGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50KSBwdWJsaWMgc2xpZGVzTGlzdDogUXVlcnlMaXN0PFxuICAgIE1hdENhcm91c2VsU2xpZGVDb21wb25lbnRcbiAgPjtcbiAgQFZpZXdDaGlsZCgnY2Fyb3VzZWxDb250YWluZXInKSBwcml2YXRlIGNhcm91c2VsQ29udGFpbmVyOiBFbGVtZW50UmVmPFxuICAgIEhUTUxEaXZFbGVtZW50XG4gID47XG4gIEBWaWV3Q2hpbGQoJ2Nhcm91c2VsTGlzdCcpIHByaXZhdGUgY2Fyb3VzZWxMaXN0OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgcHVibGljIGxpc3RLZXlNYW5hZ2VyOiBMaXN0S2V5TWFuYWdlcjxNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50PjtcblxuICBwcml2YXRlIF9hdXRvcGxheSA9IHRydWU7XG4gIHByaXZhdGUgYXV0b3BsYXkkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICBwcml2YXRlIGludGVydmFsJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPig1MDAwKTtcbiAgcHJpdmF0ZSBzbGlkZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KG51bGwpO1xuXG4gIHByaXZhdGUgX21heFdpZHRoID0gJ2F1dG8nO1xuICBwcml2YXRlIG1heFdpZHRoJCA9IG5ldyBTdWJqZWN0PG5ldmVyPigpO1xuXG4gIHByaXZhdGUgX2xvb3AgPSB0cnVlO1xuICBwcml2YXRlIGxvb3AkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICBwcml2YXRlIF9vcmllbnRhdGlvbjogT3JpZW50YXRpb24gPSAnbHRyJztcbiAgcHJpdmF0ZSBvcmllbnRhdGlvbiQgPSBuZXcgU3ViamVjdDxPcmllbnRhdGlvbj4oKTtcblxuICBwcml2YXRlIHRpbWVyJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBwcml2YXRlIHRpbWVyU3RvcCQgPSBuZXcgU3ViamVjdDxuZXZlcj4oKTtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8bmV2ZXI+KCk7XG4gIHByaXZhdGUgcGxheWluZyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYW5pbWF0aW9uQnVpbGRlcjogQW5pbWF0aW9uQnVpbGRlcixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkXG4gICkge31cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMubGlzdEtleU1hbmFnZXIgPSBuZXcgTGlzdEtleU1hbmFnZXIodGhpcy5zbGlkZXNMaXN0KVxuICAgICAgLndpdGhWZXJ0aWNhbE9yaWVudGF0aW9uKGZhbHNlKVxuICAgICAgLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24odGhpcy5fb3JpZW50YXRpb24pXG4gICAgICAud2l0aFdyYXAodGhpcy5fbG9vcCk7XG5cbiAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oMCk7XG4gICAgdGhpcy5saXN0S2V5TWFuYWdlci5jaGFuZ2VcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5wbGF5QW5pbWF0aW9uKCkpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmF1dG9wbGF5JC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgICB0aGlzLnN0YXJ0VGltZXIodmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbnRlcnZhbCQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgdGhpcy5yZXNldFRpbWVyKHZhbHVlKTtcbiAgICAgIHRoaXMuc3RhcnRUaW1lcih0aGlzLl9hdXRvcGxheSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1heFdpZHRoJFxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNsaWRlVG8oMCkpO1xuXG4gICAgdGhpcy5sb29wJFxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLmxpc3RLZXlNYW5hZ2VyLndpdGhXcmFwKHZhbHVlKSk7XG5cbiAgICB0aGlzLm9yaWVudGF0aW9uJFxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLmxpc3RLZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24odmFsdWUpKTtcblxuICAgIHRoaXMuc2xpZGVzJFxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgZmlsdGVyKHZhbHVlID0+IHZhbHVlICYmIHZhbHVlIDwgdGhpcy5zbGlkZXNMaXN0Lmxlbmd0aClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5yZXNldFNsaWRlcyh2YWx1ZSkpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZXh0KCk6IHZvaWQge1xuICAgIHRoaXMuZ290byhEaXJlY3Rpb24uUmlnaHQpO1xuICB9XG5cbiAgcHVibGljIHByZXZpb3VzKCk6IHZvaWQge1xuICAgIHRoaXMuZ290byhEaXJlY3Rpb24uTGVmdCk7XG4gIH1cblxuICBwdWJsaWMgc2xpZGVUbyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5nb3RvKERpcmVjdGlvbi5JbmRleCwgaW5kZXgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25LZXlVcChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnVzZUtleWJvYXJkICYmICF0aGlzLnBsYXlpbmcpIHtcbiAgICAgIHRoaXMubGlzdEtleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgcHVibGljIG9uTW91c2VFbnRlcigpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BUaW1lcigpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIHB1YmxpYyBvbk1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5zdGFydFRpbWVyKHRoaXMuX2F1dG9wbGF5KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNld2hlZWwnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25Nb3VzZVdoZWVsKGV2ZW50OiBNb3VzZVdoZWVsRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51c2VNb3VzZVdoZWVsKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IHdpbmRvdyB0byBzY3JvbGxcbiAgICAgIGNvbnN0IMOOwpQgPSBNYXRoLnNpZ24oZXZlbnQud2hlZWxEZWx0YSk7XG5cbiAgICAgIGlmICjDjsKUIDwgMCkge1xuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgIH0gZWxzZSBpZiAow47ClCA+IDApIHtcbiAgICAgICAgdGhpcy5wcmV2aW91cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25SZXNpemUoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgLy8gUmVzZXQgY2Fyb3VzZWwgd2hlbiB3aW5kb3cgaXMgcmVzaXplZFxuICAgIC8vIGluIG9yZGVyIHRvIGF2b2lkIG1ham9yIGdsaXRjaGVzLlxuICAgIHRoaXMuc2xpZGVUbygwKTtcbiAgfVxuXG4gIHB1YmxpYyBvblBhbihldmVudDogYW55LCBzbGlkZUVsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgbGV0IMOOwpR4ID0gZXZlbnQuZGVsdGFYO1xuICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgw47ClHggKj0gMC4yOyAvLyBkZWNlbGVyYXRlIG1vdmVtZW50O1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoc2xpZGVFbGVtLCAnY3Vyc29yJywgJ2dyYWJiaW5nJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAndHJhbnNmb3JtJyxcbiAgICAgIHRoaXMuZ2V0VHJhbnNsYXRpb24odGhpcy5nZXRPZmZzZXQoKSArIMOOwpR4KVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgb25QYW5FbmQoZXZlbnQ6IGFueSwgc2xpZGVFbGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUoc2xpZGVFbGVtLCAnY3Vyc29yJyk7XG5cbiAgICBpZiAoXG4gICAgICAhdGhpcy5pc091dE9mQm91bmRzKCkgJiZcbiAgICAgIE1hdGguYWJzKGV2ZW50LmRlbHRhWCkgPiB0aGlzLmdldFdpZHRoKCkgKiAwLjI1XG4gICAgKSB7XG4gICAgICBpZiAoZXZlbnQuZGVsdGFYIDw9IDApIHtcbiAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJldmlvdXMoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wbGF5QW5pbWF0aW9uKCk7IC8vIHNsaWRlIGJhY2ssIGRvbid0IGNoYW5nZSBjdXJyZW50IGluZGV4XG4gIH1cblxuICBwcml2YXRlIGlzT3V0T2ZCb3VuZHMoKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgc2lnbiA9IHRoaXMub3JpZW50YXRpb24gPT09ICdydGwnID8gLTEgOiAxO1xuICAgIGNvbnN0IGxlZnQgPVxuICAgICAgc2lnbiAqXG4gICAgICAodGhpcy5jYXJvdXNlbExpc3QubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC1cbiAgICAgICAgdGhpcy5jYXJvdXNlbExpc3QubmF0aXZlRWxlbWVudC5vZmZzZXRQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAubGVmdCk7XG4gICAgY29uc3QgbGFzdEluZGV4ID0gdGhpcy5zbGlkZXNMaXN0Lmxlbmd0aCAtIDE7XG4gICAgY29uc3Qgd2lkdGggPSAtdGhpcy5nZXRXaWR0aCgpICogbGFzdEluZGV4O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLmxpc3RLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gMCAmJiBsZWZ0ID49IDApIHx8XG4gICAgICAodGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggPT09IGxhc3RJbmRleCAmJiBsZWZ0IDw9IHdpZHRoKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGlzVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBlbGVtID0gdGhpcy5jYXJvdXNlbENvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGRvY1ZpZXdUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgY29uc3QgZG9jVmlld0JvdHRvbSA9IGRvY1ZpZXdUb3AgKyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgY29uc3QgZWxlbU9mZnNldCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgZWxlbVRvcCA9IGRvY1ZpZXdUb3AgKyBlbGVtT2Zmc2V0LnRvcDtcbiAgICBjb25zdCBlbGVtQm90dG9tID0gZWxlbVRvcCArIGVsZW1PZmZzZXQuaGVpZ2h0O1xuXG4gICAgcmV0dXJuIGVsZW1Cb3R0b20gPD0gZG9jVmlld0JvdHRvbSB8fCBlbGVtVG9wID49IGRvY1ZpZXdUb3A7XG4gIH1cblxuICBwcml2YXRlIGdldE9mZnNldCgpOiBudW1iZXIge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMubGlzdEtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ICogdGhpcy5nZXRXaWR0aCgpO1xuICAgIGNvbnN0IHNpZ24gPSB0aGlzLm9yaWVudGF0aW9uID09PSAncnRsJyA/IDEgOiAtMTtcbiAgICByZXR1cm4gc2lnbiAqIG9mZnNldDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VHJhbnNsYXRpb24ob2Zmc2V0OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgdHJhbnNsYXRlWCgke29mZnNldH1weClgO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNhcm91c2VsQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIH1cblxuICBwcml2YXRlIGdvdG8oZGlyZWN0aW9uOiBEaXJlY3Rpb24sIGluZGV4PzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnBsYXlpbmcpIHtcbiAgICAgIGNvbnN0IHJ0bCA9IHRoaXMub3JpZW50YXRpb24gPT09ICdydGwnO1xuXG4gICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICBjYXNlIERpcmVjdGlvbi5MZWZ0OlxuICAgICAgICAgIHJldHVybiBydGxcbiAgICAgICAgICAgID8gdGhpcy5saXN0S2V5TWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpXG4gICAgICAgICAgICA6IHRoaXMubGlzdEtleU1hbmFnZXIuc2V0UHJldmlvdXNJdGVtQWN0aXZlKCk7XG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLlJpZ2h0OlxuICAgICAgICAgIHJldHVybiBydGxcbiAgICAgICAgICAgID8gdGhpcy5saXN0S2V5TWFuYWdlci5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKVxuICAgICAgICAgICAgOiB0aGlzLmxpc3RLZXlNYW5hZ2VyLnNldE5leHRJdGVtQWN0aXZlKCk7XG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLkluZGV4OlxuICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RLZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oaW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcGxheUFuaW1hdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHRoaXMuZ2V0VHJhbnNsYXRpb24odGhpcy5nZXRPZmZzZXQoKSk7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuYW5pbWF0aW9uQnVpbGRlci5idWlsZChcbiAgICAgIGFuaW1hdGUodGhpcy50aW1pbmdzLCBzdHlsZSh7IHRyYW5zZm9ybTogdHJhbnNsYXRpb24gfSkpXG4gICAgKTtcbiAgICBjb25zdCBhbmltYXRpb24gPSBmYWN0b3J5LmNyZWF0ZSh0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50KTtcblxuICAgIGFuaW1hdGlvbi5vblN0YXJ0KCgpID0+ICh0aGlzLnBsYXlpbmcgPSB0cnVlKSk7XG4gICAgYW5pbWF0aW9uLm9uRG9uZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuY3VycmVudEluZGV4KTtcbiAgICAgIHRoaXMucGxheWluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgdGhpcy5jYXJvdXNlbExpc3QubmF0aXZlRWxlbWVudCxcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgIHRyYW5zbGF0aW9uXG4gICAgICApO1xuICAgICAgYW5pbWF0aW9uLmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgICBhbmltYXRpb24ucGxheSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFNsaWRlcyhzbGlkZXM6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2xpZGVzTGlzdC5yZXNldCh0aGlzLnNsaWRlc0xpc3QudG9BcnJheSgpLnNsaWNlKDAsIHNsaWRlcykpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFRpbWVyKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnRpbWVyJCA9IGludGVydmFsKHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhcnRUaW1lcihhdXRvcGxheTogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghYXV0b3BsYXkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnRpbWVyJFxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLnRpbWVyU3RvcCQpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLmlzVmlzaWJsZSgpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubGlzdEtleU1hbmFnZXIud2l0aFdyYXAodHJ1ZSkuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgdGhpcy5saXN0S2V5TWFuYWdlci53aXRoV3JhcCh0aGlzLmxvb3ApO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0b3BUaW1lcigpOiB2b2lkIHtcbiAgICB0aGlzLnRpbWVyU3RvcCQubmV4dCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5cbmltcG9ydCB7IE1hdENhcm91c2VsQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJvdXNlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudCB9IGZyb20gJy4vY2Fyb3VzZWwtc2xpZGUvY2Fyb3VzZWwtc2xpZGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTWF0Q2Fyb3VzZWxDb21wb25lbnQsIE1hdENhcm91c2VsU2xpZGVDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0Q2Fyb3VzZWxDb21wb25lbnQsIE1hdENhcm91c2VsU2xpZGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcm91c2VsTW9kdWxlIHt9XG4iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiRG9tU2FuaXRpemVyIiwiSW5wdXQiLCJWaWV3Q2hpbGQiLCJUZW1wbGF0ZVJlZiIsIkV2ZW50RW1pdHRlciIsIlN1YmplY3QiLCJCZWhhdmlvclN1YmplY3QiLCJMaXN0S2V5TWFuYWdlciIsInRha2VVbnRpbCIsImZpbHRlciIsImlzUGxhdGZvcm1Ccm93c2VyIiwiYW5pbWF0ZSIsInN0eWxlIiwiaW50ZXJ2YWwiLCJBbmltYXRpb25CdWlsZGVyIiwiUmVuZGVyZXIyIiwiSW5qZWN0IiwiUExBVEZPUk1fSUQiLCJPdXRwdXQiLCJDb250ZW50Q2hpbGRyZW4iLCJIb3N0TGlzdGVuZXIiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIk1hdEJ1dHRvbk1vZHVsZSIsIk1hdEljb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTtRQXlCRSxtQ0FBbUIsU0FBdUI7WUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztZQU4xQixpQkFBWSxHQUFHLFdBQVcsQ0FBQztZQUMzQixnQkFBVyxHQUFHLEtBQUssQ0FBQztZQUNwQixhQUFRLEdBQUcsS0FBSyxDQUFDO1NBS2hDOzs7O1FBRU0sNENBQVE7OztZQUFmO2dCQUNFLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsV0FBUSxJQUFJLENBQUMsS0FBSyxRQUFJLENBQUMsQ0FBQztpQkFDOUU7YUFDRjs7b0JBckJGQSxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjt3QkFDOUIsbVZBQThDOztxQkFFL0M7Ozs7O3dCQVJRQyw0QkFBWTs7Ozs0QkFXbEJDLFVBQUs7bUNBQ0xBLFVBQUs7a0NBQ0xBLFVBQUs7K0JBQ0xBLFVBQUs7a0NBRUxDLGNBQVMsU0FBQ0MsZ0JBQVc7O1FBVXhCLGdDQUFDO0tBdEJEOzs7Ozs7QUNaQTs7UUE0QkUsT0FBSTtRQUNKLFFBQUs7UUFDTCxRQUFLOzs7OztBQUdQO1FB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
