interface User {
  name: string;
  avatar: string;
}
export interface Post {
  _id: string;
  title: string;
  image: string;
  description: string;
  url: string;
  likes: User[];
  sharedBy: User;
}
