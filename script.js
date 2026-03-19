// 食谱数据库
const recipeDB = {
    breakfast: [
        {
            name: '炒鸡蛋配吐司',
            time: '10分钟',
            ingredients: ['2个鸡蛋', '2片面包', '黄油', '盐和胡椒'],
            instructions: ['在锅中加热黄油', '炒鸡蛋', '烤面包', '一起上菜'],
            calories: 300,
            protein: 12,
            carbs: 28,
            fat: 14,
            allergens: ['eggs', 'gluten']
        },
        {
            name: '燕麦粥配浆果',
            time: '10分钟',
            ingredients: ['1杯燕麦', '1.5杯牛奶', '1杯浆果', '蜂蜜'],
            instructions: ['煮沸牛奶', '加入燕麦', '煮5分钟', '配浆果和蜂蜜'],
            calories: 350,
            protein: 10,
            carbs: 58,
            fat: 8,
            allergens: ['dairy']
        },
        {
            name: '希腊酸奶派',
            time: '5分钟',
            ingredients: ['1杯希腊酸奶', '格兰诺拉麦片', '浆果', '蜂蜜'],
            instructions: ['在碗中分层酸奶', '加入格兰诺拉麦片', '配浆果', '淋蜂蜜'],
            calories: 280,
            protein: 16,
            carbs: 35,
            fat: 6,
            allergens: ['dairy']
        },
        {
            name: '牛油果吐司',
            time: '8分钟',
            ingredients: ['2片面包', '1个牛油果', '柠檬', '盐和胡椒'],
            instructions: ['烤面包', '捣碎牛油果', '涂在吐司上', '加柠檬汁'],
            calories: 320,
            protein: 9,
            carbs: 32,
            fat: 16,
            allergens: ['gluten']
        }
    ],
    lunch: [
        {
            name: '烤鸡沙拉',
            time: '25分钟',
            ingredients: ['200克鸡胸肉', '混合生菜', '黄瓜', '番茄', '橄榄油'],
            instructions: ['烤鸡', '切蔬菜', '混合生菜', '加酱汁拌匀'],
            calories: 380,
            protein: 45,
            carbs: 12,
            fat: 15,
            allergens: []
        },
        {
            name: '金枪鱼三明治',
            time: '10分钟',
            ingredients: ['罐装金枪鱼', '2片面包', '蛋黄酱', '生菜', '番茄'],
            instructions: ['金枪鱼混合蛋黄酱', '涂在面包上', '加生菜和番茄'],
            calories: 360,
            protein: 30,
            carbs: 32,
            fat: 12,
            allergens: ['fish', 'eggs', 'gluten']
        },
        {
            name: '番茄意大利面',
            time: '20分钟',
            ingredients: ['1杯意大利面', '西兰花', '彩椒', '橄榄油', '大蒜'],
            instructions: ['煮意大利面', '炒蔬菜', '混合在一起', '调味'],
            calories: 420,
            protein: 14,
            carbs: 62,
            fat: 12,
            allergens: ['gluten']
        },
        {
            name: '米饭碗',
            time: '15分钟',
            ingredients: ['1杯熟米饭', '豆腐', '混合蔬菜', '酱油'],
            instructions: ['煮米饭', '炒豆腐', '加入蔬菜', '倒入酱油'],
            calories: 380,
            protein: 18,
            carbs: 48,
            fat: 12,
            allergens: ['soy']
        }
    ],
    dinner: [
        {
            name: '烤三文鱼配西兰花',
            time: '30分钟',
            ingredients: ['200克三文鱼', '西兰花', '柠檬', '橄榄油', '大蒜'],
            instructions: ['预热烤箱至400°F', '调味三文鱼', '和西兰花一起烤', '烤15-20分钟'],
            calories: 450,
            protein: 42,
            carbs: 18,
            fat: 22,
            allergens: ['fish']
        },
        {
            name: '牛肉炒菜',
            time: '25分钟',
            ingredients: ['200克牛肉', '混合蔬菜', '糙米', '酱油'],
            instructions: ['煮米饭', '切牛肉', '炒菜', '加酱油'],
            calories: 520,
            protein: 40,
            carbs: 52,
            fat: 16,
            allergens: ['soy']
        },
        {
            name: '鸡肉意大利面',
            time: '25分钟',
            ingredients: ['200克鸡肉', '1.5杯意大利面', '番茄酱', '大蒜'],
            instructions: ['煮意大利面', '煮鸡肉', '混合酱汁'],
            calories: 480,
            protein: 38,
            carbs: 58,
            fat: 10,
            allergens: ['gluten']
        },
        {
            name: '蔬菜咖喱',
            time: '30分钟',
            ingredients: ['混合蔬菜', '椰奶', '咖喱酱', '米饭'],
            instructions: ['煮米饭', '加热椰奶', '加入咖喱和蔬菜', '炖15分钟'],
            calories: 400,
            protein: 12,
            carbs: 56,
            fat: 14,
            allergens: ['dairy']
        }
    ]
};

let userInfo = {};

// 使用Mifflin-St Jeor公式计算TDEE
function calculateTDEE(age, gender, height, weight, activityLevel, goal) {
    let bmr;
    
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    let tdee = bmr * parseFloat(activityLevel);
    
    // 根据目标调整
    if (goal === 'loss') {
        tdee -= 500;
    } else if (goal === 'gain') {
        tdee += 500;
    }
    
    return Math.round(tdee);
}

// 计算宏量营养素（均衡宏量方法）
function calculateMacros(calories) {
    return {
        protein: Math.round((calories * 0.3) / 4),  // 30% 卡路里 / 4卡每克
        carbs: Math.round((calories * 0.45) / 4),   // 45% 卡路里 / 4卡每克
        fat: Math.round((calories * 0.25) / 9)      // 25% 卡路里 / 9卡每克
    };
}

