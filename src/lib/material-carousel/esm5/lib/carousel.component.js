/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, style, AnimationBuilder } from '@angular/animations';
import { ListKeyManager } from '@angular/cdk/a11y';
import { isPlatformBrowser } from '@angular/common';
import { Component, ContentChildren, ElementRef, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID, QueryList, Renderer2, ViewChild } from '@angular/core';
import { interval, BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MatCarouselSlideComponent } from './carousel-slide/carousel-slide.component';
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
        this.proportion = 0;
        this.useKeyboard = false;
        this.useMouseWheel = false;
        this.change = new EventEmitter();
        this._autoplay = true;
        this.autoplay$ = new Subject();
        this.interval$ = new BehaviorSubject(5000);
        this.slides$ = new BehaviorSubject(null);
        this._maxWidth = 'auto';
        this.maxWidth$ = new Subject();
        this._loop = true;
        this.loop$ = new Subject();
        this._orientation = 'ltr';
        this.orientation$ = new Subject();
        this.timerStop$ = new Subject();
        this.destroy$ = new Subject();
        this.playing = false;
    }
    Object.defineProperty(MatCarouselComponent.prototype, "autoplay", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
         */
        function (value) {
            this.interval$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCarouselComponent.prototype, "loop", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loop;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.loop$.next(value);
            this._loop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCarouselComponent.prototype, "maxWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxWidth;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
         */
        function (value) {
            this.slides$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCarouselComponent.prototype, "orientation", {
        get: /**
         * @return {?}
         */
        function () {
            return this._orientation;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.orientation$.next(value);
            this._orientation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCarouselComponent.prototype, "currentIndex", {
        get: /**
         * @return {?}
         */
        function () {
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
         */
        function () {
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
        this.listKeyManager = new ListKeyManager(this.slidesList)
            .withVerticalOrientation(false)
            .withHorizontalOrientation(this._orientation)
            .withWrap(this._loop);
        this.listKeyManager.updateActiveItem(0);
        this.listKeyManager.change
            .pipe(takeUntil(this.destroy$))
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
        this.autoplay$.pipe(takeUntil(this.destroy$)).subscribe(function (value) {
            _this.stopTimer();
            _this.startTimer(value);
        });
        this.interval$.pipe(takeUntil(this.destroy$)).subscribe(function (value) {
            _this.stopTimer();
            _this.resetTimer(value);
            _this.startTimer(_this._autoplay);
        });
        this.maxWidth$
            .pipe(takeUntil(this.destroy$))
            .subscribe(function () { return _this.slideTo(0); });
        this.loop$
            .pipe(takeUntil(this.destroy$))
            .subscribe(function (value) { return _this.listKeyManager.withWrap(value); });
        this.orientation$
            .pipe(takeUntil(this.destroy$))
            .subscribe(function (value) { return _this.listKeyManager.withHorizontalOrientation(value); });
        this.slides$
            .pipe(takeUntil(this.destroy$), filter(function (value) { return value && value < _this.slidesList.length; }))
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
        if (!isPlatformBrowser(this.platformId)) {
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
        var factory = this.animationBuilder.build(animate(this.timings, style({ transform: translation })));
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
        this.timer$ = interval(value);
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
            .pipe(takeUntil(this.timerStop$), takeUntil(this.destroy$), filter(function () { return _this.isVisible(); }))
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
        { type: Component, args: [{
                    selector: 'mat-carousel',
                    template: "<div\n  #carouselContainer\n  class=\"carousel\"\n  tabindex=\"0\"\n  [style.max-width]=\"maxWidth\"\n>\n  <ul\n    #carouselList\n    class=\"carousel-list\"\n    role=\"listbox\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n  >\n    <li\n      #carouselSlide\n      *ngFor=\"let slide of slidesList\"\n      class=\"carousel-slide\"\n      role=\"option\"\n      >\n      <ng-container [ngTemplateOutlet]=\"slide.templateRef\"></ng-container>\n    </li>\n  </ul>\n\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == 0\"\n    (click)=\"previous()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowBack; else: defaultArrowBack\"\n      [svgIcon]=\"svgIconOverrides.arrowBack\"\n    ></mat-icon>\n    <ng-template #defaultArrowBack>\n      <mat-icon>arrow_back</mat-icon>\n    </ng-template>\n  </button>\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == slidesList.length - 1\"\n    (click)=\"next()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowForward; else: defaultArrowForward\"\n      [svgIcon]=\"svgIconOverrides.arrowForward\"\n    ></mat-icon>\n    <ng-template #defaultArrowForward>\n      <mat-icon>arrow_forward</mat-icon>\n    </ng-template>\n  </button>\n\n  <div\n    *ngIf=\"!hideIndicators\"\n    class=\"carousel-indicators\"\n    tabindex=\"-1\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n  >\n    <button\n      *ngFor=\"let slide of slidesList; let i = index\"\n      type=\"button\"\n      tabindex=\"-1\"\n      mat-mini-fab\n      [color]=\"color\"\n      [disabled]=\"i == currentIndex\"\n      (click)=\"slideTo(i)\"\n      (focus)=\"carouselContainer.focus()\"\n    ></button>\n  </div>\n</div>\n",

                }] }
    ];
    /** @nocollapse */
    MatCarouselComponent.ctorParameters = function () { return [
        { type: AnimationBuilder },
        { type: Renderer2 },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    MatCarouselComponent.propDecorators = {
        timings: [{ type: Input }],
        svgIconOverrides: [{ type: Input }],
        autoplay: [{ type: Input }],
        interval: [{ type: Input }],
        loop: [{ type: Input }],
        hideArrows: [{ type: Input }],
        hideIndicators: [{ type: Input }],
        color: [{ type: Input }],
        maxWidth: [{ type: Input }],
        proportion: [{ type: Input }],
        slides: [{ type: Input }],
        useKeyboard: [{ type: Input }],
        useMouseWheel: [{ type: Input }],
        orientation: [{ type: Input }],
        change: [{ type: Output }],
        slidesList: [{ type: ContentChildren, args: [MatCarouselSlideComponent,] }],
        carouselContainer: [{ type: ViewChild, args: ['carouselContainer',] }],
        carouselList: [{ type: ViewChild, args: ['carouselList',] }],
        onKeyUp: [{ type: HostListener, args: ['keyup', ['$event'],] }],
        onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
        onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }],
        onMouseWheel: [{ type: HostListener, args: ['mousewheel', ['$event'],] }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return MatCarouselComponent;
}());
export { MatCarouselComponent };
if (false) {
    /** @type {?} */
    MatCarouselComponent.prototype.timings;
    /** @type {?} */
    MatCarouselComponent.prototype.svgIconOverrides;
    /** @type {?} */
    MatCarouselComponent.prototype.hideArrows;
    /** @type {?} */
    MatCarouselComponent.prototype.hideIndicators;
    /** @type {?} */
    MatCarouselComponent.prototype.color;
    /** @type {?} */
    MatCarouselComponent.prototype.proportion;
    /** @type {?} */
    MatCarouselComponent.prototype.useKeyboard;
    /** @type {?} */
    MatCarouselComponent.prototype.useMouseWheel;
    /** @type {?} */
    MatCarouselComponent.prototype.change;
    /** @type {?} */
    MatCarouselComponent.prototype.slidesList;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.carouselContainer;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.carouselList;
    /** @type {?} */
    MatCarouselComponent.prototype.listKeyManager;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._autoplay;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.autoplay$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.interval$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.slides$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._maxWidth;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.maxWidth$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._loop;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.loop$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._orientation;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.orientation$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.timer$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.timerStop$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.playing;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.animationBuilder;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbW9kdWxlL21hdGVyaWFsLWNhcm91c2VsLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUdMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR25ELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDOzs7SUFHcEYsT0FBSTtJQUNKLFFBQUs7SUFDTCxRQUFLOzs7OztBQUdQO0lBOEdFLDhCQUNVLGdCQUFrQyxFQUNsQyxRQUFtQixFQUNFLFVBQVU7UUFGL0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ0UsZUFBVSxHQUFWLFVBQVUsQ0FBQTtRQTFHekIsWUFBTyxHQUFHLGVBQWUsQ0FBQztRQXVCMUIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixVQUFLLEdBQWlCLFFBQVEsQ0FBQztRQVcv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QixTQUFTLFNBQUMsY0FBYzswQkEyRnhCLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7K0JBT2hDLFlBQVksU0FBQyxZQUFZOytCQUt6QixZQUFZLFNBQUMsWUFBWTsrQkFLekIsWUFBWSxTQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQzsyQkFjckMsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUF1SjNDLDJCQUFDO0NBQUEsQUF2V0QsSUF1V0M7U0FsV1ksb0JBQW9COzs7SUFFL0IsdUNBQTBDOztJQUMxQyxnREFBbUQ7O0lBc0JuRCwwQ0FBa0M7O0lBQ2xDLDhDQUFzQzs7SUFDdEMscUNBQStDOztJQVcvQywwQ0FBZ0M7O0lBT2hDLDJDQUFvQzs7SUFDcEMsNkNBQXNDOztJQVd0QyxzQ0FDaUU7O0lBaUJqRSwwQ0FFRTs7Ozs7SUFDRixpREFFRTs7Ozs7SUFDRiw0Q0FBeUU7O0lBQ3pFLDhDQUFpRTs7Ozs7SUFFakUseUNBQXlCOzs7OztJQUN6Qix5Q0FBMkM7Ozs7O0lBRTNDLHlDQUFzRDs7Ozs7SUFDdEQsdUNBQW9EOzs7OztJQUVwRCx5Q0FBMkI7Ozs7O0lBQzNCLHlDQUF5Qzs7Ozs7SUFFekMscUNBQXFCOzs7OztJQUNyQixxQ0FBdUM7Ozs7O0lBRXZDLDRDQUEwQzs7Ozs7SUFDMUMsNENBQWtEOzs7OztJQUVsRCxzQ0FBbUM7Ozs7O0lBQ25DLDBDQUEwQzs7Ozs7SUFFMUMsd0NBQXdDOzs7OztJQUN4Qyx1Q0FBd0I7Ozs7O0lBR3RCLGdEQUEwQzs7Ozs7SUFDMUMsd0NBQTJCOzs7OztJQUMzQiwwQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBzdHlsZSwgQW5pbWF0aW9uQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTGlzdEtleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IGludGVydmFsLCBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNYXRDYXJvdXNlbCwgT3JpZW50YXRpb24sIFN2Z0ljb25PdmVycmlkZXMgfSBmcm9tICcuL2Nhcm91c2VsJztcbmltcG9ydCB7IE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQgfSBmcm9tICcuL2Nhcm91c2VsLXNsaWRlL2Nhcm91c2VsLXNsaWRlLmNvbXBvbmVudCc7XG5cbmVudW0gRGlyZWN0aW9uIHtcbiAgTGVmdCxcbiAgUmlnaHQsXG4gIEluZGV4XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jYXJvdXNlbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJvdXNlbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nhcm91c2VsLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2Fyb3VzZWxDb21wb25lbnRcbiAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBNYXRDYXJvdXNlbCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIHRpbWluZ3MgPSAnMjUwbXMgZWFzZS1pbic7XG4gIEBJbnB1dCgpIHB1YmxpYyBzdmdJY29uT3ZlcnJpZGVzOiBTdmdJY29uT3ZlcnJpZGVzO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgYXV0b3BsYXkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmF1dG9wbGF5JC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLl9hdXRvcGxheSA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBpbnRlcnZhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnRlcnZhbCQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGxvb3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvb3A7XG4gIH1cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBsb29wKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5sb29wJC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLl9sb29wID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKSBwdWJsaWMgaGlkZUFycm93cyA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBoaWRlSW5kaWNhdG9ycyA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBjb2xvcjogVGhlbWVQYWxldHRlID0gJ2FjY2VudCc7XG5cbiAgcHVibGljIGdldCBtYXhXaWR0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9tYXhXaWR0aDtcbiAgfVxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG1heFdpZHRoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9tYXhXaWR0aCA9IHZhbHVlO1xuICAgIHRoaXMubWF4V2lkdGgkLm5leHQoKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHB1YmxpYyBwcm9wb3J0aW9uID0gMjU7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBzbGlkZXModmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuc2xpZGVzJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHB1YmxpYyB1c2VLZXlib2FyZCA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgdXNlTW91c2VXaGVlbCA9IGZhbHNlO1xuXG4gIHB1YmxpYyBnZXQgb3JpZW50YXRpb24oKTogT3JpZW50YXRpb24ge1xuICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjtcbiAgfVxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG9yaWVudGF0aW9uKHZhbHVlOiBPcmllbnRhdGlvbikge1xuICAgIHRoaXMub3JpZW50YXRpb24kLm5leHQodmFsdWUpO1xuICAgIHRoaXMuX29yaWVudGF0aW9uID0gdmFsdWU7XG4gIH1cblxuICBAT3V0cHV0KClcbiAgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBwdWJsaWMgZ2V0IGN1cnJlbnRJbmRleCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmxpc3RLZXlNYW5hZ2VyKSB7XG4gICAgICByZXR1cm4gdGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXg7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgcHVibGljIGdldCBjdXJyZW50U2xpZGUoKTogTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudCB7XG4gICAgaWYgKHRoaXMubGlzdEtleU1hbmFnZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmxpc3RLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBAQ29udGVudENoaWxkcmVuKE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQpIHB1YmxpYyBzbGlkZXNMaXN0OiBRdWVyeUxpc3Q8XG4gICAgTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudFxuICA+O1xuICBAVmlld0NoaWxkKCdjYXJvdXNlbENvbnRhaW5lcicpIHByaXZhdGUgY2Fyb3VzZWxDb250YWluZXI6IEVsZW1lbnRSZWY8XG4gICAgSFRNTERpdkVsZW1lbnRcbiAgPjtcbiAgQFZpZXdDaGlsZCgnY2Fyb3VzZWxMaXN0JykgcHJpdmF0ZSBjYXJvdXNlbExpc3Q6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBwdWJsaWMgbGlzdEtleU1hbmFnZXI6IExpc3RLZXlNYW5hZ2VyPE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQ+O1xuXG4gIHByaXZhdGUgX2F1dG9wbGF5ID0gdHJ1ZTtcbiAgcHJpdmF0ZSBhdXRvcGxheSQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIHByaXZhdGUgaW50ZXJ2YWwkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDUwMDApO1xuICBwcml2YXRlIHNsaWRlcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4obnVsbCk7XG5cbiAgcHJpdmF0ZSBfbWF4V2lkdGggPSAnYXV0byc7XG4gIHByaXZhdGUgbWF4V2lkdGgkID0gbmV3IFN1YmplY3Q8bmV2ZXI+KCk7XG5cbiAgcHJpdmF0ZSBfbG9vcCA9IHRydWU7XG4gIHByaXZhdGUgbG9vcCQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uOiBPcmllbnRhdGlvbiA9ICdsdHInO1xuICBwcml2YXRlIG9yaWVudGF0aW9uJCA9IG5ldyBTdWJqZWN0PE9yaWVudGF0aW9uPigpO1xuXG4gIHByaXZhdGUgdGltZXIkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIHByaXZhdGUgdGltZXJTdG9wJCA9IG5ldyBTdWJqZWN0PG5ldmVyPigpO1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDxuZXZlcj4oKTtcbiAgcHJpdmF0ZSBwbGF5aW5nID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhbmltYXRpb25CdWlsZGVyOiBBbmltYXRpb25CdWlsZGVyLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWRcbiAgKSB7fVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5saXN0S2V5TWFuYWdlciA9IG5ldyBMaXN0S2V5TWFuYWdlcih0aGlzLnNsaWRlc0xpc3QpXG4gICAgICAud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oZmFsc2UpXG4gICAgICAud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih0aGlzLl9vcmllbnRhdGlvbilcbiAgICAgIC53aXRoV3JhcCh0aGlzLl9sb29wKTtcblxuICAgIHRoaXMubGlzdEtleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbSgwKTtcbiAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyLmNoYW5nZVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnBsYXlBbmltYXRpb24oKSk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYXV0b3BsYXkkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICAgIHRoaXMuc3RhcnRUaW1lcih2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmludGVydmFsJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgICB0aGlzLnJlc2V0VGltZXIodmFsdWUpO1xuICAgICAgdGhpcy5zdGFydFRpbWVyKHRoaXMuX2F1dG9wbGF5KTtcbiAgICB9KTtcblxuICAgIHRoaXMubWF4V2lkdGgkXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2xpZGVUbygwKSk7XG5cbiAgICB0aGlzLmxvb3AkXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMubGlzdEtleU1hbmFnZXIud2l0aFdyYXAodmFsdWUpKTtcblxuICAgIHRoaXMub3JpZW50YXRpb24kXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMubGlzdEtleU1hbmFnZXIud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih2YWx1ZSkpO1xuXG4gICAgdGhpcy5zbGlkZXMkXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICBmaWx0ZXIodmFsdWUgPT4gdmFsdWUgJiYgdmFsdWUgPCB0aGlzLnNsaWRlc0xpc3QubGVuZ3RoKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLnJlc2V0U2xpZGVzKHZhbHVlKSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHVibGljIG5leHQoKTogdm9pZCB7XG4gICAgdGhpcy5nb3RvKERpcmVjdGlvbi5SaWdodCk7XG4gIH1cblxuICBwdWJsaWMgcHJldmlvdXMoKTogdm9pZCB7XG4gICAgdGhpcy5nb3RvKERpcmVjdGlvbi5MZWZ0KTtcbiAgfVxuXG4gIHB1YmxpYyBzbGlkZVRvKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmdvdG8oRGlyZWN0aW9uLkluZGV4LCBpbmRleCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbktleVVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMudXNlS2V5Ym9hcmQgJiYgIXRoaXMucGxheWluZykge1xuICAgICAgdGhpcy5saXN0S2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBwdWJsaWMgb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgcHVibGljIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0VGltZXIodGhpcy5fYXV0b3BsYXkpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2V3aGVlbCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbk1vdXNlV2hlZWwoZXZlbnQ6IE1vdXNlV2hlZWxFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnVzZU1vdXNlV2hlZWwpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgd2luZG93IHRvIHNjcm9sbFxuICAgICAgY29uc3QgzpQgPSBNYXRoLnNpZ24oZXZlbnQud2hlZWxEZWx0YSk7XG5cbiAgICAgIGlmICjOlCA8IDApIHtcbiAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICB9IGVsc2UgaWYgKM6UID4gMCkge1xuICAgICAgICB0aGlzLnByZXZpb3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvblJlc2l6ZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBSZXNldCBjYXJvdXNlbCB3aGVuIHdpbmRvdyBpcyByZXNpemVkXG4gICAgLy8gaW4gb3JkZXIgdG8gYXZvaWQgbWFqb3IgZ2xpdGNoZXMuXG4gICAgdGhpcy5zbGlkZVRvKDApO1xuICB9XG5cbiAgcHVibGljIG9uUGFuKGV2ZW50OiBhbnksIHNsaWRlRWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBsZXQgzpR4ID0gZXZlbnQuZGVsdGFYO1xuICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgzpR4ICo9IDAuMjsgLy8gZGVjZWxlcmF0ZSBtb3ZlbWVudDtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHNsaWRlRWxlbSwgJ2N1cnNvcicsICdncmFiYmluZycpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICB0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICB0aGlzLmdldFRyYW5zbGF0aW9uKHRoaXMuZ2V0T2Zmc2V0KCkgKyDOlHgpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBvblBhbkVuZChldmVudDogYW55LCBzbGlkZUVsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZShzbGlkZUVsZW0sICdjdXJzb3InKTtcblxuICAgIGlmIChcbiAgICAgICF0aGlzLmlzT3V0T2ZCb3VuZHMoKSAmJlxuICAgICAgTWF0aC5hYnMoZXZlbnQuZGVsdGFYKSA+IHRoaXMuZ2V0V2lkdGgoKSAqIDAuMjVcbiAgICApIHtcbiAgICAgIGlmIChldmVudC5kZWx0YVggPD0gMCkge1xuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcmV2aW91cygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBsYXlBbmltYXRpb24oKTsgLy8gc2xpZGUgYmFjaywgZG9uJ3QgY2hhbmdlIGN1cnJlbnQgaW5kZXhcbiAgfVxuXG4gIHByaXZhdGUgaXNPdXRPZkJvdW5kcygpOiBib29sZWFuIHtcbiAgICBjb25zdCBzaWduID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3J0bCcgPyAtMSA6IDE7XG4gICAgY29uc3QgbGVmdCA9XG4gICAgICBzaWduICpcbiAgICAgICh0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLVxuICAgICAgICB0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIC5sZWZ0KTtcbiAgICBjb25zdCBsYXN0SW5kZXggPSB0aGlzLnNsaWRlc0xpc3QubGVuZ3RoIC0gMTtcbiAgICBjb25zdCB3aWR0aCA9IC10aGlzLmdldFdpZHRoKCkgKiBsYXN0SW5kZXg7XG5cbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMubGlzdEtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ID09PSAwICYmIGxlZnQgPj0gMCkgfHxcbiAgICAgICh0aGlzLmxpc3RLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gbGFzdEluZGV4ICYmIGxlZnQgPD0gd2lkdGgpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGVsZW0gPSB0aGlzLmNhcm91c2VsQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgZG9jVmlld1RvcCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICBjb25zdCBkb2NWaWV3Qm90dG9tID0gZG9jVmlld1RvcCArIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBjb25zdCBlbGVtT2Zmc2V0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBlbGVtVG9wID0gZG9jVmlld1RvcCArIGVsZW1PZmZzZXQudG9wO1xuICAgIGNvbnN0IGVsZW1Cb3R0b20gPSBlbGVtVG9wICsgZWxlbU9mZnNldC5oZWlnaHQ7XG5cbiAgICByZXR1cm4gZWxlbUJvdHRvbSA8PSBkb2NWaWV3Qm90dG9tIHx8IGVsZW1Ub3AgPj0gZG9jVmlld1RvcDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T2Zmc2V0KCk6IG51bWJlciB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggKiB0aGlzLmdldFdpZHRoKCk7XG4gICAgY29uc3Qgc2lnbiA9IHRoaXMub3JpZW50YXRpb24gPT09ICdydGwnID8gMSA6IC0xO1xuICAgIHJldHVybiBzaWduICogb2Zmc2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUcmFuc2xhdGlvbihvZmZzZXQ6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGVYKCR7b2Zmc2V0fXB4KWA7XG4gIH1cblxuICBwcml2YXRlIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxDb250YWluZXIubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIHByaXZhdGUgZ290byhkaXJlY3Rpb246IERpcmVjdGlvbiwgaW5kZXg/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGxheWluZykge1xuICAgICAgY29uc3QgcnRsID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3J0bCc7XG5cbiAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLkxlZnQ6XG4gICAgICAgICAgcmV0dXJuIHJ0bFxuICAgICAgICAgICAgPyB0aGlzLmxpc3RLZXlNYW5hZ2VyLnNldE5leHRJdGVtQWN0aXZlKClcbiAgICAgICAgICAgIDogdGhpcy5saXN0S2V5TWFuYWdlci5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTtcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uUmlnaHQ6XG4gICAgICAgICAgcmV0dXJuIHJ0bFxuICAgICAgICAgICAgPyB0aGlzLmxpc3RLZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpXG4gICAgICAgICAgICA6IHRoaXMubGlzdEtleU1hbmFnZXIuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uSW5kZXg6XG4gICAgICAgICAgcmV0dXJuIHRoaXMubGlzdEtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShpbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwbGF5QW5pbWF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gdGhpcy5nZXRUcmFuc2xhdGlvbih0aGlzLmdldE9mZnNldCgpKTtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5hbmltYXRpb25CdWlsZGVyLmJ1aWxkKFxuICAgICAgYW5pbWF0ZSh0aGlzLnRpbWluZ3MsIHN0eWxlKHsgdHJhbnNmb3JtOiB0cmFuc2xhdGlvbiB9KSlcbiAgICApO1xuICAgIGNvbnN0IGFuaW1hdGlvbiA9IGZhY3RvcnkuY3JlYXRlKHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgYW5pbWF0aW9uLm9uU3RhcnQoKCkgPT4gKHRoaXMucGxheWluZyA9IHRydWUpKTtcbiAgICBhbmltYXRpb24ub25Eb25lKCgpID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICB0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgdHJhbnNsYXRpb25cbiAgICAgICk7XG4gICAgICBhbmltYXRpb24uZGVzdHJveSgpO1xuICAgIH0pO1xuICAgIGFuaW1hdGlvbi5wbGF5KCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0U2xpZGVzKHNsaWRlczogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zbGlkZXNMaXN0LnJlc2V0KHRoaXMuc2xpZGVzTGlzdC50b0FycmF5KCkuc2xpY2UoMCwgc2xpZGVzKSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0VGltZXIodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudGltZXIkID0gaW50ZXJ2YWwodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydFRpbWVyKGF1dG9wbGF5OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCFhdXRvcGxheSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudGltZXIkXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMudGltZXJTdG9wJCksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuaXNWaXNpYmxlKCkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5saXN0S2V5TWFuYWdlci53aXRoV3JhcCh0cnVlKS5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyLndpdGhXcmFwKHRoaXMubG9vcCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RvcFRpbWVyKCk6IHZvaWQge1xuICAgIHRoaXMudGltZXJTdG9wJC5uZXh0KCk7XG4gIH1cbn1cbiJdfQ==
