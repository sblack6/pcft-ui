import { BALANCE } from "./transaction-constants";

export function currencyFormatter(params: any) {
    if ( params && params.value) {
      let stringFormat = params.value.toFixed(2);
      if (stringFormat.indexOf('-') != -1 ) {
        stringFormat = stringFormat.replace("-", "- $ ");
      } else {
        stringFormat = '$ ' + stringFormat;
      }
      return stringFormat;
    }
}

export function cellHighlighter(params: any) {
    if ( params.colDef.field.includes(BALANCE)) {
      if (params.value < 0) {
        return {color: '#C70000'}
      } else if (params.value > 0) {
        return {color: '#15BF00'}
      } else {
        return {color: '#000000'}
      }
    }
}