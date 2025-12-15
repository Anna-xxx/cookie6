export const translations = {
  ru: {
    // Layout
    appTitle: "Печенье",
    appTitleHighlight: "Судьбы",
    
    // Home
    themesLabel: "Темы:",
    selected: "выбр.",
    chooseLuck: "Выберите\nсвою удачу",
    tapToReveal: "Нажми, чтобы узнать судьбу",
    myFortune: "Мое предсказание",
    luckyNumbers: "Счастливые номера",
    shareTitle: "Мое предсказание",
    shareText: "🥠 Печенье Судьбы предсказало мне:",
    checkYours: "Узнай свою судьбу:",
    shareError: "Ошибка при отправке",
    copied: "Скопировано",
    
    // Themes
    theme_love: "Любовь",
    theme_career: "Карьера",
    theme_education: "Учеба",
    theme_family: "Семья",
    theme_health: "Здоровье",
    theme_motivation: "Мотивация",
    theme_funny: "Юмор",
    theme_custom: "Судьба",
    
    // History
    historyTitle: "История Предсказаний",
    emptyHistory: "Ваша история пока пуста.",
    emptyHistorySub: "Откройте печеньку, чтобы получить первое предсказание!",
    unknownDate: "Неизвестная дата",
    
    // Settings
    settingsTitle: "Настройки",
    languageTitle: "Язык приложения",
    chooseThemes: "Выберите темы",
    chooseThemesSub: "Выберите одну или несколько тем для предсказаний. Мы будем случайно выбирать одну из них.",
    customThemeTitle: "Своя тема",
    customThemePlaceholder: "Например: Путешествия...",
    soundTitle: "Звук разлома",
    uploadSound: "Загрузить звук",
    soundNote: "Играет при разламывании печенья",
    resetSound: "Сбросить",
    add: "Добавить",
    save: "Сохранить",
    privacyLink: "Политика конфиденциальности",
    
    // Privacy
    backToHome: "Назад на главную",
    legalTitle: "Правовая информация",
    disclaimerTitle: "Дисклеймер",
    disclaimerText: "Предсказания носят развлекательный характер и не являются профессиональной рекомендацией.",
    disclaimerSub: "Все совпадения с реальными событиями случайны. Пожалуйста, принимайте важные жизненные решения, основываясь на рациональном анализе и консультациях со специалистами, а не на результатах работы этого приложения.",
    privacyTitle: "Политика конфиденциальности",
    privacyIntro: "Мы уважаем вашу конфиденциальность и стремимся защитить ваши личные данные.",
    dataCollectionTitle: "Сбор данных",
    dataCollectionText: "Приложение не собирает, не хранит и не передает ваши личные данные на удаленные серверы. Вся история предсказаний и настройки сохраняются исключительно локально на вашем устройстве (в LocalStorage), за исключением URL пользовательского звука, если вы его загрузили.",
    cookiesTitle: "Использование файлов Cookie",
    cookiesText: "Мы не используем отслеживающие cookie-файлы. Техническое хранилище браузера используется только для обеспечения работы функционала приложения (сохранение выбранной темы, истории).",
    copyright: "© 2025 Peace & Balance App. Все права защищены.",

    // LLM
    llmPrompt: "Придумай короткое, мудрое и вдохновляющее предсказание для печенья с судьбой на тему: \"{topic}\". Максимум 1-2 предложения. На русском языке. Без кавычек."
  },
  en: {
    // Layout
    appTitle: "Fortune",
    appTitleHighlight: "Cookie",
    
    // Home
    themesLabel: "Themes:",
    selected: "selected",
    chooseLuck: "Choose\nYour Luck",
    tapToReveal: "Tap to reveal your destiny",
    myFortune: "My Fortune",
    luckyNumbers: "Lucky Numbers",
    shareTitle: "My Fortune",
    shareText: "🥠 The Fortune Cookie predicted:",
    checkYours: "Discover your destiny:",
    shareError: "Error sharing",
    copied: "Copied to clipboard",
    
    // Themes
    theme_love: "Love",
    theme_career: "Career",
    theme_education: "Education",
    theme_family: "Family",
    theme_health: "Health",
    theme_motivation: "Motivation",
    theme_funny: "Humor",
    theme_custom: "Destiny",
    
    // History
    historyTitle: "Fortune History",
    emptyHistory: "Your history is empty yet.",
    emptyHistorySub: "Open a cookie to get your first prediction!",
    unknownDate: "Unknown date",
    
    // Settings
    settingsTitle: "Settings",
    languageTitle: "App Language",
    chooseThemes: "Choose Themes",
    chooseThemesSub: "Select one or more themes for your fortunes. We'll randomly pick one.",
    customThemeTitle: "Custom Theme",
    customThemePlaceholder: "E.g.: Travel...",
    soundTitle: "Crack Sound",
    uploadSound: "Upload Sound",
    soundNote: "Plays when cookie cracks",
    resetSound: "Reset Default",
    add: "Add",
    save: "Save",
    privacyLink: "Privacy Policy",
    
    // Privacy
    backToHome: "Back to Home",
    legalTitle: "Legal Information",
    disclaimerTitle: "Disclaimer",
    disclaimerText: "Predictions are for entertainment purposes only and do not constitute professional advice.",
    disclaimerSub: "Any resemblance to real events is coincidental. Please make important life decisions based on rational analysis and consultation with specialists, not on the results of this application.",
    privacyTitle: "Privacy Policy",
    privacyIntro: "We respect your privacy and strive to protect your personal data.",
    dataCollectionTitle: "Data Collection",
    dataCollectionText: "The app does not collect, store, or transmit your personal data to remote servers. All fortune history and settings are stored exclusively locally on your device (in LocalStorage), except for the custom sound URL if you uploaded one.",
    cookiesTitle: "Cookie Usage",
    cookiesText: "We do not use tracking cookies. Browser local storage is used only to ensure the app's functionality (saving selected themes, history).",
    copyright: "© 2025 Peace & Balance App. All rights reserved.",

    // LLM
    llmPrompt: "Invent a short, wise, and inspiring fortune cookie prediction on the topic: \"{topic}\". Max 1-2 sentences. In English. No quotes."
  }
};

