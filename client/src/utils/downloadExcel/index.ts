import ExportJsonExcel from "js-export-excel";

export interface option {
  fileName?: string;
  datas?: any;
}

export interface excelConfigCeof {
  title: string;
  value: string;
}

export interface PropsCeof extends option {
  options: Array<excelConfigCeof>;
  data: Array<any>;
}

 function downloadExcel(excelConfg: PropsCeof) {
  const { fileName, data, options } = excelConfg;
  var option: option = {
    fileName: fileName ? fileName : "表格"
  };
  let sheetFilter:Array<any>=[];
  options.forEach((itme) => {
    sheetFilter.push(itme.title);
  });
  let dataTable: Array<any> = [];
  if (data) {
    for (let i in data) {
      if (data) {
        let obj = {};
        options.forEach((itme) => {
          obj[itme.title] = data[i][itme.value];
        });
        dataTable.push(obj);
      }
    }
  }
  option.datas = [
    {
      sheetData: dataTable,
      sheetName: "sheet",
      sheetFilter: sheetFilter,
      sheetHeader: sheetFilter,
    },
  ];

  var toExcel = new ExportJsonExcel(option);
  toExcel.saveExcel();
}
export {downloadExcel}