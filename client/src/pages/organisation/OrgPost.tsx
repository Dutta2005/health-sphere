import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { api } from "../../api/api";
import { Landmark, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";
import PostSkeleton from "../../components/organisation/post/PostSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Post {
  _id: string;
  title: string;
  content: string;
  organization: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

const PostCard = ({ post }: { post: Post }) => {
  const role = useSelector((state: RootState) => state.auth.role);
  const truncateContent = (content: string, limit: number) => {
    return content.length > limit ? `${content.slice(0, limit)}...` : content;
  };

  return (
    <Link
      to={`/${role === "organization" ? "organization/" : ""}post/${post._id}`}
    >
      <Card className="rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent mb-2">
        <CardHeader>
          <Link
            to={`/${
              role === "organization" ? "organization/" : ""
            }org-profile/${post.organization._id}`}
            className="flex items-center gap-3 mb-1 -ml-2"
          >
            <div className="bg-accent/10 p-2 rounded-full">
              <Landmark size={16} className="text-accent" />
            </div>
            <h2 className="font-medium text-sm text-secondary-foreground">
              {post.organization.name}
            </h2>
          </Link>
          <h2 className="text-lg font-semibold text-foreground hover:text-accent transition-colors duration-200">
            {post.title}
          </h2>
        </CardHeader>

        <CardContent className="-mt-3">
          <p className="text-muted-foreground leading-relaxed">
            {truncateContent(post.content, 50)}
          </p>
        </CardContent>
        <CardFooter className="-mt-2">
          <p className="text-xs text-gray-500 text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

function OrgPost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/org-posts?page=${page}`);
      if (response.status === 200) {
        setPosts(response.data.data.posts);
        setCurrentPage(response.data.data.pagination.currentPage);
        setTotalPages(response.data.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-6">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <PostSkeleton key={index} />
              ))
            : posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>

        {!loading && posts.length > 0 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <Button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              variant="outline"
              className="gap-1"
            >
              <ChevronLeft size={16} />
              Previous
            </Button>
            <div className="px-4 py-2 rounded-md bg-accent/10 text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              className="gap-1"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrgPost;