export const fortunes = {
  ru: {
    love: [
        "Любовь уже на пороге, откройте дверь.",
        "Ваше сердце подскажет верный путь.",
        "Романтическая встреча изменит всё.",
        "Будьте смелее в выражении чувств.",
        "Кто-то тайно восхищается вами.",
        "Гармония в отношениях достижима через диалог."
    ],
    career: [
        "Ваши усилия скоро окупятся с лихвой.",
        "Ожидайте выгодного предложения.",
        "Время для смелых карьерных шагов.",
        "Успех любит подготовленных.",
        "Новый проект принесет признание.",
        "Финансовый рост не за горами."
    ],
    education: [
        "Знания — это сила, которую у вас не отнять.",
        "Учеба даст плоды быстрее, чем вы думаете.",
        "Сложный экзамен жизни вы сдадите на отлично.",
        "Новый навык откроет неожиданные двери.",
        "Мудрость приходит к тем, кто умеет слушать."
    ],
    family: [
        "Семья — ваша надежная опора.",
        "Проведите время с близкими, это зарядит вас.",
        "Домашний уют принесет покой в душу.",
        "Хорошие новости от родственников уже в пути.",
        "Прощение укрепит семейные узы."
    ],
    health: [
        "Здоровье — главное богатство, берегите его.",
        "Прогулка на свежем воздухе исцелит усталость.",
        "Прислушайтесь к своему телу, оно мудрое.",
        "Энергия бьет ключом, направьте её в мирное русло.",
        "Хороший сон — залог больших побед."
    ],
    motivation: [
        "Верьте в себя, и мир поверит в вас.",
        "Каждый шаг приближает к вершине.",
        "Не бойтесь ошибаться, бойтесь не пробовать.",
        "Ваш потенциал безграничен.",
        "Сегодня лучший день для начала нового."
    ],
    funny: [
        "Если жизнь дает лимоны, требуйте текилу.",
        "Улыбнитесь, босс любит идиотов.",
        "Не ешьте желтый снег — вот и вся мудрость.",
        "Ваша удача в другом печенье (шутка!).",
        "Работать не вредно, но и отдыхать полезно."
    ],
    generics: [
        "Звезды благоволят вам.",
        "Счастье уже в пути.",
        "Доверьтесь интуиции.",
        "Вас ждет приятный сюрприз.",
        "Все перемены — к лучшему."
    ]
  },
  en: {
    love: [
        "Love is just around the corner, open the door.",
        "Your heart will show you the right way.",
        "A romantic encounter will change everything.",
        "Be bolder in expressing your feelings.",
        "Someone secretly admires you.",
        "Harmony in relationships is achieved through dialogue."
    ],
    career: [
        "Your efforts will soon pay off handsomely.",
        "Expect a lucrative offer.",
        "Time for bold career moves.",
        "Success favors the prepared.",
        "A new project will bring recognition.",
        "Financial growth is just around the corner."
    ],
    education: [
        "Knowledge is power that cannot be taken from you.",
        "Studies will bear fruit sooner than you think.",
        "You will pass life's difficult exam with flying colors.",
        "A new skill will open unexpected doors.",
        "Wisdom comes to those who know how to listen."
    ],
    family: [
        "Family is your reliable support.",
        "Spend time with loved ones, it will recharge you.",
        "Home comfort will bring peace to your soul.",
        "Good news from relatives is on the way.",
        "Forgiveness will strengthen family bonds."
    ],
    health: [
        "Health is the main wealth, take care of it.",
        "A walk in the fresh air will heal fatigue.",
        "Listen to your body, it is wise.",
        "Energy is in full swing, direct it into a peaceful channel.",
        "Good sleep is the key to great victories."
    ],
    motivation: [
        "Believe in yourself, and the world will believe in you.",
        "Every step brings you closer to the summit.",
        "Don't be afraid to make mistakes, be afraid not to try.",
        "Your potential is limitless.",
        "Today is the best day to start something new."
    ],
    funny: [
        "If life gives you lemons, demand tequila.",
        "Smile, the boss loves idiots.",
        "Don't eat yellow snow — that's all the wisdom.",
        "Your luck is in another cookie (joke!).",
        "Working is not harmful, but resting is useful too."
    ],
    generics: [
        "The stars favor you.",
        "Happiness is on the way.",
        "Trust your intuition.",
        "A pleasant surprise awaits you.",
        "All changes are for the better."
    ]
  }
};