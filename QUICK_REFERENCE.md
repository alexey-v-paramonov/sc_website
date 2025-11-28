# Quick Reference Card

## 🚀 Quick Start

```bash
# View the catalog
http://localhost:1313/en/catalog/

# Test page
http://localhost:1313/test-spa.html
```

## 📁 Files Overview

| File | Purpose | Size |
|------|---------|------|
| `static/js/catalog-spa.js` | Main SPA logic | ~15KB |
| `static/css/catalog-spa.css` | SPA styles | ~8KB |
| `layouts/catalog/list.html` | Modified template | - |
| `static/js/catalog.js` | Modified audio player | - |

## 🔌 API Endpoint

```
GET https://streaming.center/api/v1/catalog/
```

### Parameters
```
?page=1
&per_page=30
&sort=rating|votes|created
&search=query
&genre=Rock
&country=United%20States
&region=California
&city=Los%20Angeles
&language=English
```

### Response
```json
{
  "total": 150,
  "total_pages": 5,
  "current_page": 1,
  "per_page": 30,
  "results": [...],
  "filters": {...}
}
```

## ✨ Features

| Feature | Status | Details |
|---------|--------|---------|
| 🔍 Search | ✅ | Debounced 500ms, min 3 chars |
| 🎛️ Filters | ✅ | Genre, country, region, city, language |
| 📊 Sorting | ✅ | Rating, votes, date |
| 📄 Pagination | ✅ | Dynamic, URL sync |
| 🔗 Routing | ✅ | SPA navigation, browser history |
| 📱 Responsive | ✅ | Mobile, tablet, desktop |
| 🌐 i18n | ✅ | English, Russian |

## 🎯 User Actions

```
Type in search → Wait 500ms → API call → Results update
Select filter → API call → Results update
Change sort → API call → Results update
Click station → Navigate → Detail view → Back button
Click back → Return to list → State preserved
```

## 🧪 Testing Commands

```bash
# Start Hugo
hugo server

# Open test page
open http://localhost:1313/test-spa.html

# Test API
curl "https://streaming.center/api/v1/catalog/?page=1&per_page=10"

# Test search
curl "https://streaming.center/api/v1/catalog/?search=rock"

# Test filter
curl "https://streaming.center/api/v1/catalog/?genre=Rock&country=USA"
```

## 🐛 Debug Console

```javascript
// Check SPA instance
window.catalogSPA

// Check current state
window.catalogSPA.currentFilters
window.catalogSPA.currentPage
window.catalogSPA.catalogData

// Reload catalog
window.catalogSPA.loadCatalogData()

// Reset filters
window.catalogSPA.resetFilters()
```

## 📋 Implementation Checklist

### Frontend ✅
- [x] SPA JavaScript
- [x] SPA CSS
- [x] Modified list.html
- [x] Modified catalog.js
- [x] Documentation
- [x] Test page

### Backend ⏳
- [ ] Implement API endpoint
- [ ] Add search functionality
- [ ] Add filtering
- [ ] Add sorting
- [ ] Add pagination
- [ ] Configure CORS
- [ ] Test API responses

### Testing ⏳
- [ ] Test search
- [ ] Test filters
- [ ] Test sorting
- [ ] Test pagination
- [ ] Test navigation
- [ ] Test on mobile
- [ ] Test browser history

### Deployment ⏳
- [ ] Deploy frontend
- [ ] Deploy backend
- [ ] Configure production API URL
- [ ] Monitor errors
- [ ] Check performance

## 🔧 Configuration

### Change API URL
```javascript
// In catalog-spa.js, line 4:
this.apiBaseUrl = 'https://streaming.center/api/v1/catalog/';
```

### Change Debounce Delay
```javascript
// In catalog-spa.js, line 150:
}, 500); // Change from 500ms
```

### Change Items Per Page
```javascript
// In catalog-spa.js, line 8:
this.itemsPerPage = 30; // Change from 30
```

## 📱 UI Elements

### Search Bar
```html
<input id="catalog-search" placeholder="Search...">
```

### Sort Dropdown
```html
<select id="catalog-sort">
  <option value="rating">Rating</option>
  <option value="votes">Votes</option>
  <option value="created">Date</option>
</select>
```

### Filter Dropdowns
```html
<select id="filter-genre">...</select>
<select id="filter-country">...</select>
<select id="filter-region">...</select>
<select id="filter-city">...</select>
<select id="filter-language">...</select>
```

### Reset Button
```html
<button id="reset-filters">Reset</button>
```

## 🎨 CSS Classes

```css
.catalog-spa-controls      /* Main container */
.catalog-search-input      /* Search field */
.catalog-sort-select       /* Sort dropdown */
.catalog-filter-select     /* Filter dropdowns */
.catalog-reset-btn         /* Reset button */
.catalog-loading           /* Loading spinner */
.spa-back-button           /* Back button */
.pagination-link           /* Pagination links */
.no-results                /* Empty state */
```

## 🌐 Browser Support

| Browser | Min Version |
|---------|-------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Opera | 76+ |

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Initial Load | < 2s |
| Search Response | < 500ms |
| Filter Update | < 200ms |
| Page Transition | < 300ms |
| Memory Usage | < 5MB |

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| Search not working | Check API URL, CORS, min 3 chars |
| Filters empty | API must return `filters` object |
| Pagination missing | API must return `total_pages` |
| Audio not working | Reinit with `initializeCatalogAudio()` |
| Back button broken | Check History API support |

## 📚 Documentation Files

- `API_REQUIREMENTS.md` - Complete API spec
- `SPA_DOCUMENTATION.md` - Full user guide
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
- `QUICK_REFERENCE.md` - This file

## 🎓 Learning Resources

```javascript
// CatalogSPA class structure
class CatalogSPA {
  init()                    // Initialize SPA
  setupListView()           // Setup catalog list
  loadCatalogData()         // Fetch from API
  renderCatalogGrid()       // Render stations
  renderPagination()        // Render page numbers
  navigateToDetail()        // Navigate to detail
  loadDetailView()          // Load detail page
  handlePopState()          // Handle back/forward
  resetFilters()            // Clear all filters
  getTranslation()          // Get translated text
}
```

## 💡 Tips

- Use browser DevTools Network tab to debug API calls
- Check console for JavaScript errors
- Use test-spa.html for isolated testing
- Test on real mobile devices, not just emulator
- Monitor API response times
- Cache filter options on backend
- Add rate limiting to API

## 📞 Support

1. Check browser console for errors
2. Review API response in Network tab
3. Test with mock data using test-spa.html
4. Read full documentation files
5. Check API_REQUIREMENTS.md for backend spec

---

**Last Updated**: 2025-11-27
**Version**: 1.0.0
