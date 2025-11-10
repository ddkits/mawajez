const sources = {
  en: [
    // 🌍 WORLD
    { id: 'reuters', name: 'Reuters', type: 'rss', category: 'World', url: 'https://feeds.reuters.com/Reuters/worldNews' },
    { id: 'bbc', name: 'BBC News', type: 'rss', category: 'World', url: 'https://feeds.bbci.co.uk/news/rss.xml' },
    { id: 'aljazeera-en', name: 'Al Jazeera English', type: 'rss', category: 'World', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
    { id: 'guardian', name: 'The Guardian', type: 'rss', category: 'World', url: 'https://www.theguardian.com/world/rss' },
    { id: 'apnews', name: 'AP News', type: 'rss', category: 'World', url: 'https://apnews.com/rss' },

    // 💼 BUSINESS
    { id: 'reuters-business', name: 'Reuters Business', type: 'rss', category: 'Business', url: 'https://feeds.reuters.com/reuters/businessNews' },
    { id: 'bbc-business', name: 'BBC Business', type: 'rss', category: 'Business', url: 'https://feeds.bbci.co.uk/news/business/rss.xml' },
    { id: 'bloomberg', name: 'Bloomberg', type: 'rss', category: 'Business', url: 'https://www.bloomberg.com/feed/podcast/etf-report.xml' },
    { id: 'wsj-markets', name: 'WSJ Markets', type: 'rss', category: 'Business', url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml' },

    // 🧠 TECH
    { id: 'verge', name: 'The Verge', type: 'rss', category: 'Tech', url: 'https://www.theverge.com/rss/index.xml' },
    { id: 'techcrunch', name: 'TechCrunch', type: 'rss', category: 'Tech', url: 'https://techcrunch.com/feed/' },
    { id: 'wired', name: 'Wired', type: 'rss', category: 'Tech', url: 'https://www.wired.com/feed/rss' },
    { id: 'engadget', name: 'Engadget', type: 'rss', category: 'Tech', url: 'https://www.engadget.com/rss.xml' },

    // 🏅 SPORTS
    { id: 'espn', name: 'ESPN', type: 'rss', category: 'Sports', url: 'https://www.espn.com/espn/rss/news' },
    { id: 'bbc-sports', name: 'BBC Sports', type: 'rss', category: 'Sports', url: 'https://feeds.bbci.co.uk/sport/rss.xml' },

    // 🎥 YouTube Channels (English)
    { id: 'aljazeera-youtube-en', name: 'Al Jazeera English (YouTube)', type: 'youtube', category: 'World', channel_id: 'UCNye-wNBqNL5ZzHSJj3l8Bg' },
    { id: 'skynews-youtube', name: 'Sky News', type: 'youtube', category: 'World', channel_id: 'UCoMdktPbSTixAyNGwb-UYkQ' },
    { id: 'cnn-youtube', name: 'CNN (YouTube)', type: 'youtube', category: 'World', channel_id: 'UCupvZG-5ko_eiXAupbDfxWw' },
    { id: 'wsj-youtube', name: 'Wall Street Journal', type: 'youtube', category: 'Business', channel_id: 'UCK7tptUDHh-RYDsdxO1-5QQ' }
  ],


//   ar: [
//     // 🌍 WORLD (ARABIC)
//     { id: 'aljazeera-ar', name: 'الجزيرة', type: 'rss', category: 'World', url: 'https://www.aljazeera.net/xml/rss/all.xml' },
// { id: 'alarabiya', name: 'العربية', type: 'rss', category: 'World', url: 'https://www.alarabiya.net/.mrss/ar.xml' },
// { id: 'skynews-ar', name: 'سكاي نيوز عربية', type: 'rss', category: 'World', url: 'https://www.skynewsarabia.com/web/rss' },
// { id: 'dw-ar', name: 'DW عربية', type: 'rss', category: 'World', url: 'https://www.dw.com/arabic/s-10507?maca=ara-rss-ar-all-1492-xml-rss' },

//     // 💼 BUSINESS
//     { id: 'cnn-ar-business', name: 'CNN اقتصاد', type: 'rss', category: 'Business', url: 'https://arabic.cnn.com/rss/business' },
// { id: 'aljazeera-ar-economy', name: 'الجزيرة اقتصاد', type: 'rss', category: 'Business', url: 'https://www.aljazeera.net/aljazeera-arabic-feed' },

//     // 🧠 TECH
//     { id: 'aitnews', name: 'البوابة العربية للأخبار التقنية', type: 'rss', category: 'Tech', url: 'https://aitnews.com/feed/' },
// { id: 'tech-magazine', name: 'مجلة التقنية', type: 'rss', category: 'Tech', url: 'https://www.tech-mag.net/feed/' },

//     // 🏅 SPORTS
//     { id: 'kooora', name: 'كورة', type: 'rss', category: 'Sports', url: 'https://www.kooora.com/rss/default.aspx?region=0' },
// { id: 'bein-sports', name: 'beIN Sports', type: 'rss', category: 'Sports', url: 'https://www.beinsports.com/ar/rss' },

//     // 🎥 YouTube Channels (Arabic)
//     { id: 'aljazeera-youtube-ar', name: 'الجزيرة (YouTube)', type: 'youtube', category: 'World', channel_id: 'UCfiwzLy-8yKzIbsmZTzxDgw' },
//     { id: 'skynews-ar-youtube', name: 'سكاي نيوز عربية (YouTube)', type: 'youtube', category: 'World', channel_id: 'UC8CwPBs32go3K8Hla2G_Ytg' },
//     { id: 'alarabiya-youtube', name: 'العربية (YouTube)', type: 'youtube', category: 'World', channel_id: 'UCahpxixMCWoXQM7BvRj_Wvg' }
//   ]
ar: [
    { id: 'aljazeera-ar', name: 'الجزيرة', type: 'rss', category: 'World', url: 'https://www.aljazeera.net/aljazeerarss/a7c186be-1baa-4bd4-9d80-a84db769f779/73d0e1b4-532f-45ef-b135-bfdff8b8cab9' },
    { id: 'alarabiya', name: 'العربية', type: 'rss', category: 'World', url: 'https://www.alarabiya.net/.mrss/ar.xml?outputType=xml' },
    { id: 'skynews-ar', name: 'سكاي نيوز عربية', type: 'rss', category: 'World', url: 'https://www.skynewsarabia.com/web/rss' },
    { id: 'dw-ar', name: 'DW عربية', type: 'rss', category: 'World', url: 'https://www.dw.com/arabic/s-10507?maca=ara-rss-ar-all-welcome' },

    // BUSINESS
    { id: 'cnn-ar-business', name: 'CNN اقتصاد', type: 'rss', category: 'Business', url: 'https://arabic.cnn.com/rss/money' },
    
    // SPORTS
    { id: 'kooora', name: 'كورة', type: 'rss', category: 'Sports', url: 'https://www.kooora.com/rss/default.aspx?region=0' },

    // TECH
    { id: 'aitnews', name: 'البوابة العربية للأخبار التقنية', type: 'rss', category: 'Tech', url: 'https://aitnews.com/feed/' },
  ]
};

export default sources;
