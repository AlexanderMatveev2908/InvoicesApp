export type SqlTable<T> = T & {
  id: string;
  createdAt: string;
};
