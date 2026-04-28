import { Divider } from "@mantine/core";
import PostJob from "../PostJob/PostJob";

const PostPage = () => {
  return (
    // Added 'flex flex-col items-center' to help center the content if needed
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['Poppins'] py-4 px-4 text-white">
      <Divider size="xs" mb="md" />
      <div className="max-w-5xl mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-4 px-4">Post a Job</h1>
        
     {/* <Divider size="xs"  /> */}
        
        <PostJob />
      </div>
    </div>
  );
};

export default PostPage;