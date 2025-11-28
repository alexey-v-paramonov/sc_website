/**
 * Radio Catalog Single Page Application
 * Handles routing, search, filtering, and dynamic content loading
 */

class CatalogSPA {
  constructor() {
    this.apiBaseUrl = 'https://streaming.center/api/v1/catalog/';
    this.currentView = 'list'; // 'list' or 'detail'
    this.searchDebounceTimer = null;
    this.currentPage = 1;
    this.itemsPerPage = 30;
    this.currentFilters = {
      search: '',
      genre: '',
      country: '',
      region: '',
      city: '',
      language: '',
      sort: 'rating' // default sort
    };
    this.catalogData = null;
    this.filterOptions = {
      genres: new Set(),
      countries: new Set(),
      regions: new Set(),
      cities: new Set(),
      languages: new Set()
    };
    
    this.init();
  }

  init() {
    // Setup routing
    window.addEventListener('popstate', (e) => this.handlePopState(e));
    
    // Determine initial view based on URL
    const path = window.location.pathname;
    const lang = this.detectLanguage();
    
    if (path.includes('/catalog/') && !path.endsWith('/catalog/')) {
      // We're on a detail page
      this.currentView = 'detail';
      this.loadDetailView(path);
    } else if (path.endsWith('/catalog/') || path.includes('/catalog/page/')) {
      // We're on the list page
      this.currentView = 'list';
      this.setupListView();
    }
  }

  detectLanguage() {
    const path = window.location.pathname;
    if (path.startsWith('/en/')) return 'en';
    if (path.startsWith('/ru/')) return 'ru';
    return 'en'; // default
  }

  setupListView() {
    // Create and inject SPA controls if they don't exist
    if (!document.getElementById('catalog-spa-controls')) {
      this.injectListControls();
    }
    
    // Attach event listeners
    this.attachListEventListeners();
    
    // Extract filter options from existing static content
    this.extractFiltersFromStaticContent();
    
    // Don't load data on initial page load - use server-rendered content
    // API calls will only happen when user interacts (search, filter, sort, paginate)
  }

