// utils/fetchPosts.ts
export interface Author {
  _id: string;
  name: string;
  email: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: Author;
  createdAt: string;
}


export async function fetchPosts(): Promise<Post[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }

  const res = await fetch(`${apiUrl}/posts`);
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export async function fetchPostsByAuthor(authorId: string): Promise<Post[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }

  const res = await fetch(`${apiUrl}/posts?author=${authorId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch posts by author");
  }

  return res.json();
}

export async function fetchPostbyId(id: string): Promise<Post> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }

  const res = await fetch(`${apiUrl}/posts/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch post with ID: ${id}`);
  }

  return res.json();
}
