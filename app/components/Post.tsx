import { getPosts } from "@/actions/auth";
import { auth } from "@/auth";
import Member from "../models/Members";

export default async function Post() {
  const posts = await getPosts();
  const session = await auth();
  console.log(session);
  const user = await Member.findOne({ email: session?.user?.email });

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
