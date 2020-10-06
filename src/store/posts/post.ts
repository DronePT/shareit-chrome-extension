interface User {
  name: string;
  avatar: string;
}
export interface Post {
  title: string;
  image: string;
  description: string;
  url: string;
  likes: User[];
  sharedBy: User;
}
