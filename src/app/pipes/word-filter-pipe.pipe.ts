import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "wordFilterPipe",
})
export class WordFilterPipePipe implements PipeTransform {
  public transform(listOfWords: any, fiterValue: string): any {
    console.log("listOfWords", listOfWords);
    return listOfWords.filter((word) => {
      const filteredWord =
        !fiterValue || fiterValue.length === 0
          ? true
          : word.type.toLowerCase().indexOf(fiterValue.toLowerCase()) > -1;

      return filteredWord;
    });
  }
}
