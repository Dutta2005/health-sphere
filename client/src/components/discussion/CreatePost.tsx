import React, { useState, useEffect } from 'react';
import { api } from '../../api/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "../ui/select";
import { Plus, Pencil } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { useNavigate } from 'react-router';

interface Post {
    _id: string;
    title: string;
    content: string;
    tags: string[];
}

interface PostFormProps {
    post?: Post;
    trigger?: React.ReactNode;
}

const CreatePost: React.FC<PostFormProps> = ({ post, trigger }) => {
    const tags = ['Help', 'Discussion', 'Advice', 'Question', 'General'];
    const isEditing = !!post;
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tag: ''
    });

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title,
                content: post.content,
                tag: post.tags[0]?.toLowerCase() || ''
            });
        }
    }, [post]);

    const handleSubmit = async () => {
        try {
            if (isEditing) {
                await api.patch(`/posts/edit/${post._id}`, {
                    title: formData.title,
                    content: formData.content,
                    tags: [formData.tag]
                });
                toast({
                    title: "Success!",
                    description: "Your post has been updated.",
                });
            } else {
                await api.post('/posts/create', {
                    title: formData.title,
                    content: formData.content,
                    tags: [formData.tag]
                });
                toast({
                    title: "Success!",
                    description: "Your post has been created.",
                });
            }
            
            setFormData({ title: '', content: '', tag: '' });
            
            setOpen(false);

            if (isEditing) {
                navigate(`/discussions/${post._id}`);
                window.location.reload();
            } else {
                navigate(`/discussions`);
                window.location.reload();
            }
            
        } catch (error: any) {
            console.error(`Failed to ${isEditing ? 'update' : 'create'} post`, error);
            toast({
                title: "Error",
                description: `Failed to ${isEditing ? 'update' : 'create'} post. Please try again.`,
                variant: "destructive",
            });
        }
    };

    const defaultTrigger = (
        <Button variant="default">
            {isEditing ? (
                <>
                    <Pencil className="mr-2" /> Edit Post
                </>
            ) : (
                <>
                    <Plus className="mr-2" /> Create Post
                </>
            )}
        </Button>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || defaultTrigger}
            </DialogTrigger>
            <DialogContent className="dark:text-dark-text">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Post' : 'Create New Post'}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                    />
                    <Textarea
                        placeholder="What's on your mind?"
                        value={formData.content}
                        onChange={(e) =>
                            setFormData({ ...formData, content: e.target.value })
                        }
                    />
                    <Select
                        value={formData.tag}
                        onValueChange={(value) =>
                            setFormData({ ...formData, tag: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a tag" />
                        </SelectTrigger>
                        <SelectContent>
                            {tags.map((tag) => (
                                <SelectItem key={tag} value={tag.toLowerCase()}>
                                    {tag}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={handleSubmit}
                        disabled={!formData.title || !formData.content || !formData.tag}
                        className="bg-accent dark:bg-accent"
                    >
                        {isEditing ? 'Save Changes' : 'Post'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePost;