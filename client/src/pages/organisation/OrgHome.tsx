// import { useSelector } from "react-redux"
// import OrgCreatePost from "../../components/organisation/post/CreatePost"
// import { RootState } from "../../store/store"
// import OrganizationLandingPage from "../../components/organisation/OrganizationLandingPage"

// function OrgHome() {
//     const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
//     return (
//         <div>
//             {isAuthenticated ? (
//         <div>
//             <OrgCreatePost />
//         </div>
//         ) : (
//             <OrganizationLandingPage />
//         )}
//         </div>
//     )
// }

// export default OrgHome


import React, { useEffect, useState } from 'react'
import { Card } from "../../components/ui/card"
import { MessageSquare, User, Calendar, Activity } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { NumberTicker } from "../../components/ui/number-ticker"
import OrgCreatePost from "../../components/organisation/post/CreatePost"
import { api } from '../../api/api'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'

// Types for the posts and comments coming from the API
interface Comment {
  _id: string
  content: string
  user: string
  likes: number
  createdAt: string
}

interface Post {
  _id: string
  title: string
  content: string
  organization: string
  commentsCount: number
  createdAt: string
  comments: Comment[]
}

// interface FetchLatestPostsResponse {
//   data: {
//     posts: Post[]
//   }
// }

// API call to fetch the latest posts for a given organization
async function fetchLatestPosts(organizationId: string): Promise<Post[]> {
    try {
      const response = await api.get(`org-posts/organization/${organizationId}`);
      const posts: Post[] = response.data?.data || [];
  
      // Fetch comments for each post and attach them
      const postsWithComments = await Promise.all(
        posts.map(async (post) => {
          try {
            const commentsResponse = await api.get(`comments/post/${post._id}`);
            const comments: Comment[] = commentsResponse.data?.comments || [];
            return { ...post, comments, commentsCount: comments.length };
          } catch (error) {
            console.error(`Error fetching comments for post ${post._id}:`, error);
            return { ...post, comments: [], commentsCount: 0 };
          }
        })
      );
  
      return postsWithComments;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }
  

// A card to display individual posts
const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10"></div>
      <div className="relative p-8 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
              <User className="w-6 h-6 text-primary" />
            </div>  
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {post.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <span className="text-sm font-medium px-4 py-1 rounded-full bg-primary/5 dark:bg-primary/10 text-primary">
            Organization
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
          {post.content}
        </p>

        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <MessageSquare className="w-4 h-4 mr-2" />
              <span>{post.commentsCount} Comments</span>
            </div>
            {/* <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <ThumbsUp className="w-4 h-4 mr-2" />
              <span>{post.likes} Likes</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

function OrgHome() {
  // State to store the fetched posts
//   const role = useSelector((state: RootState) => state.auth.role);
  const [posts, setPosts] = useState<Post[]>([])
  // Replace with the actual organization ID
//   const organizationId = role == 'organization' ? useSelector((state: RootState) => state.auth.organization?.id) : ''
    const organizationId = useSelector((state: RootState) => state.auth.organization?.id);
    console.log("Organisation Id: ", organizationId)

  // Fetch posts when the component mounts or when organizationId changes
  // Update the useEffect to handle undefined fetchedPosts
   useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (organizationId) {
          const fetchedPosts = await fetchLatestPosts(organizationId)
          // Ensure posts is always an array
          setPosts(fetchedPosts || [])
        } else {
          console.error("Organization ID is undefined")
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error)
        // Optionally set posts to empty array on error
        setPosts([])
      }
    }
    fetchPosts()
  }, [organizationId])

  // Derive total counts from the posts
  const totalPosts = posts.length
  const totalComments = posts.reduce((acc, post) => acc + post.commentsCount, 0)
//   const totalLikes = posts.reduce((acc, post) => acc + post.likes, 0)

  // Stats array for the dashboard section
  const stats = [
    {
      icon: MessageSquare,
      label: "Total Posts",
      value: totalPosts,
      suffix: "+",
      color: "primary",
    },
    {
      icon: User,
      label: "Total Comments",
      value: totalComments,
      suffix: "+",
      color: "secondary",
    },
    {
      icon: Activity,
      label: "Engagement Rate",
      value: totalComments / totalPosts,
      suffix: "%",
      color: "primary",
    },
  ]

  

  // Gather all comments from all posts, sort them by created date (descending), and get the three most recent
  const recentComments = posts
  .flatMap(post => post.comments || []) // Fallback to empty array if comments is undefined
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 3)

  console.log

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-bg to-white dark:from-dark-bg dark:to-dark-bg/95 dark:text-dark-text pb-10">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary opacity-10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent opacity-10 blur-[100px]" />
      </div>

      <div className="relative container mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-3 align-center gap-6 mb-8">
          {stats.map(({ icon: Icon, label, value, suffix, color }) => (
            <Card
              key={label}
              className="p-8 border-0 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-primary/5">
                  <Icon className={`w-8 h-8 text-${color}`} />
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold flex justify-center items-baseline">
                    <NumberTicker value={value} />
                    <span className="text-2xl ml-1">{suffix}</span>
                  </div>
                  <p className="text-light-text/80 dark:text-dark-text/80">
                    {label}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post Section */}
            <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10"></div>
              <div className="relative p-8">
                <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
                <OrgCreatePost />
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))
              ) : (
                <p className="text-center text-gray-500">No posts available.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent dark:from-secondary/10"></div>
              <div className="relative p-8">
                <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentComments.length > 0 ? (
                    recentComments.map((comment) => (
                      <div key={comment._id} className="p-4 rounded-lg bg-white/50 dark:bg-dark-bg/50">
                        <div className="flex items-center space-x-2 mb-2">
                            <User className="w-6 h-6 text-primary" />
                          <span className="font-medium text-sm">{comment.user}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No recent comments.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrgHome
