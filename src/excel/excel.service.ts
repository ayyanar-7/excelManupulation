import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelService {
  async getExcelBuffer(){
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    const data = [
      { "Name": "John Doe", "Age": 30, "Country": "USA" },
      { "Name": "Jane Smith", "Age": 25, "Country": "Canada" },
      { "Name": "Bob Johnson", "Age": 40, "Country": "UK" },
      { "Name": "Alice Brown", "Age": 35, "Country": "Australia" },
      { "Name": "John Doe", "Age": 30, "Country": "USA" },
      { "Name": "Jane Smith", "Age": 25, "Country": "Canada" },
      { "Name": "Bob Johnson", "Age": 40, "Country": "UK" },
      { "Name": "Alice Brown", "Age": 35, "Country": "Australia" },
      { "Name": "John Doe", "Age": 30, "Country": "USA" },
      { "Name": "Jane Smith", "Age": 25, "Country": "Canada" },
      { "Name": "Bob Johnson", "Age": 40, "Country": "UK" },
      { "Name": "Alice Brown", "Age": 35, "Country": "Australia" }
      // Add more objects as needed
    ];

    // Add headers
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // Add data row by row
    data.forEach(item => {
      const row = headers.map(header => item[header]);
      worksheet.addRow(row);
    });

    const excelBuffer = await workbook.xlsx.writeBuffer();
    return excelBuffer;
  }
}