  injectListControls() {
    const container = document.querySelector('.catalog-grid');
    if (!container) return;

    const controlsHTML = `
      <div id="catalog-spa-controls" class="catalog-spa-controls">
        <div class="catalog-controls-row">
          <div class="catalog-search-wrapper">
            <input 
              type="text" 
              id="catalog-search" 
              class="catalog-search-input" 
              placeholder="${this.getTranslation('search_placeholder')}"
              autocomplete="off"
            />
            <span class="search-icon">🔍</span>
          </div>

          <div class="catalog-sort-wrapper">
            <label for="catalog-sort">${this.getTranslation('sort_by')}:</label>
            <select id="catalog-sort" class="catalog-sort-select">
              <option value="rating" selected>${this.getTranslation('sort_rating')}</option>
              <option value="votes">${this.getTranslation('sort_votes')}</option>
              <option value="created">${this.getTranslation('sort_date')}</option>
            </select>
          </div>
        </div>

        <div class="catalog-filters-row">
          <div class="catalog-filter-wrapper">
            <label for="filter-genre">${this.getTranslation('genre')}:</label>
            <select id="filter-genre" class="catalog-filter-select">
              <option value="">${this.getTranslation('all')}</option>
            </select>
          </div>

          <div class="catalog-filter-wrapper">
            <label for="filter-country">${this.getTranslation('country')}:</label>
            <select id="filter-country" class="catalog-filter-select">
              <option value="">${this.getTranslation('all')}</option>
            </select>
          </div>

          <div class="catalog-filter-wrapper">
            <label for="filter-region">${this.getTranslation('region')}:</label>
            <select id="filter-region" class="catalog-filter-select">
              <option value="">${this.getTranslation('all')}</option>
            </select>
          </div>

          <div class="catalog-filter-wrapper">
            <label for="filter-city">${this.getTranslation('city')}:</label>
            <select id="filter-city" class="catalog-filter-select">
              <option value="">${this.getTranslation('all')}</option>
            </select>
          </div>

          <div class="catalog-filter-wrapper">
            <label for="filter-language">${this.getTranslation('language')}:</label>
            <select id="filter-language" class="catalog-filter-select">
              <option value="">${this.getTranslation('all')}</option>
            </select>
          </div>

          <button id="reset-filters" class="catalog-reset-btn">
            ${this.getTranslation('reset_filters')}
          </button>
        </div>

        <div id="catalog-loading" class="catalog-loading" style="display: none;">
          <div class="spinner"></div>
          <span>${this.getTranslation('loading')}</span>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforebegin', controlsHTML);
  }

  attachListEventListeners() {
    // Search input with debouncing
    const searchInput = document.getElementById('catalog-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        
        clearTimeout(this.searchDebounceTimer);
        
        if (value.length >= 3 || value.length === 0) {
          this.searchDebounceTimer = setTimeout(() => {
            this.currentFilters.search = value;
            this.currentPage = 1;
            this.loadCatalogData();
          }, 500); // 500ms debounce
        }
      });
    }

    // Sort select
    const sortSelect = document.getElementById('catalog-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentFilters.sort = e.target.value;
        this.currentPage = 1;
        this.loadCatalogData();
      });
    }

    // Filter selects
    ['genre', 'country', 'region', 'city', 'language'].forEach(filterType => {
      const select = document.getElementById(`filter-${filterType}`);
      if (select) {
        select.addEventListener('change', (e) => {
          this.currentFilters[filterType] = e.target.value;
          this.currentPage = 1;
          
          // Reset dependent filters
          if (filterType === 'country') {
            this.currentFilters.region = '';
            this.currentFilters.city = '';
            document.getElementById('filter-region').value = '';
            document.getElementById('filter-city').value = '';
          } else if (filterType === 'region') {
            this.currentFilters.city = '';
            document.getElementById('filter-city').value = '';
          }
          
          this.loadCatalogData();
        });
      }
    });

    // Reset filters button
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetFilters();
      });
    }

    // Intercept catalog card clicks for SPA navigation
    this.attachCardClickListeners();
  }

  attachCardClickListeners() {
    document.addEventListener('click', (e) => {
      // Find if click is on a catalog card link
      const link = e.target.closest('.catalog-card-title a, .catalog-thumb-wrap a');
      if (link && link.href) {
        const url = new URL(link.href);
        
        // Only intercept catalog item links
        if (url.pathname.includes('/catalog/') && !url.pathname.endsWith('/catalog/')) {
          e.preventDefault();
          this.navigateToDetail(url.pathname);
        }
      }
    });
  }

  async loadCatalogData() {
    this.showLoading(true);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', this.currentPage);
      params.append('per_page', this.itemsPerPage);
      params.append('sort', this.currentFilters.sort);
      
      if (this.currentFilters.search) params.append('search', this.currentFilters.search);
      if (this.currentFilters.genre) params.append('genre', this.currentFilters.genre);
      if (this.currentFilters.country) params.append('country', this.currentFilters.country);
      if (this.currentFilters.region) params.append('region', this.currentFilters.region);
      if (this.currentFilters.city) params.append('city', this.currentFilters.city);
      if (this.currentFilters.language) params.append('language', this.currentFilters.language);

      const response = await fetch(`${this.apiBaseUrl}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      this.catalogData = data;
      
      // Update filter options from API response
      this.updateFilterOptions(data);
      
      // Render the catalog grid
      this.renderCatalogGrid(data.results || data.radios || []);
      
      // Update pagination
      this.renderPagination(data);

    } catch (error) {
      console.error('Error loading catalog data:', error);
      this.showError(this.getTranslation('error_loading'));
    } finally {
      this.showLoading(false);
    }
  }

  updateFilterOptions(data) {
    // Extract unique values for filters from the API response
    if (data.filters) {
      // If API provides filter options directly
      this.populateFilterSelect('genre', data.filters.genres || []);
      this.populateFilterSelect('country', data.filters.countries || []);
      this.populateFilterSelect('region', data.filters.regions || []);
      this.populateFilterSelect('city', data.filters.cities || []);
      this.populateFilterSelect('language', data.filters.languages || []);
    } else if (data.results || data.radios) {
      // Extract from results
      const items = data.results || data.radios || [];
      this.extractFiltersFromResults(items);
    }
  }

  extractFiltersFromResults(items) {
    const genres = new Set();
    const countries = new Set();
    const regions = new Set();
    const cities = new Set();
    const languages = new Set();

    items.forEach(item => {
      if (item.genres) item.genres.forEach(g => genres.add(g));
      if (item.country_name) countries.add(item.country_name);
      if (item.region_name) regions.add(item.region_name);
      if (item.city_name) cities.add(item.city_name);
      if (item.languages) item.languages.forEach(l => languages.add(l));
    });

    this.populateFilterSelect('genre', Array.from(genres).sort());
    this.populateFilterSelect('country', Array.from(countries).sort());
    this.populateFilterSelect('region', Array.from(regions).sort());
    this.populateFilterSelect('city', Array.from(cities).sort());
    this.populateFilterSelect('language', Array.from(languages).sort());
  }

  extractFiltersFromStaticContent() {
    // Extract filter options from the existing static HTML content
    const cards = document.querySelectorAll('.catalog-card');
    if (cards.length === 0) return;

    const genres = new Set();
    const countries = new Set();
    const regions = new Set();
    const cities = new Set();
    const languages = new Set();

    cards.forEach(card => {
      // Extract genres from tags
      const genreTags = card.querySelectorAll('.catalog-card-tags span');
      genreTags.forEach(tag => {
        const genre = tag.textContent.replace('#', '').trim();
        if (genre) genres.add(genre);
      });

      // Extract country from flag image
      const flag = card.querySelector('.catalog-card-flag');
      if (flag && flag.alt) {
        countries.add(flag.alt);
      }
    });

    // Populate filter dropdowns with extracted data
    if (genres.size > 0) {
      this.populateFilterSelect('genre', Array.from(genres).sort());
    }
    if (countries.size > 0) {
      this.populateFilterSelect('country', Array.from(countries).sort());
    }
    
    // Note: regions, cities, and languages will be populated when API is called
    // after user interaction, as they're not readily available in static HTML
  }

  populateFilterSelect(filterType, options) {
    const select = document.getElementById(`filter-${filterType}`);
    if (!select) return;

    const currentValue = select.value;
    
    // Keep the "All" option and add new options
    const allOption = select.querySelector('option[value=""]');
    select.innerHTML = '';
    if (allOption) select.appendChild(allOption);

    options.forEach(option => {
      const optionEl = document.createElement('option');
      optionEl.value = option;
      optionEl.textContent = option;
      if (option === currentValue) optionEl.selected = true;
      select.appendChild(optionEl);
    });
  }

  renderCatalogGrid(items) {
    const grid = document.querySelector('.catalog-grid');
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = `<div class="no-results">${this.getTranslation('no_results')}</div>`;
      return;
    }

    const lang = this.detectLanguage();
    const cardsHTML = items.map(item => this.renderCatalogCard(item, lang)).join('');
    grid.innerHTML = cardsHTML;

    // Re-attach card click listeners
    this.attachCardClickListeners();

    // Reinitialize audio player for new cards (if catalog.js is loaded)
    if (typeof window.initializeCatalogAudio === 'function') {
      window.initializeCatalogAudio();
    }
  }

  renderCatalogCard(item, lang) {
    const permalink = `/${lang}/catalog/${item.slug || item.id}/`;
    const defaultStream = item.default_stream || (item.streams && item.streams[0]?.stream_url) || '';
    
    return `
      <div class="catalog-card">
        <img class="catalog-card-flag" 
             src="/catalog/flags/${item.country_code}.png" 
             alt="${item.country_name}"  
             title="${item.country_name}" />
        <div class="catalog-card__inner">
          <div class="catalog-thumb-wrap" ${defaultStream ? `data-stream-url="${defaultStream}"` : ''}>
            <a href="${permalink}">
              <img class="catalog-thumb"
                   src="${item.logo}"
                   alt="${item.name}"
                   title="${item.name}" />
            </a>
          </div>
          <div class="catalog-card-title" title="${item.name}">
            <a href="${permalink}">${item.name}</a>
          </div>
          <div class="catalog-card-meta">
            <a class="catalog-card-link"
               href="${item.website_url}"
               target="_blank"
               rel="noopener">${item.website_url}</a>
            <div class="catalog-card-rating" aria-label="Rating ${item.rating} out of 10">
              <span class="star" aria-hidden="true">★</span>
              <span>${item.rating}</span>
            </div>
          </div>
          <div class="catalog-card-tags">
            ${(item.genres || []).map(genre => `<span>#${genre}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderPagination(data) {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;

    const totalPages = data.total_pages || Math.ceil((data.total || 0) / this.itemsPerPage);
    const currentPage = this.currentPage;

    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    let paginationHTML = '<ul class="pagination-list">';

    // Previous button
    if (currentPage > 1) {
      paginationHTML += `<li><a href="#" class="pagination-link" data-page="${currentPage - 1}">‹</a></li>`;
    }

    // Page numbers
    const maxVisible = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      paginationHTML += `<li><a href="#" class="pagination-link" data-page="1">1</a></li>`;
      if (startPage > 2) {
        paginationHTML += `<li><span class="pagination-ellipsis">…</span></li>`;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const activeClass = i === currentPage ? 'is-current' : '';
      paginationHTML += `<li><a href="#" class="pagination-link ${activeClass}" data-page="${i}">${i}</a></li>`;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML += `<li><span class="pagination-ellipsis">…</span></li>`;
      }
      paginationHTML += `<li><a href="#" class="pagination-link" data-page="${totalPages}">${totalPages}</a></li>`;
    }

    // Next button
    if (currentPage < totalPages) {
      paginationHTML += `<li><a href="#" class="pagination-link" data-page="${currentPage + 1}">›</a></li>`;
    }

    paginationHTML += '</ul>';
    paginationContainer.innerHTML = paginationHTML;

    // Attach pagination click handlers
    paginationContainer.querySelectorAll('.pagination-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(link.dataset.page);
        if (page && page !== this.currentPage) {
          this.currentPage = page;
          this.loadCatalogData();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  }

  navigateToDetail(path) {
    // Update browser history
    window.history.pushState({ view: 'detail', path }, '', path);
    
    // Load detail view
    this.currentView = 'detail';
    this.loadDetailView(path);
  }

  async loadDetailView(path) {
    this.showLoading(true);

    try {
      // Fetch the detail page HTML
      const response = await fetch(path);
      
      if (!response.ok) {
        throw new Error(`Failed to load detail page: ${response.status}`);
      }

      const html = await response.text();
      
      // Parse HTML and extract the main content
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const mainContent = doc.querySelector('main');
      
      if (mainContent) {
        // Replace current main content
        const currentMain = document.querySelector('main');
        if (currentMain) {
          currentMain.replaceWith(mainContent);
          
          // Add back button
          this.addBackButton();
          
          // Re-execute any scripts in the new content
          this.executeScripts(mainContent);
        }
      }

    } catch (error) {
      console.error('Error loading detail view:', error);
      this.showError(this.getTranslation('error_loading'));
    } finally {
      this.showLoading(false);
    }
  }

  addBackButton() {
    const container = document.querySelector('.container.index');
    if (!container) return;

    // Check if back button already exists
    if (document.getElementById('spa-back-button')) return;

    const backButton = document.createElement('button');
    backButton.id = 'spa-back-button';
    backButton.className = 'spa-back-button btn';
    backButton.innerHTML = `<span>← ${this.getTranslation('back_to_catalog')}</span>`;
    
    backButton.addEventListener('click', () => {
      window.history.back();
    });

    // Insert at the top of the container
    const breadcrumbs = container.querySelector('.breadcrumbs');
    if (breadcrumbs) {
      breadcrumbs.insertAdjacentElement('afterend', backButton);
    } else {
      container.insertAdjacentElement('afterbegin', backButton);
    }
  }

  executeScripts(container) {
    // Find and execute inline scripts
    const scripts = container.querySelectorAll('script');
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  handlePopState(e) {
    const state = e.state;
    const path = window.location.pathname;
    const lang = this.detectLanguage();

    if (path.includes('/catalog/') && !path.endsWith('/catalog/')) {
      // Detail view
      this.currentView = 'detail';
      this.loadDetailView(path);
    } else if (path.endsWith('/catalog/') || path.includes('/catalog/page/')) {
      // List view - reload the page to restore original state
      window.location.reload();
    }
  }

  resetFilters() {
    this.currentFilters = {
      search: '',
      genre: '',
      country: '',
      region: '',
      city: '',
      language: '',
      sort: 'rating'
    };
    this.currentPage = 1;

    // Reset UI
    const searchInput = document.getElementById('catalog-search');
    if (searchInput) searchInput.value = '';
    
    document.getElementById('catalog-sort').value = 'rating';
    document.getElementById('filter-genre').value = '';
    document.getElementById('filter-country').value = '';
    document.getElementById('filter-region').value = '';
    document.getElementById('filter-city').value = '';
    document.getElementById('filter-language').value = '';

    this.loadCatalogData();
  }

  showLoading(show) {
    const loader = document.getElementById('catalog-loading');
    if (loader) {
      loader.style.display = show ? 'flex' : 'none';
    }
  }

  showError(message) {
    // You can implement a toast/notification system here
    alert(message);
  }

  getTranslation(key) {
    const lang = this.detectLanguage();
    
    const translations = {
      en: {
        search_placeholder: 'Search radio stations...',
        sort_by: 'Sort by',
        sort_rating: 'Rating',
        sort_votes: 'Number of votes',
        sort_date: 'Date added',
        genre: 'Genre',
        country: 'Country',
        region: 'Region',
        city: 'City',
        language: 'Language',
        all: 'All',
        reset_filters: 'Reset filters',
        loading: 'Loading...',
        no_results: 'No radio stations found matching your criteria.',
        error_loading: 'Error loading data. Please try again.',
        back_to_catalog: 'Back to Catalog'
      },
      ru: {
        search_placeholder: 'Поиск радиостанций...',
        sort_by: 'Сортировка',
        sort_rating: 'Рейтинг',
        sort_votes: 'Количество голосов',
        sort_date: 'Дата добавления',
        genre: 'Жанр',
        country: 'Страна',
        region: 'Регион',
        city: 'Город',
        language: 'Язык',
        all: 'Все',
        reset_filters: 'Сбросить фильтры',
        loading: 'Загрузка...',
        no_results: 'Радиостанции не найдены по вашим критериям.',
        error_loading: 'Ошибка загрузки данных. Попробуйте снова.',
        back_to_catalog: 'Вернуться к каталогу'
      }
    };

    return translations[lang]?.[key] || translations.en[key] || key;
  }
}

// Initialize SPA when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.catalogSPA = new CatalogSPA();
  });
} else {
  window.catalogSPA = new CatalogSPA();
}
