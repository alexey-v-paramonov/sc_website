/**
 * Radio Catalog Single Page Application
 * Handles routing, search, filtering, and dynamic content loading
 */

class CatalogSPA {
  constructor() {
    console.log('CatalogSPA constructor called');
    this.apiBaseUrl = 'https://streaming.center/api/v1/catalog/public/';
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
    
    // Detect and store language early before DOM changes
    this.language = this.detectLanguage();
    
    // Track if global listeners are attached
    this.globalListenersAttached = false;
    
    this.init();
  }

  init() {
    // Setup routing
    window.addEventListener('popstate', (e) => this.handlePopState(e));
    
    // Determine initial view based on URL
    const path = window.location.pathname;
    
    if (path.endsWith('/catalog/') || path.includes('/catalog/page/')) {
      // We're on the list page (including paginated pages)
      this.currentView = 'list';
      this.setupListView();
    } else if (path.includes('/catalog/')) {
      // We're on a detail page
      this.currentView = 'detail';
      this.loadDetailView(path);
    }
  }

  detectLanguage() {
    // Get language from the data attribute set by Hugo
    const controls = document.getElementById('catalog-spa-controls');
    if (controls && controls.dataset.lang) {
      return controls.dataset.lang;
    }
    
    // Fallback: check hostname (radio-tochka.com = ru, streaming.center = en)
    if (window.location.hostname.includes('radio-tochka')) {
      return 'ru';
    }
    
    // Default fallback
    return 'en';
  }

  setupListView() {
    // Controls are now server-rendered in the template
    // Just attach event listeners
    this.attachListEventListeners();
    
    // Don't load data on initial page load - use server-rendered content
    // API calls will only happen when user interacts (search, filter, sort, paginate)
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

    // Attach global click listeners only once
    if (!this.globalListenersAttached) {
      console.log('Attaching global listeners');
      this.attachCardClickListeners();
      this.attachBreadcrumbClickListeners();
      this.globalListenersAttached = true;
    } else {
      console.log('Global listeners already attached, skipping');
    }
  }

  attachCardClickListeners() {
    document.addEventListener('click', (e) => {
      // Skip if already handled
      if (e.defaultPrevented) return;
      
      // Find if click is on a catalog card link
      const link = e.target.closest('.catalog-card-title a, .catalog-thumb-wrap a');
      if (link && link.href) {
        const url = new URL(link.href);
        console.log('Intercepting link click to:', url.pathname, 'at', Date.now(), e.eventPhase);
        
        // Only intercept catalog item links
        if (url.pathname.includes('/catalog/') && !url.pathname.endsWith('/catalog/')) {
          e.preventDefault();
          e.stopImmediatePropagation();
          this.navigateToDetail(url.pathname);
        }
      }
    });
  }

