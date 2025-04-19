import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = body.name || '名無し'

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ message: '名前が無効です。' }, { status: 400 })
    }

    return NextResponse.json({ message: `こんにちは、${name}さん！` })
  } catch (error) {
    return NextResponse.json({ message: 'リクエストの処理中にエラーが発生しました。' }, { status: 500 })
  }
}
