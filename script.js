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
    gameBoard.innerHTML = '<div class="categories-container"></div>';
    const categoriesContainer = gameBoard.querySelector('.categories-container');
    
    // إنشاء عمود لكل فئة
    selectedCategories.forEach(category => {
        const categoryColumn = document.createElement('div');
        categoryColumn.className = 'category-column';
        categoryColumn.dataset.category = category;
        
        // إضافة عنوان الفئة
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category';
        categoryHeader.textContent = category;
        categoryColumn.appendChild(categoryHeader);
        
        // إضافة حاوية للبطاقات
        const categoryAnswers = document.createElement('div');
        categoryAnswers.className = 'category-answers';
        
        // إضافة البطاقات مرتبة حسب النقاط
        const points = [100, 200, 300, 400, 500];
        points.forEach(pointValue => {
            const item = gameData[category][pointValue];
            if (item) {
                const answerCard = document.createElement('div');
                answerCard.className = 'answer-card';
                answerCard.textContent = item.points;
                answerCard.dataset.category = category;
                answerCard.dataset.index = pointValue;
                
                if (completedAnswers.has(`${category}-${answerCard.dataset.index}`)) {
                    answerCard.classList.add('completed');
                }
                
                answerCard.addEventListener('click', () => {
                    if (!answerCard.classList.contains('completed')) {
                        showAnswer(category, answerCard.dataset.index);
                    }
                });
                
                categoryAnswers.appendChild(answerCard);
            }
        });
        
        categoryColumn.appendChild(categoryAnswers);
        categoriesContainer.appendChild(categoryColumn);
    });

    updatePlayersList();
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
    const cards = gameBoard.querySelectorAll('.card');
    cards.forEach(card => {
        const cardId = card.dataset.cardId;
        if (completedAnswers.has(cardId)) {
            card.classList.add('completed');
            card.disabled = true;
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

// عرض نافذة السؤال
function showAnswer(category, index) {
    const modal = document.getElementById('answer-modal');
    const data = gameData[category][index];
    
    // تحديث محتوى النافذة المنبثقة
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeAnswerModal()">&times;</span>
            <h2>${category}</h2>
            <p class="points">${data.points} نقطة</p>
            <p class="question">${data.answer}</p>
            <div class="answer-input">
                <input type="text" id="user-answer" placeholder="أدخل إجابتك هنا" dir="rtl">
                <button onclick="submitAnswer('${category}', ${index})">تحقق</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // التركيز على حقل الإدخال
    const input = document.getElementById('user-answer');
    input.focus();
    
    // إضافة مستمع لمفتاح Enter
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            submitAnswer(category, index);
        }
    });
    
    // إغلاق النافذة عند النقر خارجها
    window.onclick = function(event) {
        if (event.target === modal) {
            closeAnswerModal();
        }
    };
}

// إغلاق نافذة السؤال
function closeAnswerModal() {
    const modal = document.getElementById('answer-modal');
    modal.style.display = 'none';
    modal.innerHTML = ''; // تنظيف محتوى النافذة
}

// تقديم الإجابة
function submitAnswer(category, index) {
    const userAnswer = document.getElementById('user-answer').value;
    checkAnswer(category, index, userAnswer);
    closeAnswerModal();
}

// التحقق من صحة السؤال
function checkAnswer(category, index, userQuestion) {
    const data = gameData[category][index];
    const cardId = `${category}-${index}`;
    
    // التحقق من أن الإجابة غير فارغة
    if (!userQuestion || userQuestion.trim() === '') {
        alert('يرجى إدخال إجابة!');
        return;
    }
    
    // تنظيف وتحويل النصوص للمقارنة
    const normalizedUserQuestion = userQuestion.trim().toLowerCase().replace(/[؟.,!]/g, '');
    const normalizedCorrectQuestion = data.question.toLowerCase().replace(/[؟.,!]/g, '');
    
    // تقسيم الإجابة الصحيحة والإجابة المدخلة إلى كلمات
    const correctWords = normalizedCorrectQuestion.split(/\s+/);
    const userWords = normalizedUserQuestion.split(/\s+/);

    // الكلمات العامة التي لا تعتبر إجابة صحيحة بمفردها
    const commonWords = ['نهر', 'جبل', 'مدينة', 'بحر', 'دولة', 'قارة', 'عاصمة', 'ملك', 'رئيس', 'منتخب', 'فريق', 'نادي'];
    
    // التحقق من أن الإجابة ليست مجرد كلمة عامة
    if (userWords.length === 1 && commonWords.includes(userWords[0])) {
        alert('الإجابة غير كافية، يرجى تحديد ' + userWords[0] + ' بشكل أكثر دقة');
        return;
    }

    // إزالة الكلمات العامة من الإجابة الصحيحة والإجابة المدخلة
    const cleanCorrectWords = correctWords.filter(word => !commonWords.includes(word));
    const cleanUserWords = userWords.filter(word => !commonWords.includes(word));
    
    // إزالة "ال" من الكلمات للمقارنة
    const normalizeWord = (word) => word.replace(/^ال/, '');
    
    // تحويل الكلمات إلى صيغة موحدة
    const normalizedCorrectWords = cleanCorrectWords.map(normalizeWord);
    const normalizedUserWords = cleanUserWords.map(normalizeWord);

    // التحقق من تطابق أي كلمة أساسية
    const isCorrect = normalizedUserWords.some(userWord => 
        normalizedCorrectWords.some(correctWord => 
            userWord === correctWord || 
            correctWord.includes(userWord) || 
            userWord.includes(correctWord)
        )
    );

    if (isCorrect) {
        players[currentPlayerIndex].score += data.points;
        alert('إجابة صحيحة! \nالإجابة الكاملة هي: ' + data.question);
    } else {
        alert('للأسف، الإجابة غير صحيحة. الإجابة الصحيحة هي: ' + data.question);
    }

    // تحديث حالة البطاقة والفئة
    completedAnswers.add(cardId);
    const categoryColumn = document.querySelector(`[data-category="${category}"]`);
    const answerCards = categoryColumn.querySelectorAll('.answer-card');
    const card = answerCards[index];
    card.classList.add('completed');

    // التحقق مما إذا كانت جميع بطاقات الفئة مكتملة
    const allCardsCompleted = Array.from(answerCards).every(card => card.classList.contains('completed'));
    if (allCardsCompleted) {
        categoryColumn.classList.add('all-completed');
    }
    
    // تغيير دور اللاعب
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updatePlayersList();
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

// بدء اللعبة
document.addEventListener('DOMContentLoaded', () => {
    initializeGameControls();
    initializeGame();
});
