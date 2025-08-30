export interface Bucket {
  name: string;
  createdAt: Date;
}

export interface ObjectMeta {
  name: string;
  size: number;
  lastModified: Date;
}