  attachBreadcrumbClickListeners() {
    document.addEventListener('click', (e) => {
      // Skip if already handled
      if (e.defaultPrevented) return;
      
      // Find if click is on a breadcrumb link to catalog
      const link = e.target.closest('.breadcrumbs a');
      if (link && link.href) {
        const url = new URL(link.href);
        
        // Only intercept catalog list page links
        if (url.pathname.endsWith('/catalog/')) {
          e.preventDefault();
          e.stopImmediatePropagation();
          console.log('Intercepting breadcrumb click to catalog at', Date.now(), e.eventPhase);
          this.navigateBackToCatalog();
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
      params.append('lang', this.language); // Add language parameter
      
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
    // Only update filter options when API provides them
    // Don't clear existing options if API doesn't provide filters
    if (data.filters) {
      // If API provides filter options directly, update them
      if (data.filters.genres && data.filters.genres.length > 0) {
        this.populateFilterSelect('genre', data.filters.genres);
      }
      if (data.filters.countries && data.filters.countries.length > 0) {
        this.populateFilterSelect('country', data.filters.countries);
      }
      if (data.filters.regions && data.filters.regions.length > 0) {
        this.populateFilterSelect('region', data.filters.regions);
      }
      if (data.filters.cities && data.filters.cities.length > 0) {
        this.populateFilterSelect('city', data.filters.cities);
      }
      if (data.filters.languages && data.filters.languages.length > 0) {
        this.populateFilterSelect('language', data.filters.languages);
      }
    }
  }

  populateFilterSelect(filterType, options) {
    const select = document.getElementById(`filter-${filterType}`);
    if (!select) return;

    const currentValue = select.value;
    
    // Clear all options except "All"
    const allOption = select.querySelector('option[value=""]');
    select.innerHTML = '';
    if (allOption) select.appendChild(allOption.cloneNode(true));

    // Add new options from API
    options.forEach(option => {
      const optionEl = document.createElement('option');
      optionEl.value = option;
      optionEl.textContent = option;
      if (option === currentValue) optionEl.selected = true;
      select.appendChild(optionEl);
    });
    
    // If current value is not in the new options and it's not empty, restore it
    if (currentValue && !options.includes(currentValue)) {
      select.value = '';
    }
  }

  renderCatalogGrid(items) {
    const grid = document.querySelector('.catalog-grid');
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = `<div class="no-results">${this.getTranslation('no_results')}</div>`;
      return;
    }

    const cardsHTML = items.map(item => this.renderCatalogCard(item)).join('');
    grid.innerHTML = cardsHTML;

    // Re-attach card click listeners
    this.attachCardClickListeners();

    // Reinitialize audio player for new cards (if catalog.js is loaded)
    if (typeof window.initializeCatalogAudio === 'function') {
      window.initializeCatalogAudio();
    }
  }

  renderCatalogCard(item) {
    // Use the slug directly without language prefix since domains are different
    const permalink = `/catalog/${item.slug || item.id}/`;
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

    let paginationHTML = '<ul class="pagination pagination-default">';

    // First button
    if (currentPage === 1) {
      paginationHTML += `
      <li class="page-item disabled">
        <a aria-disabled="true" aria-label="First" class="page-link" role="button" tabindex="-1">
          <span aria-hidden="true">««</span>
        </a>
      </li>`;
    } else {
      paginationHTML += `
      <li class="page-item">
        <a href="#" aria-label="First" class="page-link" role="button" data-page="1">
          <span aria-hidden="true">««</span>
        </a>
      </li>`;
    }

    // Previous button
    if (currentPage === 1) {
      paginationHTML += `
      <li class="page-item disabled">
        <a aria-disabled="true" aria-label="Previous" class="page-link" role="button" tabindex="-1">
          <span aria-hidden="true">«</span>
        </a>
      </li>`;
    } else {
      paginationHTML += `
      <li class="page-item">
        <a href="#" aria-label="Previous" class="page-link" role="button" data-page="${currentPage - 1}">
          <span aria-hidden="true">«</span>
        </a>
      </li>`;
    }

    // Page numbers - show up to 5 pages around current page
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i === currentPage) {
        paginationHTML += `
      <li class="page-item active">
        <a aria-current="page" aria-label="Page ${i}" class="page-link" role="button" style="cursor: default;">${i}</a>
      </li>`;
      } else {
        paginationHTML += `
      <li class="page-item">
        <a href="#" aria-label="Page ${i}" class="page-link" role="button" data-page="${i}">${i}</a>
      </li>`;
      }
    }

    // Next button
    if (currentPage === totalPages) {
      paginationHTML += `
      <li class="page-item disabled">
        <a aria-disabled="true" aria-label="Next" class="page-link" role="button" tabindex="-1">
          <span aria-hidden="true">»</span>
        </a>
      </li>`;
    } else {
      paginationHTML += `
      <li class="page-item">
        <a href="#" aria-label="Next" class="page-link" role="button" data-page="${currentPage + 1}">
          <span aria-hidden="true">»</span>
        </a>
      </li>`;
    }

    // Last button
    if (currentPage === totalPages) {
      paginationHTML += `
      <li class="page-item disabled">
        <a aria-disabled="true" aria-label="Last" class="page-link" role="button" tabindex="-1">
          <span aria-hidden="true">»»</span>
        </a>
      </li>`;
    } else {
      paginationHTML += `
      <li class="page-item">
        <a href="#" aria-label="Last" class="page-link" role="button" data-page="${totalPages}">
          <span aria-hidden="true">»»</span>
        </a>
      </li>`;
    }

    paginationHTML += '</ul>';
    paginationContainer.innerHTML = paginationHTML;

    // Attach pagination click handlers
    paginationContainer.querySelectorAll('.page-link[data-page]').forEach(link => {
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
    // Save current list view state before navigating away
    const listState = {
      view: 'list',
      filters: { ...this.currentFilters },
      page: this.currentPage,
      language: this.language
    };
    
    // Replace current state with list state (so back button returns here)
    window.history.replaceState(listState, '', window.location.pathname);
    
    // Push new detail state
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
          
          // Re-execute any scripts in the new content
          this.executeScripts(mainContent);
          
          // Reinitialize audio player if available
          if (typeof window.initializeCatalogAudio === 'function') {
            window.initializeCatalogAudio();
          }
        }
      }

    } catch (error) {
      console.error('Error loading detail view:', error, path);
      this.showError(this.getTranslation('error_loading'));
    } finally {
      this.showLoading(false);
    }
  }

