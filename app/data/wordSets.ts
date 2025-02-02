// 词库分类和单词组
export const WORD_SETS = [
  // 动物类
  ["TIGER", "HORSE", "SHEEP", "SNAKE", "MOUSE"],
  ["PANDA", "PUPPY", "POLAR", "PIGGY", "PARROT"],
  ["WHALE", "WOLF", "WHALE", "WORM", "WINGS"],
  ["EAGLE", "SHARK", "CAMEL", "KOALA", "ZEBRA"],
  ["GOOSE", "DUCK", "BIRD", "BEAR", "DEER"],
  
  // 食物类
  ["BREAD", "BACON", "BEANS", "BERRY", "BLEND"],
  ["PIZZA", "PASTA", "PEACH", "PLUMS", "PEARS"],
  ["SWEET", "SUGAR", "SPICE", "SALAD", "SAUCE"],
  ["CREAM", "CANDY", "CURRY", "CHIPS", "CAKES"],
  ["STEAK", "SUSHI", "SOUP", "SALSA", "SNACK"],
  ["MELON", "MANGO", "MAPLE", "MINT", "MOCHA"],
  
  // 颜色类
  ["BLACK", "BROWN", "BEIGE", "BLUSH", "BRASS"],
  ["WHITE", "WHEAT", "WINE", "WATER", "WARM"],
  ["GREEN", "GRAPE", "GOLD", "GREY", "GLOW"],
  ["AMBER", "AZURE", "AQUA", "ALMOND", "ASH"],
  
  // 自然类
  ["CLOUD", "CLEAR", "CLIFF", "COAST", "CROWN"],
  ["STORM", "SHINE", "STARS", "SPACE", "STONE"],
  ["BEACH", "BLOOM", "BIRDS", "BLAZE", "BREAK"],
  ["RIVER", "RAIN", "RIDGE", "REEF", "ROSE"],
  ["GRASS", "GROVE", "GLADE", "GRAIN", "GUST"],
  
  // 日常用品
  ["TABLE", "TOWEL", "TOOLS", "TORCH", "TRAY"],
  ["CHAIR", "CLOCK", "CHEST", "CHARM", "CHAIN"],
  ["PHONE", "PLATE", "PAINT", "PAPER", "PIANO"],
  ["BRUSH", "BOOKS", "BOOTS", "BOWL", "BLADE"],
  ["GLASS", "GLOVE", "GAUGE", "GLOBE", "GUARD"],
  
  // 动作词
  ["SMILE", "SPEAK", "SLEEP", "STAND", "START"],
  ["DANCE", "DREAM", "DRINK", "DRIVE", "DRAW"],
  ["THINK", "TEACH", "TOUCH", "TASTE", "THROW"],
  ["WRITE", "WATCH", "WALK", "WORK", "WAVE"],
  ["LAUGH", "LEARN", "LIGHT", "LEAP", "LIFT"],
  
  // 情感词
  ["HAPPY", "HEART", "HOPE", "HELP", "HEAL"],
  ["BRAVE", "BLESS", "BLOOM", "BOND", "BEST"],
  ["PEACE", "PROUD", "PURE", "PLAY", "PRAY"],
  ["TRUST", "TRUTH", "THANK", "TOUCH", "TREAT"],
  ["GRACE", "GLORY", "GRAND", "GREAT", "GLOW"],
  
  // 天气词
  ["SUNNY", "STORM", "SHINE", "SNOW", "SHADE"],
  ["CLOUD", "CLEAR", "CRISP", "COLD", "CALM"],
  ["WINDY", "WARM", "WAVES", "WATER", "WILD"],
  ["FROST", "FLASH", "FLOOD", "FLAME", "FRESH"],
  ["MISTY", "MOIST", "MILD", "MURKY", "MUGGY"],
  
  // 运动类
  ["SPORT", "SWING", "SKATE", "SERVE", "SCORE"],
  ["TRACK", "TRAIN", "THROW", "TEAM", "TOUCH"],
  ["PITCH", "PUNCH", "PEDAL", "POWER", "PACE"],
  ["DANCE", "DODGE", "DRIVE", "DUNK", "DASH"],
  
  // 科技类
  ["CLICK", "CLOUD", "CACHE", "CYBER", "CODE"],
  ["PHONE", "PIXEL", "PRINT", "PULSE", "POWER"],
  ["SMART", "SPEED", "SHARE", "SWIPE", "STYLE"],
  ["DRIVE", "DEBUG", "DRAFT", "DELAY", "DIGIT"],
  
  // 建筑类
  ["HOUSE", "HOTEL", "HALLS", "HOMES", "HAVEN"],
  ["TOWER", "TRAIN", "TRACK", "TRAIL", "TRADE"],
  ["BRICK", "BLOCK", "BENCH", "BEACH", "BOARD"],
  ["STORE", "STAGE", "STAIR", "STAND", "STACK"],

  // 职业类
  ["NURSE", "NOBLE", "NANNY", "NAVAL", "NOTARY"],
  ["PILOT", "PAINT", "PRESS", "POET", "PRIEST"],
  ["JUDGE", "JOKER", "JAILER", "JUROR", "JESTER"],
  ["CHIEF", "CLERK", "COACH", "CHEF", "CREW"],
  ["GUARD", "GUIDE", "GUEST", "GIANT", "GAMER"],

  // 音乐类
  ["MUSIC", "METAL", "MINOR", "MAJOR", "MIXER"],
  ["PIANO", "PULSE", "PAUSE", "PITCH", "POWER"],
  ["SOUND", "SWING", "STAGE", "SONG", "STYLE"],
  ["BEATS", "BRASS", "BLUES", "BANDS", "BLEND"],
  ["TEMPO", "TRACK", "TUNE", "TENOR", "THEME"],

  // 植物类
  ["PLANT", "PALM", "PINE", "PLUM", "PEAR"],
  ["BLOOM", "BERRY", "BRUSH", "BIRCH", "BARK"],
  ["FERNS", "FLORA", "FRUIT", "FLAX", "FIGS"],
  ["GRASS", "GREEN", "GROVE", "GRAIN", "GROW"],
  ["TREES", "TRUNK", "TWIGS", "TULIP", "THORN"],

  // 服装类
  ["SHIRT", "SHOES", "SHAWL", "SKIRT", "SCARF"],
  ["DRESS", "DENIM", "DRAPE", "DRAWL", "DARTS"],
  ["BOOTS", "BERET", "BELT", "BRIEF", "BLEND"],
  ["CLOTH", "CLOAK", "CLASP", "CUFFS", "CROWN"],
  ["GOWNS", "GLOVE", "GUARD", "GAUGE", "GRASP"],

  // 海洋类
  ["WAVES", "WATER", "WHALE", "WRECK", "WAKE"],
  ["SHORE", "SHELL", "SHARK", "SHIP", "SAND"],
  ["BEACH", "BOATS", "BUOY", "BRINE", "BREAK"],
  ["CORAL", "COAST", "CREST", "CRAB", "CALM"],
  ["DRIFT", "DEPTH", "DOCKS", "DIVE", "DUNE"],

  // 太空类
  ["SPACE", "STARS", "SOLAR", "SHINE", "SPARK"],
  ["MOON", "MARS", "MIST", "METAL", "MIGHT"],
  ["ORBIT", "OCEAN", "OZONE", "OPTIC", "ORDER"],
  ["COMET", "CLOUD", "CRAFT", "CROWN", "CLEAR"],
  ["LIGHT", "LASER", "LUNAR", "LEVEL", "LEARN"],

  // 情绪类
  ["HAPPY", "HASTY", "HARSH", "HASTE", "HEART"],
  ["MERRY", "MOODY", "MILD", "MADLY", "MIGHT"],
  ["JOLLY", "JADED", "JUMPY", "JAZZY", "JOINT"],
  ["EAGER", "EARLY", "EQUAL", "EXACT", "ELITE"],
  ["BRAVE", "BLISS", "BORED", "BLAND", "BRIEF"],

  // 交通类
  ["TRAIN", "TRACK", "TRUCK", "TRAM", "TRAIL"],
  ["PLANE", "PILOT", "PORTS", "PEDAL", "PAUSE"],
  ["SHIPS", "SPEED", "STEAM", "SWING", "SLIDE"],
  ["DRIVE", "DRIFT", "DELAY", "DRAFT", "DOCK"],
  ["MOTOR", "METRO", "MARCH", "MOUNT", "MOVE"],

  // 家具类
  ["TABLE", "TRUNK", "TRAY", "TOOLS", "TOWER"],
  ["CHAIR", "CHEST", "CLOCK", "COUCH", "CLASP"],
  ["SHELF", "SHINE", "SHADE", "STAND", "STACK"],
  ["BENCH", "BOARD", "BRACE", "BLEND", "BRASS"],
  ["FRAME", "FLOOR", "FENCE", "FLAP", "FOLD"],

  // 饰品类
  ["RINGS", "ROYAL", "RUBY", "ROBES", "REACH"],
  ["PEARL", "PLATE", "PRINT", "PAINT", "PRIZE"],
  ["CHAIN", "CHARM", "CROWN", "CLASP", "CRAFT"],
  ["JEWEL", "JADE", "JOINT", "JEANS", "JUDGE"],
  ["BRASS", "BEADS", "BANDS", "BLEND", "BADGE"]
];

// 获取随机词组
export const getRandomWordSet = () => {
  return WORD_SETS[Math.floor(Math.random() * WORD_SETS.length)];
};

// 检查单词是否在词库中
export const isWordInList = (word: string) => {
  return WORD_SETS.some(set => set.includes(word));
}; 