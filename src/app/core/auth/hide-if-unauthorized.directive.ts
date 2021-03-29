import { Directive, ElementRef, OnInit , Input } from '@angular/core';
import { IKeyOption } from '@core/models/common';
import { MenuQuery } from '@management-state/menu/menu.query';

@Directive({
    selector: '[HideIfUnauthorized]'
})
export class MyHideIfUnauthorizedDirective implements OnInit {
    @Input('HideIfUnauthorized') key: string; // Required permission passed in
    roleOfOption: IKeyOption[] = [];

    constructor(private el: ElementRef, private menuQuery: MenuQuery) { }

    ngOnInit() {
        const menus = this.menuQuery.getStorage();
        this.roleOfOption = menus[0].options;
        if (!this.roleOfOption.find(m => m.key === this.key)) {
            this.el.nativeElement.style.display = 'none';
        }
    }
}
