import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'asc-editcontent',
    templateUrl: './asc-editcontent.component.html',
    styleUrls: ['./asc-editcontent.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => AscEditContentComponent),
        },
    ],
})
export class AscEditContentComponent implements OnInit, OnChanges, ControlValueAccessor {
    @Input() isDisabled = false;

    value: string;
    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {}

    ngOnInit(): void {}

    onChange(value) {}

    onTouched() {}

    writeValue(value): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }
}
