export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  userId: string;
  message: string;
  postedAt: string;
}

export interface Post {
  id: string;
  name: string;
  avatarUrl: string;
  message: string;
  postedAt: string;
  users: User[];
  replyComment: Comment[];
}

export interface Author {
  name: string;
  avatarUrl: string;
}

export interface FavoritePerson {
  name: string;
  avatarUrl: string;
}

export interface Blog {
  id: string;
  publish: string;
  metaKeywords: string[];
  content: string;
  comments: Comment[];
  tags: string[];
  metaTitle: string;
  createdAt: string;
  title: string;
  coverUrl: string;
  totalViews: number;
  totalShares: number;
  totalComments: number;
  totalFavorites: number;
  metaDescription: string;
  description: string;
  author: Author;
  favoritePerson: FavoritePerson[];
}

export interface BlogResponse {
  posts: Blog[],
}

export interface PostResponse {
  post: Blog,
}
