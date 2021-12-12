export function compareByPosition(obj1, obj2, type = "ASC") {
  switch (type) {
    case "ASC":
      if (obj1.position < obj2.position) {
        return -1;
      }
      if (obj1.position > obj2.position) {
        return 1;
      }
      return 0;
    case "DESC":
      if (obj1.position > obj2.position) {
        return -1;
      }
      if (obj1.position < obj2.position) {
        return 1;
      }
      return 0;

    default:
      break;
  }
}

export function compareByName(obj1, obj2, type = "ASC") {
  switch (type) {
    case "ASC":
      if (obj1.name.toLowerCase() < obj2.name.toLowerCase()) {
        return -1;
      }
      if (obj1.name.toLowerCase() > obj2.name.toLowerCase()) {
        return 1;
      }
      return 0;
    case "DESC":
      if (obj1.name.toLowerCase() > obj2.name.toLowerCase()) {
        return -1;
      }
      if (obj1.name.toLowerCase() < obj2.name.toLowerCase()) {
        return 1;
      }
      return 0;

    default:
      break;
  }
}

export function compareByIndex(obj1, obj2, type = "ASC") {
  switch (type) {
    case "ASC":
      if (obj1.index < obj2.index) {
        return -1;
      }
      if (obj1.index > obj2.index) {
        return 1;
      }
      return 0;
    case "DESC":
      if (obj1.index > obj2.index) {
        return -1;
      }
      if (obj1.index < obj2.index) {
        return 1;
      }
      return 0;

    default:
      break;
  }
}
