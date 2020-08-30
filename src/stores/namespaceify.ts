export interface Keys {
  getters?: Record<string, string>;
  actions?: Record<string, string>;
  mutations?: Record<string, string>;
}
export const namespaceify = <T extends Keys>(namespace: string, obj: T): T => {
  const newObj = JSON.parse(JSON.stringify(obj));

  Object.keys(newObj).forEach(key => {
    const keySpace = newObj[key];
    Object.entries(keySpace).forEach(([key, value]) => {
      keySpace[key] = `${namespace}/${value}`;
    });
  });

  return newObj;
};
