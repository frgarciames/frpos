export const NotFoundError = (table: string, record: any) => {
  return new Error(`(${table}:${record}) not found`);
};
