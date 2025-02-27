import PostForm from "../ui/PostForm";

export default function PostFormPage() {
  return (
    <div className="w-full flex mt-5 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">
          Create New Post
        </h1>
        <PostForm />
      </section>
    </div>
  );
}
