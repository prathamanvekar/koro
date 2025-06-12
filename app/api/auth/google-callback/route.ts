import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const error = searchParams.get("error")

    if (error) {
      // Return an HTML page that sends error to parent window
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Google Auth Error</title>
        </head>
        <body>
          <script>
            window.opener?.postMessage({
              type: 'GOOGLE_ERROR',
              error: '${error}'
            }, window.location.origin);
            window.close();
          </script>
          <p>Authentication failed. This window will close automatically.</p>
        </body>
        </html>
        `,
        {
          headers: {
            "Content-Type": "text/html",
          },
        },
      )
    }

    if (!code) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Google Auth Error</title>
        </head>
        <body>
          <script>
            window.opener?.postMessage({
              type: 'GOOGLE_ERROR',
              error: 'No authorization code'
            }, window.location.origin);
            window.close();
          </script>
          <p>No authorization code received. This window will close automatically.</p>
        </body>
        </html>
        `,
        {
          headers: {
            "Content-Type": "text/html",
          },
        },
      )
    }

    // Exchange code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/google-callback`,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Google Auth Error</title>
        </head>
        <body>
          <script>
            window.opener?.postMessage({
              type: 'GOOGLE_ERROR',
              error: 'Failed to get access token'
            }, window.location.origin);
            window.close();
          </script>
          <p>Failed to get access token. This window will close automatically.</p>
        </body>
        </html>
        `,
        {
          headers: {
            "Content-Type": "text/html",
          },
        },
      )
    }

    // Get user info from Google
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const userData = await userResponse.json()

    // Return an HTML page that sends user data to parent window
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Google Auth Success</title>
      </head>
      <body>
        <script>
          window.opener?.postMessage({
            type: 'GOOGLE_USER_DATA',
            email: '${userData.email}',
            name: '${userData.name}',
            picture: '${userData.picture || ""}'
          }, window.location.origin);
          window.close();
        </script>
        <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Arial, sans-serif;">
          <div style="text-align: center;">
            <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <p>Getting your Google account info...</p>
            <p style="font-size: 12px; color: #666;">This window will close automatically.</p>
          </div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </body>
      </html>
      `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      },
    )
  } catch (error) {
    console.error("Google callback error:", error)
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Google Auth Error</title>
      </head>
      <body>
        <script>
          window.opener?.postMessage({
            type: 'GOOGLE_ERROR',
            error: 'Internal server error'
          }, window.location.origin);
          window.close();
        </script>
        <p>Internal server error. This window will close automatically.</p>
      </body>
      </html>
      `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      },
    )
  }
}
