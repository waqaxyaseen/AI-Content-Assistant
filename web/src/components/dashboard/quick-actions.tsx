'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Share2,
  Mail,
  Megaphone,
  Calendar,
  BarChart3,
  Settings,
  Users
} from 'lucide-react'

const quickActions = [
  {
    title: 'Create Blog Post',
    description: 'AI-powered blog content',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Social Media Post',
    description: 'Generate social content',
    icon: Share2,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Email Campaign',
    description: 'Create email content',
    icon: Mail,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    title: 'Advertisement',
    description: 'Generate ad copy',
    icon: Megaphone,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    title: 'Content Calendar',
    description: 'Plan your content',
    icon: Calendar,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  },
  {
    title: 'Analytics Report',
    description: 'View performance',
    icon: BarChart3,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  }
]

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Start creating content with AI assistance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={action.title}
                variant="ghost"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-gray-50"
              >
                <div className={`p-3 rounded-full ${action.bgColor}`}>
                  <Icon className={`h-6 w-6 ${action.color}`} />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-gray-500">{action.description}</div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}