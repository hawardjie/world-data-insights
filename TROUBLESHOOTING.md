# Troubleshooting Guide

## Common Issues and Solutions

### 1. CORS / Network Errors

**Symptoms:**
- `AxiosError: Network Error`
- `Access to fetch blocked by CORS policy`
- API calls failing in browser console

**Cause:**
The FRED API doesn't allow direct browser requests due to CORS restrictions.

**Solution:**
✅ **Already Fixed!** The application uses Next.js API routes as a server-side proxy:
- `/api/fred/series/observations` - Fetches time series data
- `/api/fred/series/info` - Gets series metadata
- `/api/fred/series/search` - Searches for series

All API calls go through these routes, avoiding CORS issues.

---

### 2. "Request failed with status code 400"

**Symptoms:**
- Error: `Request failed with status code 400`
- Specific series not loading
- "Bad Request" errors in console

**Cause:**
The series ID doesn't exist in FRED or has been deprecated.

**Solutions:**

1. **Use the Search feature** to find valid series:
   - Navigate to "Search Series"
   - Enter keywords like "GDP", "unemployment", "inflation"
   - Click on results to see valid series IDs

2. **Check FRED directly**: Visit https://fred.stlouisfed.org/ and search for the series

3. **Use reliable series IDs** (known to work):
   ```
   DFF        - Fed Funds Rate
   GDP        - US GDP
   GDPC1      - Real GDP
   UNRATE     - Unemployment Rate
   CPIAUCSL   - Consumer Price Index
   PAYEMS     - Non-farm Payrolls
   M2SL       - M2 Money Supply
   DGS10      - 10-Year Treasury
   DTWEXBGS   - Dollar Index
   ```

**International Series Note:**
Some international series have limited availability or require specific IDs. The app now uses reliable US economic indicators instead of potentially unavailable international series.

---

### 3. API Key Not Configured

**Symptoms:**
- Error: "FRED API key is not configured"
- 500 errors on all API calls

**Solution:**

1. Create `.env.local` file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your API key:
   ```
   NEXT_PUBLIC_FRED_API_KEY=your_api_key_here
   ```

3. Get API key from: https://fred.stlouisfed.org/docs/api/api_key.html

4. Restart development server:
   ```bash
   npm run dev
   ```

---

### 4. Charts Not Loading / Blank Panels

**Possible Causes:**

1. **API Key Issue** - Check console for errors
2. **Series Unavailable** - Try different time range
3. **Rate Limiting** - FRED limits 120 requests/minute

**Solutions:**

1. Check browser console (F12) for specific errors
2. Verify `.env.local` has valid API key
3. Wait 1 minute if rate limited
4. Try refreshing the page
5. Check Network tab to see which API calls are failing

---

### 5. Build Errors

**TypeScript Errors:**

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**ESLint Warnings:**
These are expected and won't prevent the build:
- `@typescript-eslint/no-explicit-any` - Used for chart tooltips
- `@typescript-eslint/no-unused-vars` - Imported types

---

### 6. Port Already in Use

**Symptoms:**
- Error: `Port 3000 is already in use`

**Solution:**

Option 1 - Use different port:
```bash
npm run dev -- -p 3001
```

Option 2 - Kill existing process:
```bash
# Find process
lsof -ti:3000

# Kill it (macOS/Linux)
kill -9 $(lsof -ti:3000)

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### 7. Data Not Updating

**Solutions:**

1. **Hard refresh**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Clear browser cache**
3. **Restart dev server**: Stop with Ctrl+C, then `npm run dev`

---

### 8. Slow Loading / Timeout

**Causes:**
- FRED API can be slow during peak hours
- Loading too many series at once
- Network issues

**Solutions:**

1. Reduce date range (try 1-2 years instead of 10)
2. Load one panel at a time
3. Check internet connection
4. Try again during off-peak hours

---

### 9. Series Shows "No Data"

**Possible Reasons:**
- Series discontinued
- Date range has no observations
- Series requires subscription (rare)

**Solutions:**

1. Try broader date range
2. Search for alternative series
3. Check FRED website for series status
4. Use "max" date range in search

---

## Getting Help

### Enable Debug Logging

Check your terminal/console for detailed API logs:
```
Requesting FRED API: https://api.stlouisfed.org/fred/series/observations?...
```

These logs show exactly what's being requested and any error responses.

### Check FRED Status

If nothing works:
1. Visit https://fred.stlouisfed.org/
2. Verify the FRED website is up
3. Check your API key still works there

### GitHub Issues

Report bugs at: https://github.com/yourusername/world-data-insights/issues

Include:
- Error message (from console)
- Series ID that failed
- Browser and OS version
- Screenshot if applicable

---

## Performance Tips

1. **Start with Overview** - Loads faster than data panels
2. **Use Search selectively** - Don't search for very common terms
3. **Export data** - Download CSV for offline analysis
4. **Bookmark working series** - Keep a list of IDs you use often

---

## API Rate Limits

**FRED API Limits:**
- 120 requests per minute
- Requests are cached for 15 minutes

**What happens when limited:**
- You'll see 429 errors
- Wait 60 seconds
- Reduce concurrent requests

---

## Browser Compatibility

**Recommended Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Known Issues:**
- IE11 not supported
- Safari < 14 may have chart rendering issues

---

## Development Mode vs Production

**Development (`npm run dev`):**
- Hot reload enabled
- More verbose errors
- Slower performance
- Better for debugging

**Production (`npm run build && npm start`):**
- Optimized bundle
- Faster loading
- Better performance
- Recommended for regular use

---

## Environment Variables

Required:
```env
NEXT_PUBLIC_FRED_API_KEY=your_key_here
```

**IMPORTANT:**
- File must be named `.env.local` exactly
- Must be in project root directory
- Restart server after changing
- Don't commit this file to git (it's in .gitignore)

---

## Still Having Issues?

1. ✅ Verify API key is correct
2. ✅ Restart development server
3. ✅ Check console for errors
4. ✅ Try a different series ID
5. ✅ Clear browser cache
6. ✅ Update dependencies: `npm update`

If none of these work, open an issue on GitHub with full details!