// 检查食谱是否适合用户
function isRecipeSuitable(recipe, allergens, dietType) {
    // 检查过敏原
    for (let allergen of recipe.allergens) {
        if (allergens.includes(allergen)) {
            return false;
        }
    }
    
    // 检查饮食类型
    const ingredients = recipe.ingredients.join(' ').toLowerCase();
    
    if (dietType === 'vegetarian') {
        if (ingredients.includes('鸡') || ingredients.includes('牛') || 
            ingredients.includes('鱼') || ingredients.includes('三文鱼') || 
            ingredients.includes('金枪鱼')) {
            return false;
        }
    }
    
    if (dietType === 'vegan') {
        if (ingredients.includes('鸡') || ingredients.includes('牛') || 
            ingredients.includes('鱼') || ingredients.includes('三文鱼') || 
            ingredients.includes('金枪鱼') || ingredients.includes('鸡蛋') || 
            ingredients.includes('酸奶') || ingredients.includes('牛奶') ||
            ingredients.includes('奶酪')) {
            return false;
        }
    }
    
    return true;
}

// 生成食谱
function generateRecipes(allergens, dietType) {
    const suitable = [];
    
    // 从每个餐点类型中获取一个
    for (let mealType in recipeDB) {
        const mealRecipes = recipeDB[mealType].filter(r => isRecipeSuitable(r, allergens, dietType));
        if (mealRecipes.length > 0) {
            suitable.push(mealRecipes[Math.floor(Math.random() * mealRecipes.length)]);
        }
    }
    
    return suitable;
}

// 创建食谱卡HTML
function createRecipeCard(recipe) {
    return `
        <div class="recipe-card">
            <div class="recipe-header">
                <div class="recipe-title">${recipe.name}</div>
                <div class="recipe-meta">⏱️ ${recipe.time}</div>
            </div>
            <div class="recipe-content">
                <div class="recipe-section">
                    <div class="recipe-section-title">材料</div>
                    <ul>
                        ${recipe.ingredients.map(ing => `<li>• ${ing}</li>`).join('')}
                    </ul>
                </div>
                <div class="recipe-section">
                    <div class="recipe-section-title">做法</div>
                    <ul>
                        ${recipe.instructions.map((inst, i) => `<li>${i + 1}. ${inst}</li>`).join('')}
                    </ul>
                </div>
                <div class="recipe-nutrition">
                    <div class="recipe-nutrition-item">
                        <div class="recipe-nutrition-label">热量</div>
                        <div class="recipe-nutrition-value">${recipe.calories}</div>
                    </div>
                    <div class="recipe-nutrition-item">
                        <div class="recipe-nutrition-label">蛋白质</div>
                        <div class="recipe-nutrition-value">${recipe.protein}g</div>
                    </div>
                    <div class="recipe-nutrition-item">
                        <div class="recipe-nutrition-label">碳水</div>
                        <div class="recipe-nutrition-value">${recipe.carbs}g</div>
                    </div>
                    <div class="recipe-nutrition-item">
                        <div class="recipe-nutrition-label">脂肪</div>
                        <div class="recipe-nutrition-value">${recipe.fat}g</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 在步骤之间导航
function goToStep(step) {
    // 验证当前步骤后再移动
    if (step === 2) {
        if (!document.getElementById('name').value || 
            !document.getElementById('age').value ||
            !document.getElementById('gender').value ||
            !document.getElementById('height').value ||
            !document.getElementById('weight').value ||
            !document.getElementById('activity').value ||
            !document.getElementById('goal').value) {
            alert('请填写所有字段');
            return;
        }
    }
    
    if (step === 3) {
        if (!document.getElementById('dietType').value) {
            alert('请选择饮食偏好');
            return;
        }
        
        // 收集用户信息
        userInfo = {
            name: document.getElementById('name').value,
            age: parseInt(document.getElementById('age').value),
            gender: document.getElementById('gender').value,
            height: parseInt(document.getElementById('height').value),
            weight: parseFloat(document.getElementById('weight').value),
            activity: document.getElementById('activity').value,
            goal: document.getElementById('goal').value,
            allergens: Array.from(document.querySelectorAll('input[name="allergen"]:checked')).map(x => x.value),
            dietType: document.getElementById('dietType').value
        };
        
        // 计算并显示结果
        displayResults();
    }
    
    // 隐藏所有步骤
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    
    // 显示目标步骤
    document.getElementById(`step${step}`).classList.add('active');
    window.scrollTo(0, 0);
}

// 显示结果
function displayResults() {
    // 计算营养
    const tdee = calculateTDEE(
        userInfo.age,
        userInfo.gender,
        userInfo.height,
        userInfo.weight,
        userInfo.activity,
        userInfo.goal
    );
    
    const macros = calculateMacros(tdee);
    
    // 显示问候
    document.getElementById('greeting').textContent = `嗨 ${userInfo.name}！这是你的个性化计划。`;
    
    // 显示营养目标
    document.getElementById('tdee').textContent = tdee + ' 卡';
    document.getElementById('protein').textContent = macros.protein + 'g';
    document.getElementById('carbs').textContent = macros.carbs + 'g';
    document.getElementById('fat').textContent = macros.fat + 'g';
    
    // 生成并显示食谱
    const recipes = generateRecipes(userInfo.allergens, userInfo.dietType);
    const recipesHTML = recipes.map(createRecipeCard).join('');
    document.getElementById('recipesContainer').innerHTML = recipesHTML;
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('step1').classList.add('active');
});
