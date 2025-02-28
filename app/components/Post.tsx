"use server";
import { deletePost, getPosts } from "@/actions/auth";
import { auth } from "@/auth";
import Member from "../models/Members";

export default async function Post() {
  const posts = await getPosts();
  const session = await auth();
  console.log(session);
  const user = await Member.findOne({ email: session?.user?.email });

  async function deleteHandler(postId: string) {
    "use server"; // Ensures the function runs on the server
    await deletePost(postId);
  }

  if (posts && posts.length > 0) {
    return posts.map((post, index) => (
      <div className="border p-4 w-full max-w-80" key={index}>
        <div>{post.title}</div>
        <div>{post.message}</div>
        <div className="">
          {user?.membership === true ? (
            <div>Created by: {post.createdBy}</div>
          ) : (
            <div>Created by: Anonymous</div>
          )}
          <div>Date: {new Date(post.createdAt).toLocaleString()}</div>
        </div>
        {user?.admin === true && (
          <form action={deleteHandler}>
            <input type="hidden" name="postId" value={post._id} />
            <button type="submit">Delete</button>
          </form>
        )}
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
