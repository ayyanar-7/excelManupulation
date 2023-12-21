import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { Request, Response} from 'express';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get('exportToExcel')
  async exportToExcel(@Res() res: Response) {
    try {
      const excelBuffer = await this.excelService.getExcelBuffer(); // Replace with your logic to get Excel buffer

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=exported_file.xlsx');

      res.status(HttpStatus.OK).send(excelBuffer);
    } catch (error) {
      console.error(error);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to download Excel file',
      });
    }
  }
}
