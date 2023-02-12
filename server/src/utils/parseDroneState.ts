export function parseState(state: string) {
  return state
    .split(";")
    .map((x) => x.split(":"))
    .reduce((data, [key, value]) => {
      if (key && value) {
        data[key] = value;
      }

      return data;
    }, {} as { [key: string]: string });
}
