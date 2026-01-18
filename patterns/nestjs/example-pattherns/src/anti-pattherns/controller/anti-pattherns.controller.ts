import { Controller, Get, Query } from '@nestjs/common';
import { SearchObjectsDto } from '../dto/search-object.dto';

//TODO ES demostrativo este controlador para explicar el anti-patron
@Controller('user')
export class AntiPatthernsController {
  @Get('search')
  searchObjectsAntiPattern(
    @Query('objectType') objectType: string,
    @Query('selectedObject') selectedObject: string,
    @Query('idNumber') idNumber: string,
    @Query('customs') customs: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ) {
    console.log('[SelectivityService] Parameters:', {
      objectType,
      selectedObject,
      idNumber,
      customs,
      fromDate,
      toDate,
    });
    return 'Example of a signature with excessive parameters';
  }

  @Get('search')
  searchObjectsWithOutAntiPattern(@Query() filters: SearchObjectsDto) {
    console.log(
      '[SelectivityService] Parameters received:',
      JSON.stringify(filters, null, 2),
    );

    console.table(filters);

    return 'Refactored example using DTO (Pattern: Parameter Object)';
  }
}
