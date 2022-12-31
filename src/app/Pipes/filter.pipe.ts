import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Pipe, PipeTransform } from '@angular/core';
import { HaircutRecored } from '../models/HaircutRecored';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: HaircutRecored[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    return items.filter(item=> {
        return item.user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            new Date(item.appointmentTime).getHours().toString().includes(searchText.toLowerCase());
        });
    } 

}