import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

interface Author {
    name?: string;
}

interface Post {
    _id: string;
    title: string;
    content: string;
    author?: Author;
    createdAt: string;
    tags?: string[];
}

const tagColors: Record<string, string> = {
    help: "bg-red-500 text-white",
    discussion: "bg-blue-500 text-white",
    advice: "bg-green-500 text-white",
    question: "bg-yellow-500 text-black",
    general: "bg-gray-500 text-white",
  };

function PostCard({ post }: { post: Post }) {
    const formatDate = (dateString: string) => {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };
    return (
        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span>{post.title}</span>
                                    {post.tags && post.tags.length > 0 && (
                                        <span className={`text-xs ${tagColors[post.tags[0]]} text-gray-200 px-2 py-1 rounded-full`}>
                                            {post.tags[0]}
                                        </span>
                                    )}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 break-words">
                                    {post.content}
                                </p>
                                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                    <span>{post.author?.name || "Anonymous"}</span>
                                    <span>{formatDate(post.createdAt)}</span>
                                </div>
                            </CardContent>
                        </Card>
    )
}

export default PostCard
