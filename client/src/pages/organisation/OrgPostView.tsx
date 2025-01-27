import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { formatDistanceToNow } from "date-fns";
import { Landmark, Calendar, RefreshCw } from "lucide-react";
import { api } from "../../api/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import PostSkeleton from "../../components/organisation/post/PostSkeleton";
import CommentSection from "../../components/discussion/CommentSection";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface Post {
  _id: string;
  title: string;
  content: string;
  organization: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

function OrgPostView() {
  const postId = useParams<{ id: string }>().id;
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = useSelector((state: RootState) => state.auth.role);

  useEffect(() => {
    const getPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get(`/org-posts/${postId}`);
        setPost(response.data.data);
      } catch (err: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPost();
  }, [postId]);

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-3xl mx-auto mt-8 bg-primary/10 border-primary">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (!post) {
    return (
      <Alert className="max-w-3xl mx-auto mt-8 bg-secondary/10 border-secondary">
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>The requested post could not be found.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-1 md:p-6">
      <Card className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-light-bg dark:bg-dark-bg dark:text-dark-text">
        <CardHeader className="space-y-6 pb-6">
          <div className="flex items-center justify-between">
            <Link
              to={`/${role === "organization" ? "organisation/" : ""}org-profile/${post.organization._id}`}
              className="flex items-center gap-3 group"
            >
              <div className="bg-accent/10 p-3 rounded-full group-hover:bg-accent/20 transition-colors duration-200">
                <Landmark className="text-accent w-5 h-5" />
              </div>
              <div>
                <h2 className="font-medium text-light-text dark:text-dark-text group-hover:text-accent transition-colors duration-200">
                  {post.organization.name}
                </h2>
              </div>
            </Link>
            
            <div className="flex items-center gap-4 text-sm text-light-text/70 dark:text-dark-text/70">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-secondary" />
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
              </div>
              {post.updatedAt !== post.createdAt && (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-secondary" />
                  <span>{formatDistanceToNow(new Date(post.updatedAt), { addSuffix: true })}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold leading-tight">
              {post.title}
            </h1>
          </div>
        </CardHeader>

        <hr className="bg-light-text/10" />
        
        <CardContent className="py-8">
          <p className="leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </CardContent>

        <hr className="bg-light-text/10" />
        
        <CardFooter className="pt-6">

            <CommentSection postId={post._id} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default OrgPostView;