import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CacLoaiDonEnum } from '../../_models/quan-ly-don-tu.enum';
import { IDonTu } from '../../_models/quan-ly-don-tu.model';

export interface IList {
    id: number;
    loai: string;
    ten: string;
    ngay: string;
    den: string;
    noiDung: string;
    color?: string;
}
@Component({
    selector: 'app-nhat-ky',
    templateUrl: './nhat-ky.component.html',
    styleUrls: ['./nhat-ky.component.scss'],
})
export class NhatKyComponent implements OnInit {
    @Input() itemDonSelected: IDonTu;
    @Input() loaiDonSelected: CacLoaiDonEnum;
    loaiDon: CacLoaiDonEnum;
    constructor() {}
    ngOnInit() {
        this.list.forEach(element => {
            element.color = this.listColor[Math.floor(Math.random() * this.listColor.length)];
        });
    }
    listColor = ['#e40017', '#e45826', '#f7ea00', '#9ede73', '#7868e6', 'blue'];
    list: IList[] = [
        {
            id: 1,
            loai: 'Chỉnh sửa',
            ten: 'Lưu Văn Công',
            ngay: '12:35:34 - 18/03/2021',
            den: 'Nguyễn Đình Đức',
            noiDung:
                'Cảm ơn trong mail xin nghỉ việc là một phần quan trọng. Hãy cảm ơn công ty vì đã tạo cơ hội cho bạn làm việc và thể hiện sự biết ơn vì đã có được những kinh nghiệm quý báu thông qua những dự án hoặc công việc được giao.',
        },
        {
            id: 2,
            loai: 'Tạo quyết định',
            ten: 'Trịnh Xuân Thành',
            ngay: '13:35:00 - 20/03/2021',
            den: 'Nguyễn Đình Đức',
            noiDung: '1 2 3 4 2 3 1, hình như anh nói anh yêu em rồi.',
        },
        {
            id: 3,
            loai: 'Trình cấp trên',
            ten: 'Phạm Văn Long',
            ngay: '08:35:34 - 25/03/2021',
            den: 'Nguyễn Đình Đức',
            noiDung: 'Đừng nói chi mà mình uống đi',
        },
        {
            id: 4,
            loai: 'Xin ý kiến',
            ten: 'Nguyễn Hoàng',
            ngay: '20:00:34 - 10/03/2021',
            den: 'Nguyễn Đình Đức',
            noiDung: 'Đừng nói chi mà mình uống đi',
        },
        {
            id: 4,
            loai: 'Xin ý kiến',
            ten: 'Nguyễn Hoàng',
            ngay: '20:00:34 - 10/03/2021',
            den: 'Nguyễn Đình Đức',
            noiDung: 'Đừng nói chi mà mình uống đi',
        },
        {
            id: 4,
            loai: 'Xin ý kiến',
            ten: 'Nguyễn Hoàng',
            ngay: '20:00:34 - 10/03/2021',
            den: 'Nguyễn Đình Đức',
            noiDung: 'Đừng nói chi mà mình uống đi',
        },
        {
            id: 4,
            loai: 'Xin ý kiến',
            ten: 'Nguyễn Hoàng',
            ngay: '20:00:34 - 10/03/2021',
            den: 'Nguyễn Đình Đức',
            noiDung: 'Đừng nói chi mà mình uống đi',
        },
        {
            id: 4,
            loai: 'Xin ý kiến',
            ten: 'Nguyễn Hoàng',
            ngay: '20:00:34 - 10/03/2021',
            den: 'Nguyễn Đình Đức',
            noiDung: 'Đừng nói chi mà mình uống đi',
        },
        {
            id: 4,
            loai: 'Xin ý kiến',
            ten: 'Nguyễn Hoàng',
            ngay: '20:00:34 - 10/03/2021',
            den: 'Nguyễn Đình Đức',
            noiDung: 'Đừng nói chi mà mình uống đi',
        },
    ];
    ngOnChanges(changes: SimpleChanges): void {
        if (changes) {
            if (this.loaiDonSelected !== this.loaiDon) {
                // this.list = null;
                this.loaiDon = this.loaiDonSelected;
            }
        }
    }
}
