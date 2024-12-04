// بيانات اللعبة
const gameData = {
    'التاريخ': {
        100: {
            answer: 'معركة القادسية',
            question: 'ما هي المعركة التي انتصر فيها المسلمون على الفرس عام 636م؟'
        },
        200: {
            answer: 'صلاح الدين الأيوبي',
            question: 'من هو القائد المسلم الذي حرر القدس من الصليبيين؟'
        },
        300: {
            answer: 'الأندلس',
            question: 'ما هو الاسم الذي أطلقه المسلمون على شبه الجزيرة الأيبيرية؟'
        },
        400: {
            answer: 'بيت الحكمة',
            question: 'ما هو المركز العلمي الشهير الذي أسسه الخليفة المأمون في بغداد؟'
        },
        500: {
            answer: 'عبد الملك بن مروان',
            question: 'من هو الخليفة الأموي الذي عرب الدواوين وسك النقود الإسلامية؟'
        }
    },
    'العلوم': {
        100: {
            answer: 'ابن الهيثم',
            question: 'من هو العالم المسلم الذي يعتبر مؤسس علم البصريات؟'
        },
        200: {
            answer: 'الخوارزمي',
            question: 'من هو العالم الذي اخترع علم الجبر؟'
        },
        300: {
            answer: 'ابن سينا',
            question: 'من هو مؤلف كتاب القانون في الطب؟'
        },
        400: {
            answer: 'الإسطرلاب',
            question: 'ما هي الأداة التي استخدمها العلماء المسلمون لتحديد مواقع النجوم؟'
        },
        500: {
            answer: 'جابر بن حيان',
            question: 'من هو العالم المسلم الملقب بأبي الكيمياء؟'
        }
    },
    'الجغرافيا': {
        100: {
            answer: 'البحر الميت',
            question: 'ما هو أخفض نقطة على سطح الأرض؟'
        },
        200: {
            answer: 'جبل طارق',
            question: 'ما هو المضيق الذي يربط البحر المتوسط بالمحيط الأطلسي؟'
        },
        300: {
            answer: 'النيل',
            question: 'ما هو أطول نهر في العالم؟'
        },
        400: {
            answer: 'الربع الخالي',
            question: 'ما هي أكبر صحراء رملية متصلة في العالم؟'
        },
        500: {
            answer: 'إيفرست',
            question: 'ما هو أعلى جبل في العالم؟'
        }
    },
    'الرياضة': {
        100: {
            answer: 'البرازيل',
            question: 'ما هي الدولة التي فازت بكأس العالم لكرة القدم 5 مرات؟'
        },
        200: {
            answer: 'محمد علي كلاي',
            question: 'من هو الملاكم الذي لقب بأعظم لاعب في كل العصور؟'
        },
        300: {
            answer: 'ريال مدريد',
            question: 'ما هو النادي الأكثر فوزاً بدوري أبطال أوروبا؟'
        },
        400: {
            answer: 'مايكل جوردن',
            question: 'من هو اللاعب الملقب بأعظم لاعب كرة سلة في التاريخ؟'
        },
        500: {
            answer: 'يوسين بولت',
            question: 'من هو العداء الجامايكي الذي يحمل الرقم القياسي العالمي في سباق 100 متر؟'
        }
    }
};

// متغيرات عامة للعبة
let currentScore = 0;
let completedAnswers = new Set();
let players = [{ id: 1, score: 0 }];
let currentPlayerIndex = 0;
let selectedCategories = Object.keys(gameData);

// وظائف التحكم باللعبة
function initializeGameControls() {
    // زر لعبة جديدة
    const newGameButton = document.getElementById('newGameButton');
    newGameButton.addEventListener('click', () => {
        if (confirm('هل أنت متأكد من بدء لعبة جديدة؟ سيتم فقدان جميع التقدم الحالي.')) {
            resetGame();
        }
    });

    // زر إعادة الضبط
    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', () => {
        if (confirm('هل تريد إعادة ضبط اللعبة الحالية؟ سيتم إعادة تعيين النقاط.')) {
            restartCurrentGame();
        }
    });

    // زر الإعدادات
    const settingsButton = document.getElementById('settingsButton');
    settingsButton.addEventListener('click', () => {
        showSettingsModal();
    });
}

