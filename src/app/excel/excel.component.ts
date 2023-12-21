import { Component } from '@angular/core';
import { ExcelService } from '../excel.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent {

  constructor(private excelService: ExcelService) {}

  
  
  exportExcel() {
    this.excelService.exportToExcel().subscribe(data => {
      this.downloadFile(data);
    });
  }

  private downloadFile(data: any) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'exported_file.xlsx';
    link.click();
  }
}
