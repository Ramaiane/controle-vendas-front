import { Component, Input, ViewChild, ElementRef, OnInit } from "@angular/core";
import {trigger, state, style, transition, animate} from '@angular/animations';
import { AppComponent } from "../../app.component";
import {MenuItem, ScrollPanel} from 'primeng/primeng';
import { Route, Router } from "@angular/router";

declare var jQuery: any;

@Component({
    selector:'app-menu',
    templateUrl:'./menu.component.html'
})
export class MenuComponent implements OnInit {

    @Input() reset: boolean;

    model: any[];

    layoutMenuScroller: HTMLDivElement;

    @ViewChild('scrollPanel') layoutMenuScrollerViewChild: ScrollPanel;

    constructor(public app: AppComponent){ }

    ngOnInit(){
        this.model = [
            {label: 'Inicio', icon:'fas fa-th-large',  routerLink: ['/']},
            {label: 'Minhas Lojas', icon:'fas fa-store',  routerLink: ['/lojas']},
            {label: 'Fornecedor', icon:'fas fa-dolly',  routerLink: ['/fornecedores']},
            {label: 'Anunciar Produto', icon:'fas fa-cubes',  routerLink: ['/mantemProduto']},
            {label: 'Vendas', icon:'far fa-handshake',  routerLink: ['/vendasProduto']},
            {label: 'Administrativo', icon:'fas fa-cog',
                items: [
                    { label: 'Categoria', title: 'Categoria',  routerLink: ['/categorias'], icon: 'fas fa-sitemap' }, 
                   
                                            
                ]
            }
          
        ]
    }  
    
    ngAfterViewInit() {
        setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    }

}


@Component({
    /* tslint:disable:component-selector */
    selector: '[app-submenu]',
    /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" *ngIf="!child.routerLink"
                   [attr.target]="child.target"
                    (mouseenter)="hover=true" (mouseleave)="hover=false" class="ripplelink">
                    <i class="{{child.icon}}"></i>
                    <span class="menuitem-text">{{child.label}}</span>
                    <i class="fas fa-chevron-down layout-submenu-toggler" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>

                <a (click)="itemClick($event,child,i)" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                   [routerLinkActiveOptions]="{exact: true}"  [attr.target]="child.target"
                    (mouseenter)="hover=true" (mouseleave)="hover=false" class="ripplelink">
                    <i class="{{child.icon}}"></i>
                    <span class="menuitem-text">{{child.label}}</span>
                    <i class="fas fa-chevron-down layout-submenu-toggler" *ngIf="child.items">>keyboard_arrow_down</i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>
                <ul app-submenu [item]="child" *ngIf="child.items" [reset]="reset"
                    [@children]="isActive(i) ? 'visible' : 'hidden'"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('visible', style({
                height: '*'
            })),
            state('hidden', style({
                height: '0px'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    _reset: boolean;

    activeIndex: number;

    hover: boolean;

    constructor(public app: AppComponent, public router: Router, public appMenu: MenuComponent) {}

    itemClick(event: Event, item: MenuItem, index: number) {
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        if (item.routerLink || item.items || item.command || item.url) {
            this.activeIndex = (this.activeIndex === index) ? null : index;
        }

        // execute command
        if (item.command) {
            item.command({originalEvent: event, item: item});
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (this.app.isMobile()) {
                this.app.sidebarActive = false;
                this.app.mobileMenuActive = false;
            }
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;
    }
}


