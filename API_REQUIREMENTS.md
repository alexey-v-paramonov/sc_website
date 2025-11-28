# Radio Catalog API Requirements

This document outlines the backend API requirements to support the Single Page Application (SPA) functionality of the radio catalog.

## Base URL
```
https://streaming.center/api/v1/catalog/public/
```

## Endpoints

### 1. GET /api/v1/catalog/public/

Retrieve a paginated list of radio stations with optional filtering and sorting.

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number (default: 1) |
| `per_page` | integer | No | Items per page (default: 30) |
| `search` | string | No | Search query (minimum 3 characters) |
| `sort` | string | No | Sort field: `rating` (default), `votes`, `created` |
| `genre` | string | No | Filter by genre name |
| `country` | string | No | Filter by country name |
| `region` | string | No | Filter by region name |
| `city` | string | No | Filter by city name |
| `language` | string | No | Filter by language name |

#### Example Requests

```bash
# Get first page with default sorting (by rating)
GET /api/v1/catalog/public/?page=1&per_page=30&sort=rating

# Search for stations
GET /api/v1/catalog/public/?search=rock&page=1

# Filter by country and genre
GET /api/v1/catalog/public/?country=United%20States&genre=Rock

# Sort by number of votes
GET /api/v1/catalog/public/?sort=votes&page=1
```

#### Response Format

```json
{
  "total": 150,
  "total_pages": 5,
  "current_page": 1,
  "per_page": 30,
  "results": [
    {
      "id": 584,
      "name": "Star 33 Radiostation",
      "slug": "star-33-radiostationcovremennoe-din",
      "description": "Modern dynamic radio filled with electronic music tracks...",
      "enabled": true,
      "website_url": "https://online.star33radio.com",
      "logo": "https://app.streaming.center/media/catalog_logos/Logo.png",
      "country_code": "il",
      "country_name": "Israel",
      "region_name": "Central District",
      "city_name": "Netanya",
      "rating": 8.5,
      "total_votes": 142,
      "created": "2023-05-15",
      "genres": ["Dance", "Electronic", "DJ sets"],
      "languages": ["English"],
      "default_stream": "https://stream.example.com/star33.mp3",
      "streams": [
        {
          "id": 100,
          "stream_url": "https://stream.example.com/star33-128.mp3",
          "bitrate": 128,
          "audio_format": "MP3"
        },
        {
          "id": 101,
          "stream_url": "https://stream.example.com/star33-320.mp3",
          "bitrate": 320,
          "audio_format": "MP3"
        }
      ]
    }
    // ... more stations
  ],
  "filters": {
    "genres": ["Rock", "Pop", "Jazz", "Electronic", "Classical"],
    "countries": ["United States", "United Kingdom", "Germany", "France"],
    "regions": ["California", "Texas", "Bavaria"],
    "cities": ["Los Angeles", "New York", "Munich"],
    "languages": ["English", "German", "French", "Spanish"]
  }
}
```

#### Response Fields

**Top Level:**
- `total` (integer): Total number of stations matching the filters
- `total_pages` (integer): Total number of pages
- `current_page` (integer): Current page number
- `per_page` (integer): Number of items per page
- `results` (array): Array of radio station objects
- `filters` (object): Available filter options based on current results

**Radio Station Object:**
- `id` (integer): Unique station ID
- `name` (string): Station name
- `slug` (string): URL-friendly slug
- `description` (string): Station description
- `enabled` (boolean): Whether station is active
- `website_url` (string): Station website URL
- `logo` (string): Logo image URL
- `country_code` (string): ISO 2-letter country code (lowercase)
- `country_name` (string): Country name
- `region_name` (string): Region/state name (optional)
- `city_name` (string): City name (optional)
- `rating` (float): Average rating (0-10)
- `total_votes` (integer): Number of votes received
- `created` (string): Creation date (YYYY-MM-DD)
- `genres` (array of strings): List of genre names
- `languages` (array of strings): List of languages
- `default_stream` (string): Default stream URL
- `streams` (array): List of available streams

**Stream Object:**
- `id` (integer): Stream ID
- `stream_url` (string): Stream URL
- `bitrate` (integer): Bitrate in kbps
- `audio_format` (string): Audio format (MP3, AAC, etc.)

