import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ok: boolean
  data?: any
  error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const key = process.env.GOOGLE_API_KEY
  if (!key) return res.status(500).json({ ok: false, error: 'Server missing GOOGLE_API_KEY' })

  const address = req.query.address?.toString()
  if (!address) return res.status(400).json({ ok: false, error: 'Missing address query param' })

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${encodeURIComponent(key)}`
    const r = await fetch(url)
    if (!r.ok) return res.status(502).json({ ok: false, error: 'Upstream error' })
    const json = await r.json()
    return res.status(200).json({ ok: true, data: json })
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: String(err) })
  }
}
