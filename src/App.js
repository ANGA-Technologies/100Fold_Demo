import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for the current page/screen
  const [currentPage, setCurrentPage] = useState('login');
  const [activeTab, setActiveTab] = useState('all'); // For library tabs
  const [notifications, setNotifications] = useState(true); // For account toggles
  const [darkMode, setDarkMode] = useState(false); // For account toggles
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
  const [currentBook, setCurrentBook] = useState(null); // To track which book is being read
  const [pageTransition, setPageTransition] = useState(false); // For page transition animation
  
  // Function to navigate to a page with transition
  const navigateToPage = (page, bookData = null) => {
    setPageTransition(true);
    setTimeout(() => {
      if (bookData) {
        setCurrentBook(bookData);
      }
      setCurrentPage(page);
      setPageTransition(false);
    }, 300);
  };
  
  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigateToPage('feed');
  };
  
  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigateToPage('login');
  };
  
  // Function to handle book payment completion
  const handlePaymentComplete = () => {
    navigateToPage('reader', currentBook);
  };
  
  // Current time for status bar
  const [currentTime, setCurrentTime] = useState('');
  
  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <div className="iphone-container">
        <div className="iphone-frame">
          {/* iPhone physical buttons */}
          <div className="side-button volume-up"></div>
          <div className="side-button volume-down"></div>
          <div className="side-button power"></div>
          
          {/* iPhone notch */}
          <div className="iphone-notch"></div>
          
          {/* iPhone screen */}
          <div className="iphone-screen">
            {/* Status Bar */}
            <div className="status-bar">
              <span>{currentTime}</span>
              <div className="status-icons">
                <span className="status-icon">📶</span>
                <span className="status-icon">📡</span>
                <span className="status-icon">🔋</span>
              </div>
            </div>
            
            {/* Screen Content */}
            <div className={`screen-content ${pageTransition ? 'page-transition' : ''}`}>
              {/* Login Page */}
              {currentPage === 'login' && (
                <div className="app-container fold-app">
                  <div className="app-header">
                    <div className="app-header-title">100 FOLD</div>
                    <div className="app-header-welcome">
                      <span>EN</span>
                    </div>
                  </div>
                  
                  <div className="login-container">
                    <div className="login-logo">
                      <div className="login-logo-inner">100</div>
                    </div>
                    <div className="login-title">Karibu 100Fold</div>
                    <div className="login-subtitle">Ingia katika akaunti yako</div>
                    
                    <div className="login-form">
                      <div className="login-input-group">
                        <label className="login-label">Barua pepe</label>
                        <div className="input-with-icon">
                          <span className="input-icon">✉️</span>
                          <input 
                            type="email" 
                            className="login-input" 
                            placeholder="mwaminifu@example.com"
                            defaultValue="mwaminifu@example.com"
                          />
                        </div>
                      </div>
                      
                      <div className="login-input-group">
                        <label className="login-label">Nenosiri</label>
                        <div className="input-with-icon">
                          <span className="input-icon">🔒</span>
                          <input 
                            type="password" 
                            className="login-input" 
                            placeholder="••••••••"
                            defaultValue="password"
                          />
                        </div>
                      </div>
                      
                      <div className="forgot-password">
                        Umesahau nenosiri?
                      </div>
                      
                      <button 
                        className="login-button"
                        onClick={handleLogin}
                      >
                        Ingia
                      </button>
                      
                      <div className="signup-link">
                        Huna akaunti? <span className="signup-text">Jisajili sasa</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* iPhone Home Screen */}
              {currentPage === 'iphone-home' && (
                <div className="home-screen">
                  <div className="app-grid">
                    {/* Apps - Only showing useful apps */}
                    <button 
                      className="app-button" 
                      onClick={() => navigateToPage(isLoggedIn ? 'feed' : 'login')}
                    >
                      <div className="app-icon app-icon-green">📖</div>
                      <div className="app-name">100Fold</div>
                    </button>
                    <button className="app-button">
                      <div className="app-icon app-icon-blue">📱</div>
                      <div className="app-name">Messages</div>
                    </button>
                    <button className="app-button">
                      <div className="app-icon app-icon-purple">📷</div>
                      <div className="app-name">Photos</div>
                    </button>
                    <button className="app-button">
                      <div className="app-icon app-icon-pink">🎵</div>
                      <div className="app-name">Music</div>
                    </button>
                  </div>
                  
                  {/* Dock */}
                  <div className="dock-container">
                    <div className="dock">
                      <button className="dock-button phone-app">📞</button>
                      <button className="dock-button messages-app-dock">💬</button>
                      <button className="dock-button safari-app">🌐</button>
                      <button className="dock-button music-app-dock">🎵</button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 100Fold App - Feed Page */}
              {currentPage === 'feed' && (
                <div className="app-container fold-app">
                  {/* App Header */}
                  <div className="app-header gradient-header">
                    <div className="app-header-title">100 FOLD</div>
                    <div className="app-header-welcome">
                      <span>EN</span>
                    </div>
                  </div>
                  
                  {/* Feed Content - Scrollable */}
                  <div className="feed-container">
                    <div className="welcome-message">
                      <h2>Habari, Mwaminifu</h2>
                      <p>Karibu katika neno la leo</p>
                    </div>
                    
                    <div className="devotional-article">
                      <div className="article-header">
                        {/* Date and Tag Row */}
                        <div className="article-date">
                          <div className="article-date-text">Leo • 5/16/2025</div>
                          <div className="article-tag">Kipya</div>
                        </div>
                        
                        {/* Section Title */}
                        <div className="article-section-title">NENO LA LEO</div>
                      </div>
                      
                      {/* Devotional Banner */}
                      <div className="devotional-banner">
                        {/* Decorative elements */}
                        <div className="banner-decoration banner-decoration-topleft">❀</div>
                        <div className="banner-decoration banner-decoration-topright">❀</div>
                        <div className="banner-decoration banner-decoration-bottomleft">❀</div>
                        <div className="banner-decoration banner-decoration-bottomright">❀</div>
                        
                        <div className="banner-topic">FURAHA THABITI</div>
                        <div className="banner-title">MEIO9</div>
                        <div className="banner-subtitle">IBADA YA KILA SIKU</div>
                      </div>
                      
                      <div className="article-content">
                        {/* Devotional Title */}
                        <div className="article-title">
                          NINI MAANA YA KUMPENDA MUNGU
                        </div>
                        
                        {/* Bible Verse */}
                        <div className="article-verse">
                          "Ee Mungu, unwe si shingo sugu; umtuliishe moyo wangu; niwe katika ile hilo safi yako
                          kama ndugu anayependa amani na kila mwanadamu." - (Zaburi 51:10)
                        </div>
                        
                        {/* Devotional Content */}
                        <div className="article-paragraph">
                          Kumpenda Mungu kusimamishia kuM unto zako zote; kupatanisha kwaMbio zako kwa kazi yake. 
                          Watu wengi wanapenda baraka za Mungu kuliko Mungu mwenyewe. Wanapenda 
                          kitamtambua kwa fadhila zake zilizo dhahiri...
                        </div>
                        
                        {/* Article Footer */}
                        <div className="article-footer">
                          <button 
                            className="article-footer-link"
                            onClick={() => navigateToPage('devotional-detail')}
                          >
                            Soma Zaidi →
                          </button>
                          <button className="article-footer-link">
                            Aina za Masomo
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Featured books section */}
                    <div className="featured-section">
                      <div className="featured-header">
                        <h3>Vitabu Muhimu</h3>
                        <span className="see-all" onClick={() => navigateToPage('library')}>Ona yote</span>
                      </div>
                      <div className="featured-books">
                        <div className="featured-book" onClick={() => navigateToPage('reader', {
                              title: 'Wazee Wa Kanisa',
                              author: 'Jerame Rinne',
                              progress: 75
                            })}>
                          <div className="featured-book-cover thumbnail-red">WAZEE WA KANISA</div>
                          <div className="featured-book-title">Wazee Wa Kanisa</div>
                        </div>
                        <div className="featured-book" onClick={() => navigateToPage('reader', {
                              title: 'Ushirika Wa Kanisa',
                              author: 'Jonathan Leeman',
                              progress: 30
                            })}>
                          <div className="featured-book-cover thumbnail-blue">USHIRIKA WA KANISA</div>
                          <div className="featured-book-title">Ushirika Wa Kanisa</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Navigation */}
                  <div className="app-bottom-nav">
                    <div className="bottom-nav-item bottom-nav-active">
                      <div className="bottom-nav-icon">⌂</div>
                      <div className="bottom-nav-label">Nyumbani</div>
                    </div>
                    <div className="bottom-nav-item" onClick={() => navigateToPage('library')}>
                      <div className="bottom-nav-icon">≡</div>
                      <div className="bottom-nav-label">Maktaba</div>
                    </div>
                    <div className="bottom-nav-item" onClick={() => navigateToPage('account')}>
                      <div className="bottom-nav-icon">⊙</div>
                      <div className="bottom-nav-label">Watu</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Library Page - Maktaba */}
              {currentPage === 'library' && (
                <div className="app-container fold-app">
                  {/* App Header */}
                  <div className="app-header gradient-header">
                    <div className="app-header-title">100 FOLD</div>
                    <div className="app-header-welcome">
                      <span>EN</span>
                    </div>
                  </div>
                  
                  {/* Library Content */}
                  <div className="library-container">
                    {/* Library Header */}
                    <div className="library-header">
                      <div className="library-title">Maktaba Yangu</div>
                      <div className="library-subtitle">Vitabu na machapisho yako</div>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="search-bar">
                      <div className="search-icon">🔍</div>
                      <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Tafuta kitabu au mwandishi..."
                      />
                    </div>
                    
                    {/* Library Tabs */}
                    <div className="library-tabs">
                      <div 
                        className={`library-tab ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                      >
                        Vitabu Vyote
                      </div>
                      <div 
                        className={`library-tab ${activeTab === 'reading' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reading')}
                      >
                        Ninasoma
                      </div>
                      <div 
                        className={`library-tab ${activeTab === 'finished' ? 'active' : ''}`}
                        onClick={() => setActiveTab('finished')}
                      >
                        Nimemaliza
                      </div>
                      <div 
                        className={`library-tab ${activeTab === 'unread' ? 'active' : ''}`}
                        onClick={() => setActiveTab('unread')}
                      >
                        Sijasoma
                      </div>
                    </div>
                    
                    {/* Book List */}
                    <div className="book-list">
                      {/* Book 1 */}
                      <div className="book-item">
                        <div className="book-thumbnail thumbnail-red">
                           WAZEE WA KANISA
                        </div>
                        <div className="book-details">
                          <div>
                            <div className="book-title">Wazee Wa Kanisa</div>
                            <div className="book-author">Jerame Rinne</div>
                            <div className="book-meta">Masaa mawili yaliopita</div>
                          </div>
                          <div>
                            <div className="progress-container">
                              <div className="progress-bar" style={{ width: '75%' }}></div>
                            </div>
                            <div className="progress-text">75%</div>
                          </div>
                        </div>
                        <div className="book-actions">
                          <button 
                            className="book-action-button book-read-button" 
                            onClick={() => navigateToPage('reader', {
                              title: 'Wazee Wa Kanisa',
                              author: 'Jerame Rinne',
                              progress: 75
                            })}
                          >
                            Soma
                          </button>
                          <button 
                            className="book-action-button book-buy-button"
                            onClick={() => navigateToPage('payment', {
                              title: 'Wazee Wa Kanisa',
                              author: 'Jerame Rinne',
                              price: '12,000',
                              thumbnail: 'thumbnail-red'
                            })}
                          >
                            Lipia
                          </button>
                        </div>
                      </div>
                      
                      {/* Book 2 */}
                      <div className="book-item">
                        <div className="book-thumbnail thumbnail-blue">
                          USHIRIKA WA KANISA
                        </div>
                        <div className="book-details">
                          <div>
                            <div className="book-title">Ushirika Wa Kanisa</div>
                            <div className="book-author">Jonathan Leeman</div>
                            <div className="book-meta">Jana</div>
                          </div>
                          <div>
                            <div className="progress-container">
                              <div className="progress-bar" style={{ width: '30%' }}></div>
                            </div>
                            <div className="progress-text">30%</div>
                          </div>
                        </div>
                        <div className="book-actions">
                          <button 
                            className="book-action-button book-read-button" 
                            onClick={() => navigateToPage('reader', {
                              title: 'Ushirika Wa Kanisa',
                              author: 'Jonathan Leeman',
                              progress: 30
                            })}
                          >
                            Soma
                          </button>
                          <button 
                            className="book-action-button book-buy-button"
                            onClick={() => navigateToPage('payment', {
                              title: 'Ushirika Wa Kanisa',
                              author: 'Jonathan Leeman',
                              price: '10,000',
                              thumbnail: 'thumbnail-blue'
                            })}
                          >
                            Lipia
                          </button>
                        </div>
                      </div>
                      
                      {/* Book 3 */}
                      <div className="book-item">
                        <div className="book-thumbnail thumbnail-purple">
                          THEOLOJIA YA KIBIBLIA
                        </div>
                        <div className="book-details">
                          <div>
                            <div className="book-title">Theolojia Ya Kibiblia</div>
                            <div className="book-author">Nick Roark & Robert Cline</div>
                          </div>
                        </div>
                        <div className="book-actions">
                          <button 
                            className="book-action-button book-read-button" 
                            onClick={() => navigateToPage('reader', {
                              title: 'Theolojia Ya Kibiblia',
                              author: 'Nick Roark & Robert Cline',
                              progress: 0
                            })}
                          >
                            Soma
                          </button>
                          <button 
                            className="book-action-button book-buy-button"
                            onClick={() => navigateToPage('payment', {
                              title: 'Theolojia Ya Kibiblia',
                              author: 'Nick Roark & Robert Cline',
                              price: '15,000',
                              thumbnail: 'thumbnail-purple'
                            })}
                          >
                            Lipia
                          </button>
                        </div>
                      </div>
                      
                      {/* Book 4 */}
                      <div className="book-item">
                        <div className="book-thumbnail thumbnail-green">
                          INJILI KUU YA KIBIBLIA 
                        </div>
                        <div className="book-details">
                          <div>
                            <div className="book-title">Injili</div>
                            <div className="book-author">Ray Ortlund</div>
                          </div>
                        </div>
                        <div className="book-actions">
                          <button 
                            className="book-action-button book-read-button" 
                            onClick={() => navigateToPage('reader', {
                              title: 'Injili',
                              author: 'Ray Ortlund',
                              progress: 0
                            })}
                          >
                            Soma
                          </button>
                          <button 
                            className="book-action-button book-buy-button"
                            onClick={() => navigateToPage('payment', {
                              title: 'Injili',
                              author: 'Ray Ortlund',
                              price: '8,000',
                              thumbnail: 'thumbnail-green'
                            })}
                          >
                            Lipia
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Navigation */}
                  <div className="app-bottom-nav">
                    <div className="bottom-nav-item" onClick={() => navigateToPage('feed')}>
                      <div className="bottom-nav-icon">⌂</div>
                      <div className="bottom-nav-label">Nyumbani</div>
                    </div>
                    <div className="bottom-nav-item bottom-nav-active">
                      <div className="bottom-nav-icon">≡</div>
                      <div className="bottom-nav-label">Maktaba</div>
                    </div>
                    <div className="bottom-nav-item" onClick={() => navigateToPage('account')}>
                      <div className="bottom-nav-icon">⊙</div>
                      <div className="bottom-nav-label">Watu</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Payment Page */}
              {currentPage === 'payment' && currentBook && (
                <div className="app-container fold-app">
                  {/* App Header with Back Button */}
                  <div className="app-header-with-back">
                    <div className="back-button" onClick={() => navigateToPage('library')}>
                      ← 
                    </div>
                    <div className="app-header-title" style={{ marginLeft: '1rem' }}>Malipo</div>
                  </div>
                  
                  {/* Payment Content */}
                  <div className="payment-container">
                    {/* Book Summary */}
                    <div className="payment-book-summary">
                      <div className={`payment-book-thumbnail ${currentBook.thumbnail}`}>
                        {currentBook.title.toUpperCase()}
                      </div>
                      <div className="payment-book-details">
                        <div className="payment-book-title">{currentBook.title}</div>
                        <div className="payment-book-author">{currentBook.author}</div>
                        <div className="payment-book-price">TSh {currentBook.price}</div>
                      </div>
                    </div>
                    
                    {/* Payment Form */}
                    <div className="payment-form">
                      <div className="payment-section">
                        <div className="payment-section-title">Njia za Malipo</div>
                        
                        {/* Payment Method Selector */}
                        <div className="payment-method-selector">
                          <div className="payment-method active">
                            <div className="payment-method-checkbox">
                              <div className="payment-method-checkbox-inner"></div>
                            </div>
                            <div className="payment-method-name">M-Pesa</div>
                          </div>
                          <div className="payment-method">
                            <div className="payment-method-checkbox"></div>
                            <div className="payment-method-name">Tigo Pesa</div>
                          </div>
                          <div className="payment-method">
                            <div className="payment-method-checkbox"></div>
                            <div className="payment-method-name">Airtel Money</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Phone Number Input */}
                      <div className="payment-input-group">
                        <label className="payment-label">Namba ya Simu</label>
                        <div className="input-with-icon">
                          <span className="input-icon">📱</span>
                          <input 
                            type="tel" 
                            className="payment-input" 
                            placeholder="+255 7XX XXX XXX"
                          />
                        </div>
                      </div>
                      
                      {/* Order Summary */}
                      <div className="order-summary">
                        <div className="order-summary-header">Muhtasari wa Order</div>
                        <div className="order-summary-item">
                          <span>Bei ya kitabu:</span>
                          <span>TSh {currentBook.price}</span>
                        </div>
                        <div className="order-summary-item">
                          <span>Gharama ya malipo:</span>
                          <span>TSh 0</span>
                        </div>
                        <div className="order-summary-total">
                          <span>Jumla:</span>
                          <span>TSh {currentBook.price}</span>
                        </div>
                      </div>
                      
                      {/* Complete Payment Button */}
                      <button 
                        className="payment-button pulse-animation"
                        onClick={handlePaymentComplete}
                      >
                        KAMILISHA MALIPO
                      </button>
                      
                      <div className="secure-payment">
                        <span className="secure-icon">🔒</span> Malipo salama
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Book Reader Page */}
              {currentPage === 'reader' && currentBook && (
                <div className="app-container fold-app">
                  {/* App Header with Back and Options */}
                  <div className="reader-header-bar">
                    <div className="back-button" onClick={() => navigateToPage('library')}>
                      ← 
                    </div>
                    <div className="reader-title-header">{currentBook.title}</div>
                    <div className="reader-options">⋮</div>
                  </div>
                  
                  {/* Reader Progress Bar */}
                  <div className="reader-progress-bar">
                    <div className="reader-progress-fill" style={{ width: `${currentBook.progress}%` }}></div>
                  </div>
                  
                  {/* Reader Content */}
                  <div className="reader-container">
                    <div className="reader-content">
                      <h2 className="reader-chapter-title">Sura ya 1: Asili ya Wazee</h2>
                      
                      <p className="reader-paragraph">
                        Wazee Wa Kanisa
                      </p>
                      
                      <p className="reader-paragraph">
                        Sura ya 1: Asili ya Wazee
                      </p>
                      
                      <p className="reader-paragraph reader-verse">
                        "Nilitakuacha Krete ili utengeneze mambo yaliyosalia na kuweka wazee katika kila mji, kama nilivyokuagiza." (Tito 1:5)
                      </p>
                      
                      <p className="reader-paragraph">
                        Ndugu na dada zangu, mwalimu mzuri wa Biblia aliweka kanuni ya kufasiri Biblia ambayo inasema "Neno si halisi ambalo liletea maana isiyoelekea; au halifanyi kazi dhidi ya viungo vingine vya Biblia; mbele ya wasomaji wa asili; na kwamba kihistoria waamini wamekuwa wakiamini kuwa ni halisi." 
                      </p>
                      
                      <p className="reader-paragraph">
                        "Walitambua Kristo ni nani na viongozi ambao aliwateua ambapo neno hili wazi kabisa linafundisha na kuamuru juu ya uongozi wa kanisa. Kanisa linahitaji viongozi kama ambavyo Tito anaonyesha wazi. "Nilikuacha Krete utengeneze mambo yaliyosalia na kuweka wazee katika kila mji, kama nilivyokuagiza." Kanisa linahitaji viongozi wazuri."
                      </p>
                      
                      <p className="reader-paragraph reader-heading">
                        Wazee Kanisa Agenga ni Kazi
                      </p>
                      
                      <p className="reader-paragraph">
                        Ni muhimu kutambua kabisa kwa mujibu wa maandiko katika Tito 1:5, wazee wa kanisa si waungwana wa heshima tu kwa kuwa na umri mkubwa au tajiri katika jamii. Ni wanaume wanaotekeleza kazi maalum katika kanisa. Wazee wa Kanisa au Wazee Waangalizi ni ofisi kuu katika Kanisa la Agano Jipya.
                      </p>
                    </div>
                    
                    {/* Reader Controls */}
                    <div className="reader-controls">
                      <div className="font-size-controls">
                        <button className="font-size-btn">A-</button>
                        <button className="font-size-btn">A+</button>
                      </div>
                    </div>
                    
                    {/* Reader Navigation */}
                    <div className="reader-nav">
                      <button className="reader-nav-button">
                        <span className="nav-icon">←</span> Sura Iliyopita
                      </button>
                      <div className="reader-page-info">Ukurasa 1 kati ya 124</div>
                      <button className="reader-nav-button">
                        Sura Inayofuata <span className="nav-icon">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 100Fold App - Devotional Detail Page */}
              {currentPage === 'devotional-detail' && (
                <div className="app-container fold-app">
                  {/* App Header with Back Button */}
                  <div className="app-header-with-back">
                    <div className="back-button" onClick={() => navigateToPage('feed')}>
                      ← 
                    </div>
                    <div className="app-header-title" style={{ marginLeft: '1rem' }}>IBADA YA KILA SIKU</div>
                  </div>
                  
                  {/* Devotional Detail Content */}
                  <div className="devotional-detail-container">
                    {/* Banner */}
                    <div className="devotional-banner enhanced-banner">
                      <div className="banner-decoration banner-decoration-topleft">❀</div>
                      <div className="banner-decoration banner-decoration-topright">❀</div>
                      <div className="banner-decoration banner-decoration-bottomleft">❀</div>
                      <div className="banner-decoration banner-decoration-bottomright">❀</div>
                      
                      <div className="banner-topic">FURAHA THABITI</div>
                      <div className="banner-title">MEIO9</div>
                      <div className="banner-subtitle">IBADA YA KILA SIKU</div>
                    </div>
                    
                    <div className="devotional-detail-content">
                      <div className="devotional-detail-title">
                        NINI MAANA YA KUMPENDA MUNGU
                      </div>
                      
                      <div className="devotional-detail-verse">
                        "Ee Mungu, unwe si shingo sugu; umtuliishe moyo wangu; niwe katika ile hilo safi yako
                        kama ndugu anayependa amani na kila mwanadamu." - (Zaburi 51:10)
                      </div>
                      
                      <div className="devotional-detail-paragraph">
                        Kumpenda Mungu kusimamishia kuM unto zako zote; kupatanisha kwaMbio zako kwa kazi yake. 
                        Watu wengi wanapenda baraka za Mungu kuliko Mungu mwenyewe. Wanapenda 
                        kitamtambua kwa fadhila zake zilizo dhahiri.
                      </div>
                      
                      <div className="article-quote-box">
                        <div className="article-quote-content">
                          WAKATAFUTU WA AGANO LA KALE<br />
                          WALIONA KWAMBA SIKU NDOGO<br />
                          ILIYOBARIKIWA HAIKUWA SIKU YA<br />
                          IBADA YA JUU, LAKINI UPENDILIO WA UTU,<br />
                          LA WANADAMU JUU NDIO ULIYOONA
                        </div>
                      </div>
                      
                      <div className="devotional-detail-paragraph">
                        Sio zote zenye kuM amu kila kicho ni katika kwa Mwadhiri, tu, teambelea kukubanika nami ya 
                        tamaduni na nini waelewandikisha kutoka na wakili, niikeleje kunachuukuwa kutoka na tofautia.
                      </div>
                      
                      <div className="devotional-detail-section">
                        <div className="devotional-detail-section-title">MASWALI YA KUFIKIRI</div>
                        <div className="devotional-questions">
                          <div className="devotional-question">
                            <span className="question-number">1.</span> Je, wewe unapenda Mungu kwa sababu gani? Kwa ajili ya baraka zake au kwa sababu ya yeye mwenyewe?
                          </div>
                          <div className="devotional-question">
                            <span className="question-number">2.</span> Ni mambo gani yanayoonyesha kwamba tunampenda Mungu?
                          </div>
                        </div>
                      </div>
                      
                      <div className="devotional-detail-section">
                        <div className="devotional-detail-section-title">MAOMBI</div>
                        <div className="devotional-prayer">
                          Bwana, nisaidie kukupenda wewe mwenyewe zaidi ya zawadi zako. Acha niwe na shauku ya 
                          kukutafuta uso wako na kukufurahia jinsi ulivyo. Amina.
                        </div>
                      </div>
                      
                      <div className="devotional-actions">
                        <button className="devotional-action-btn">
                          <span className="action-icon">↗️</span> Shiriki
                        </button>
                        <button className="devotional-action-btn save-btn">
                          <span className="action-icon">⭐</span> Hifadhi
                        </button>
                      </div>
                      
                      <div className="related-devotionals">
                        <div className="related-devotionals-title">YALIYOHUSIANA</div>
                        <div className="related-devotional-item">
                          <div className="related-devotional-name">Baraka za Upendo wa Mungu</div>
                          <div className="related-devotional-footer">
                            <div className="related-devotional-date">4/28/2025</div>
                            <div className="related-devotional-link">Soma →</div>
                          </div>
                        </div>
                        <div className="related-devotional-item">
                          <div className="related-devotional-name">Mapenzi ya Kweli</div>
                          <div className="related-devotional-footer">
                            <div className="related-devotional-date">5/5/2025</div>
                            <div className="related-devotional-link">Soma →</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Navigation */}
                  <div className="app-bottom-nav">
                    <div className="bottom-nav-item bottom-nav-active">
                      <div className="bottom-nav-icon">⌂</div>
                      <div className="bottom-nav-label">Nyumbani</div>
                    </div>
                    <div className="bottom-nav-item" onClick={() => navigateToPage('library')}>
                      <div className="bottom-nav-icon">≡</div>
                      <div className="bottom-nav-label">Maktaba</div>
                    </div>
                    <div className="bottom-nav-item" onClick={() => navigateToPage('account')}>
                      <div className="bottom-nav-icon">⊙</div>
                      <div className="bottom-nav-label">Watu</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Page */}
              {currentPage === 'account' && (
                <div className="app-container fold-app">
                  {/* App Header */}
                  <div className="app-header gradient-header">
                    <div className="app-header-title">100 FOLD</div>
                    <div className="app-header-welcome">
                      <span>EN</span>
                    </div>
                  </div>
                  
                  {/* Account Content */}
                  <div className="account-container">
                    {/* Profile Header */}
                    <div className="account-header">
                      <div className="account-avatar">M</div>
                      <div className="account-info">
                        <div className="account-name">Mwaminifu Chuma</div>
                        <div className="account-email">mwaminifu@example.com</div>
                        <div className="account-since">Mtumiaji tangu Machi 2024</div>
                      </div>
                    </div>
                    
                    {/* Activity Stats */}
                    <div className="activity-summary">
                      <div className="activity-title">Muhtasari wa Shughuli</div>
                      <div className="activity-stats">
                        <div className="stat-item">
                          <div className="stat-number">14</div>
                          <div className="stat-label">Vitabu</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-number">42</div>
                          <div className="stat-label">Ibada</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-number">7</div>
                          <div className="stat-label">Siku</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Reading Streak */}
                    <div className="reading-streak">
                      <div className="streak-title">Mfululizo wa Kusoma</div>
                      <div className="streak-days">
                        <div className="streak-day completed">
                          <div className="streak-dot"></div>
                          <div className="streak-label">Ju</div>
                        </div>
                        <div className="streak-day completed">
                          <div className="streak-dot"></div>
                          <div className="streak-label">Ju</div>
                        </div>
                        <div className="streak-day completed">
                          <div className="streak-dot"></div>
                          <div className="streak-label">Al</div>
                        </div>
                        <div className="streak-day completed">
                          <div className="streak-dot"></div>
                          <div className="streak-label">Ij</div>
                        </div>
                        <div className="streak-day completed">
                          <div className="streak-dot"></div>
                          <div className="streak-label">Ju</div>
                        </div>
                        <div className="streak-day current">
                          <div className="streak-dot"></div>
                          <div className="streak-label">Ju</div>
                        </div>
                        <div className="streak-day">
                          <div className="streak-dot"></div>
                          <div className="streak-label">Ju</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Account Settings */}
                    <div className="section-title">Mipangilio ya Akaunti</div>
                    <div className="account-options">
                      <div className="account-option-item">
                        <div className="option-icon">🌐</div>
                        <div className="option-label">Lugha</div>
                        <div className="option-value">Kiswahili</div>
                        <div className="option-arrow">&gt;</div>
                      </div>
                      <div className="account-option-item">
                        <div className="option-icon">🔔</div>
                        <div className="option-label">Sauti</div>
                        <div 
                          className={`option-toggle ${notifications ? 'toggle-active' : ''}`}
                          onClick={() => setNotifications(!notifications)}
                        >
                          <div className="toggle-handle"></div>
                        </div>
                      </div>
                      <div className="account-option-item">
                        <div className="option-icon">🌙</div>
                        <div className="option-label">Hali ya Giza</div>
                        <div 
                          className={`option-toggle ${darkMode ? 'toggle-active' : ''}`}
                          onClick={() => setDarkMode(!darkMode)}
                        >
                          <div className="toggle-handle"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Account Information */}
                    <div className="section-title">Taarifa za Akaunti</div>
                    <div className="account-options">
                      <div className="account-option-item">
                        <div className="option-icon">🔑</div>
                        <div className="option-label">Badilisha Nenosiri</div>
                        <div className="option-arrow">&gt;</div>
                      </div>
                      <div className="account-option-item">
                        <div className="option-icon">💳</div>
                        <div className="option-label">Historia ya Malipo</div>
                        <div className="option-arrow">&gt;</div>
                      </div>
                      <div className="account-option-item">
                        <div className="option-icon">📞</div>
                        <div className="option-label">Wasiliana Nasi</div>
                        <div className="option-arrow">&gt;</div>
                      </div>
                    </div>
                    
                    {/* Sign Out Button - Updated to use handleLogout */}
                    <button className="sign-out-button" onClick={handleLogout}>
                      <span className="sign-out-icon">🚪</span> Ondoka
                    </button>
                  </div>
                  
                  {/* Bottom Navigation */}
                  <div className="app-bottom-nav">
                    <div className="bottom-nav-item" onClick={() => navigateToPage('feed')}>
                      <div className="bottom-nav-icon">⌂</div>
                      <div className="bottom-nav-label">Nyumbani</div>
                    </div>
                    <div className="bottom-nav-item" onClick={() => navigateToPage('library')}>
                      <div className="bottom-nav-icon">≡</div>
                      <div className="bottom-nav-label">Maktaba</div>
                    </div>
                    <div className="bottom-nav-item bottom-nav-active">
                      <div className="bottom-nav-icon">⊙</div>
                      <div className="bottom-nav-label">Watu</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Home Button Indicator */}
            <div className="home-button" onClick={() => navigateToPage('iphone-home')}>
              <div className="home-indicator"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;