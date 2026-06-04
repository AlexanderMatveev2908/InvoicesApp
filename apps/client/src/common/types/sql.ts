export type SqlTable<T> = T & {
  id: number;
  createdAt: string;
};