// تهيئة لوحة اللعب
function initializeGame() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';

    // إنشاء لوحة اللعب
    selectedCategories.forEach(category => {
        // إنشاء عنصر الفئة
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        
        // إضافة عنوان الفئة
        const categoryTitle = document.createElement('div');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        // إنشاء بطاقات الأسئلة
        const categoryAnswers = document.createElement('div');
        categoryAnswers.className = 'category-answers';
        
        // النقاط المتاحة لكل فئة
        const points = [100, 200, 300, 400, 500];
        
        points.forEach(pointValue => {
            const answerCard = document.createElement('div');
            answerCard.className = 'answer-card';
            if (!completedAnswers.has(`${category}-${pointValue}`)) {
                answerCard.textContent = pointValue;
                answerCard.addEventListener('click', () => showQuestion(category, pointValue));
            } else {
                answerCard.classList.add('completed');
                answerCard.textContent = '✓';
            }
            answerCard.dataset.category = category;
            answerCard.dataset.points = pointValue;
            categoryAnswers.appendChild(answerCard);
        });

        categoryDiv.appendChild(categoryAnswers);
        gameBoard.appendChild(categoryDiv);
    });

    updateUI();
}

// عرض السؤال
function showQuestion(category, points) {
    const questionData = gameData[category][points];
    if (!questionData) return;

    const modal = document.getElementById('answer-modal');
    const questionDiv = modal.querySelector('.question');
    const answerInput = modal.querySelector('#answer-input');
    
    // عرض السؤال
    questionDiv.textContent = questionData.question;
    
    // إعادة تعيين حقل الإدخال
    answerInput.value = '';
    
    // إضافة مستمع الحدث لزر التحقق
    const submitButton = modal.querySelector('#submit-answer');
    submitButton.onclick = () => checkAnswer(category, points, answerInput.value);
    
    // إضافة مستمع لمفتاح Enter
    answerInput.onkeypress = (event) => {
        if (event.key === 'Enter') {
            checkAnswer(category, points, answerInput.value);
        }
    };
    
    // عرض النافذة المنبثقة
    modal.style.display = 'block';
    answerInput.focus();
}

// التحقق من الإجابة
function checkAnswer(category, points, userAnswer) {
    // التحقق من الإجابة الفارغة
    if (!userAnswer || userAnswer.trim() === '') {
        alert('يرجى إدخال إجابة!');
        return;
    }

    const questionData = gameData[category][points];
    const correctAnswer = questionData.answer;
    const isCorrect = compareAnswers(userAnswer, correctAnswer);
    
    if (isCorrect) {
        // إضافة النقاط للاعب الحالي
        players[currentPlayerIndex].score += points;
        alert(`إجابة صحيحة! 🎉\nالإجابة الكاملة هي: ${correctAnswer}`);
        
        // تحديث حالة البطاقة
        completedAnswers.add(`${category}-${points}`);
    } else {
        alert(`إجابة خاطئة.\nالإجابة الصحيحة هي: ${correctAnswer}`);
    }
    
    // إغلاق النافذة المنبثقة
    closeModal(document.getElementById('answer-modal'));
    
    // تحديث دور اللاعب
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    
    // تحديث واجهة المستخدم
    updateUI();
}

// إعادة تعيين اللعبة بالكامل
function resetGame() {
    // إعادة تعيين حالة اللعبة
    players = [];
    currentPlayerIndex = 0;
    selectedCategories = [];
    completedAnswers = new Set();
    
    // إعادة تعيين واجهة المستخدم
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';
    
    // عرض نافذة الإعدادات
    showSettingsModal();
    
    // تحديث واجهة المستخدم
    updateUI();
}

// إعادة ضبط اللعبة الحالية
function restartCurrentGame() {
    // الاحتفاظ بنفس الإعدادات ولكن إعادة تعيين النقاط
    players.forEach(player => player.score = 0);
    currentPlayerIndex = 0;
    completedAnswers = new Set();
    
    // إعادة إنشاء لوحة اللعب
    initializeGame();
    
    // تحديث واجهة المستخدم
    updateUI();
}