## Search Functionality

### Search Behavior
- Minimum 3 characters required for search
- Search should be case-insensitive
- Search across: station name, description, genres, country, city
- Results should be ranked by relevance
- Debounced on frontend (500ms)

### Example Search Queries
```
# Search by name
?search=rock

# Search by genre/country
?search=jazz

# Combined search and filter
?search=classic&country=Germany
```

## Sorting

### Available Sort Options

1. **By Rating** (default)
   - Sort by `rating` field descending
   - `?sort=rating`

2. **By Votes**
   - Sort by `total_votes` field descending
   - `?sort=votes`

3. **By Date Added**
   - Sort by `created` field descending (newest first)
   - `?sort=created`

## Filtering

### Hierarchical Filtering
Filters should support hierarchical relationships:
- Selecting a country should update available regions
- Selecting a region should update available cities

### Example Filter Flow
```
1. User selects Country: "United States"
   - API returns regions in United States
   
2. User selects Region: "California"
   - API returns cities in California
   
3. User selects City: "Los Angeles"
   - Results filtered to Los Angeles stations
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid parameter: sort must be one of [rating, votes, created]"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "No stations found matching the criteria"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Performance Requirements

1. **Response Time**
   - < 200ms for simple queries
   - < 500ms for complex filtered queries
   - < 1s for search queries

2. **Caching**
   - Cache filter options (genres, countries, etc.)
   - Cache popular queries
   - ETags support for unchanged data

3. **Pagination**
   - Maximum 100 items per page
   - Default 30 items per page

## CORS Configuration

Since the SPA loads from the same domain, CORS should be configured to allow:
```
Access-Control-Allow-Origin: https://streaming.center
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## Additional Notes

### Default Stream Selection
The `default_stream` field should contain the URL of the first stream in the `streams` array, or the most appropriate stream (e.g., 128kbps MP3).

### Flag Images
Country flag images should be available at:
```
/catalog/flags/{country_code}.png
```
Where `country_code` is the lowercase ISO 2-letter code.

### Stream Files
The API should ensure that `.m3u` and `.pls` files are generated and available at:
```
/listen/stream_{stream_id}.m3u
/listen/stream_{stream_id}.pls
```

## Implementation Checklist

- [ ] Implement GET /api/v1/catalog/public/ endpoint
- [ ] Add pagination support
- [ ] Implement search functionality
- [ ] Add filtering by genre, country, region, city, language
- [ ] Implement sorting by rating, votes, created date
- [ ] Return filter options in response
- [ ] Add proper error handling
- [ ] Implement caching strategy
- [ ] Configure CORS
- [ ] Add rate limiting (optional)
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Write API tests

## Example Backend Implementation (Pseudocode)

```python
@app.get("/api/v1/catalog/public/")
def get_catalog(
    page: int = 1,
    per_page: int = 30,
    search: Optional[str] = None,
    sort: str = "rating",
    genre: Optional[str] = None,
    country: Optional[str] = None,
    region: Optional[str] = None,
    city: Optional[str] = None,
    language: Optional[str] = None
):
    # Build query
    query = RadioStation.objects.filter(enabled=True)
    
    # Apply search
    if search and len(search) >= 3:
        query = query.filter(
            Q(name__icontains=search) |
            Q(description__icontains=search) |
            Q(genres__name__icontains=search)
        )
    
    # Apply filters
    if genre:
        query = query.filter(genres__name=genre)
    if country:
        query = query.filter(country__name=country)
    if region:
        query = query.filter(region__name=region)
    if city:
        query = query.filter(city__name=city)
    if language:
        query = query.filter(languages__name=language)
    
    # Apply sorting
    if sort == "rating":
        query = query.order_by("-rating")
    elif sort == "votes":
        query = query.order_by("-total_votes")
    elif sort == "created":
        query = query.order_by("-created")
    
    # Paginate
    paginator = Paginator(query, per_page)
    page_obj = paginator.get_page(page)
    
    # Get filter options
    filters = get_filter_options(query)
    
    # Serialize and return
    return {
        "total": paginator.count,
        "total_pages": paginator.num_pages,
        "current_page": page,
        "per_page": per_page,
        "results": serialize_stations(page_obj.object_list),
        "filters": filters
    }
```
