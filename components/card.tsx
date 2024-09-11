'use client'

import * as React from "react"


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CardTypes {
    title: string
    description?: string
    count: number
    icon: React.ReactElement 
}

export function CardMetric({ title, description, count, icon }: CardTypes) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-10">
            <span className="mr-1">{count}</span> 
            {icon} 
          </div>
        </CardContent>
      </Card>
    )
  }