// تحديث واجهة المستخدم
function updateUI() {
    updatePlayersList();
    updateGameBoard();
    updateGameControls();
}

// تحديث حالة أزرار التحكم
function updateGameControls() {
    const restartButton = document.getElementById('restartButton');
    const newGameButton = document.getElementById('newGameButton');
    const settingsButton = document.getElementById('settingsButton');
    
    // تعطيل زر إعادة الضبط إذا لم تكن هناك لعبة جارية
    restartButton.disabled = !players.length;
    
    // تحديث حالة الأزرار الأخرى حسب حالة اللعبة
    settingsButton.disabled = false;
    newGameButton.disabled = false;
}

// تحديث لوحة اللعب
function updateGameBoard() {
    const gameBoard = document.querySelector('.game-board');
    if (!gameBoard) return;

    // تحديث حالة البطاقات المكتملة
    const cards = gameBoard.querySelectorAll('.answer-card');
    cards.forEach(card => {
        const cardId = card.dataset.category + '-' + card.dataset.points;
        if (completedAnswers.has(cardId)) {
            card.classList.add('completed');
            card.textContent = '✓';
        }
    });

    // التحقق من انتهاء اللعبة
    if (completedAnswers.size === selectedCategories.length * 5) {
        endGame();
    }
}

// إنهاء اللعبة
function endGame() {
    // تحديد الفائز
    const winner = determineWinner();
    
    // عرض رسالة النهاية
    const message = `
        انتهت اللعبة!
        الفائز هو: اللاعب ${winner.id}
        بمجموع نقاط: ${winner.score}
    `;
    
    setTimeout(() => {
        alert(message);
        if (confirm('هل تريد بدء لعبة جديدة؟')) {
            resetGame();
        }
    }, 500);
}

// تحديد الفائز
function determineWinner() {
    return players.reduce((highest, current) => {
        return current.score > highest.score ? current : highest;
    }, players[0]);
}

// إظهار نافذة الإعدادات
function showSettingsModal() {
    const modal = document.getElementById('settings-modal');
    modal.style.display = 'block';
    initializeSettings();
}

// تحديث قائمة اللاعبين
function updatePlayersList() {
    const playersList = document.getElementById('players-list');
    playersList.innerHTML = '';
    
    players.forEach((player, index) => {
        const div = document.createElement('div');
        div.className = `player-score ${index === currentPlayerIndex ? 'player-active' : ''}`;
        div.textContent = `اللاعب ${player.id}: ${player.score}`;
        playersList.appendChild(div);
    });
    
    document.querySelector('#current-player span').textContent = players[currentPlayerIndex].id;
}

// التحقق من صحة الإعدادات
function validateSettings() {
    const playerCount = parseInt(document.getElementById('playerCount').value);
    const categoriesSelected = document.querySelectorAll('#categories-list input:checked').length;
    
    if (playerCount < 1 || playerCount > 4) {
        alert('عدد اللاعبين يجب أن يكون بين 1 و 4');
        return false;
    }
    
    if (categoriesSelected < 2) {
        alert('يجب اختيار فئتين على الأقل');
        return false;
    }
    
    return true;
}

// حفظ الإعدادات وبدء اللعبة
function saveSettings() {
    if (!validateSettings()) return;
    
    // جمع الإعدادات
    const playerCount = parseInt(document.getElementById('playerCount').value);
    const selectedCats = Array.from(document.querySelectorAll('#categories-list input:checked'))
        .map(checkbox => checkbox.value);
    
    // تحديث حالة اللعبة
    players = Array.from({ length: playerCount }, (_, i) => ({ id: i + 1, score: 0 }));
    selectedCategories = selectedCats;
    currentPlayerIndex = 0;
    completedAnswers.clear();
    
    // إخفاء نافذة الإعدادات
    document.getElementById('settings-modal').style.display = 'none';
    
    // بدء اللعبة
    initializeGame();
    updateUI();
}

// إضافة مستمعي الأحداث للإعدادات
document.getElementById('startButton')?.addEventListener('click', saveSettings);

