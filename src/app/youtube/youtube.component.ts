import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent {
  title = 'angular-classes';
  users: any;

  readExcelFile(e: any): void {
    const file = e.target.files[0];
    const fr = new FileReader();

    fr.readAsArrayBuffer(file);

    fr.onload = () => {
      const data = fr.result as ArrayBuffer;
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetname = workbook.SheetNames[0];
      const sheet1 = workbook.Sheets[sheetname];

      this.users = XLSX.utils.sheet_to_json(sheet1, { raw: true });
      console.log("User",this.users);
    };
  }
}
