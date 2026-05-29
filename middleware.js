import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const path = req.nextUrl.pathname

  // Only run on /admin routes
  if (!path.startsWith('/admin')) {
    return res
  }

  try {
    // Create supabase client for middleware
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return parseCookieHeader(req.headers.get('Cookie') ?? '')
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              res.headers.append(
                'Set-Cookie',
                serializeCookieHeader(name, value, options)
              )
            })
          },
        },
      }
    )

    const { data: { session } } = await supabase.auth.getSession()

    // Not logged in - redirect to login
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Check admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    // Not admin - redirect to home
    if (!profile || profile.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return res

  } catch (err) {
    console.error('Middleware error:', err)
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/admin/:path*']
}