  async navigateBackToCatalog() {
    // Simply go back in history - this will trigger handlePopState
    // which will restore the saved filter state
    window.history.back();
  }

  executeScripts(container) {
    // Find and execute inline scripts
    const scripts = container.querySelectorAll('script');
    scripts.forEach(oldScript => {
      // Skip external scripts (they're already loaded globally)
      if (oldScript.src) {
        return;
      }
      
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  async handlePopState(e) {
    const state = e.state;
    const path = window.location.pathname;
 
    if (path.endsWith('/catalog/') || path.includes('/catalog/page/')) {
      // Going back to list view
      this.currentView = 'list';
      
      // Check if we have saved state with filters
      if (state && state.view === 'list' && state.filters) {
        // Restore language if saved
        if (state.language) {
          this.language = state.language;
        }
        
        // Restore the list page structure first
        await this.restoreListView();
        
        // Restore filters and page from saved state
        this.currentFilters = { ...state.filters };
        this.currentPage = state.page || 1;
        
        // Restore UI controls to match saved state
        this.restoreFilterUI();
        
        // Load catalog data with saved filters
        this.loadCatalogData();
      } else {
        // No saved state, reload to show original server-rendered content
        window.location.reload();
      }
    } else if (path.includes('/catalog/')) {
      // Detail view
      this.currentView = 'detail';
      this.loadDetailView(path);
    }
  }

  async restoreListView() {
    // Fetch the catalog list page to restore the proper structure
    // Hugo uses different domains for languages, so URL is just /catalog/
    const catalogUrl = '/catalog/';
    
    try {
      const response = await fetch(catalogUrl);
      if (!response.ok) {
        throw new Error(`Failed to load catalog page: ${response.status}`);
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
          
          // Re-attach event listeners to the controls
          this.attachListEventListeners();
        }
      }
    } catch (error) {
      console.error('Error restoring list view:', error);
      // Fallback to reload
      window.location.reload();
    }
  }

  restoreFilterUI() {
    // Restore search input
    const searchInput = document.getElementById('catalog-search');
    if (searchInput) {
      searchInput.value = this.currentFilters.search || '';
    }
    
    // Restore sort select
    const sortSelect = document.getElementById('catalog-sort');
    if (sortSelect) {
      sortSelect.value = this.currentFilters.sort || 'rating';
    }
    
    // Restore filter selects
    ['genre', 'country', 'region', 'city', 'language'].forEach(filterType => {
      const select = document.getElementById(`filter-${filterType}`);
      if (select) {
        select.value = this.currentFilters[filterType] || '';
      }
    });
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
    const lang = this.language;
    
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
// Only create one instance
if (!window.catalogSPA) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.catalogSPA) {
        window.catalogSPA = new CatalogSPA();
      }
    });
  } else {
    window.catalogSPA = new CatalogSPA();
  }
}
