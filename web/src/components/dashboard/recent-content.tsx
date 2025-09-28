'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Share2, Mail, Eye, Edit3, MoreHorizontal } from 'lucide-react'

const recentContent = [
  {
    id: '1',
    title: '10 AI Trends Shaping the Future of Marketing',
    type: 'blog',
    status: 'published',
    views: 1240,
    engagement: '8.2%',
    createdAt: '2 hours ago',
    author: 'Sarah Johnson'
  },
  {
    id: '2',
    title: 'Product Launch: Revolutionary AI Assistant',
    type: 'social',
    status: 'scheduled',
    views: 0,
    engagement: '0%',
    createdAt: '5 hours ago',
    author: 'Mike Chen'
  },
  {
    id: '3',
    title: 'Weekly Newsletter: AI Industry Updates',
    type: 'email',
    status: 'draft',
    views: 0,
    engagement: '0%',
    createdAt: '1 day ago',
    author: 'Emily Rodriguez'
  },
  {
    id: '4',
    title: 'Holiday Sale Campaign Copy',
    type: 'ad',
    status: 'published',
    views: 850,
    engagement: '12.5%',
    createdAt: '2 days ago',
    author: 'David Park'
  }
]

const getIcon = (type: string) => {
  switch (type) {
    case 'blog': return FileText
    case 'social': return Share2
    case 'email': return Mail
    case 'ad': return Eye
    default: return FileText
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'published': return 'bg-green-100 text-green-800'
    case 'scheduled': return 'bg-blue-100 text-blue-800'
    case 'draft': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function RecentContent() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Content</CardTitle>
            <CardDescription>
              Your latest content pieces and their performance
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentContent.map((content) => {
            const Icon = getIcon(content.type)
            return (
              <div key={content.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {content.title}
                    </h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(content.status)}`}>
                      {content.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{content.author}</span>
                    <span>•</span>
                    <span>{content.createdAt}</span>
                    {content.status === 'published' && (
                      <>
                        <span>•</span>
                        <span>{content.views} views</span>
                        <span>•</span>
                        <span>{content.engagement} engagement</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}