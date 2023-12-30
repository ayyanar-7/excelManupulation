import { Component } from '@angular/core';
import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-excel-js',
  templateUrl: './excel-js.component.html',
  styleUrls: ['./excel-js.component.scss']
})
export class ExcelJSComponent {
  excelData: any[] = [];
  finalData: any[] = [];
  result:any[]=[];
  status!: boolean;
  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.readExcel(file);
    }
  }

  async readExcel(file: File): Promise<void> {
    const reader = new FileReader();
  
    reader.onload = async (e: any) => {
      const data = e.target.result;
      const arrayBuffer = new Uint8Array(data);
      const workbook = new ExcelJS.Workbook();
  
      try {
        await workbook.xlsx.load(arrayBuffer);
  
        const jsonData: any[] = [];
        console.log("workbook------------",workbook);
        
        const firstSheet = workbook.worksheets[0];
  
        firstSheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
          const rowData: any = [];
  
          row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            // console.log("cell",cell );
            
            if (cell.text !== null && cell.text !== undefined && cell.text !=='') {
              const cellData: any = {
                  name: cell.text,
                  space: cell.alignment?.indent,
              };
              rowData.push(cellData);
            }
            
          });
          if(rowData.length === 0) return
          jsonData.push(rowData);
        });
  
        this.excelData = jsonData;
        console.log('json', jsonData);
  
        if (jsonData.length === 0) {
          console.error('No data found in the workbook.');
          return;
        }
        jsonData.forEach((row, rowIndex) => {
          row.forEach((cell:any, colIndex:any) => {
            // console.log(`Row ${rowIndex + 1}, Col ${colIndex + 1}: Text = ${cell.value}, Alignment = `, cell.alignment);
          });
        });
      this.hierarchy(); 
      } catch (error) {
        console.error('Error loading workbook:', error);
      }
    };
  
    reader.readAsArrayBuffer(file);
  }

  convertToObjects(data: any[]): any[] {
    return data.map((item, index) => ({ id: index + 1, name: item[0].name , space: item[0].space}));
  }

  hierarchy() {

    const json = this.convertToObjects(this.excelData);
    
    this.result = this.convertToObjectsWithHierarchy(json);
    console.log("result............",this.result);
    let cons =this.result
    console.log(")))))))))",cons)
    let test = this.validation(this.result)
    if(1){
      console.log("result",cons,'ppppppppp',test);
      this.finalData = this.result;
    }
    
    
  }

  convertToObjectsWithHierarchy(data: any[]): any[] {
    const result: any[] = [];
    let parentStack: any[] = [];

    data.forEach(item => {
      const name = item.name;
      const spaces = item.space;      

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

//   validation(data: any[]): boolean {
//     const nameSet = new Set<string>();
//     const hierarchyMap: { [parentId: string]: string } = {};

//     for (let i = 0; i < data.length; i++) {
//         const currentName = data[i].name;
//         const currentParentId = data[i].parentId;

//         // Split the currentName by space
//         const nameParts = currentName.split(' ');

//         // Check if the last part of the name has only one space
//         const lastPart = nameParts[nameParts.length - 1];
//         if (lastPart.trim().split(' ').length === 1) {
//             console.error(`Error: Last part of the name '${currentName}' has only one space at index ${i}.`);
//             return false;
//         }

//         if (i > 0) {
//             const previousHierarchy = hierarchyMap[currentParentId] || '';
//             const currentHierarchy = `${previousHierarchy}-${currentName}`;

//             if (nameSet.has(currentName) || nameSet.has(currentHierarchy)) {
//                 console.error(`Error: Repeated name '${currentName}' or hierarchy structure starting with '${currentParentId}' at index ${i}.`);
//                 return false;
//             }

//             hierarchyMap[currentParentId] = currentHierarchy;
//         } else {
//             hierarchyMap['null'] = currentName;
//         }

//         nameSet.add(currentName);
//     }

//     return true;
// }
  validation(data: any) {
    for (let i = 0; i < data.length; i++) {
        const currentName = data[i].name;
        let currentParentId = data[i].parentId;
        currentParentId = currentParentId == null ? 0 : currentParentId;
        console.log("currentName", currentName, "currentParentId", currentParentId,data)
        for (let j = 0; j < i; j++) {
            const previousName = data[j].name;
            let previousParentId = data[j].parentId;
            previousParentId = previousParentId == null ? 0 : previousParentId;
            console.log("previousName", previousName, "previousParentId", previousParentId)
            if (currentParentId >= previousParentId) {
              data.splice(j, 1);
              continue;
            }
            if (currentName === previousName && currentParentId !== previousParentId) {
                console.error(`Error: Repeated name '${currentName}' found for different parents, at index ${i}.`);
                return false;
            }
        }

        if (currentParentId === null) {
            for (let k = 0; k < i; k++) {
                const previousRootParentId = data[k].parentId;
                if (previousRootParentId === null) {
                    console.error(`Error: Root parent repeated at index ${i}.`);
                    return false;
                }
            }
        }
    }

    return data;
}


//   validation(data: any[]): boolean {
//     for (let i = 0; i < data.length; i++) {
//         const currentName = data[i].name;
//         const currentParentId = data[i].parentId;
//         console.log("currentName",currentName,"currentParentId",currentParentId)
//         for (let j = 0; j < i; j++) {
//             const previousName = data[j].name;
//             const previousParentId = data[j].parentId;
//             // if(currentParentId > previousParentId)
//             console.log("previousName",previousName,"previousParentId",previousParentId);
//             // && currentParentId === previousParentId
//             if (currentName === previousName && currentParentId !== previousParentId) {
//                 console.error(`Error: Repeated name '${currentName}' found within the same parent, at index ${i}.`);
//                 return false;
//             }
//         }
//         if (currentParentId === null && i > 0) {
//             console.error(`Error: Root parent repeated, id ${data[i].id}.`);
//             return false;
//         }
//     }
//     return true;
// }



}
