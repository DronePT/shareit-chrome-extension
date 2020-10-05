export interface Post {
  title: string;
  image: string;
  description: string;
  url: string;
  likes?: number;
  sharedBy: {
    name: string;
  };
}
