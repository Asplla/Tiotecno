export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  try {
    const response = await fetch('https://myphp-theta-three.vercel.app/api/index.php?mod=sendemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams(body).toString()
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Server error:', error)
    return {
      code: 500,
      msg: 'Internal server error'
    }
  }
}) 