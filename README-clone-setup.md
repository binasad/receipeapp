Setup & run (PowerShell)

1. Create a local env file (do NOT commit):

```powershell
# from project root
Set-Location 'D:\Fridge Feast\Frideg-Feast'
copy .env.example .env.local
# open .env.local and paste your API key for GOOGLE_API_KEY
```

2. Install dependencies and build (PowerShell):

```powershell
npm install
npm run build
# start production server
npm start
```

3. Dev mode (port 9002 as configured in package.json):

```powershell
npm run dev
```

API usage example (server-side proxy protects your key):

GET /api/google-geocode?address=1600+Amphitheatre+Parkway
