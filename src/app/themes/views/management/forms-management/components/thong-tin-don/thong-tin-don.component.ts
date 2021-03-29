import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CacLoaiDonEnum } from '../../_models/quan-ly-don-tu.enum';
import { IDonTu } from '../../_models/quan-ly-don-tu.model';

@Component({
  selector: 'app-thong-tin-don',
  templateUrl: './thong-tin-don.component.html',
  styleUrls: ['./thong-tin-don.component.scss']
})
export class ThongTinDonComponent implements OnInit {
  @Input() itemDonSelected: any;
  @Input() loaiDonSelected: CacLoaiDonEnum;
  loaiDon: CacLoaiDonEnum;
  form: FormGroup;
  itemData: any;
  
  constructor() { }

  ngOnInit() {    
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes){
      this.itemData = this.itemDonSelected;
      if (this.loaiDonSelected !== this.loaiDon){
        this.itemData = null;
        this.loaiDon = this.loaiDonSelected;
      }
    }    
  }
}
