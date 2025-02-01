// import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
// import { Clock, User } from "lucide-react";

// interface Author {
//     name?: string;
// }

// interface Post {
//     _id: string;
//     title: string;
//     content: string;
//     author?: Author;
//     createdAt: string;
//     tags?: string[];
// }

// const tagColors: Record<string, string> = {
//     help: "bg-primary text-white hover:bg-primary/90",
//     discussion: "bg-secondary text-white hover:bg-secondary/90",
//     advice: "bg-accent text-white hover:bg-accent/90",
//     question: "bg-secondary/80 text-white hover:bg-secondary/70",
//     general: "bg-gray-500 text-white hover:bg-gray-600",
// };

// function PostCard({ post }: { post: Post }) {
//     const formatDate = (dateString: string) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     return (
//         <Card className="hover:shadow-lg transition-all duration-300 border-l-4 dark:border-l-accent border-l-accent bg-light-bg dark:bg-dark-bg max-w-2xl">
//             <CardHeader className="pb-3">
//                 <CardTitle className="flex justify-between items-start gap-4">
//                     <h3 className="text-xl font-semibold text-light-text dark:text-dark-text line-clamp-2">
//                         {post.title}
//                     </h3>
//                     {post.tags && post.tags.length > 0 && (
//                         <span className={`${tagColors[post.tags[0].toLowerCase()]} px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors`}>
//                             {post.tags[0]}
//                         </span>
//                     )}
//                 </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//                 <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm break-words leading-relaxed">
//                     {post.content}
//                 </p>
//                 <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2">
//                     <div className="flex items-center gap-4">
//                         <div className="flex items-center gap-2">
//                             <User className="w-4 h-4" />
//                             <span>{post.author?.name || "Anonymous"}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <Clock className="w-4 h-4" />
//                             <span>{formatDate(post.createdAt)}</span>
//                         </div>
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }

// export default PostCard

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Clock, User, MessageSquare } from "lucide-react";

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
    help: "bg-primary/10 text-primary hover:bg-primary/20",
    discussion: "bg-secondary/10 text-secondary hover:bg-secondary/20",
    advice: "bg-accent/10 text-accent hover:bg-accent/20",
    question: "bg-secondary/10 text-secondary hover:bg-secondary/20",
    general: "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300",
};

const PostCard = ({ post }: { post: Post }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Card className="group w-full bg-white dark:bg-gray-800/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
            {/* Accent line with gradient */}
            <div className="h-1 w-full bg-gradient-to-r from-accent via-accent/80 to-accent/50"></div>
            
            <CardHeader className="pb-3 space-y-4">
                <div className="flex items-start justify-between gap-4">
                    {post.tags && post.tags.length > 0 && (
                        <span className={`${tagColors[post.tags[0].toLowerCase()]} px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors`}>
                            {post.tags[0]}
                        </span>
                    )}
                    <div className="flex gap-2">
                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <MessageSquare className="w-4 h-4 text-gray-400 hover:text-primary" />
                        </button>
                    </div>
                </div>
                
                <CardTitle>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-accent transition-colors">
                        {post.title}
                    </h3>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm break-words leading-relaxed">
                    {post.content}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-700">
                                <User className="w-3 h-3" />
                            </div>
                            <span className="hover:text-accent transition-colors">
                                {post.author?.name || "Anonymous"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-700">
                                <Clock className="w-3 h-3" />
                            </div>
                            <span>{formatDate(post.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PostCard;