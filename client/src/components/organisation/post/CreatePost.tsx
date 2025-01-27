import React, { useState } from 'react';
import { 
    Dialog,
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue 
} from "../../ui/select";
import { Plus } from 'lucide-react';
import { api } from '../../../api/api';
import { useToast } from '../../../hooks/use-toast';
import { useNavigate } from 'react-router';

interface OrgPostData {
    title: string;
    content: string;
    tag: string;
}

interface OrgCreatePostProps {
    onPostCreated?: () => void;
}

const OrgCreatePost: React.FC<OrgCreatePostProps> = ({ onPostCreated }) => {
    const orgTags = ['Announcement', 'Update', 'Event', 'Policy', 'General'];
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const [orgPost, setOrgPost] = useState<OrgPostData>({
        title: '',
        content: '',
        tag: ''
    });

    const handleCreateOrgPost = async () => {
        if (!isFormValid) return;
        
        setIsSubmitting(true);
        try {
            const response = await api.post('/org-posts/create', {
                title: orgPost.title.trim(),
                content: orgPost.content.trim(),
                tag: orgPost.tag
            });

            if (response.status === 201) {
                toast({
                    title: "Success",
                    description: "Post created successfully",
                });
                setOrgPost({ title: '', content: '', tag: '' });
                onPostCreated?.();
                navigate(`/organisation/post/${response.data.data._id}`);
            }
        } catch (error: any) {
            console.error('Failed to create organization post:', error);
            toast({
                title: "Error",
                description: error?.response?.data?.message || "Failed to create post",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = 
        orgPost.title.trim().length > 0 && 
        orgPost.content.trim().length > 0 && 
        orgPost.tag.length > 0;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="w-full md:w-auto bg-secondary dark:bg-secondary dark:text-dark-text">
                    <Plus className="mr-2 h-4 w-4" /> Create Post
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg dark:text-dark-text dark:bg-dark-bg">
                <DialogHeader>
                    <DialogTitle>Create Organization Post</DialogTitle>
                </DialogHeader>
                <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleCreateOrgPost();
                    }} 
                    className="space-y-4 mt-4"
                >
                    <div className="space-y-2">
                        <Input
                            placeholder="Post Title"
                            value={orgPost.title}
                            onChange={(e) => 
                                setOrgPost({ ...orgPost, title: e.target.value })
                            }
                            className="w-full"
                            required
                            maxLength={100}
                        />
                    </div>
                    <div className="space-y-2">
                        <Textarea
                            placeholder="Write your post content here..."
                            value={orgPost.content}
                            onChange={(e) => 
                                setOrgPost({ ...orgPost, content: e.target.value })
                            }
                            className="min-h-32"
                            required
                            maxLength={2000}
                        />
                    </div>
                    <div className="space-y-2">
                        <Select
                            value={orgPost.tag}
                            onValueChange={(value) => 
                                setOrgPost({ ...orgPost, tag: value })
                            }
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select post category" />
                            </SelectTrigger>
                            <SelectContent>
                                {orgTags.map((tag) => (
                                    <SelectItem 
                                        key={tag} 
                                        value={tag.toLowerCase()}
                                    >
                                        {tag}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className="w-full bg-accent dark:bg-accent dark:text-dark-text text-white"
                    >
                        {isSubmitting ? 'Publishing...' : 'Publish Post'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default OrgCreatePost;