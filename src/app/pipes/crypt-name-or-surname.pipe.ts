import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cryptNameOrSurname'
})
export class CryptNameOrSurnamePipe implements PipeTransform {

  transform(value: String): String {
    let newResult = "";
    newResult += value[0];
    for(let i=1; i< value.length; i++){
      newResult += "*";
    }
    return newResult;
  }

}
