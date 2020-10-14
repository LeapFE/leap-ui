type List = number[] | string[];
// type List = Array<string | number>;

const list: List = [1, 2, 3];
const anotherList: List = ["1", "2", "3"];

// function isEveryNumber(list: List): list is number[] {
//   return list.every((l: unknown) => typeof l === "number");
// }

// function isEveryString(list: List): list is number[] {
//   return list.every((l: unknown) => typeof l === "string");
// }

// function _map(list: List) {
//   if (isEveryString(list)) {
//     return list.map((l) => {
//       return l.toString();
//     });
//   }
//   if (isEveryNumber(list)) {
//     return list.map((l) => {
//       return l.toString();
//     });
//   }

//   return [];
// }

function _map(list: List): string[] {
  return (list as Array<string | number>).map((item) => {
    return item.toString();
  });
}

_map(list);
_map(anotherList);
