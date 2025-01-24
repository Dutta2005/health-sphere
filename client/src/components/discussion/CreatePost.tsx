import React, { useState } from 'react';
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
import { Plus } from 'lucide-react';

interface CreatePostProps {
    onPostCreated?: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
    const tags = ['Help', 'Discussion', 'Advice', 'Question', 'General'];

    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        tag: ''
    });

    const handleCreatePost = async () => {
        try {
            await api.post('/posts/create', {
                title: newPost.title,
                content: newPost.content,
                tags: [newPost.tag]
            });
            
            // Reset form
            setNewPost({ title: '', content: '', tag: '' });
            
            // Optional callback for parent component to refresh posts
            onPostCreated && onPostCreated();
        } catch (error: any) {
            console.error('Failed to create post', error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">
                    <Plus className="mr-2" /> Create Post
                </Button>
            </DialogTrigger>
            <DialogContent className='dark:text-dark-text'>
                <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        placeholder="Title"
                        value={newPost.title}
                        onChange={(e) =>
                            setNewPost({ ...newPost, title: e.target.value })
                        }
                    />
                    <Textarea
                        placeholder="What's on your mind?"
                        value={newPost.content}
                        onChange={(e) =>
                            setNewPost({ ...newPost, content: e.target.value })
                        }
                    />
                    <Select
                        value={newPost.tag}
                        onValueChange={(value) =>
                            setNewPost({ ...newPost, tag: value })
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
                        onClick={handleCreatePost}
                        disabled={!newPost.title || !newPost.content || !newPost.tag}
                        className='bg-accent dark:bg-accent'
                    >
                        Post
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePost;