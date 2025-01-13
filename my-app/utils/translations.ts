export const translations = {
  ru: {
    // Home page
    welcome: 'Добро пожаловать в KaiOG',
    description: 'Погрузитесь в захватывающие миры наших игр, где каждое решение имеет значение, а приключения ждут за каждым углом.',
    kainshiogTitle: 'Kainshiog',
    kainshiogDescription: 'Kainshiog – это игра в стиле dark fantasy, вдохновленная атмосферой и глубиной Kenshi. Игроки погружаются в мрачный и беспощадный мир, где каждое решение может быть судьбоносным...',
    kolligTitle: 'Kollig',
    kolligDescription: 'Вдохновленная жанром boss rush и культовым шутером Ultrakill, игра Kollig предлагает игрокам испытать свои навыки в интенсивных и напряженных сражениях с могучими боссами. Погрузитесь в адреналиновую атмосферу, где каждое столкновение проверяет вашу реакцию и стратегию на прочность.',
    learnMore: 'Подробнее',
    userNotFound: 'Пользователь не найден',
    adminAddError: 'Ошибка добавления администратора',
    adminAddedSuccess: 'Администратор успешно добавлен',
    updateError: 'Ошибка при сохранении обновления',
    updateSuccess: 'Обновление успешно сохранено',
    imageUploadError: 'Ошибка при загрузке изображения',
    // Game page
    about: 'О игре',
    features: 'Особенности',
    updates: 'Обновления',
    genre: 'Жанр',
    darkFantasy: 'Dark Fantasy, RPG',
    gameDescription: 'Вдохновленная атмосферой dark fantasy и глубиной игры Kenshi, Kainshiog приглашает игроков в мрачный и беспощадный мир, где жестокость и выживание переплетаются в эпическом сражении. Окунитесь в историю, полную интриг и опасностей, где каждое решение может стать судьбоносным.',
    passwordsDoNotMatch: 'Пароли не совпадают', // Добавлено
    addNewAdmin: 'Добавить нового администратора', // Добавлено
    featuresList: [
       { id: 'f1', text: 'Управление группой героев с уникальными способностями и предысториями' },
       { id: 'f2', text: 'Исследование обширных и опасных земель' },
       { id: 'f3', text: 'Строительство и укрепление базы' },
       { id: 'f4', text: 'Интенсивные сражения' },
       { id: 'f5', text: 'Глубокая система развития персонажей' },
       { id: 'f6', text: 'Богатая атмосфера мира тьмы и отчаяния' }
     ], // Убедитесь, что featuresList — это массив объектов
    
    patchTitle: 'Патч 1.2.3',
    patchDescription: 'Описание патча:',
    patchNotes: [
      'Исправлены ошибки в многопользовательском режиме',
      'Добавлены новые предметы и оружие',
      'Улучшен баланс игровых классов',
      'Оптимизирована производительность на слабых устройствах',
      'Обновлен пользовательский интерфейс'
    ],
    preorder: 'Сделать предзаказ',
    backToHome: 'Вернуться на главную',

    // Auth page
    loginWelcome: 'Добро пожаловать!',
    registerWelcome: 'Присоединяйтесь к нам',
    loginDescription: 'Войдите в свой аккаунт',
    registerDescription: 'Создайте новый аккаунт',
    username: 'Имя пользователя',
    email: 'Email',
    password: 'Пароль',
    confirmPassword: 'Подтвердите пароль',
    login: 'Войти',
    register: 'Зарегистрироваться',
    noAccount: 'Нет аккаунта?',
    haveAccount: 'Уже есть аккаунт?',

    pageNotFound: 'Страница не найдена', 
    pageNotFoundDescription: 'Извините, запрашиваемая страница не существует.', 
        
    // Profile page
    profileTitle: 'Профиль пользователя',
    info: 'Информация',
    security: 'Безопасность',
    purchases: 'Покупки',
    settings: 'Настройки',
    name: 'Имя',
    registrationDate: 'Дата регистрации',
    edit: 'Редактировать',
    save: 'Сохранить изменения',
    changePassword: 'Смена пароля',
    newPassword: 'Новый пароль',
    ConfirmPassword: 'Подтвердите пароль',
    oldPassword: 'Старый пароль',
    twoFactor: 'Двухфакторная аутентификация',
    twoFactorDescription: 'Повысьте безопасность вашего аккаунта, включив двухфакторную аутентификацию.',
    twoFactorEnabled: 'Двухфакторная аутентификация включена',
    scanQrCode: 'Отсканируйте этот QR-код в вашем приложении аутентификации',
    setupKey: 'Ключ настройки',
    purchaseHistory: 'История покупок',
    purchaseDate: 'Дата покупки',
    generalSettings: 'Общие настройки',
    language: 'Язык',
    theme: 'Тема',
    notifications: 'Уведомления',
    emailNotifications: 'Email уведомления',
    light: 'Светлая',
    dark: 'Темная',
    system: 'Системная',
    changeEmail: 'Изменить email',
    newEmail: 'Новый email',
    emailUpdateSent: 'На ваш новый email отправлено письмо для подтверждения.',
    emailUpdateError: 'Произошла ошибка при обновлении email.',
    noPurchases: 'На данный момент у вас нет покупок.',
    avatar: 'Аватар',
    currentEmail: 'Текущий email',
    verifyCurrentEmail: 'Подтвердить текущий email',
    confirmVerification: 'Подтвердить верификацию',
    currentEmailVerificationSent: 'На ваш текущий email отправлено письмо для подтверждения.',
    emailVerificationError: 'Произошла ошибка при верификации email.',
    avatarUpdateError: 'Произошла ошибка при обновлении аватара.',
    enterTwoFactorCode: 'Введите 6-значный код',
    verifyTwoFactorCode: 'Подтвердить код',
    twoFactorCodeSent: 'Код двухфакторной аутентификации отправлен на вашу почту',
    twoFactorCodeError: 'Ошибка при отправке кода двухфакторной аутентификации',
    twoFactorDisabled: 'Двухфакторная аутентификация отключена',
    twoFactorDisableError: 'Ошибка при отключении двухфакторной аутентификации',
    invalidTwoFactorCode: 'Неверный код двухфакторной аутентификации',
    TwoFactorEnabled: 'Двухфакторная аутентификация включена',
    twoFactorEnableError: 'Ошибка при включении двухфакторной аутентификации',
    adminPanel: 'Панель администратора',
    updateTitle: 'Заголовок обновления',
    updateDescription: 'Описание обновления',
    updateImage: 'Изображение обновления',
    saveUpdate: 'Сохранить обновление',
    ImageUploadError: 'Ошибка при загрузке изображения',
    noUpdates: 'Нет доступных обновлений',
    noImage: 'Изображение отсутствует',
    avatarUpdateSuccess: 'Аватар успешно обновлен',

    // Header
    home: 'Главная',
    About: 'О нас',
    profile: 'Профиль',
    logout: 'Выйти',
    Login: 'Войти',

    // Footer
    rights: 'Все права защищены.',
    terms: 'Условия использования',
    privacy: 'Политика конфиденциальности',

    // About page
    aboutUs: 'О нас',
    ourMission: 'Наша миссия',
    missionDescription: 'KaiOG стремится создавать инновационные и захватывающие игры, которые не только развлекают, но и вдохновляют игроков по всему миру. Мы верим в силу интерактивных историй и их способность объединять людей.',
    ourHistory: 'Наша история',
    historyDescription: 'Основанная в 2024 году студентами и нашей инди-командой KaiOG, молодая группа энтузиастов только начинает свой путь в мире разработки игр. Наше стремление и креативность уже заложили основу для будущих успехов. Мы, команда KaiOG, полны решимости показать, на что мы способны, и сделать свой вклад в игровую индустрию. Наш путь только начинается, но уже обещает быть увлекательным и успешным.',
    ourValues: 'Наши ценности',
    valuesList: [
      'Инновации: Мы постоянно ищем новые способы удивить и порадовать наших игроков.',
      'Качество: Каждая наша игра - это результат кропотливой работы и внимания к деталям.',
      'Сообщество: Мы ценим наших игроков и активно взаимодействуем с игровым сообществом.',
      'Этика: Мы придерживаемся высоких этических стандартов в разработке и монетизации наших игр.'
    ],
    kolligFeatures: [
      { id: 'k1', text: 'Уникальные боссы с разнообразными атаками и способностями' },
      { id: 'k2', text: 'Постоянно изменяющиеся арены' },
      { id: 'k3', text: 'Мрачная и динамичная визуальная стилистика' },
      { id: 'k4', text: 'Напряжённый саундтрек' },
      { id: 'k5', text: 'Интенсивные сражения, требующие быстрой реакции и стратегического мышления' },
      { id: 'k6', text: 'Система прогрессии и улучшения навыков' }
    ],
    kolligUpdate: 'Обновление 1.1.0',
    kolligUpdateNotes: [
      'Добавлена новая локация для исследования',
      'Улучшена система освещения и теней',
      'Новые головоломки и загадки',
      'Оптимизация производительности',
      'Исправлены мелкие ошибки и улучшен игровой баланс'
    ],
  },
  en: {
    // Home page
    welcome: 'Welcome to KaiOG',
    description: 'Immerse yourself in the exciting worlds of our games, where every decision matters and adventures await around every corner.',
    kainshiogTitle: 'Kainshiog',
    kainshiogDescription: 'Kainshiog is a dark fantasy game inspired by the atmosphere and depth of Kenshi. Players are immersed in a grim and unforgiving world where every decision can be fateful...',
    kolligTitle: 'Kollig',
    kolligDescription: 'Inspired by the boss rush genre and the cult shooter Ultrakill, Kollig offers players the chance to test their skills in intense and tense battles with mighty bosses. Immerse yourself in an adrenaline-fueled atmosphere where every encounter tests your reaction and strategy to the limit.',
    learnMore: 'Learn More',

    // ... остальные переводы
    userNotFound: 'User not found',
    adminAddError: 'Error adding admin',
    adminAddedSuccess: 'Admin added successfully',
    updateError: 'Error saving update',
    updateSuccess: 'Update saved successfully',
    imageUploadError: 'Error uploading image',

    addAdmin: 'Add Admin',
    aminAddError: 'Error adding admin',
    newAdminEmail: 'New admin email',
    addNewAdmin: 'Add New Admin', // Добавлено
    passwordsDoNotMatch: 'Passwords do not match', // Добавлено
    pageNotFound: 'Page Not Found', 
    pageNotFoundDescription: 'Sorry, the page you are looking for does not exist.', 
    backToHome: 'Back to Home',
    
    // Game page
    about: 'About',
    features: 'Features',
    updates: 'Updates',
    genre: 'Genre',
    darkFantasy: 'Dark Fantasy, RPG',
    gameDescription: 'Inspired by the dark fantasy atmosphere and depth of Kenshi, Kainshiog invites players into a grim and unforgiving world where cruelty and survival intertwine in an epic battle. Immerse yourself in a story full of intrigue and danger, where every decision can be fateful.',
    featuresList: [
       { id: 'f1', text: 'Control a group of heroes with unique abilities and backstories' },
       { id: 'f2', text: 'Explore vast and dangerous lands' },
       { id: 'f3', text: 'Build and fortify your base' },
       { id: 'f4', text: 'Intense battles' },
       { id: 'f5', text: 'Deep character development system' },
       { id: 'f6', text: 'Rich atmosphere of a world of darkness and despair' }
     ], // Убедитесь, что featuresList — это массив объектов
    
    patchTitle: 'Patch 1.2.3',
    patchDescription: 'Patch notes:',
    patchNotes: [
      'Fixed bugs in multiplayer mode',
      'Added new items and weapons',
      'Improved balance of game classes',
      'Optimized performance on low-end devices',
      'Updated user interface'
    ],
    preorder: 'Pre-order',
    BackToHome: 'Back to Home',

    // Auth page
    loginWelcome: 'Welcome back!',
    registerWelcome: 'Join us',
    loginDescription: 'Log in to your account',
    registerDescription: 'Create a new account',
    username: 'Username',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    login: 'Log in',
    register: 'Register',
    noAccount: 'Don\'t have an account?',
    haveAccount: 'Already have an account?',

    // Profile page
    profileTitle: 'User Profile',
    info: 'Information',
    security: 'Security',
    purchases: 'Purchases',
    settings: 'Settings',
    name: 'Name',
    registrationDate: 'Registration Date',
    edit: 'Edit',
    save: 'Save Changes',
    changePassword: 'Change Password',
    newPassword: 'New Password',
    ConfirmPassword: 'Confirm Password',
    oldPassword: 'Old Password',
    twoFactor: 'Two-Factor Authentication',
    twoFactorDescription: 'Enhance your account security by enabling two-factor authentication.',
    twoFactorEnabled: 'Two-factor authentication is enabled',
    scanQrCode: 'Scan this QR code in your authenticator app',
    setupKey: 'Setup key',
    purchaseHistory: 'Purchase History',
    purchaseDate: 'Purchase Date',
    generalSettings: 'General Settings',
    language: 'Language',
    theme: 'Theme',
    notifications: 'Notifications',
    emailNotifications: 'Email Notifications',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    changeEmail: 'Change email',
    newEmail: 'New email',
    emailUpdateSent: 'A confirmation email has been sent to your new email address.',
    emailUpdateError: 'An error occurred while updating your email.',
    noPurchases: 'You have not made any purchases yet.',
    avatar: 'Avatar',
    currentEmail: 'Current email',
    verifyCurrentEmail: 'Verify current email',
    confirmVerification: 'Confirm verification',
    currentEmailVerificationSent: 'A verification email has been sent to your current email address.',
    emailVerificationError: 'An error occurred during email verification.',
    avatarUpdateError: 'An error occurred while updating the avatar.',
    enterTwoFactorCode: 'Enter 6-digit code',
    verifyTwoFactorCode: 'Verify code',
    twoFactorCodeSent: 'Two-factor authentication code sent to your email',
    twoFactorCodeError: 'Error sending two-factor authentication code',
    twoFactorDisabled: 'Two-factor authentication disabled',
    twoFactorDisableError: 'Error disabling two-factor authentication',
    invalidTwoFactorCode: 'Invalid two-factor authentication code',
    TwoFactorEnabled: 'Two-factor authentication enabled',
    twoFactorEnableError: 'Error enabling two-factor authentication',
    adminPanel: 'Admin Panel',
    updateTitle: 'Update Title',
    updateDescription: 'Update Description',
    updateImage: 'Update Image',
    saveUpdate: 'Save Update',
    UpdateError: 'Error saving update',
    UpdateSuccess: 'Update saved successfully',
    ImageUploadError: 'Error uploading image',
    noUpdates: 'No updates available',
    noImage: 'No image available',
    avatarUpdateSuccess: 'Avatar updated successfully',

    // Header
    home: 'Home',
    About: 'About',
    profile: 'Profile',
    logout: 'Logout',
    Login: 'Login',

    // Footer
    rights: 'All rights reserved.',
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',

    // About page
    aboutUs: 'About Us',
    ourMission: 'Our Mission',
    missionDescription: 'KaiOG strives to create innovative and exciting games that not only entertain but also inspire players around the world. We believe in the power of interactive stories and their ability to bring people together.',
    ourHistory: 'Our History',
    historyDescription: 'Founded in 2024 by students and our indie team KaiOG, a young group of enthusiasts is just beginning its journey in the world of game development. Our aspiration and creativity have already laid the foundation for future successes. We, the KaiOG team, are determined to show what we are capable of and make our contribution to the gaming industry. Our journey is just beginning, but it already promises to be exciting and successful.',
    ourValues: 'Our Values',
    valuesList: [
      'Innovation: We are constantly looking for new ways to surprise and delight our players.',
      'Quality: Each of our games is the result of painstaking work and attention to detail.',
      'Community: We value our players and actively interact with the gaming community.',
      'Ethics: We adhere to high ethical standards in the development and monetization of our games.'
    ],
    kolligFeatures: [
      { id: 'k1', text: 'Unique bosses with diverse attacks and abilities' },
      { id: 'k2', text: 'Constantly changing arenas' },
      { id: 'k3', text: 'Dark and dynamic visual style' },
      { id: 'k4', text: 'Intense soundtrack' },
      { id: 'k5', text: 'Intense battles requiring quick reactions and strategic thinking' },
      { id: 'k6', text: 'Progression system and skill improvement' }
    ],
    kolligUpdate: 'Update 1.1.0',
    kolligUpdateNotes: [
      'Added a new location for exploration',
      'Improved lighting and shadow system',
      'New puzzles and riddles',
      'Performance optimization',
      'Fixed minor bugs and improved game balance'
    ],
  }
};


export type Language = 'ru' | 'en';
export type TranslationKey = keyof typeof translations.en | keyof typeof translations.ru;

// Функция getTranslation с исправлением
export function getTranslation(lang: Language, key: TranslationKey): string {
  const translationBlock = translations[lang] as unknown as { [key in TranslationKey]: string | string[] };
  const translation = translationBlock[key];

  if (typeof translation === 'string') {
    return translation;
  } else if (Array.isArray(translation)) {
    return translation.join(', ');
  } else {
    return key;
  }
}


