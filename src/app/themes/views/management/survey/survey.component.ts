import { Component, OnInit } from '@angular/core';
import {ScriptLoaderService} from '@core/services/common/script-loader.service';
import {LayoutHelpers} from '@core/helpers/layout.helper';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {
    constructor(
    ) {}

    ngOnInit() {
        LayoutHelpers.loadScript('assets/libs/ckeditor/ckeditor.js');
    }
}
