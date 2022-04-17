const { spawn } = require('child_process')

export default async function handler(req, res) {
  const { url } = req.query
  const python = spawn('python3', ['python/main.py', url])
  let dataToSend = ''

  for await (const data of python.stdout) {
    // console.log(data.toString());
    dataToSend += data.toString()
  }
  return res.json({ message: dataToSend.trim() })
}
