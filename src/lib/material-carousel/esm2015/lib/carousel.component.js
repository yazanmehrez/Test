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
const Direction = {
    Left: 0,
    Right: 1,
    Index: 2,
};
Direction[Direction.Left] = 'Left';
Direction[Direction.Right] = 'Right';
Direction[Direction.Index] = 'Index';
export class MatCarouselComponent {
    /**
     * @param {?} animationBuilder
     * @param {?} renderer
     * @param {?} platformId
     */
    constructor(animationBuilder, renderer, platformId) {
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
    /**
     * @param {?} value
     * @return {?}
     */
    set autoplay(value) {
        this.autoplay$.next(value);
        this._autoplay = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set interval(value) {
        this.interval$.next(value);
    }
    /**
     * @return {?}
     */
    get loop() {
        return this._loop;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loop(value) {
        this.loop$.next(value);
        this._loop = value;
    }
    /**
     * @return {?}
     */
    get maxWidth() {
        return this._maxWidth;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxWidth(value) {
        this._maxWidth = value;
        this.maxWidth$.next();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set slides(value) {
        this.slides$.next(value);
    }
    /**
     * @return {?}
     */
    get orientation() {
        return this._orientation;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set orientation(value) {
        this.orientation$.next(value);
        this._orientation = value;
    }
    /**
     * @return {?}
     */
    get currentIndex() {
        if (this.listKeyManager) {
            return this.listKeyManager.activeItemIndex;
        }
        return 0;
    }
    /**
     * @return {?}
     */
    get currentSlide() {
        if (this.listKeyManager) {
            return this.listKeyManager.activeItem;
        }
        return null;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.listKeyManager = new ListKeyManager(this.slidesList)
            .withVerticalOrientation(false)
            .withHorizontalOrientation(this._orientation)
            .withWrap(this._loop);
        this.listKeyManager.updateActiveItem(0);
        this.listKeyManager.change
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.playAnimation());
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.autoplay$.pipe(takeUntil(this.destroy$)).subscribe(value => {
            this.stopTimer();
            this.startTimer(value);
        });
        this.interval$.pipe(takeUntil(this.destroy$)).subscribe(value => {
            this.stopTimer();
            this.resetTimer(value);
            this.startTimer(this._autoplay);
        });
        this.maxWidth$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.slideTo(0));
        this.loop$
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => this.listKeyManager.withWrap(value));
        this.orientation$
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => this.listKeyManager.withHorizontalOrientation(value));
        this.slides$
            .pipe(takeUntil(this.destroy$), filter(value => value && value < this.slidesList.length))
            .subscribe(value => this.resetSlides(value));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /**
     * @return {?}
     */
    next() {
        this.goto(Direction.Right);
    }
    /**
     * @return {?}
     */
    previous() {
        this.goto(Direction.Left);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    slideTo(index) {
        this.goto(Direction.Index, index);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyUp(event) {
        if (this.useKeyboard && !this.playing) {
            this.listKeyManager.onKeydown(event);
        }
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        this.stopTimer();
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        this.startTimer(this._autoplay);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseWheel(event) {
        if (this.useMouseWheel) {
            event.preventDefault(); // prevent window to scroll
            // prevent window to scroll
            /** @type {?} */
            const Δ = Math.sign(event.wheelDelta);
            if (Δ < 0) {
                this.next();
            }
            else if (Δ > 0) {
                this.previous();
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        // Reset carousel when window is resized
        // in order to avoid major glitches.
        this.slideTo(0);
    }
    /**
     * @param {?} event
     * @param {?} slideElem
     * @return {?}
     */
    onPan(event, slideElem) {
        /** @type {?} */
        let Δx = event.deltaX;
        if (this.isOutOfBounds()) {
            Δx *= 0.2; // decelerate movement;
        }
        this.renderer.setStyle(slideElem, 'cursor', 'grabbing');
        this.renderer.setStyle(this.carouselList.nativeElement, 'transform', this.getTranslation(this.getOffset() + Δx));
    }
    /**
     * @param {?} event
     * @param {?} slideElem
     * @return {?}
     */
    onPanEnd(event, slideElem) {
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
    }
    /**
     * @private
     * @return {?}
     */
    isOutOfBounds() {
        /** @type {?} */
        const sign = this.orientation === 'rtl' ? -1 : 1;
        /** @type {?} */
        const left = sign *
            (this.carouselList.nativeElement.getBoundingClientRect().left -
                this.carouselList.nativeElement.offsetParent.getBoundingClientRect()
                    .left);
        /** @type {?} */
        const lastIndex = this.slidesList.length - 1;
        /** @type {?} */
        const width = -this.getWidth() * lastIndex;
        return ((this.listKeyManager.activeItemIndex === 0 && left >= 0) ||
            (this.listKeyManager.activeItemIndex === lastIndex && left <= width));
    }
    /**
     * @private
     * @return {?}
     */
    isVisible() {
        if (!isPlatformBrowser(this.platformId)) {
            return false;
        }
        /** @type {?} */
        const elem = this.carouselContainer.nativeElement;
        /** @type {?} */
        const docViewTop = window.pageYOffset;
        /** @type {?} */
        const docViewBottom = docViewTop + window.innerHeight;
        /** @type {?} */
        const elemOffset = elem.getBoundingClientRect();
        /** @type {?} */
        const elemTop = docViewTop + elemOffset.top;
        /** @type {?} */
        const elemBottom = elemTop + elemOffset.height;
        return elemBottom <= docViewBottom || elemTop >= docViewTop;
    }
    /**
     * @private
     * @return {?}
     */
    getOffset() {
        /** @type {?} */
        const offset = this.listKeyManager.activeItemIndex * this.getWidth();
        /** @type {?} */
        const sign = this.orientation === 'rtl' ? 1 : -1;
        return sign * offset;
    }
    /**
     * @private
     * @param {?} offset
     * @return {?}
     */
    getTranslation(offset) {
        return `translateX(${offset}px)`;
    }
    /**
     * @private
     * @return {?}
     */
    getWidth() {
        return this.carouselContainer.nativeElement.clientWidth;
    }
    /**
     * @private
     * @param {?} direction
     * @param {?=} index
     * @return {?}
     */
    goto(direction, index) {
        if (!this.playing) {
            /** @type {?} */
            const rtl = this.orientation === 'rtl';
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
    }
    /**
     * @private
     * @return {?}
     */
    playAnimation() {
        /** @type {?} */
        const translation = this.getTranslation(this.getOffset());
        /** @type {?} */
        const factory = this.animationBuilder.build(animate(this.timings, style({ transform: translation })));
        /** @type {?} */
        const animation = factory.create(this.carouselList.nativeElement);
        animation.onStart(() => (this.playing = true));
        animation.onDone(() => {
            this.change.emit(this.currentIndex);
            this.playing = false;
            this.renderer.setStyle(this.carouselList.nativeElement, 'transform', translation);
            animation.destroy();
        });
        animation.play();
    }
    /**
     * @private
     * @param {?} slides
     * @return {?}
     */
    resetSlides(slides) {
        this.slidesList.reset(this.slidesList.toArray().slice(0, slides));
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    resetTimer(value) {
        this.timer$ = interval(value);
    }
    /**
     * @private
     * @param {?} autoplay
     * @return {?}
     */
    startTimer(autoplay) {
        if (!autoplay) {
            return;
        }
        this.timer$
            .pipe(takeUntil(this.timerStop$), takeUntil(this.destroy$), filter(() => this.isVisible()))
            .subscribe(() => {
            this.listKeyManager.withWrap(true).setNextItemActive();
            this.listKeyManager.withWrap(this.loop);
        });
    }
    /**
     * @private
     * @return {?}
     */
    stopTimer() {
        this.timerStop$.next();
    }
}
MatCarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-carousel',
                template: "<div\n  #carouselContainer\n  class=\"carousel\"\n  tabindex=\"0\"\n  [style.max-width]=\"maxWidth\"\n>\n  <ul\n    #carouselList\n    class=\"carousel-list\"\n    role=\"listbox\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n  >\n    <li\n      #carouselSlide\n      *ngFor=\"let slide of slidesList\"\n      class=\"carousel-slide\"\n      role=\"option\"\n      >\n      <ng-container [ngTemplateOutlet]=\"slide.templateRef\"></ng-container>\n    </li>\n  </ul>\n\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == 0\"\n    (click)=\"previous()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowBack; else: defaultArrowBack\"\n      [svgIcon]=\"svgIconOverrides.arrowBack\"\n    ></mat-icon>\n    <ng-template #defaultArrowBack>\n      <mat-icon>arrow_back</mat-icon>\n    </ng-template>\n  </button>\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == slidesList.length - 1\"\n    (click)=\"next()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowForward; else: defaultArrowForward\"\n      [svgIcon]=\"svgIconOverrides.arrowForward\"\n    ></mat-icon>\n    <ng-template #defaultArrowForward>\n      <mat-icon>arrow_forward</mat-icon>\n    </ng-template>\n  </button>\n\n  <div\n    *ngIf=\"!hideIndicators\"\n    class=\"carousel-indicators\"\n    tabindex=\"-1\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n  >\n    <button\n      *ngFor=\"let slide of slidesList; let i = index\"\n      type=\"button\"\n      tabindex=\"-1\"\n      mat-mini-fab\n      [color]=\"color\"\n      [disabled]=\"i == currentIndex\"\n      (click)=\"slideTo(i)\"\n      (focus)=\"carouselContainer.focus()\"\n    ></button>\n  </div>\n</div>\n",
            }] }
];
/** @nocollapse */
MatCarouselComponent.ctorParameters = () => [
    { type: AnimationBuilder },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbW9kdWxlL21hdGVyaWFsLWNhcm91c2VsLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUdMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR25ELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDOzs7SUFHcEYsT0FBSTtJQUNKLFFBQUs7SUFDTCxRQUFLOzs7OztBQVFQLE1BQU0sT0FBTyxvQkFBb0I7Ozs7OztJQXlHL0IsWUFDVSxnQkFBa0MsRUFDbEMsUUFBbUIsRUFDRSxVQUFVO1FBRi9CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNFLGVBQVUsR0FBVixVQUFVLENBQUE7UUExR3pCLFlBQU8sR0FBRyxlQUFlLENBQUM7UUF1QjFCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsVUFB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Q3pCLHlDQUEyQzs7Ozs7SUFFM0MseUNBQXNEOzs7OztJQUN0RCx1Q0FBb0Q7Ozs7O0lBRXBELHlDQUEyQjs7Ozs7SUFDM0IseUNBQXlDOzs7OztJQUV6QyxxQ0FBcUI7Ozs7O0lBQ3JCLHFDQUF1Qzs7Ozs7SUFFdkMsNENBQTBDOzs7OztJQUMxQyw0Q0FBa0Q7Ozs7O0lBRWxELHNDQUFtQzs7Ozs7SUFDbkMsMENBQTBDOzs7OztJQUUxQyx3Q0FBd0M7Ozs7O0lBQ3hDLHVDQUF3Qjs7Ozs7SUFHdEIsZ0RBQTBDOzs7OztJQUMxQyx3Q0FBMkI7Ozs7O0lBQzNCLDBDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIHN0eWxlLCBBbmltYXRpb25CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBMaXN0S2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgaW50ZXJ2YWwsIEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1hdENhcm91c2VsLCBPcmllbnRhdGlvbiwgU3ZnSWNvbk92ZXJyaWRlcyB9IGZyb20gJy4vY2Fyb3VzZWwnO1xuaW1wb3J0IHsgTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudCB9IGZyb20gJy4vY2Fyb3VzZWwtc2xpZGUvY2Fyb3VzZWwtc2xpZGUuY29tcG9uZW50JztcblxuZW51bSBEaXJlY3Rpb24ge1xuICBMZWZ0LFxuICBSaWdodCxcbiAgSW5kZXhcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhcm91c2VsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhcm91c2VsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2Fyb3VzZWwuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJvdXNlbENvbXBvbmVudFxuICBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE1hdENhcm91c2VsLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwdWJsaWMgdGltaW5ncyA9ICcyNTBtcyBlYXNlLWluJztcbiAgQElucHV0KCkgcHVibGljIHN2Z0ljb25PdmVycmlkZXM6IFN2Z0ljb25PdmVycmlkZXM7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBhdXRvcGxheSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuYXV0b3BsYXkkLm5leHQodmFsdWUpO1xuICAgIHRoaXMuX2F1dG9wbGF5ID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGludGVydmFsKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLmludGVydmFsJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbG9vcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbG9vcDtcbiAgfVxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGxvb3AodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmxvb3AkLm5leHQodmFsdWUpO1xuICAgIHRoaXMuX2xvb3AgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHB1YmxpYyBoaWRlQXJyb3dzID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIGhpZGVJbmRpY2F0b3JzID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIGNvbG9yOiBUaGVtZVBhbGV0dGUgPSAnYWNjZW50JztcblxuICBwdWJsaWMgZ2V0IG1heFdpZHRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX21heFdpZHRoO1xuICB9XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbWF4V2lkdGgodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX21heFdpZHRoID0gdmFsdWU7XG4gICAgdGhpcy5tYXhXaWR0aCQubmV4dCgpO1xuICB9XG5cbiAgQElucHV0KCkgcHVibGljIHByb3BvcnRpb24gPSAyNTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHNsaWRlcyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zbGlkZXMkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgcHVibGljIHVzZUtleWJvYXJkID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyB1c2VNb3VzZVdoZWVsID0gZmFsc2U7XG5cbiAgcHVibGljIGdldCBvcmllbnRhdGlvbigpOiBPcmllbnRhdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uO1xuICB9XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgb3JpZW50YXRpb24odmFsdWU6IE9yaWVudGF0aW9uKSB7XG4gICAgdGhpcy5vcmllbnRhdGlvbiQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5fb3JpZW50YXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgY2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIHB1YmxpYyBnZXQgY3VycmVudEluZGV4KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMubGlzdEtleU1hbmFnZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmxpc3RLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleDtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuICBwdWJsaWMgZ2V0IGN1cnJlbnRTbGlkZSgpOiBNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50IHtcbiAgICBpZiAodGhpcy5saXN0S2V5TWFuYWdlcikge1xuICAgICAgcmV0dXJuIHRoaXMubGlzdEtleU1hbmFnZXIuYWN0aXZlSXRlbTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudCkgcHVibGljIHNsaWRlc0xpc3Q6IFF1ZXJ5TGlzdDxcbiAgICBNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50XG4gID47XG4gIEBWaWV3Q2hpbGQoJ2Nhcm91c2VsQ29udGFpbmVyJykgcHJpdmF0ZSBjYXJvdXNlbENvbnRhaW5lcjogRWxlbWVudFJlZjxcbiAgICBIVE1MRGl2RWxlbWVudFxuICA+O1xuICBAVmlld0NoaWxkKCdjYXJvdXNlbExpc3QnKSBwcml2YXRlIGNhcm91c2VsTGlzdDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIHB1YmxpYyBsaXN0S2V5TWFuYWdlcjogTGlzdEtleU1hbmFnZXI8TWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudD47XG5cbiAgcHJpdmF0ZSBfYXV0b3BsYXkgPSB0cnVlO1xuICBwcml2YXRlIGF1dG9wbGF5JCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgcHJpdmF0ZSBpbnRlcnZhbCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNTAwMCk7XG4gIHByaXZhdGUgc2xpZGVzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPihudWxsKTtcblxuICBwcml2YXRlIF9tYXhXaWR0aCA9ICdhdXRvJztcbiAgcHJpdmF0ZSBtYXhXaWR0aCQgPSBuZXcgU3ViamVjdDxuZXZlcj4oKTtcblxuICBwcml2YXRlIF9sb29wID0gdHJ1ZTtcbiAgcHJpdmF0ZSBsb29wJCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb246IE9yaWVudGF0aW9uID0gJ2x0cic7XG4gIHByaXZhdGUgb3JpZW50YXRpb24kID0gbmV3IFN1YmplY3Q8T3JpZW50YXRpb24+KCk7XG5cbiAgcHJpdmF0ZSB0aW1lciQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcHJpdmF0ZSB0aW1lclN0b3AkID0gbmV3IFN1YmplY3Q8bmV2ZXI+KCk7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PG5ldmVyPigpO1xuICBwcml2YXRlIHBsYXlpbmcgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFuaW1hdGlvbkJ1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXIsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZFxuICApIHt9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyID0gbmV3IExpc3RLZXlNYW5hZ2VyKHRoaXMuc2xpZGVzTGlzdClcbiAgICAgIC53aXRoVmVydGljYWxPcmllbnRhdGlvbihmYWxzZSlcbiAgICAgIC53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHRoaXMuX29yaWVudGF0aW9uKVxuICAgICAgLndpdGhXcmFwKHRoaXMuX2xvb3ApO1xuXG4gICAgdGhpcy5saXN0S2V5TWFuYWdlci51cGRhdGVBY3RpdmVJdGVtKDApO1xuICAgIHRoaXMubGlzdEtleU1hbmFnZXIuY2hhbmdlXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMucGxheUFuaW1hdGlvbigpKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5hdXRvcGxheSQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgdGhpcy5zdGFydFRpbWVyKHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW50ZXJ2YWwkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICAgIHRoaXMucmVzZXRUaW1lcih2YWx1ZSk7XG4gICAgICB0aGlzLnN0YXJ0VGltZXIodGhpcy5fYXV0b3BsYXkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tYXhXaWR0aCRcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zbGlkZVRvKDApKTtcblxuICAgIHRoaXMubG9vcCRcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5saXN0S2V5TWFuYWdlci53aXRoV3JhcCh2YWx1ZSkpO1xuXG4gICAgdGhpcy5vcmllbnRhdGlvbiRcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5saXN0S2V5TWFuYWdlci53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHZhbHVlKSk7XG5cbiAgICB0aGlzLnNsaWRlcyRcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICAgIGZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAmJiB2YWx1ZSA8IHRoaXMuc2xpZGVzTGlzdC5sZW5ndGgpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMucmVzZXRTbGlkZXModmFsdWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwdWJsaWMgbmV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLmdvdG8oRGlyZWN0aW9uLlJpZ2h0KTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2aW91cygpOiB2b2lkIHtcbiAgICB0aGlzLmdvdG8oRGlyZWN0aW9uLkxlZnQpO1xuICB9XG5cbiAgcHVibGljIHNsaWRlVG8oaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZ290byhEaXJlY3Rpb24uSW5kZXgsIGluZGV4KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleXVwJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uS2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51c2VLZXlib2FyZCAmJiAhdGhpcy5wbGF5aW5nKSB7XG4gICAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIHB1YmxpYyBvbk1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBwdWJsaWMgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhcnRUaW1lcih0aGlzLl9hdXRvcGxheSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZXdoZWVsJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uTW91c2VXaGVlbChldmVudDogTW91c2VXaGVlbEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMudXNlTW91c2VXaGVlbCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCB3aW5kb3cgdG8gc2Nyb2xsXG4gICAgICBjb25zdCDOlCA9IE1hdGguc2lnbihldmVudC53aGVlbERlbHRhKTtcblxuICAgICAgaWYgKM6UIDwgMCkge1xuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgIH0gZWxzZSBpZiAozpQgPiAwKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uUmVzaXplKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIC8vIFJlc2V0IGNhcm91c2VsIHdoZW4gd2luZG93IGlzIHJlc2l6ZWRcbiAgICAvLyBpbiBvcmRlciB0byBhdm9pZCBtYWpvciBnbGl0Y2hlcy5cbiAgICB0aGlzLnNsaWRlVG8oMCk7XG4gIH1cblxuICBwdWJsaWMgb25QYW4oZXZlbnQ6IGFueSwgc2xpZGVFbGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGxldCDOlHggPSBldmVudC5kZWx0YVg7XG4gICAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcygpKSB7XG4gICAgICDOlHggKj0gMC4yOyAvLyBkZWNlbGVyYXRlIG1vdmVtZW50O1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoc2xpZGVFbGVtLCAnY3Vyc29yJywgJ2dyYWJiaW5nJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAndHJhbnNmb3JtJyxcbiAgICAgIHRoaXMuZ2V0VHJhbnNsYXRpb24odGhpcy5nZXRPZmZzZXQoKSArIM6UeClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIG9uUGFuRW5kKGV2ZW50OiBhbnksIHNsaWRlRWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHNsaWRlRWxlbSwgJ2N1cnNvcicpO1xuXG4gICAgaWYgKFxuICAgICAgIXRoaXMuaXNPdXRPZkJvdW5kcygpICYmXG4gICAgICBNYXRoLmFicyhldmVudC5kZWx0YVgpID4gdGhpcy5nZXRXaWR0aCgpICogMC4yNVxuICAgICkge1xuICAgICAgaWYgKGV2ZW50LmRlbHRhWCA8PSAwKSB7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZpb3VzKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucGxheUFuaW1hdGlvbigpOyAvLyBzbGlkZSBiYWNrLCBkb24ndCBjaGFuZ2UgY3VycmVudCBpbmRleFxuICB9XG5cbiAgcHJpdmF0ZSBpc091dE9mQm91bmRzKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHNpZ24gPSB0aGlzLm9yaWVudGF0aW9uID09PSAncnRsJyA/IC0xIDogMTtcbiAgICBjb25zdCBsZWZ0ID1cbiAgICAgIHNpZ24gKlxuICAgICAgKHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0UGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgLmxlZnQpO1xuICAgIGNvbnN0IGxhc3RJbmRleCA9IHRoaXMuc2xpZGVzTGlzdC5sZW5ndGggLSAxO1xuICAgIGNvbnN0IHdpZHRoID0gLXRoaXMuZ2V0V2lkdGgoKSAqIGxhc3RJbmRleDtcblxuICAgIHJldHVybiAoXG4gICAgICAodGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggPT09IDAgJiYgbGVmdCA+PSAwKSB8fFxuICAgICAgKHRoaXMubGlzdEtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ID09PSBsYXN0SW5kZXggJiYgbGVmdCA8PSB3aWR0aClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgZWxlbSA9IHRoaXMuY2Fyb3VzZWxDb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBkb2NWaWV3VG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgIGNvbnN0IGRvY1ZpZXdCb3R0b20gPSBkb2NWaWV3VG9wICsgd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGNvbnN0IGVsZW1PZmZzZXQgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGVsZW1Ub3AgPSBkb2NWaWV3VG9wICsgZWxlbU9mZnNldC50b3A7XG4gICAgY29uc3QgZWxlbUJvdHRvbSA9IGVsZW1Ub3AgKyBlbGVtT2Zmc2V0LmhlaWdodDtcblxuICAgIHJldHVybiBlbGVtQm90dG9tIDw9IGRvY1ZpZXdCb3R0b20gfHwgZWxlbVRvcCA+PSBkb2NWaWV3VG9wO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPZmZzZXQoKTogbnVtYmVyIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLmxpc3RLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCAqIHRoaXMuZ2V0V2lkdGgoKTtcbiAgICBjb25zdCBzaWduID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3J0bCcgPyAxIDogLTE7XG4gICAgcmV0dXJuIHNpZ24gKiBvZmZzZXQ7XG4gIH1cblxuICBwcml2YXRlIGdldFRyYW5zbGF0aW9uKG9mZnNldDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYHRyYW5zbGF0ZVgoJHtvZmZzZXR9cHgpYDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbENvbnRhaW5lci5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoO1xuICB9XG5cbiAgcHJpdmF0ZSBnb3RvKGRpcmVjdGlvbjogRGlyZWN0aW9uLCBpbmRleD86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF5aW5nKSB7XG4gICAgICBjb25zdCBydGwgPSB0aGlzLm9yaWVudGF0aW9uID09PSAncnRsJztcblxuICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uTGVmdDpcbiAgICAgICAgICByZXR1cm4gcnRsXG4gICAgICAgICAgICA/IHRoaXMubGlzdEtleU1hbmFnZXIuc2V0TmV4dEl0ZW1BY3RpdmUoKVxuICAgICAgICAgICAgOiB0aGlzLmxpc3RLZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuICAgICAgICBjYXNlIERpcmVjdGlvbi5SaWdodDpcbiAgICAgICAgICByZXR1cm4gcnRsXG4gICAgICAgICAgICA/IHRoaXMubGlzdEtleU1hbmFnZXIuc2V0UHJldmlvdXNJdGVtQWN0aXZlKClcbiAgICAgICAgICAgIDogdGhpcy5saXN0S2V5TWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgICBjYXNlIERpcmVjdGlvbi5JbmRleDpcbiAgICAgICAgICByZXR1cm4gdGhpcy5saXN0S2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHBsYXlBbmltYXRpb24oKTogdm9pZCB7XG4gICAgY29uc3QgdHJhbnNsYXRpb24gPSB0aGlzLmdldFRyYW5zbGF0aW9uKHRoaXMuZ2V0T2Zmc2V0KCkpO1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmFuaW1hdGlvbkJ1aWxkZXIuYnVpbGQoXG4gICAgICBhbmltYXRlKHRoaXMudGltaW5ncywgc3R5bGUoeyB0cmFuc2Zvcm06IHRyYW5zbGF0aW9uIH0pKVxuICAgICk7XG4gICAgY29uc3QgYW5pbWF0aW9uID0gZmFjdG9yeS5jcmVhdGUodGhpcy5jYXJvdXNlbExpc3QubmF0aXZlRWxlbWVudCk7XG5cbiAgICBhbmltYXRpb24ub25TdGFydCgoKSA9PiAodGhpcy5wbGF5aW5nID0gdHJ1ZSkpO1xuICAgIGFuaW1hdGlvbi5vbkRvbmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICB0cmFuc2xhdGlvblxuICAgICAgKTtcbiAgICAgIGFuaW1hdGlvbi5kZXN0cm95KCk7XG4gICAgfSk7XG4gICAgYW5pbWF0aW9uLnBsYXkoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRTbGlkZXMoc2xpZGVzOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNsaWRlc0xpc3QucmVzZXQodGhpcy5zbGlkZXNMaXN0LnRvQXJyYXkoKS5zbGljZSgwLCBzbGlkZXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRUaW1lcih2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy50aW1lciQgPSBpbnRlcnZhbCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0VGltZXIoYXV0b3BsYXk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIWF1dG9wbGF5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy50aW1lciRcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy50aW1lclN0b3AkKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5pc1Zpc2libGUoKSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyLndpdGhXcmFwKHRydWUpLnNldE5leHRJdGVtQWN0aXZlKCk7XG4gICAgICAgIHRoaXMubGlzdEtleU1hbmFnZXIud2l0aFdyYXAodGhpcy5sb29wKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9wVGltZXIoKTogdm9pZCB7XG4gICAgdGhpcy50aW1lclN0b3AkLm5leHQoKTtcbiAgfVxufVxuIl19
