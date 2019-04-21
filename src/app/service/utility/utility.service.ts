import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

   public retirarFormatacao(numFormatado: string) {
        return numFormatado ? (numFormatado.replace(/\./g, '')).replace('-', '') : numFormatado;
    }

   public convertDateToString(data: Date) {
        return data ? data.toDateString() : null;
      }

    public  carregaParamsString(option: any, optionParams: any, optionName: string) {
        return option ? optionParams.set(optionName, option.toString()) : optionParams;
      }

    public carregaParamsId(option: any, optionParams: any, optionName: string) {
        return option ? optionParams.set(optionName, option.id.toString()) : optionParams;
      }

    public formataNumeracao(num: string) {
      return num ? (num.substring(0, 7) + '-' + num.substring(7, 9) + '.' + num.substring(9, 13) + '.' +
        num.substring(13, 14) + '.' + num.substring(14, 16) + '.' + num.substring(16, 20)) : '';
    }

}
