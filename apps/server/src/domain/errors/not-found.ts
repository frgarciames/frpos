export const NotFoundError = (table: string, record: string) => {
  return new Error(`(${table}:${record}) not found`);
};
