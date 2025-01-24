import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { api } from '../../api/api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock, User, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import DiscussionPostSkeleton from './DiscussionPostSkeleton';
import CommentSection from './CommentSection';

interface PostDetail {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    author: {
        name: string;
        _id: string;
    };
    createdAt: string;
}

const DiscussionPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState<PostDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (!id) {
                    throw new Error('No post ID provided');
                }
                const response = await api.get(`/posts/${id}`);
                setPost(response.data.data);
                setIsLoading(false);
            } catch (err: any) {
                const errorMessage = err.response?.data?.message || 
                                     err.message || 
                                     'Failed to fetch post';
                setError(errorMessage);
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) return (
        <DiscussionPostSkeleton />
    );

    if (error) return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </div>
    );

    if (!post) return null;

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Card className='bg-transparent'>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                        <Badge variant="secondary">{post.tags[0]}</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent >
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                                <User size={16} />
                                <span>{post.author.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock size={16} />
                                <span>{formatDate(post.createdAt)}</span>
                            </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 break-words">{post.content}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <CommentSection postId={post._id} />
                </CardFooter>
            </Card>
        </div>
    );
};

export default DiscussionPost;