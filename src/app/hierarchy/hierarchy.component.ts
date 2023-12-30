import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent {

  excelData: any[] = [];

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.readExcel(file);
    }
  }

  readExcel(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[];
      const headers: string[] = jsonData[0];
      jsonData.shift();

      this.excelData = jsonData.map(row => {
        const obj: any = {};

        headers.forEach((header, index) => {
          obj[header] = row[index];
        });

        return obj;
      });

      console.log(this.excelData);
    };

    reader.readAsBinaryString(file);
  }

  convertToObjects(data: any[]): any[] {
    return data.map((item, index) => ({ id: index + 1, name: item['Name'] }));
  }

  heirarchy() {
    const json = this.convertToObjects(this.excelData);
    const result = this.convertToObjectsWithHierarchy(json);
    console.log(result);
    this.excelData = result
  }

  convertToObjectsWithHierarchy(data: any[]): any[] {
    const result: any[] = [];
    let parentStack: any[] = [];

    data.forEach(item => {
      const name = item.name;
      console.log("Name",item.name);
      const spaces = name.match(/^(\s*)/)?.[0].length || 0;

      const newItem = { id: item.id, name, parentId: null };

      while (parentStack.length > 0 && parentStack[parentStack.length - 1].spaces >= spaces) {
        parentStack.pop();
      }

      if (parentStack.length > 0) {
        newItem.parentId = parentStack[parentStack.length - 1].id;
      }

      parentStack.push({ id: item.id, spaces });

      result.push(newItem);
    });

    return result;
  }
}
