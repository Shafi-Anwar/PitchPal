'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const jobCategories = [
  'Web Development',
  'Graphic Design',
  'Marketing',
  'Mobile Apps',
  'Writing & Translation',
]

const categorySkillsMap: Record<string, string[]> = {
  'Web Development': ['React', 'Next.js', 'TailwindCSS', 'TypeScript', 'Node.js'],
  'Graphic Design': ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop'],
  'Marketing': ['SEO', 'Email Marketing', 'Analytics', 'Copywriting'],
  'Mobile Apps': ['Flutter', 'React Native', 'Swift', 'Kotlin'],
  'Writing & Translation': ['Copywriting', 'Technical Writing', 'Proofreading', 'Translation'],
}

export default function Home() {
  const [category, setCategory] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [experience, setExperience] = useState('')
  const [jobPost, setJobPost] = useState('')
  const [result, setResult] = useState('')

  const skillsList = categorySkillsMap[category] || []

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const generateProposal = async () => {
    const aboutYou = `Category: ${category}
Skills: ${skills.join(', ')}
Experience: ${experience}`

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobPost, aboutYou }),
    })

    const data = await res.json()
    setResult(data.proposal)
  }

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-2xl font-bold">🎯 Generate a Winning Proposal</h1>

      <div className="space-y-2">
        <Label>Job Category</Label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
            setSkills([]) // clear skills on category change
          }}
          className="w-full border border-input bg-background p-2 rounded"
        >
          <option value="">Select a category</option>
          {jobCategories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Your Skills</Label>
        {skillsList.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Select a category to choose relevant skills.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skillsList.map((skill) => (
              <Button
                key={skill}
                variant={skills.includes(skill) ? 'default' : 'outline'}
                onClick={() => toggleSkill(skill)}
                size="sm"
              >
                {skill}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Experience Summary</Label>
        <Input
          placeholder="e.g. 2 years as a full-stack developer"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Job Post</Label>
        <Textarea
          placeholder="Paste the job post here..."
          rows={6}
          value={jobPost}
          onChange={(e) => setJobPost(e.target.value)}
        />
      </div>

      <Button onClick={generateProposal}>🚀 Generate Proposal</Button>

      {result && (
        <Card className="mt-6 bg-muted">
          <CardContent className="p-4 whitespace-pre-wrap">
            <h3 className="font-semibold mb-2">📝 AI-Generated Proposal:</h3>
            <p>{result}</p>
          </CardContent>
        </Card>
      )}
    </main>
  )
}
