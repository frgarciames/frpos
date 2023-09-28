export const AlreadyExistsError = (table: string, record: string) => {
  return new Error(`(${table}:${record}) already exists`);
};
