import { getPosts } from "@/actions/auth";

export default async function Post() {
  const posts = await getPosts();

  if (posts && posts.length > 0) {
    return posts.map((post, index) => (
      <div className="border p-4 w-full max-w-80" key={index}>
        <div>{post.title}</div>
        <div>{post.message}</div>
        <div className="">
          <div>Created by: {post.createdBy}</div>
          <div>Date: {new Date(post.createdAt).toLocaleString()}</div>
        </div>
      </div>
    ));
  } else {
    return (
      <div>
        <p>No decisions found</p>
      </div>
    );
  }
}
