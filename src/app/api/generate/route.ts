import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { jobPost, aboutYou } = await req.json()

  const fakeProposal = `
Hello,

I’m excited about the opportunity to work on your project. With my background in ${aboutYou.trim()}, I’ve successfully completed similar projects that required strong attention to detail, clear communication, and timely delivery.

After reviewing your job post, I believe I can provide excellent value and exceed expectations. I’m confident that my experience aligns with your goals and I’m ready to begin right away.

Let’s connect and discuss how I can help bring your project to life.

Best regards,  
— A Dedicated Freelancer
`

  return NextResponse.json({ proposal: fakeProposal })
}
