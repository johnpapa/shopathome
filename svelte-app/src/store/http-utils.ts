export const parseList = async <T>(response: Response) => {
  if (response.status !== 200) throw Error(`Error, status ${response.status}`);
  let list: T[] = await response.json();
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export const parseItem = async <T>(response: Response, code: number) => {
  if (response.status !== code) throw Error(`Error, status ${response.status}`);
  let item = await response.json();
  if (typeof item !== 'object') {
    item = undefined;
  }
  return item as T;
};