// تهيئة الإعدادات
function initializeSettings() {
    const categoriesList = document.getElementById('categories-list');
    categoriesList.innerHTML = '';
    
    Object.keys(gameData).forEach(category => {
        const div = document.createElement('div');
        div.className = 'category-option';
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `category-${category}`;
        input.value = category;
        input.className = 'category-checkbox';
        
        const label = document.createElement('label');
        label.htmlFor = `category-${category}`;
        label.textContent = category;
        
        div.appendChild(input);
        div.appendChild(label);
        categoriesList.appendChild(div);
    });
}

// إضافة مستمعي الأحداث للنوافذ المنبثقة
function initializeModals() {
    // إضافة مستمعي الأحداث لأزرار الإغلاق
    const closeButtons = document.querySelectorAll('.modal .close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // إغلاق النافذة عند النقر خارجها
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });
}

// إغلاق النافذة المنبثقة
function closeModal(modal) {
    modal.style.display = 'none';
    if (modal.id === 'answer-modal') {
        const answerInput = modal.querySelector('#answer-input');
        if (answerInput) {
            answerInput.value = '';
        }
    }
}

// بدء اللعبة
document.addEventListener('DOMContentLoaded', () => {
    initializeGameControls();
    initializeModals();
    initializeGame();
});

// مقارنة الإجابات
function compareAnswers(userAnswer, correctAnswer) {
    // التحقق من الإجابة الفارغة
    if (!userAnswer || userAnswer.trim() === '') {
        return false;
    }

    // تنظيف وتوحيد صيغة النصوص
    const normalizeText = (text) => {
        return text
            .trim()
            .toLowerCase()
            .replace(/[ًٌٍَُِّْـ]/g, '') // إزالة التشكيل
            .replace(/[أإآ]/g, 'ا') // توحيد الألف
            .replace(/[ة]/g, 'ه') // توحيد التاء المربوطة
            .replace(/[ى]/g, 'ي') // توحيد الياء
            .replace(/[؟.,!]/g, '') // إزالة علامات الترقيم
            .replace(/\s+/g, ' '); // توحيد المسافات
    };

    const normalizedUserAnswer = normalizeText(userAnswer);
    const normalizedCorrectAnswer = normalizeText(correctAnswer);
    
    // الكلمات العامة التي لا تعتبر إجابة صحيحة بمفردها
    const commonWords = [
        'ال', 'في', 'من', 'على', 'الى', 'عن', 'مع',
        'نهر', 'جبل', 'مدينة', 'بحر', 'دولة', 'قارة',
        'عاصمة', 'ملك', 'رئيس', 'منتخب', 'فريق', 'نادي',
        'عالم', 'شخص', 'شخصية', 'حدث', 'معركة', 'هو', 'هي'
    ];
    
    // تقسيم النصوص إلى كلمات
    const userWords = normalizedUserAnswer.split(' ').filter(word => word.length > 1);
    const correctWords = normalizedCorrectAnswer.split(' ').filter(word => word.length > 1);
    
    // التحقق من أن الإجابة ليست مجرد كلمات عامة
    const hasOnlyCommonWords = userWords.every(word => commonWords.includes(word));
    if (hasOnlyCommonWords) {
        return false;
    }

    // إزالة الكلمات العامة
    const cleanUserWords = userWords.filter(word => !commonWords.includes(word));
    const cleanCorrectWords = correctWords.filter(word => !commonWords.includes(word));

    // إذا لم تبق أي كلمات بعد التنظيف
    if (cleanUserWords.length === 0) {
        return false;
    }

    // البحث عن تطابق الكلمات
    for (const userWord of cleanUserWords) {
        for (const correctWord of cleanCorrectWords) {
            // التطابق المباشر
            if (userWord === correctWord) {
                return true;
            }
            
            // التطابق الجزئي (إذا كانت الكلمة جزءاً من الإجابة الصحيحة)
            if (correctWord.includes(userWord) && userWord.length > 2) {
                return true;
            }
            
            // التطابق العكسي (إذا كانت الإجابة الصحيحة جزءاً من إجابة المستخدم)
            if (userWord.includes(correctWord) && correctWord.length > 2) {
                return true;
            }
        }
    }

    return false;
}
