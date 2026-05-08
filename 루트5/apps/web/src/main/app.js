const profileButton = document.querySelector("#profileButton");
const backButton = document.querySelector("#backButton");
const inventoryButton = document.querySelector("#inventoryButton");
const inventoryPanel = document.querySelector("#inventoryPanel");
const inventorySummary = document.querySelector("#inventorySummary");
const inventoryList = document.querySelector("#inventoryList");
const profileMenu = document.querySelector("#profileMenu");
const profileStatus = document.querySelector("#profileStatus");
const profileMenuList = document.querySelector("#profileMenuList");
const moodScreen = document.querySelector("#today");
const detailScreen = document.querySelector("#details");
const moodGrid = document.querySelector("#moodGrid");
const selectionLine = document.querySelector("#selectionLine");
const nextButton = document.querySelector("#nextButton");
const detailForm = document.querySelector("#detailForm");
const detailMeta = document.querySelector("#detailMeta");
const distanceRange = document.querySelector("#distanceRange");
const distanceValue = document.querySelector("#distanceValue");
const budgetRange = document.querySelector("#budgetRange");
const budgetValue = document.querySelector("#budgetValue");
const hobbyChoices = document.querySelector("#hobbyChoices");
const detailSummary = document.querySelector("#detailSummary");
const routeScreen = document.querySelector("#routeResults");
const routeCount = document.querySelector("#routeCount");
const routeSummary = document.querySelector("#routeSummary");
const routeList = document.querySelector("#routeList");
const routeMap = document.querySelector("#routeMap");
const nextRouteButton = document.querySelector("#nextRouteButton");
const executeRouteButton = document.querySelector("#executeRouteButton");
const executionScreen = document.querySelector("#routeExecution");
const executionMiniMap = document.querySelector("#executionMiniMap");
const executionSummary = document.querySelector("#executionSummary");
const executionDoneText = document.querySelector("#executionDoneText");
const executionList = document.querySelector("#executionList");
const viewRouteBookButton = document.querySelector("#viewRouteBookButton");
const completeRouteButton = document.querySelector("#completeRouteButton");
const routeRatingControl = document.querySelector("#routeRatingControl");
const routeBookScreen = document.querySelector("#routeBook");
const routeBookSummary = document.querySelector("#routeBookSummary");
const routeBookToday = document.querySelector("#routeBookToday");
const routeBookSavedList = document.querySelector("#routeBookSavedList");
const superRouteButton = document.querySelector("#superRouteButton");
const louterBookScreen = document.querySelector("#louterBook");
const louterBookSummary = document.querySelector("#louterBookSummary");
const louterBookList = document.querySelector("#louterBookList");
const lootyRoomScreen = document.querySelector("#lootyRoom");
const lootyRoomSummary = document.querySelector("#lootyRoomSummary");
const lootyRoomTitle = document.querySelector("#lootyRoomTitle");
const lootyRoomCharacter = document.querySelector("#lootyRoomCharacter");
const lootyRoomAge = document.querySelector("#lootyRoomAge");
const lootyRoomNextAge = document.querySelector("#lootyRoomNextAge");
const lootyRoomPlans = document.querySelector("#lootyRoomPlans");
const lootyNameForm = document.querySelector("#lootyNameForm");
const lootyNameInput = document.querySelector("#lootyNameInput");
const lootyRoomBagButton = document.querySelector("#lootyRoomBagButton");
const photoModal = document.querySelector("#photoModal");
const photoModalBackdrop = document.querySelector("#photoModalBackdrop");
const photoModalClose = document.querySelector("#photoModalClose");
const photoModalImage = document.querySelector("#photoModalImage");
const photoModalTitle = document.querySelector("#photoModalTitle");
const photoNaverLink = document.querySelector("#photoNaverLink");
const photoGoogleLink = document.querySelector("#photoGoogleLink");
const routeNoticeModal = document.querySelector("#routeNoticeModal");
const routeNoticeBackdrop = document.querySelector("#routeNoticeBackdrop");
const routeNoticeClose = document.querySelector("#routeNoticeClose");
const routeNoticeReward = document.querySelector("#routeNoticeReward");
const routeNoticeKicker = document.querySelector("#routeNoticeKicker");
const routeNoticeTitle = document.querySelector("#routeNoticeTitle");
const routeNoticeMessage = document.querySelector("#routeNoticeMessage");
const routeNoticeAction = document.querySelector("#routeNoticeAction");
const moods = window.root5MoodIntake?.moods ?? [];
const { routes } = window.root5RouteCandidates;
const appDisplayName = "ROUTE5";
const placeFeedbackStorageKey = "root5PlaceFeedback";
const routeBookStorageKey = "root5RouteBook";
const routeRatingStorageKey = "root5RouteRatings";
const routeCompletionStorageKey = "root5RouteCompletedDate";
const lootyStorageKey = "root5Looty";
const lootyRestStorageKey = "root5LootyRestDate";
const lootyStateVersion = 4;
const lootyAgeStep = 5;
const lootySuperAge = 10;
const lootySuperThreshold = (lootySuperAge - 1) * lootyAgeStep;
const lootyMaxLifeDays = 5;
const lootyMilkLifeDays = 3;
const lootyCookieLifeDays = 5;

let selectedMood = null;
let currentRouteIndex = 0;
let activeRoute = null;
let executionRoute = null;
let missionProofs = [];
let currentPhotoPreviewUrls = [];
let routeRating = 0;
let isRouteRatingLocked = false;
let hasShownRouteCompletionNotice = false;
let currentRouteRewardItem = null;
let executionSessionId = "";
let savedExecutionSessionId = "";
let routeBookTitleText = "";
let routeIntroText = "";
let routeBookEditingIndex = null;
let lootyRoomOwner = "mine";
let lootyRoomGuestName = "";
let lootyRoomGuestId = "";
let currentScreenName = "mood";
let previousScreenName = "mood";
let lootyRoomDrag = null;
let isLoggedIn = window.localStorage.getItem("root5AuthState") === "logged-in";
const minimumExecutionStops = 3;
const routeContext = {
  mood: null,
  transport: null,
  distanceKm: 10,
  company: null,
  budgetKRW: Number(budgetRange.value),
  hobbies: [],
};

const hobbyOptions = [
  { label: "영화", tags: ["영화", "슬픈영화"] },
  { label: "음식", tags: ["음식", "맛집", "디저트", "카페"] },
  { label: "독서", tags: ["독서", "책", "서점"] },
  { label: "명상", tags: ["명상", "조용함", "회복", "평화로워"] },
  { label: "운동", tags: ["운동", "스포츠", "러닝", "야구", "축구"] },
  { label: "동물", tags: ["동물", "강아지", "고양이", "산책"] },
  { label: "자연", tags: ["자연", "산책", "공원", "걷기"] },
  { label: "도시", tags: ["도시", "구경", "밤", "카페"] },
  { label: "술", tags: ["술", "바", "LP", "마무리"] },
  { label: "음악", tags: ["음악", "노래", "LP", "공연"] },
  { label: "예술", tags: ["예술", "미술", "전시", "공연", "사진"] },
  { label: "여행", tags: ["여행", "기차", "비행기", "구경"] },
];

const moodToneGroups = {
  positive: ["신나!", "행복해", "설레임", "사랑해"],
  low: ["쓸쓸해", "우울해", "외로워", "화나", "예민해"],
  soft: ["싱숭생숭", "평화로워", "따분해"],
};

const transportModes = {
  걷기: {
    key: "walk",
    label: "걷기",
    hint: "가까운 장소를 천천히 이어서 걷는 방식",
    segment: "걸어서 이동",
    stepLabel: "도보이동",
  },
  자동차: {
    key: "car",
    label: "자동차",
    hint: "차로 움직이되, 주차와 쉬는 시간을 여유 있게 보는 방식",
    segment: "차로 이동",
    stepLabel: "자동차이동",
  },
  대중교통: {
    key: "transit",
    label: "대중교통",
    hint: "지하철과 버스로 이어지는 부담 적은 방식",
    segment: "대중교통 이동",
    stepLabel: "대중교통이동",
  },
  기차: {
    key: "train",
    label: "기차",
    hint: "기차역까지 이동한 뒤 현지에서 짧게 이어지는 방식",
    segment: "기차와 현지 이동",
    stepLabel: "기차이동",
  },
  비행기: {
    key: "plane",
    label: "비행기",
    hint: "공항 이동 뒤 도착지에서 압축해서 움직이는 방식",
    segment: "비행기와 현지 이동",
    stepLabel: "비행이동",
  },
};

const louterBookProfiles = [
  {
    id: "daldal_route",
    name: "달달루터",
    lootyName: "달루티",
    routeId: "yaksu_sad_art_movie_walk",
    comment: "혼자 조용히 걷고 영화로 마무리하기 좋은 루트였어요.",
    wayTip: "약수역 3번 출구에서 시작하면 첫 장소까지 걸어가기 편해요.",
    teamTip: "혼자 또는 둘이서 천천히 걷는 팀에 잘 맞아요.",
    menuTip: "마지막 맛집에서는 따뜻한 국물 메뉴와 우유 디저트가 좋았어요.",
    likedTip: "길이 복잡하지 않고 중간에 쉬어갈 곳이 많아서 좋았어요.",
    note: "혼자 조용히 걷고, 영화로 하루를 닫는 루트",
  },
  {
    id: "soup_walk",
    name: "숲산책러",
    lootyName: "숲티",
    routeId: "seoul_forest_dog_healing",
    comment: "서울숲 주변을 느리게 돌면서 쉬기 좋은 루트예요.",
    wayTip: "서울숲역에서 내려 공원 쪽으로 들어가면 첫 장소가 가까워요.",
    teamTip: "반려동물 산책 팀이나 둘이 걷는 팀에게 좋아요.",
    menuTip: "근처 카페에서는 샌드위치와 라떼 조합이 좋았어요.",
    likedTip: "사진 찍을 곳이 많고 루티랑 산책하는 느낌이 잘 나요.",
    note: "서울숲에서 천천히 풀리는 강아지 산책 루트",
  },
  {
    id: "vinyl_mood",
    name: "바이닐무드",
    lootyName: "무디",
    routeId: "seongsu_vinyl_music_night",
    comment: "음악을 듣고 카페에서 밤 분위기를 정리하기 좋았어요.",
    wayTip: "성수역에서 시작하면 LP 가게와 카페를 자연스럽게 이어갈 수 있어요.",
    teamTip: "음악 취향이 비슷한 친구와 둘이 가면 좋아요.",
    menuTip: "카페에서는 크림 디저트와 산미 낮은 커피를 추천해요.",
    likedTip: "가게마다 분위기가 달라서 저장해두고 다시 가고 싶은 루트예요.",
    note: "성수에서 음악과 카페를 이어 듣는 루트",
  },
];

const nearestStationByFirstPlace = {
  장충단공원: { name: "동대입구역", lines: "3호선" },
  올림픽공원: { name: "올림픽공원역", lines: "5호선 · 9호선" },
  서울숲: { name: "서울숲역", lines: "수인분당선" },
  망원한강공원: { name: "망원역", lines: "6호선" },
};

const categoryPhotos = {
  걷기: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=520&q=80",
  산책: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=520&q=80",
  러닝: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=520&q=80",
  스포츠: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=520&q=80",
  음악: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=520&q=80",
  LP: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=520&q=80",
  바: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=520&q=80",
  음식: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=520&q=80",
  전시: "https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=520&q=80",
  카페: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=520&q=80",
  구경: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=520&q=80",
  강아지: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=520&q=80",
  책: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=520&q=80",
  영화: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=520&q=80",
  디저트: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=520&q=80",
  마무리: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=520&q=80",
};

const categoryLabels = {
  걷기: "걷기",
  산책: "산책",
  러닝: "러닝",
  스포츠: "스포츠",
  음악: "음악",
  LP: "LP",
  바: "바",
  음식: "음식",
  전시: "전시",
  카페: "카페",
  구경: "구경",
  강아지: "강아지",
  책: "책",
  영화: "영화",
  디저트: "디저트",
  마무리: "마무리",
};

const lootyItemCatalog = [
  { id: "pink-ribbon", name: "말랑 분홍 리본", slot: "ribbon", kind: "ribbon", color: "#ff8cc8", accent: "#ffd8eb" },
  { id: "soft-bangs-wig", name: "몽글 앞머리 가발", slot: "wig", kind: "wig", color: "#7c5232", accent: "#b57a48" },
  { id: "pearl-jewelry", name: "진주 쥬얼리", slot: "jewelry", kind: "jewelry", color: "#ffffff", accent: "#fff2a8" },
  { id: "cream-glasses", name: "크림 동그란 안경", slot: "glasses", kind: "glasses", color: "#fff4cf", accent: "#6b7b51" },
  { id: "clay-eyebrows", name: "말랑 눈썹", slot: "eyebrow", kind: "eyebrow", color: "#d3c67b", accent: "#f4edb4" },
  { id: "drop-earrings", name: "물방울 귀걸이", slot: "earring", kind: "earring", color: "#91d7ff", accent: "#ffffff" },
  { id: "mint-hat", name: "민트 버킷 모자", slot: "hat", kind: "hat", color: "#9edfc1", accent: "#f4edb4" },
  { id: "yellow-ribbon", name: "노란 리본", slot: "ribbon", kind: "ribbon", color: "#ffe266", accent: "#fff8be" },
  { id: "cloud-wig", name: "구름 가발", slot: "wig", kind: "wig", color: "#ffffff", accent: "#e7f1d0" },
  { id: "heart-jewelry", name: "하트 쥬얼리", slot: "jewelry", kind: "jewelry", color: "#ff7bbe", accent: "#ffe6f3" },
  { id: "round-glasses", name: "둥근 안경", slot: "glasses", kind: "glasses", color: "#6b7b51", accent: "#fff4cf" },
  { id: "sprout-eyebrows", name: "새싹 눈썹", slot: "eyebrow", kind: "eyebrow", color: "#77e58b", accent: "#e8f5a9" },
  { id: "pearl-earrings", name: "진주 귀걸이", slot: "earring", kind: "earring", color: "#ffffff", accent: "#fff2a8" },
  { id: "blue-hat", name: "파란 둥근 모자", slot: "hat", kind: "hat", color: "#319aff", accent: "#d6f0ff" },
  { id: "big-red-ribbon", name: "다홍 왕리본", slot: "ribbon", kind: "ribbon", color: "#ff5a3d", accent: "#ffb067" },
  { id: "bob-wig", name: "단발 가발", slot: "wig", kind: "wig", color: "#2f241c", accent: "#77533b" },
  { id: "star-jewelry", name: "별 쥬얼리", slot: "jewelry", kind: "jewelry", color: "#ffe266", accent: "#ffffff" },
  { id: "jelly-glasses", name: "젤리 안경", slot: "glasses", kind: "glasses", color: "#ff9e4f", accent: "#fff4cf" },
  { id: "silver-earrings", name: "은빛 귀걸이", slot: "earring", kind: "earring", color: "#d8e7e0", accent: "#ffffff" },
  { id: "gold-hat", name: "금빛 말랑 모자", slot: "hat", kind: "hat", color: "#ffe266", accent: "#fff8be" },
  { id: "super-crown", name: "슈퍼루티 왕관", slot: "crown", kind: "crown", color: "#ffe266", accent: "#ffffff", superOnly: true },
];

const lootyItemById = new Map(lootyItemCatalog.map((item) => [item.id, item]));
const lootyFoodCatalog = [
  { id: "milk", name: "우유", kind: "milk", color: "#ffffff", accent: "#91d7ff", lifeDays: lootyMilkLifeDays },
  { id: "cookie", name: "쿠키", kind: "cookie", color: "#c9874a", accent: "#ffe266", lifeDays: lootyCookieLifeDays },
];
const lootyFoodById = new Map(lootyFoodCatalog.map((item) => [item.id, item]));
const lootyColorPalette = [
  { id: "leaf", name: "기본 잎빛", base: "#eee49f", light: "#fff9b8", shadow: "#687a48" },
  { id: "peach", name: "복숭아빛", base: "#ffb3a3", light: "#ffe1d7", shadow: "#c76f70" },
  { id: "milk", name: "우유빛", base: "#fff4cf", light: "#ffffff", shadow: "#c7b98f" },
  { id: "mint", name: "민트빛", base: "#a8ead0", light: "#e6fff5", shadow: "#5aa487" },
  { id: "berry", name: "베리빛", base: "#ff9bd0", light: "#ffe1f0", shadow: "#b8528f" },
];
const lootyColorById = new Map(lootyColorPalette.map((color) => [color.id, color]));
const lootyDyeCatalog = lootyColorPalette
  .filter((color) => color.id !== "leaf")
  .map((color) => ({
    id: `${color.id}-dye`,
    colorId: color.id,
    name: `${color.name} 염색약`,
    kind: "dye",
    color: color.base,
    accent: color.light,
  }));
const lootyDyeById = new Map(lootyDyeCatalog.map((item) => [item.id, item]));

const closeProfileMenu = () => {
  profileMenu.hidden = true;
  profileButton.setAttribute("aria-expanded", "false");
};

const closeInventory = () => {
  inventoryPanel.hidden = true;
  inventoryButton.setAttribute("aria-expanded", "false");
};

const openInventory = () => {
  inventoryPanel.hidden = false;
  inventoryButton.setAttribute("aria-expanded", "true");
  closeProfileMenu();
  renderLooty();
};

const toggleInventory = () => {
  const willOpen = inventoryPanel.hidden;
  if (willOpen) {
    openInventory();
    return;
  }

  closeInventory();
};

const renderAuthState = () => {
  profileStatus.textContent = isLoggedIn ? "로그인 상태" : "로그아웃 상태";
  profileMenuList.innerHTML = isLoggedIn
    ? `
      <button class="profile-menu-item" type="button" data-menu-action="routebook">루트북보기</button>
      <button class="profile-menu-item" type="button" data-menu-action="louterbook">루터북보기</button>
      <button class="profile-menu-item" type="button" data-menu-action="looty-room">루티룸</button>
      <button class="profile-menu-item" type="button" data-menu-action="today-route">오늘의루트짜기</button>
      <button class="profile-menu-item" type="button" data-menu-action="my-info">내정보</button>
      <button class="profile-menu-item" type="button" data-menu-action="about">앱 정보</button>
      <button class="profile-menu-item" type="button" data-menu-action="logout">로그아웃</button>
    `
    : `
      <button class="profile-menu-item" type="button" data-menu-action="login">로그인</button>
    `;
};

const setAuthState = (nextState) => {
  isLoggedIn = nextState;
  window.localStorage.setItem("root5AuthState", isLoggedIn ? "logged-in" : "logged-out");
  renderAuthState();
};

const showMyInfo = () => {
  profileStatus.textContent = isLoggedIn
    ? `내정보: ${appDisplayName} 임시 사용자`
    : "내정보를 보려면 로그인이 필요해요.";
};

const showAppInfo = () => {
  profileStatus.innerHTML = `
    ${appDisplayName}<br>
    혼자인 사람들을 위한 픽셀 루트 앱<br>
    만든 사람: 김지수<br>
    개발 시작일: 2026-05-05<br>
    버전: Prototype 0.1
  `;
};

const routeBookPhotoDataUrlLimit = 180000;

const getRouteBookEntries = () => {
  try {
    const entries = JSON.parse(window.localStorage.getItem(routeBookStorageKey) || "[]");
    return Array.isArray(entries) ? entries : [];
  } catch {
    return [];
  }
};

const saveRouteBookEntries = (entries) => {
  window.localStorage.setItem(routeBookStorageKey, JSON.stringify(entries));
};

const compactRouteBookEntryForStorage = (entry) => ({
  ...entry,
  proofs: Array.isArray(entry.proofs)
    ? entry.proofs.map((proof) => ({
        ...proof,
        photoDataUrl: "",
        photoUrl: proof.photoUrl?.startsWith("blob:") ? proof.photoUrl : "",
        photoPreviewUrl: "",
      }))
    : [],
});

const saveRouteBookEntriesSafely = (entries) => {
  try {
    saveRouteBookEntries(entries);
    return { entries, reducedPhotos: false, saved: true };
  } catch (error) {
    const compactEntries = entries.map(compactRouteBookEntryForStorage);

    try {
      saveRouteBookEntries(compactEntries);
      return { entries: compactEntries, reducedPhotos: true, saved: true };
    } catch (secondError) {
      return { entries, error: secondError || error, saved: false };
    }
  }
};

const superRouteThreshold = 100;

const getRouteById = (routeId) => routes.find((route) => route.id === routeId);

const getRatingStars = (rating) => {
  const score = Number(rating) || 0;
  return score > 0 ? "★".repeat(score) : "☆";
};

const createRouteBookTitle = (routeDisplay, rating) => {
  const tone = rating >= 5
    ? "다시 열고 싶은"
    : rating >= 4
      ? "기분 좋게 남은"
      : rating >= 3
        ? "가볍게 걷기 좋은"
        : rating > 0
          ? "다음엔 다듬어볼"
          : "오늘 실행한";
  return `${tone} ${routeDisplay.area} 루트`;
};

const getRouteBookEntryTitle = (entry, order) =>
  entry.bookTitle || entry.title || `저장한 루트 ${order + 1}`;

const isSavedToday = (entry) => {
  if (!entry.savedAt) {
    return false;
  }

  const savedAt = new Date(entry.savedAt);
  const today = new Date();
  return savedAt.toDateString() === today.toDateString();
};

const getRouteBookEntryStops = (entry) => {
  if (Array.isArray(entry.stops)) {
    return entry.stops;
  }

  const route = getRouteById(entry.routeId);
  if (!route) {
    return [];
  }

  return route.stops.map((stop, index) => ({
    time: stop.time,
    place: getStopDisplayPlace(route, index, stop),
    category: getCategoryDisplayName(stop.category),
    note: getStopDisplayNote(route, index, stop),
    cost: stop.cost,
  }));
};

const getSortedRouteBookEntries = () =>
  getRouteBookEntries()
    .map((entry, index) => ({ entry, index }))
    .sort((a, b) => new Date(b.entry.savedAt || 0) - new Date(a.entry.savedAt || 0));

const renderRouteBookPhoto = (proof, place) => {
  const photoUrl = proof.photoDataUrl || proof.photoUrl || proof.photoPreviewUrl || "";
  if (photoUrl) {
    return `<img src="${escapeHTML(photoUrl)}" alt="${escapeHTML(place)} 사진" />`;
  }

  return `<span class="routebook-photo-placeholder">${proof.photoName ? "IMG" : "NO"}</span>`;
};

const getProofPhotoUrl = (proof = {}) => proof.photoDataUrl || proof.photoUrl || proof.photoPreviewUrl || "";

const renderRouteBookThumbs = (stops, proofs = []) =>
  stops.length
    ? `
      <div class="routebook-thumb-strip" aria-label="장소 사진">
        ${stops
          .map((stop, stopIndex) => {
            const proof = proofs[stopIndex] || {};
            const photoUrl = getProofPhotoUrl(proof);
            const place = stop.place || "장소";

            return `
              <figure class="routebook-thumb">
                <div class="routebook-thumb-photo">
                  ${
                    photoUrl
                      ? `<img src="${escapeHTML(photoUrl)}" alt="${escapeHTML(place)} 사진" />`
                      : `<span>${proof.photoName ? "IMG" : "NO"}</span>`
                  }
                </div>
                <figcaption>${escapeHTML(place)}</figcaption>
              </figure>
            `;
          })
          .join("")}
      </div>
    `
    : "";

const renderRouteBookRepresentativePhoto = (entry) => {
  const proofs = Array.isArray(entry.proofs) ? entry.proofs : [];
  const stops = getRouteBookEntryStops(entry);
  const proofIndex = Math.max(0, proofs.findIndex((proof) => getProofPhotoUrl(proof)));
  const proof = proofs[proofIndex] || {};
  const photoUrl = getProofPhotoUrl(proof);
  const place = stops[proofIndex]?.place || entry.area || "저장된 루트";

  return `
    <div class="routebook-saved-photo">
      ${
        photoUrl
          ? `<img src="${escapeHTML(photoUrl)}" alt="${escapeHTML(place)} 대표 사진" />`
          : `<span>사진</span>`
      }
    </div>
  `;
};

const getRouteBookItineraryText = (stops) =>
  stops.length
    ? stops
        .map((stop) => `${stop.place || "장소"} ${stop.time || ""}`.trim())
        .join(" -> ")
    : "남아있는 장소가 없어요.";

const getRouteBookEntryIntro = (entry) => entry.intro || entry.routeIntro || "";

const getRouteBookStoredPhotoDataUrl = (photoDataUrl = "") =>
  photoDataUrl.length <= routeBookPhotoDataUrlLimit ? photoDataUrl : "";

const getRouteBookStoredPhotoUrl = (photoDataUrl = "", photoPreviewUrl = "") =>
  getRouteBookStoredPhotoDataUrl(photoDataUrl) || photoPreviewUrl || "";

const renderRouteBookTitleEditor = (title) => `
  <label class="routebook-title-field">
    <span>루트 제목</span>
    <input
      class="routebook-title-input"
      type="text"
      maxlength="40"
      placeholder="오늘 루트 제목 쓰기"
      value="${escapeHTML(title)}"
      data-routebook-action="title"
    />
  </label>
`;

const renderRouteBookIntroEditor = (intro) => `
  <label class="routebook-intro-field">
    <span>루트소개쓰기란</span>
    <textarea
      class="routebook-intro-input"
      rows="3"
      maxlength="160"
      placeholder="오늘 루트를 소개해줘."
      data-routebook-action="intro"
    >${escapeHTML(intro)}</textarea>
  </label>
`;

const renderRouteBookIntroPreview = (entry) => {
  const intro = getRouteBookEntryIntro(entry).trim();
  return intro
    ? `<p class="routebook-intro-preview">${escapeHTML(intro)}</p>`
    : `<p class="routebook-intro-preview is-empty">루트소개가 아직 없어요.</p>`;
};

const renderRouteBookRatingOptions = (rating) =>
  [0, 1, 2, 3, 4, 5]
    .map((value) => {
      const label = value === 0 ? "별점 없음" : `${value}점`;
      return `<option value="${value}" ${Number(rating) === value ? "selected" : ""}>${label}</option>`;
    })
    .join("");

const renderRouteBookSavedEditor = ({ entry, index, order }) => {
  const stops = getRouteBookEntryStops(entry);
  const proofs = Array.isArray(entry.proofs) ? entry.proofs : [];

  return `
    <li class="routebook-saved-item is-editing" data-routebook-entry="${index}">
      <form class="routebook-edit-form" data-routebook-entry="${index}">
        <label class="routebook-title-field">
          <span>루트 제목</span>
          <input
            class="routebook-title-input"
            type="text"
            maxlength="40"
            value="${escapeHTML(getRouteBookEntryTitle(entry, order))}"
            data-edit-entry-field="title"
          />
        </label>
        <label class="routebook-intro-field">
          <span>루트소개쓰기란</span>
          <textarea
            class="routebook-intro-input"
            rows="3"
            maxlength="160"
            data-edit-entry-field="intro"
          >${escapeHTML(getRouteBookEntryIntro(entry))}</textarea>
        </label>
        <div class="routebook-edit-stops">
          ${stops
            .map((stop, stopIndex) => {
              const proof = proofs[stopIndex] || {};
              const photoUrl = getProofPhotoUrl(proof);
              const stopLabel = `${stopIndex + 1}. ${stop.place || "장소"} ${stop.time || ""}`.trim();

              return `
                <section class="routebook-edit-stop" data-edit-stop-index="${stopIndex}">
                  <div class="routebook-edit-photo">
                    ${
                      photoUrl
                        ? `<img src="${escapeHTML(photoUrl)}" alt="${escapeHTML(stop.place || "장소")} 사진" />`
                        : `<span>${proof.photoName ? "IMG" : "NO"}</span>`
                    }
                  </div>
                  <div class="routebook-edit-stop-main">
                    <p class="routebook-edit-place">${escapeHTML(stopLabel)}</p>
                    <div class="routebook-edit-stop-fields">
                      <label class="routebook-edit-wide">
                        <span>한줄평</span>
                        <input
                          type="text"
                          maxlength="60"
                          placeholder="이 장소의 느낌"
                          value="${escapeHTML(proof.review || "")}"
                          data-edit-proof-field="review"
                        />
                      </label>
                      <label class="routebook-edit-rating">
                        <span>별점</span>
                        <select data-edit-proof-field="rating">
                          ${renderRouteBookRatingOptions(Number(proof.rating) || 0)}
                        </select>
                      </label>
                    </div>
                  </div>
                </section>
              `;
            })
            .join("")}
        </div>
        <div class="routebook-edit-actions">
          <button class="routebook-save-entry" type="button" data-routebook-action="save-entry" data-routebook-entry="${index}">저장</button>
          <button class="routebook-cancel-entry" type="button" data-routebook-action="cancel-entry">취소</button>
        </div>
      </form>
    </li>
  `;
};

const renderRouteBookCurrentCard = ({ entry, entryIndex, isCurrentExecution = false, actionHTML = "" }) => {
  const stops = getRouteBookEntryStops(entry);
  const proofs = Array.isArray(entry.proofs) ? entry.proofs : [];
  const title = getRouteBookEntryTitle(entry, 0);
  const savedDate = entry.savedAt ? new Date(entry.savedAt).toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" }) : "";
  const itineraryText = getRouteBookItineraryText(stops);
  const titleHTML = isCurrentExecution
    ? renderRouteBookTitleEditor(title)
    : `<h2>${escapeHTML(title)}</h2>`;
  const introHTML = isCurrentExecution
    ? renderRouteBookIntroEditor(routeIntroText)
    : renderRouteBookIntroPreview(entry);

  return `
    <article class="routebook-current-card" data-routebook-entry="${entryIndex}">
      <div class="routebook-current-head">
        <div>
          <p class="routebook-current-date">${escapeHTML(savedDate || "TODAY")}</p>
          ${titleHTML}
        </div>
        <p class="routebook-current-rating">${escapeHTML(entry.ratingStars || getRatingStars(entry.rating))}</p>
      </div>
      <p class="routebook-itinerary">${escapeHTML(itineraryText)}</p>
      ${renderRouteBookThumbs(stops, proofs)}
      ${introHTML}
      ${actionHTML}
    </article>
  `;
};

const renderRouteBookToday = (entry, entryIndex) => {
  const currentExecutionEntry = getCurrentExecutionRouteBookEntry();

  if (currentExecutionEntry) {
    const canSaveCurrentExecution = isExecutionRouteComplete() && hasShownRouteCompletionNotice;
    const actionHTML = `
      <div class="routebook-current-actions">
        <p class="routebook-save-state">
          ${
            canSaveCurrentExecution
              ? "저장하면 아래 저장된 루트에 들어가요."
              : "오늘 루트 완료를 누른 뒤 저장할 수 있어요."
          }
        </p>
        <button
          class="primary-action routebook-save-current"
          type="button"
          data-routebook-action="save-current"
          ${canSaveCurrentExecution ? "" : "disabled"}
        >
          이 루트를 루트북에 저장
        </button>
      </div>
    `;

    routeBookToday.innerHTML = renderRouteBookCurrentCard({
      entry: currentExecutionEntry,
      entryIndex: -1,
      isCurrentExecution: true,
      actionHTML,
    });
    return;
  }

  if (!entry) {
    routeBookToday.innerHTML = `
      <div class="routebook-empty">
        오늘 완료한 루트가 아직 없어요. 루트 실행 페이지에서 오늘 루트 완료를 눌러야 정리할 수 있어요.
      </div>
    `;
    return;
  }

  routeBookToday.innerHTML = renderRouteBookCurrentCard({ entry, entryIndex });
};

const renderRouteBookSavedList = (entries) => {
  if (entries.length === 0) {
    routeBookSavedList.innerHTML = `
      <li class="routebook-empty">
        저장한 루트가 아직 없어요.
      </li>
    `;
    return;
  }

  routeBookSavedList.innerHTML = entries
    .map(({ entry, index }, order) => {
      if (routeBookEditingIndex === index) {
        return renderRouteBookSavedEditor({ entry, index, order });
      }

      const savedDate = entry.savedAt ? new Date(entry.savedAt).toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" }) : "";
      const itineraryText = getRouteBookItineraryText(getRouteBookEntryStops(entry));

      return `
        <li class="routebook-saved-item" data-routebook-entry="${index}">
          ${renderRouteBookRepresentativePhoto(entry)}
          <div class="routebook-saved-main">
            <p class="routebook-saved-title">${escapeHTML(getRouteBookEntryTitle(entry, order))}</p>
            <p class="routebook-saved-meta">${escapeHTML(savedDate)} · ${escapeHTML(entry.ratingStars || getRatingStars(entry.rating))}</p>
            <p class="routebook-saved-itinerary">${escapeHTML(itineraryText)}</p>
          </div>
          <div class="routebook-saved-actions">
            <button
              class="routebook-edit-entry"
              type="button"
              data-routebook-action="edit-entry"
              data-routebook-entry="${index}"
            >
              수정
            </button>
            <button
              class="routebook-delete-entry"
              type="button"
              data-routebook-action="delete-entry"
              data-routebook-entry="${index}"
            >
              삭제
            </button>
          </div>
        </li>
      `;
    })
    .join("");
};

const renderRouteBook = () => {
  const sortedEntries = getSortedRouteBookEntries();
  const todayEntry = sortedEntries.find(({ entry }) => isSavedToday(entry));
  const lootyState = getLootyState();
  const lootyAge = getLootyAge(lootyState.completedRoutes);
  const lootyName = getLootyDisplayName(lootyState);

  routeBookSummary.textContent =
    lootyState.completedRoutes === 0
      ? "아직 완료한 루트가 없어요. 첫 루트를 마치면 루티 아이템을 받을 수 있어요."
      : `${lootyState.completedRoutes}개의 하루계획을 완료해서 ${lootyName}가 ${lootyAge}살이에요.`;
  superRouteButton.disabled = false;
  superRouteButton.textContent = "루티룸 보기";

  renderRouteBookToday(todayEntry?.entry, todayEntry?.index);
  renderRouteBookSavedList(sortedEntries);
  renderLooty();
};

const removeRouteBookStop = (entryIndex, stopIndex) => {
  const entries = getRouteBookEntries();
  const entry = entries[entryIndex];
  if (!entry) {
    return;
  }

  if (!Array.isArray(entry.stops)) {
    entry.stops = getRouteBookEntryStops(entry);
  }

  entry.stops.splice(stopIndex, 1);
  entry.proofs = Array.isArray(entry.proofs) ? entry.proofs.filter((_, index) => index !== stopIndex) : [];
  entries[entryIndex] = entry;
  saveRouteBookEntries(entries);
  renderRouteBook();
};

const removeRouteBookEntry = (entryIndex) => {
  const entries = getRouteBookEntries();
  if (!entries[entryIndex]) {
    return;
  }

  if (!window.confirm("저장된 루트를 삭제할까요?")) {
    return;
  }

  entries.splice(entryIndex, 1);
  routeBookEditingIndex = null;
  saveRouteBookEntries(entries);
  renderRouteBook();
};

const editRouteBookEntry = (entryIndex) => {
  const entries = getRouteBookEntries();
  if (!entries[entryIndex]) {
    return;
  }

  routeBookEditingIndex = entryIndex;
  renderRouteBook();
};

const cancelRouteBookEntryEdit = () => {
  routeBookEditingIndex = null;
  renderRouteBook();
};

const getEditFieldValue = (host, selector) => host.querySelector(selector)?.value.trim() || "";

const getEditedRouteBookRating = (proofs) => {
  const ratings = proofs.map((proof) => Number(proof.rating) || 0).filter((rating) => rating > 0);
  if (ratings.length === 0) {
    return 0;
  }

  return Math.max(1, Math.min(5, Math.round(ratings.reduce((total, rating) => total + rating, 0) / ratings.length)));
};

const saveRouteBookEntryEdit = (entryIndex, form) => {
  const entries = getRouteBookEntries();
  const entry = entries[entryIndex];
  if (!entry || !form) {
    return;
  }

  const currentStops = getRouteBookEntryStops(entry);
  const currentProofs = Array.isArray(entry.proofs) ? entry.proofs : [];
  const editedProofs = currentStops.map((_, stopIndex) => ({ ...(currentProofs[stopIndex] || {}) }));

  form.querySelectorAll("[data-edit-stop-index]").forEach((stopEditor) => {
    const stopIndex = Number(stopEditor.dataset.editStopIndex);
    if (!Number.isInteger(stopIndex) || !currentStops[stopIndex]) {
      return;
    }

    editedProofs[stopIndex] = {
      ...editedProofs[stopIndex],
      review: getEditFieldValue(stopEditor, "[data-edit-proof-field='review']"),
      rating: Number(stopEditor.querySelector("[data-edit-proof-field='rating']")?.value) || 0,
    };
  });

  const currentTitle = getRouteBookEntryTitle(entry, entryIndex);
  const editedRating = getEditedRouteBookRating(editedProofs);

  entries[entryIndex] = {
    ...entry,
    bookTitle: getEditFieldValue(form, "[data-edit-entry-field='title']") || currentTitle,
    intro: getEditFieldValue(form, "[data-edit-entry-field='intro']"),
    stops: currentStops,
    proofs: editedProofs,
    rating: editedRating,
    ratingStars: editedRating ? "★".repeat(editedRating) : "",
  };

  routeBookEditingIndex = null;
  saveRouteBookEntries(entries);
  renderRouteBook();
};

const openLootyRoom = ({ owner = "mine", guestName = "", guestId = "" } = {}) => {
  lootyRoomOwner = owner;
  lootyRoomGuestName = guestName;
  lootyRoomGuestId = guestId;
  renderLooty();
  showScreen("lootyroom");
  window.location.hash = owner === "guest" ? "looty-room-visit" : "looty-room";
};

const handleProfileMenuAction = (action) => {
  if (action === "login") {
    setAuthState(true);
    profileStatus.textContent = "로그인했어요.";
    return;
  }

  if (action === "logout") {
    setAuthState(false);
    profileStatus.textContent = "로그아웃했어요.";
    return;
  }

  if (action === "my-info") {
    showMyInfo();
    return;
  }

  if (action === "about") {
    showAppInfo();
    return;
  }

  if (action === "today-route") {
    openTodayRouteStart();
    closeProfileMenu();
    return;
  }

  if (action === "routebook") {
    renderRouteBook();
    showScreen("routebook");
    window.location.hash = "routebook";
    closeProfileMenu();
    return;
  }

  if (action === "looty-room" || action === "super-louterbook") {
    openLootyRoom();
    closeProfileMenu();
    return;
  }

  if (action === "louterbook") {
    renderLouterBook();
    showScreen("louterbook");
    window.location.hash = "louterbook";
    closeProfileMenu();
    return;
  }

  profileStatus.textContent = "준비 중이에요.";
};

const renderMoods = () => {
  if (moods.length === 0) {
    moodGrid.innerHTML = `
      <div class="mood-empty">
        기분 데이터를 불러오지 못했어요. 새로고침 후 다시 시도해주세요.
      </div>
    `;
    nextButton.disabled = true;
    return;
  }

  moodGrid.innerHTML = moods
    .map(
      (mood) => `
        <button
          class="mood-option"
          type="button"
          role="radio"
          aria-checked="false"
          data-mood="${mood.label}"
        >
          ${mood.label}
        </button>
      `,
    )
    .join("");
};

const selectMood = (button) => {
  selectedMood = moods.find((mood) => mood.label === button.dataset.mood);
  routeContext.mood = selectedMood.label;

  moodGrid
    .querySelectorAll(".mood-option")
    .forEach((option) => option.setAttribute("aria-checked", "false"));

  button.setAttribute("aria-checked", "true");
  moodScreen.classList.add("has-selection");
  selectionLine.textContent = selectedMood.routeHint;
  nextButton.disabled = false;
  nextButton.textContent = "NEXT";
};

const showScreen = (screenName) => {
  if (screenName !== currentScreenName) {
    previousScreenName = currentScreenName;
    currentScreenName = screenName;
  }

  const showingMood = screenName === "mood";
  const showingDetails = screenName === "details";
  const showingRoutes = screenName === "routes";
  const showingExecution = screenName === "execution";
  const showingRouteBook = screenName === "routebook";
  const showingLouterBook = screenName === "louterbook";
  const showingLootyRoom = screenName === "lootyroom";
  moodScreen.hidden = !showingMood;
  detailScreen.hidden = !showingDetails;
  routeScreen.hidden = !showingRoutes;
  executionScreen.hidden = !showingExecution;
  routeBookScreen.hidden = !showingRouteBook;
  louterBookScreen.hidden = !showingLouterBook;
  lootyRoomScreen.hidden = !showingLootyRoom;
  moodScreen.classList.toggle("is-active", showingMood);
  detailScreen.classList.toggle("is-active", showingDetails);
  routeScreen.classList.toggle("is-active", showingRoutes);
  executionScreen.classList.toggle("is-active", showingExecution);
  routeBookScreen.classList.toggle("is-active", showingRouteBook);
  louterBookScreen.classList.toggle("is-active", showingLouterBook);
  lootyRoomScreen.classList.toggle("is-active", showingLootyRoom);

  if (showingDetails && detailMeta) {
    detailMeta.textContent = "";
  }

  renderLooty();
};

const canOpenRouteMaking = () => {
  if (!canLootyPlanToday()) {
    return false;
  }

  if (!hasCompletedTodayRoute()) {
    return true;
  }

  openTodayCompletedNotice();
  return false;
};

const openTodayRouteStart = () => {
  showScreen("mood");
  window.location.hash = "today";
  return true;
};

const goBack = () => {
  if (!lootyRoomScreen.hidden) {
    if (previousScreenName === "louterbook") {
      renderLouterBook();
      showScreen("louterbook");
      window.location.hash = "louterbook";
      return;
    }

    if (previousScreenName === "routebook" || lootyRoomOwner === "mine") {
      renderRouteBook();
      showScreen("routebook");
      window.location.hash = "routebook";
      return;
    }

    openTodayRouteStart();
    return;
  }

  if (!louterBookScreen.hidden) {
    openTodayRouteStart();
    return;
  }

  if (!routeBookScreen.hidden) {
    openTodayRouteStart();
    return;
  }

  if (!executionScreen.hidden) {
    if (!canOpenRouteMaking()) {
      return;
    }

    showScreen("routes");
    window.location.hash = "route-results";
    return;
  }

  if (!routeScreen.hidden) {
    showScreen("details");
    window.location.hash = "details";
    return;
  }

  if (!detailScreen.hidden) {
    openTodayRouteStart();
    return;
  }

  if (window.history.length > 1) {
    window.history.back();
  }
};

const formatKRW = (value) => Number(value).toLocaleString("ko-KR");

const escapeHTML = (value) =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });

const getLootyTodayKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const hasCompletedTodayRoute = () =>
  window.localStorage.getItem(routeCompletionStorageKey) === getLootyTodayKey();

const markTodayRouteCompleted = () => {
  window.localStorage.setItem(routeCompletionStorageKey, getLootyTodayKey());
};

const openTodayCompletedNotice = () => {
  openRouteNotice({
    kicker: "ROUTE5",
    title: "오늘의 루트를 끝냈습니다.",
    message: "내일 루트를 기다려주세요!",
    actionLabel: "확인",
  });
};

const openLootyRestNotice = () => {
  openRouteNotice({
    kicker: "ROUTIE",
    title: "루티가 오늘은 쉬어야 해요.",
    message: "루티의 생명이 0일이라 오늘은 하루계획을 짤 수 없어요.\nROUTIE ROOM에서 우유나 쿠키를 먹여 회복시켜 주세요. 하루계획은 내일부터 다시 짤 수 있어요.",
    actionLabel: "확인",
  });
};

const syncLootyRestLock = (state) => {
  if (state.lifeDays <= 0) {
    window.localStorage.setItem(lootyRestStorageKey, getLootyTodayKey());
  }
};

const canLootyPlanToday = () => {
  const state = getLootyState();
  const todayKey = getLootyTodayKey();

  if (state.lifeDays <= 0) {
    syncLootyRestLock(state);
    openLootyRestNotice();
    return false;
  }

  if (window.localStorage.getItem(lootyRestStorageKey) === todayKey) {
    openLootyRestNotice();
    return false;
  }

  return true;
};

const getLootyElapsedDays = (fromKey, toKey) => {
  if (!fromKey || !toKey) {
    return 0;
  }

  const fromDate = new Date(`${fromKey}T00:00:00`);
  const toDate = new Date(`${toKey}T00:00:00`);
  const elapsed = Math.floor((toDate.getTime() - fromDate.getTime()) / 86400000);

  return Number.isFinite(elapsed) ? Math.max(0, elapsed) : 0;
};

const getLootyAge = (completedRoutes) =>
  Math.floor(Math.max(0, Number(completedRoutes) || 0) / lootyAgeStep) + 1;

const isSuperLooty = (completedRoutes) => getLootyAge(completedRoutes) >= lootySuperAge;

const getLootyNextAgeTarget = (completedRoutes) =>
  getLootyAge(completedRoutes) * lootyAgeStep;

const getLootyGrowthStage = (completedRoutes) => {
  const age = getLootyAge(completedRoutes);

  if (age >= lootySuperAge) {
    return 3;
  }

  if (age >= 5) {
    return 2;
  }

  return 1;
};

const getLootyName = (completedRoutes) => (isSuperLooty(completedRoutes) ? "슈퍼루티" : "루티");

const getLootyDisplayName = (state) => state.name || getLootyName(state.completedRoutes);

const getLootySpeech = (state) => {
  if (state.lifeDays <= 0) {
    return "루티가 쉬고 있어요";
  }

  if (state.lifeDays === 1) {
    return "루티 아파요";
  }

  if (state.lifeDays === 3) {
    return "배고프다";
  }

  const age = getLootyAge(state.completedRoutes);

  if (age === 1) {
    return "루......루....";
  }

  if (age >= 2 && age <= 3) {
    return "루...루티..우..유..";
  }

  if (age >= 4 && age <= 5) {
    return "안녕 루티.. 우유좋아";
  }

  const hintRoute = executionRoute || activeRoute || routes[currentRouteIndex] || routes[0];
  const foodStop = hintRoute?.stops?.find((stop) => ["음식", "카페", "디저트", "바"].includes(stop.category));
  const hintStop = foodStop || hintRoute?.stops?.[0];
  const area = hintRoute?.area || "이 지역";

  if (!hintStop) {
    return "맛집이랑 갈만한 곳도 알려줄게.";
  }

  if (age >= lootySuperAge) {
    return `슈퍼루티야. ${area}에선 ${hintStop.place} 힌트가 있어.`;
  }

  return foodStop
    ? `${area}에선 ${foodStop.place} 맛집 힌트가 있어.`
    : `${area}에선 ${hintStop.place} 가보면 좋아.`;
};

const getLootyFoodRewards = (completedRouteCount) => ({
  milk: 1,
  cookie: completedRouteCount % 3 === 0 ? 1 : 0,
});

const getRandomLootyDyeReward = () =>
  Math.random() < 0.35
    ? lootyDyeCatalog[Math.floor(Math.random() * lootyDyeCatalog.length)]
    : null;

const getLootyNoticeRewardItems = (accessoryItem, foodRewards = {}, dyeReward = null) => [
  ...(accessoryItem ? [accessoryItem] : []),
  ...Object.entries(foodRewards)
    .filter(([, count]) => count > 0)
    .map(([foodId, count]) => ({
      ...lootyFoodById.get(foodId),
      count,
    }))
    .filter((item) => item.id),
  ...(dyeReward ? [{ ...dyeReward, count: 1 }] : []),
];

const getLootyRewardItemIds = (completedRoutes) => {
  const normalItems = lootyItemCatalog.filter((item) => !item.superOnly);
  const normalRewardCount = completedRoutes;
  const rewardItemIds = normalItems
    .slice(0, Math.min(normalRewardCount, normalItems.length))
    .map((item) => item.id);

  if (isSuperLooty(completedRoutes)) {
    rewardItemIds.push("super-crown");
  }

  return rewardItemIds;
};

const normalizeLootyState = (state = {}) => {
  const safeState = state && typeof state === "object" ? state : {};
  const completedRoutes = Math.max(0, Number(safeState.completedRoutes) || 0);
  const name = typeof safeState.name === "string" ? safeState.name.trim().slice(0, 16) : "";
  const todayKey = getLootyTodayKey();
  const baseLifeDays = Number.isFinite(Number(safeState.lifeDays))
    ? Number(safeState.lifeDays)
    : lootyMaxLifeDays;
  const elapsedDays = getLootyElapsedDays(safeState.lastLifeDate || todayKey, todayKey);
  const lifeDays = Math.max(0, Math.min(lootyMaxLifeDays, Math.ceil(baseLifeDays) - elapsedDays));
  const foodInventory = lootyFoodCatalog.reduce((inventory, food) => {
    inventory[food.id] = Math.max(0, Number(safeState.foodInventory?.[food.id]) || 0);
    return inventory;
  }, {});
  const dyeInventory = lootyDyeCatalog.reduce((inventory, dye) => {
    inventory[dye.id] = Math.max(0, Number(safeState.dyeInventory?.[dye.id]) || 0);
    return inventory;
  }, {});
  const bodyColorId = lootyColorById.has(safeState.bodyColorId) ? safeState.bodyColorId : "leaf";
  const unlockedItemIds = [
    ...new Set([
      ...getLootyRewardItemIds(completedRoutes),
      ...(Array.isArray(safeState.unlockedItemIds) ? safeState.unlockedItemIds : []),
    ]),
  ].filter((itemId) => lootyItemById.has(itemId) && (!lootyItemById.get(itemId).superOnly || isSuperLooty(completedRoutes)));
  const itemPositions = Object.entries(safeState.itemPositions || {}).reduce((positions, [itemId, position]) => {
    if (!lootyItemById.has(itemId) || !position || typeof position !== "object") {
      return positions;
    }

    positions[itemId] = {
      x: Math.max(-90, Math.min(90, Math.round(Number(position.x) || 0))),
      y: Math.max(-90, Math.min(90, Math.round(Number(position.y) || 0))),
    };
    return positions;
  }, {});
  const equippedItemIds = [
    ...(Array.isArray(safeState.equippedItemIds) ? safeState.equippedItemIds : []),
    ...(isSuperLooty(completedRoutes) ? ["super-crown"] : []),
  ];
  const equippedBySlot = new Map();

  equippedItemIds.forEach((itemId) => {
    const item = lootyItemById.get(itemId);
    if (item && unlockedItemIds.includes(itemId) && !equippedBySlot.has(item.slot)) {
      equippedBySlot.set(item.slot, itemId);
    }
  });

  return {
    version: lootyStateVersion,
    completedRoutes,
    name,
    lifeDays,
    lastLifeDate: todayKey,
    foodInventory,
    dyeInventory,
    bodyColorId,
    unlockedItemIds,
    equippedItemIds: [...equippedBySlot.values()],
    itemPositions,
  };
};

const getLootyState = () => {
  try {
    return normalizeLootyState(JSON.parse(window.localStorage.getItem(lootyStorageKey) || "{}"));
  } catch {
    return normalizeLootyState();
  }
};

const saveLootyState = (state) => {
  window.localStorage.setItem(lootyStorageKey, JSON.stringify(normalizeLootyState(state)));
};

const getLootyItemStyle = (item) =>
  `--item-color: ${item.color}; --item-accent: ${item.accent};`;

const getLootyItemPositionStyle = (state, itemId) => {
  const position = state.itemPositions?.[itemId] || { x: 0, y: 0 };
  return ` --item-x: ${position.x}px; --item-y: ${position.y}px;`;
};

const applyLootyBodyColor = (character, state) => {
  const bodyColor = lootyColorById.get(state.bodyColorId) || lootyColorById.get("leaf");
  character.style.setProperty("--looty-color-base", bodyColor.base);
  character.style.setProperty("--looty-color-light", bodyColor.light);
  character.style.setProperty("--looty-color-shadow", bodyColor.shadow);
};

const createLootyMarkup = () => `
  <div class="looty-companion" data-looty-companion>
    <div class="looty-stage">
      <div class="looty-character" data-looty-character data-level="1" data-age="1">
        <span class="looty-body">
          <img
            class="looty-image"
            src="./public/assets/characters/looty-clay-3d-transparent.png"
            alt=""
            aria-hidden="true"
          />
        </span>
        <span class="looty-equipped-items" data-looty-equipped-items></span>
      </div>
      <p class="looty-speech" data-looty-speech>루......루....</p>
    </div>
    <p class="looty-level" data-looty-level>루티(1살)</p>
    <div class="looty-life-bar" aria-hidden="true">
      <span data-looty-life-fill></span>
    </div>
    <p class="looty-life-copy" data-looty-life-copy>생명 5일</p>
  </div>
`;

const ensureLootyCompanions = () => {
  document.querySelectorAll(".type-hero, .route-hero").forEach((host) => {
    if (host.classList.contains("looty-room-hero")) {
      host.querySelectorAll("[data-looty-companion]").forEach((companion) => companion.remove());
      return;
    }

    if (host.querySelector("[data-looty-companion]")) {
      return;
    }

    const heading = host.querySelector("h1");
    if (heading) {
      heading.insertAdjacentHTML("afterend", createLootyMarkup());
      return;
    }

    host.insertAdjacentHTML("afterbegin", createLootyMarkup());
  });
};

const renderLootyCharacter = (state) => {
  const age = getLootyAge(state.completedRoutes);
  const growthStage = getLootyGrowthStage(state.completedRoutes);
  const lootyName = getLootyDisplayName(state);
  const superLooty = isSuperLooty(state.completedRoutes);
  const lifePercent = Math.max(0, Math.min(100, (state.lifeDays / lootyMaxLifeDays) * 100));
  const speech = getLootySpeech(state);
  const equippedItems = state.equippedItemIds
    .map((itemId) => lootyItemById.get(itemId))
    .filter(Boolean);

  document.querySelectorAll("[data-looty-character]").forEach((character) => {
    character.dataset.level = String(growthStage);
    character.dataset.age = String(age);
    character.classList.toggle("is-super-looty", superLooty);
    applyLootyBodyColor(character, state);
    const isRoomCharacter = Boolean(character.closest("#lootyRoomCharacter"));
    const canDragRoomItems = isRoomCharacter && lootyRoomOwner !== "guest";
    const equippedLayer = character.querySelector("[data-looty-equipped-items]");
    if (!equippedLayer) {
      return;
    }

    equippedLayer.innerHTML = equippedItems
      .map(
        (item) => `
          <span
            class="looty-equipped-item looty-equipped-${item.kind}${canDragRoomItems ? " is-room-draggable" : ""}"
            style="${getLootyItemStyle(item)}${isRoomCharacter ? getLootyItemPositionStyle(state, item.id) : ""}"
            ${canDragRoomItems ? `data-room-looty-item="${escapeHTML(item.id)}"` : ""}
            aria-hidden="true"
          ></span>
        `,
      )
      .join("");
  });

  document.querySelectorAll("[data-looty-level]").forEach((label) => {
    label.textContent = `${lootyName}(${age}살)`;
  });
  document.querySelectorAll("[data-looty-speech]").forEach((bubble) => {
    bubble.textContent = speech;
  });
  document.querySelectorAll("[data-looty-life-fill]").forEach((bar) => {
    bar.style.width = `${lifePercent}%`;
  });
  document.querySelectorAll("[data-looty-life-copy]").forEach((label) => {
    label.textContent = `생명 ${state.lifeDays}일`;
  });
};

const renderLootyInventory = (state) => {
  if (!inventorySummary || !inventoryList) {
    return;
  }

  const nextTarget = getLootyNextAgeTarget(state.completedRoutes);
  const age = getLootyAge(state.completedRoutes);
  const lootyName = getLootyDisplayName(state);
  const canUseFoodInRoom = !lootyRoomScreen.hidden && lootyRoomOwner !== "guest";
  inventorySummary.textContent = `완료한 하루계획 ${state.completedRoutes}개 · ${lootyName} ${age}살 · 생명 ${state.lifeDays}일 · 다음 나이까지 ${nextTarget - state.completedRoutes}개`;

  const foodHTML = lootyFoodCatalog
    .map((food) => {
      const count = state.foodInventory[food.id] || 0;
      const canUse = canUseFoodInRoom && count > 0 && state.lifeDays < lootyMaxLifeDays;

      return `
        <button
          class="inventory-item inventory-food-item${canUse ? "" : " is-disabled"}"
          type="button"
          data-looty-food="${escapeHTML(food.id)}"
          ${canUse ? "" : "disabled"}
          aria-label="${escapeHTML(food.name)} ${count}개"
        >
          <span class="inventory-item-icon inventory-item-${food.kind}" style="${getLootyItemStyle(food)}" aria-hidden="true"></span>
          <span class="inventory-item-name">${escapeHTML(food.name)} ${count}개</span>
        </button>
      `;
    })
    .join("");
  const dyeHTML = lootyDyeCatalog
    .filter((dye) => (state.dyeInventory[dye.id] || 0) > 0)
    .map((dye) => {
      const count = state.dyeInventory[dye.id] || 0;
      const canUse = canUseFoodInRoom && count > 0;

      return `
        <button
          class="inventory-item inventory-dye-item${canUse ? "" : " is-disabled"}"
          type="button"
          data-looty-dye="${escapeHTML(dye.id)}"
          ${canUse ? "" : "disabled"}
          aria-label="${escapeHTML(dye.name)} ${count}개"
        >
          <span class="inventory-item-icon inventory-item-${dye.kind}" style="${getLootyItemStyle(dye)}" aria-hidden="true"></span>
          <span class="inventory-item-name">${escapeHTML(dye.name)} ${count}개</span>
        </button>
      `;
    })
    .join("");
  const itemHTML = state.unlockedItemIds.length
    ? state.unlockedItemIds
        .map((itemId) => {
          const item = lootyItemById.get(itemId);
          const isEquipped = state.equippedItemIds.includes(itemId);
          const isLocked = item.id === "super-crown" && isSuperLooty(state.completedRoutes);

          return `
            <button
              class="inventory-item${isEquipped ? " is-equipped" : ""}${isLocked ? " is-locked" : ""}"
              type="button"
              data-looty-item="${escapeHTML(item.id)}"
              aria-pressed="${isEquipped}"
              aria-label="${escapeHTML(item.name)} ${isLocked ? "착용 중" : isEquipped ? "벗기" : "입히기"}"
            >
              <span class="inventory-item-icon inventory-item-${item.kind}" style="${getLootyItemStyle(item)}" aria-hidden="true"></span>
              <span class="inventory-item-name">${escapeHTML(item.name)}</span>
            </button>
          `;
        })
        .join("")
    : `
        <div class="inventory-empty">
          하루 루트를 완료하면 첫 아이템이 들어와요.
        </div>
    `;

  inventoryList.innerHTML = `${foodHTML}${dyeHTML}${itemHTML}`;
};

const renderLootyRoom = (state) => {
  if (!lootyRoomScreen || !lootyRoomCharacter) {
    return;
  }

  const age = getLootyAge(state.completedRoutes);
  const nextTarget = getLootyNextAgeTarget(state.completedRoutes);
  const remainingPlans = Math.max(0, nextTarget - state.completedRoutes);
  const displayName = lootyRoomOwner === "guest"
    ? lootyRoomGuestName || "친구 루티"
    : getLootyDisplayName(state);
  const guestRoomLabel = lootyRoomGuestId || displayName;
  const roomTitle = lootyRoomOwner === "guest" ? `${guestRoomLabel}의 ROUTIE ROOM` : "ROUTIE ROOM";
  const hasCustomName = Boolean(state.name);

  if (!lootyRoomCharacter.querySelector("[data-looty-companion]")) {
    lootyRoomCharacter.innerHTML = createLootyMarkup();
  }

  if (lootyRoomSummary) {
    lootyRoomSummary.textContent = lootyRoomOwner === "guest"
      ? `${displayName}의 루티룸구경하기`
      : `${displayName}가 지내는 방이에요.`;
  }

  if (lootyRoomTitle) {
    lootyRoomTitle.textContent = roomTitle;
  }

  if (lootyRoomAge) {
    lootyRoomAge.textContent = `${age}살`;
  }

  if (lootyRoomNextAge) {
    lootyRoomNextAge.textContent = `${remainingPlans}개 남음`;
  }

  if (lootyRoomPlans) {
    lootyRoomPlans.textContent = `${state.completedRoutes}개`;
  }

  if (lootyNameInput) {
    lootyNameInput.disabled = lootyRoomOwner === "guest" || hasCustomName;
    lootyNameInput.placeholder = lootyRoomOwner === "guest" ? "구경 중" : "루티 이름";
    if (document.activeElement !== lootyNameInput) {
      lootyNameInput.value = lootyRoomOwner === "guest" ? displayName : state.name;
    }
  }

  lootyNameForm?.classList.toggle("is-guest", lootyRoomOwner === "guest");
  lootyNameForm?.classList.toggle("is-locked", lootyRoomOwner !== "guest" && hasCustomName);
  if (lootyNameForm) {
    lootyNameForm.hidden = lootyRoomOwner === "guest" || hasCustomName;
  }
};

const syncLootyRoomGuestLabel = (state) => {
  if (lootyRoomOwner !== "guest" || !lootyRoomCharacter) {
    return;
  }

  const displayName = lootyRoomGuestName || "친구 루티";
  const roomLabel = lootyRoomCharacter.querySelector("[data-looty-level]");
  if (roomLabel) {
    roomLabel.textContent = `${displayName}(${getLootyAge(state.completedRoutes)}살)`;
  }
};

const renderLooty = () => {
  const state = getLootyState();
  syncLootyRestLock(state);
  ensureLootyCompanions();
  renderLootyRoom(state);
  renderLootyCharacter(state);
  syncLootyRoomGuestLabel(state);
  renderLootyInventory(state);
  saveLootyState(state);
};

const completeLootyRoute = (completedRouteCount) => {
  const previousState = getLootyState();
  const previousItems = new Set(previousState.unlockedItemIds);
  const nextCompletedRoutes = Math.max(previousState.completedRoutes, completedRouteCount);
  const foodRewards = getLootyFoodRewards(nextCompletedRoutes);
  const dyeReward = getRandomLootyDyeReward();
  const foodInventory = { ...previousState.foodInventory };
  const dyeInventory = { ...previousState.dyeInventory };

  Object.entries(foodRewards).forEach(([foodId, count]) => {
    foodInventory[foodId] = (foodInventory[foodId] || 0) + count;
  });

  if (dyeReward) {
    dyeInventory[dyeReward.id] = (dyeInventory[dyeReward.id] || 0) + 1;
  }

  const nextState = normalizeLootyState({
    ...previousState,
    completedRoutes: nextCompletedRoutes,
    foodInventory,
    dyeInventory,
  });
  const rewardItemId = nextState.unlockedItemIds.find((itemId) => !previousItems.has(itemId));

  saveLootyState(nextState);
  renderLooty();

  return {
    accessoryItem: rewardItemId ? lootyItemById.get(rewardItemId) : null,
    foodRewards,
    dyeReward,
  };
};

const feedLooty = (foodId) => {
  const state = getLootyState();
  const food = lootyFoodById.get(foodId);

  if (!food || (state.foodInventory[foodId] || 0) <= 0 || state.lifeDays >= lootyMaxLifeDays) {
    renderLooty();
    return;
  }

  saveLootyState({
    ...state,
    lifeDays: Math.min(lootyMaxLifeDays, state.lifeDays + food.lifeDays),
    foodInventory: {
      ...state.foodInventory,
      [foodId]: Math.max(0, (state.foodInventory[foodId] || 0) - 1),
    },
  });
  renderLooty();
};

const useLootyDye = (dyeId) => {
  const state = getLootyState();
  const dye = lootyDyeById.get(dyeId);

  if (!dye || (state.dyeInventory[dyeId] || 0) <= 0) {
    renderLooty();
    return;
  }

  saveLootyState({
    ...state,
    bodyColorId: dye.colorId,
    dyeInventory: {
      ...state.dyeInventory,
      [dyeId]: Math.max(0, (state.dyeInventory[dyeId] || 0) - 1),
    },
  });
  renderLooty();
};

const toggleLootyItem = (itemId) => {
  const state = getLootyState();
  const item = lootyItemById.get(itemId);

  if (!item || !state.unlockedItemIds.includes(itemId)) {
    return;
  }

  if (item.id === "super-crown" && isSuperLooty(state.completedRoutes)) {
    renderLooty();
    return;
  }

  const isEquipped = state.equippedItemIds.includes(itemId);
  const equippedItemIds = isEquipped
    ? state.equippedItemIds.filter((equippedItemId) => equippedItemId !== itemId)
    : [
        ...state.equippedItemIds.filter((equippedItemId) => lootyItemById.get(equippedItemId)?.slot !== item.slot),
        itemId,
      ];

  saveLootyState({
    ...state,
    equippedItemIds,
  });
  renderLooty();
};

const clampLootyRoomItemOffset = (value) =>
  Math.max(-90, Math.min(90, Math.round(Number(value) || 0)));

const getLootyRoomItemPosition = (state, itemId) =>
  state.itemPositions?.[itemId] || { x: 0, y: 0 };

const saveLootyRoomItemPosition = (itemId, x, y) => {
  const state = getLootyState();
  saveLootyState({
    ...state,
    itemPositions: {
      ...state.itemPositions,
      [itemId]: {
        x: clampLootyRoomItemOffset(x),
        y: clampLootyRoomItemOffset(y),
      },
    },
  });
  renderLooty();
};

const getMoodDisplayLabel = (moodLabel) =>
  moodLabel || "오늘";

const getTransportDisplayLabel = (transport) =>
  transportModes[transport]?.label || "자유 이동";

const getCompanyDisplayLabel = (company) => {
  const labels = {
    "혼자하는게 좋아": "혼자",
    "둘이다니고싶어": "둘",
    "셋이상이 좋아": "셋 이상",
  };

  return labels[company] || company || "함께할 사람";
};

const getCategoryDisplayName = (category) => categoryLabels[category] || category || "장소";

const getRouteDisplay = (route) =>
  ({
    title: route.title,
    area: route.area,
    places: route.stops.map((stop) => stop.place),
    notes: route.stops.map((stop) => stop.note),
  });

const getStopDisplayNote = (route, index, stop) =>
  getRouteDisplay(route).notes[index] || stop.note;

const getStopDisplayPlace = (route, index, stop) =>
  getRouteDisplay(route).places?.[index] || stop.place;

const getMoodTone = (mood) => {
  const tone = Object.entries(moodToneGroups).find(([, moodList]) => moodList.includes(mood));
  return tone?.[0] || "soft";
};

const getTransportMode = () =>
  transportModes[routeContext.transport] || {
    key: "free",
    label: "자유 이동",
    hint: "오늘의 리듬에 맞춰 장소 사이를 천천히 잇는 방식",
    segment: "이동",
    stepLabel: "이동",
  };

const formatMoveDistance = (meters) => {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(meters >= 10000 ? 0 : 1)}km`;
  }

  return `${meters}m`;
};

const getDistanceKmFromSlider = (value) => {
  const sliderValue = Math.max(0, Math.min(100, Number(value) || 0));
  if (sliderValue <= 70) {
    return Number((sliderValue / 7).toFixed(1));
  }

  return Math.round(10 + ((sliderValue - 70) / 30) * 40);
};

const formatDistanceLimit = (distanceKm) => {
  if (distanceKm <= 0) {
    return "0m";
  }

  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }

  return `${Number.isInteger(distanceKm) ? distanceKm : distanceKm.toFixed(1)}km`;
};

const mapTransportLabel = (transport) => {
  const labels = {
    걷기: "걸어서 갈 수 있고",
    자동차: "차로 다닐 수 있고",
    대중교통: "대중교통으로 갈 수 있고",
    기차: "기차로 다닐 수 있고",
    비행기: "비행기로 떠날 수 있고",
  };

  return labels[transport] || "네 방식으로 움직일 수 있고";
};

const mapCompanyLabel = (company) => {
  const labels = {
    "혼자하는게 좋아": "혼자다니고 싶고",
    "둘이다니고싶어": "둘이 다니고 싶고",
    "셋이상이 좋아": "셋 이상이 좋고",
  };

  return labels[company] || "네 리듬에 맞고";
};

const formatMoodForSummary = (mood) => {
  if (!mood) {
    return "오늘";
  }

  if (mood.endsWith("해")) {
    return `${mood.slice(0, -1)}한 오늘`;
  }

  return `${mood} 오늘`;
};

const formatRouteSummary = () => {
  const mood = formatMoodForSummary(routeContext.mood);
  const company = mapCompanyLabel(routeContext.company);
  const transport = mapTransportLabel(routeContext.transport);
  const distance = `${formatDistanceLimit(routeContext.distanceKm)} 안에 있고`;
  const budget = `${formatKRW(routeContext.budgetKRW)}원 정도로`;
  const hobby = routeContext.hobbies.length
    ? `${routeContext.hobbies.slice(0, 2).join(", ")}도 즐길 수 있는`
    : "기분에 맞게 움직일 수 있는";

  return `${mood} ${company} ${transport} ${distance} ${budget} ${hobby}`;
};

const makeNaverMapUrl = (place) =>
  `https://map.naver.com/v5/search/${encodeURIComponent(place)}`;

const makeReviewUrl = (place) =>
  `https://search.naver.com/search.naver?query=${encodeURIComponent(`${place} 리뷰`)}`;

const makeNaverImageUrl = (place) =>
  `https://search.naver.com/search.naver?where=image&query=${encodeURIComponent(`${place} 사진`)}`;

const makeGoogleImageUrl = (place) =>
  `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${place} 사진`)}`;

const makeRouteMapUrl = (route) => {
  const start = route.stops[0]?.place || route.area;
  const finish = route.stops[route.stops.length - 1]?.place || route.area;
  return `https://map.naver.com/v5/search/${encodeURIComponent(`${start} ${finish} 가는길`)}`;
};

const getStopPhoto = (stop) => ({
  src: stop.photoSrc || categoryPhotos[stop.category] || categoryPhotos.구경,
  alt: `${stop.place} 사진`,
  naverUrl: makeNaverImageUrl(stop.place),
  googleUrl: makeGoogleImageUrl(stop.place),
});

const getLouterProfileRoute = (profile) =>
  routes.find((route) => route.id === profile.routeId) || routes[0];

const renderLouterRouteDetailHTML = (profile) => {
  const route = getLouterProfileRoute(profile);
  const routeDisplay = getRouteDisplay(route);
  const firstStop = route?.stops?.[0];
  const photo = getStopPhoto(firstStop || {});
  const defaultWay = firstStop
    ? `${firstStop.place}에서 시작해서 ${route.stops.slice(1).map((stop) => stop.place).join(" → ")} 순서로 이동해요.`
    : "저장된 루트를 순서대로 천천히 이동해요.";
  const summary = profile?.comment || profile?.note || "이 루트를 공개한 루터의 한줄 평이 없어요.";

  return `
    <div class="route-notice-detail">
      <img
        class="route-notice-detail-photo"
        src="${escapeHTML(photo.src)}"
        alt="${escapeHTML(photo.alt)}"
      />
      <div class="route-notice-detail-summary">
        <p class="route-notice-detail-one-line">${escapeHTML(summary)}</p>
        <p class="route-notice-detail-meta">${escapeHTML(routeDisplay.title)} · ${escapeHTML(routeDisplay.area)} · 예상 ${formatKRW(getRouteCost(route))}원</p>
        <div class="route-notice-detail-field">
          <strong>가는길</strong>
          <span>${escapeHTML(profile?.wayTip || defaultWay)}</span>
        </div>
        <div class="route-notice-detail-field">
          <strong>함께 가기</strong>
          <span>${escapeHTML(profile?.teamTip || "혼자 또는 둘이서 가기 좋아요.")}</span>
        </div>
        <div class="route-notice-detail-field">
          <strong>추천 메뉴</strong>
          <span>${escapeHTML(profile?.menuTip || "첫 장소 근처 맛집에서 따뜻한 메뉴를 추천해요.")}</span>
        </div>
        <div class="route-notice-detail-field">
          <strong>좋았던 점</strong>
          <span>${escapeHTML(profile?.likedTip || profile?.note || routeDisplay.area)}</span>
        </div>
      </div>
    </div>
  `;
};

const openLouterRouteDetail = (profile) => {
  openRouteNotice({
    kicker: "루터북",
    title: `${profile?.name || "루터"}의 루트`,
    messageHTML: renderLouterRouteDetailHTML(profile),
    actionLabel: "확인",
  });
};

const renderLouterBook = () => {
  if (!louterBookList) {
    return;
  }

  louterBookSummary.textContent = "루터들이 공개한 대표 루트를 눌러서 사진과 코멘트를 확인해보세요.";
  louterBookList.innerHTML = louterBookProfiles
    .map((profile) => {
      const route = getLouterProfileRoute(profile);
      const routeDisplay = getRouteDisplay(route);
      const firstStop = route.stops[0];
      const photo = getStopPhoto(firstStop);
      const itinerary = route.stops.map((stop) => stop.place).slice(0, 4).join(" → ");

      return `
        <article class="louterbook-card" data-louter-card="${escapeHTML(profile.id)}">
          <div class="louterbook-profile">
            <img
              class="louterbook-looty-photo"
              src="./public/assets/characters/looty-clay-3d-transparent.png"
              alt=""
              aria-hidden="true"
            />
            <span class="louterbook-id">@${escapeHTML(profile.id)}</span>
          </div>
          <div
            class="louterbook-route louterbook-route-open"
            role="button"
            tabindex="0"
            data-louter-route-detail="${escapeHTML(profile.id)}"
          >
            <p class="louterbook-owner">${escapeHTML(profile.name)} · ${escapeHTML(profile.lootyName)}</p>
            <h2>${escapeHTML(routeDisplay.title)}</h2>
            <p>${escapeHTML(profile.note)}</p>
            <p class="louterbook-itinerary">${escapeHTML(itinerary)}</p>
            <p class="louterbook-meta">${escapeHTML(routeDisplay.area)} · 예상 ${formatKRW(getRouteCost(route))}원</p>
          </div>
          <img
            class="louterbook-route-photo louterbook-route-open"
            src="${escapeHTML(photo.src)}"
            alt=""
            loading="lazy"
            data-louter-route-detail="${escapeHTML(profile.id)}"
          />
        </article>
      `;
    })
    .join("");
};

const openPhotoModal = (stop, displayPlace = stop.place) => {
  const photo = getStopPhoto(stop);
  photoModalImage.src = photo.src;
  photoModalImage.alt = `${displayPlace} 사진`;
  photoModalTitle.textContent = displayPlace;
  photoNaverLink.href = photo.naverUrl;
  photoGoogleLink.href = photo.googleUrl;
  photoModal.hidden = false;
  document.body.classList.add("has-photo-modal");
};

const closePhotoModal = () => {
  photoModal.hidden = true;
  photoModalImage.src = "";
  document.body.classList.remove("has-photo-modal");
};

const openRouteNotice = ({
  kicker = appDisplayName,
  title,
  message,
  messageHTML,
  rewardItem = null,
  rewardItems = null,
  actionLabel = "확인",
}) => {
  routeNoticeKicker.textContent = kicker;
  routeNoticeTitle.textContent = title;

  if (messageHTML) {
    routeNoticeMessage.innerHTML = messageHTML;
  } else {
    routeNoticeMessage.textContent = message;
  }

  routeNoticeAction.textContent = actionLabel;
  const noticeRewardItems = rewardItems || (rewardItem ? [rewardItem] : []);

  if (noticeRewardItems.length > 0) {
    routeNoticeReward.hidden = false;
    routeNoticeReward.innerHTML = `
      <div class="route-notice-looty">
        ${createLootyMarkup()}
      </div>
      <div class="route-notice-item-grid">
        ${noticeRewardItems
          .map(
            (item) => `
              <div class="route-notice-item-card">
                <span
                  class="inventory-item-icon inventory-item-${item.kind}"
                  style="${getLootyItemStyle(item)}"
                  aria-hidden="true"
                ></span>
                <span>${escapeHTML(item.count ? `${item.name} ${item.count}개` : item.name)}</span>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  } else {
    routeNoticeReward.hidden = true;
    routeNoticeReward.innerHTML = "";
  }

  routeNoticeModal.hidden = false;
  document.body.classList.add("has-route-notice-modal");
  renderLooty();
};

const closeRouteNotice = () => {
  routeNoticeModal.hidden = true;
  routeNoticeReward.innerHTML = "";
  routeNoticeReward.hidden = true;
  document.body.classList.remove("has-route-notice-modal");
};

const doesTagMatch = (tag, contextTag) =>
  tag === contextTag || tag.includes(contextTag) || contextTag.includes(tag);

const getHobbySearchTags = () =>
  routeContext.hobbies.flatMap((hobby) => {
    const option = hobbyOptions.find(({ label }) => label === hobby);
    return option?.tags || [hobby];
  });

const getPlaceFeedbackStore = () =>
  JSON.parse(window.localStorage.getItem(placeFeedbackStorageKey) || "{}");

const savePlaceFeedbackStore = (store) => {
  window.localStorage.setItem(placeFeedbackStorageKey, JSON.stringify(store));
};

const getRouteRatingStore = () =>
  JSON.parse(window.localStorage.getItem(routeRatingStorageKey) || "{}");

const saveRouteRatingStore = (store) => {
  window.localStorage.setItem(routeRatingStorageKey, JSON.stringify(store));
};

const getPlaceFeedback = (place) => {
  const store = getPlaceFeedbackStore();
  return (
    store[place] || {
      ratingTotal: 0,
      ratingCount: 0,
      photoCount: 0,
      reviewCount: 0,
    }
  );
};

const getRouteCommunityScore = (route) =>
  route.stops.reduce((score, stop) => {
    const feedback = getPlaceFeedback(stop.place);
    const averageRating = feedback.ratingCount
      ? feedback.ratingTotal / feedback.ratingCount
      : 0;
    const ratingScore = averageRating ? Math.max(0, averageRating - 3) * 1.4 : 0;
    const proofScore = Math.min(2.4, feedback.ratingCount * 0.35 + feedback.photoCount * 0.2 + feedback.reviewCount * 0.2);

    return score + ratingScore + proofScore;
  }, 0);

const getSavedRouteRatingScore = (route) => {
  const store = getRouteRatingStore();
  const feedback = store[route.id];
  if (!feedback?.ratingCount) {
    return 0;
  }

  const averageRating = feedback.ratingTotal / feedback.ratingCount;
  return Math.max(0, averageRating - 3) * 2 + Math.min(3, feedback.ratingCount * 0.35);
};

const getRouteScore = (route) => {
  const tone = getMoodTone(routeContext.mood);
  const transportMode = getTransportMode();
  const totalCost = getRouteCost(route);
  const stopText = route.stops
    .map((stop) => `${stop.place} ${stop.category} ${stop.note}`)
    .join(" ");
  const companyTag = routeContext.company?.includes("혼자")
    ? "혼자"
    : routeContext.company?.includes("둘")
      ? "둘"
      : routeContext.company?.includes("셋")
        ? "셋"
        : null;
  const hobbySearchTags = getHobbySearchTags();
  const contextTags = [routeContext.mood, companyTag, ...hobbySearchTags].filter(Boolean);

  let score = 0;

  if (route.tone === tone) {
    score += 6;
  }

  if (route.tags.some((tag) => tag === routeContext.mood)) {
    score += 5;
  }

  contextTags.forEach((contextTag) => {
    const routeTagMatch = route.tags.some((tag) => doesTagMatch(tag, contextTag));
    const stopMatch = stopText.includes(contextTag);
    score += routeTagMatch ? 4 : 0;
    score += stopMatch ? 3 : 0;
  });

  hobbySearchTags.forEach((hobby) => {
    if (route.tags.some((tag) => doesTagMatch(tag, hobby)) || stopText.includes(hobby)) {
      score += 9;
    }
  });

  if (route.preferredTransports?.includes(transportMode.key)) {
    score += 4;
  }

  if (route.radiusKm <= routeContext.distanceKm) {
    score += 3;
  } else {
    score -= Math.min(6, route.radiusKm - routeContext.distanceKm);
  }

  if (totalCost <= routeContext.budgetKRW) {
    score += 3;
  } else {
    score -= Math.min(6, Math.ceil((totalCost - routeContext.budgetKRW) / 50000));
  }

  score += getRouteCommunityScore(route);
  score += getSavedRouteRatingScore(route);

  return score;
};

const getRankedRoutes = () =>
  [...routes].sort((a, b) => getRouteScore(b) - getRouteScore(a));

const getRouteCost = (route) =>
  route.stops.reduce((sum, stop) => sum + stop.cost, 0);

const getMoveMeters = (route, index) => {
  const defaultMoves = [120, 260, 430, 180, 520, 740, 960];
  return route.moveMeters?.[index] || defaultMoves[index % defaultMoves.length];
};

const getNearestStationForRoute = (route) => {
  const firstPlace = route.stops[0]?.place || "";
  return nearestStationByFirstPlace[firstPlace] || {
    name: `${route.area.split(" · ")[0]} 근처역`,
    lines: "가까운 지하철 노선",
  };
};

const renderRouteMap = (route) => {
  const mode = getTransportMode();
  const nearestStation = getNearestStationForRoute(route);
  const totalMoveMeters = route.stops
    .slice(0, -1)
    .reduce((sum, _, index) => sum + getMoveMeters(route, index), 0);
  const mapStops = route.stops
    .map(
      (stop, index) => `
        <div class="route-map-node">
          <span class="route-map-dot">${index + 1}</span>
          <span class="route-map-place">${escapeHTML(getStopDisplayPlace(route, index, stop))}</span>
        </div>
        ${
          index < route.stops.length - 1
            ? `<div class="route-map-segment">
                <span>${formatMoveDistance(getMoveMeters(route, index))} 이동</span>
              </div>`
            : ""
        }
      `,
    )
    .join("");

  routeMap.innerHTML = `
    <div class="route-map-heading">
      <div>
        <p class="route-map-label">가는방법</p>
        <h2>${escapeHTML(mode.label)} 기준</h2>
        <p class="route-map-total">총 이동거리 ${formatMoveDistance(totalMoveMeters)}</p>
      </div>
      <a href="${makeRouteMapUrl(route)}" target="_blank" rel="noreferrer">지도 열기</a>
    </div>
    <p class="route-map-station">
      첫 장소 가까운 역: ${escapeHTML(nearestStation.name)} · ${escapeHTML(nearestStation.lines)}
    </p>
    <p class="route-map-copy">${escapeHTML(mode.hint)} · 실제 시간은 지도에서 확인해줘.</p>
    <div class="route-map-path">${mapStops}</div>
  `;
};

const renderRoute = () => {
  const rankedRoutes = getRankedRoutes();
  const route = rankedRoutes[currentRouteIndex % rankedRoutes.length];
  const totalCost = getRouteCost(route);
  const currentNumber = (currentRouteIndex % rankedRoutes.length) + 1;
  const routeDisplay = getRouteDisplay(route);
  activeRoute = route;

  routeCount.textContent = `${currentNumber}/5`;
  routeSummary.textContent = `${routeDisplay.title} · ${routeDisplay.area} · ${formatRouteSummary()} 하루 루트입니다. 예상 비용 ${formatKRW(totalCost)}원.`;
  nextRouteButton.textContent = `다른루트 보기 ${currentNumber}/5`;

  routeList.innerHTML = route.stops
    .map(
      (stop, index) => {
        const photo = getStopPhoto(stop);

        return `
        <li class="route-stop">
          <div class="route-time">${escapeHTML(stop.time)}</div>
          <div class="route-stop-body">
            <p class="route-place">${escapeHTML(getStopDisplayPlace(route, index, stop))} <span>${escapeHTML(getCategoryDisplayName(stop.category))}</span></p>
            <p class="route-note">"${escapeHTML(getStopDisplayNote(route, index, stop))}"</p>
            <div class="route-links">
              <a href="${makeNaverMapUrl(stop.place)}" target="_blank" rel="noreferrer">가는길</a>
              <a href="${makeReviewUrl(stop.place)}" target="_blank" rel="noreferrer">리뷰</a>
              <span>${formatKRW(stop.cost)}원</span>
            </div>
          </div>
          <button class="route-photo-button" type="button" data-stop-index="${index}" aria-label="${escapeHTML(getStopDisplayPlace(route, index, stop))} 사진 보기">
            <img src="${escapeHTML(photo.src)}" alt="" loading="lazy" />
            <span>사진</span>
          </button>
        </li>
      `;
      },
    )
    .join("");

  renderRouteMap(route);
};

const getExecutionMission = (stop) => {
  const missions = {
    걷기: "장소를 천천히 걷고 오늘의 기분 한 줄 남기기",
    산책: "산책을 마치고 가장 좋았던 장면 하나 기억하기",
    러닝: "몸을 움직이고 숨이 편해지는 순간 체크하기",
    스포츠: "활동 미션을 끝내고 에너지 확인하기",
    음식: "식사를 마치고 가장 만족한 메뉴 기록하기",
    카페: "음료를 마시며 10분 쉬어가기",
    전시: "마음에 남은 작품 하나 고르기",
    영화: "영화가 끝난 뒤 감정 한 단어 적기",
    책: "마음에 드는 문장 하나 저장하기",
    디저트: "달콤한 것 하나로 기분 전환하기",
    구경: "둘러본 뒤 기억하고 싶은 물건 하나 고르기",
    LP: "좋아하는 음악 한 곡 끝까지 듣기",
    바: "하루를 닫는 한 잔 또는 분위기 즐기기",
    강아지: "반려견과 충분히 놀고 물 챙기기",
    마무리: "오늘 루트를 닫으며 마지막 장소 인증하기",
  };

  return missions[stop.category] || `${getCategoryDisplayName(stop.category)} 기록 남기기`;
};

const renderRatingButtons = (missionIndex, rating) =>
  [1, 2, 3, 4, 5]
    .map(
      (value) => `
        <button
          class="rating-button${rating >= value ? " is-selected" : ""}"
          type="button"
          data-mission-index="${missionIndex}"
          data-rating="${value}"
          aria-pressed="${rating === value}"
          aria-label="${value}점"
        >
          ${rating >= value ? "★" : "☆"}
        </button>
      `,
    )
    .join("");

const getAverageMissionRating = () => {
  const ratings = missionProofs
    .map((proof) => Number(proof.rating) || 0)
    .filter((rating) => rating > 0);

  if (ratings.length === 0) {
    return 0;
  }

  const average = ratings.reduce((total, rating) => total + rating, 0) / ratings.length;
  return Math.max(1, Math.min(5, Math.round(average)));
};

const syncRouteRatingFromMissionAverage = () => {
  routeRating = getAverageMissionRating();
  isRouteRatingLocked = routeRating > 0;
  renderRouteRatingControl();
};

const renderRouteRatingControl = () => {
  routeRatingControl.classList.toggle("is-locked", isRouteRatingLocked);
  routeRatingControl.innerHTML = [1, 2, 3, 4, 5]
    .map(
      (value) => `
        <button
          class="route-rating-button${routeRating >= value ? " is-selected" : ""}"
          type="button"
          data-route-rating="${value}"
          aria-pressed="${routeRating === value}"
          aria-label="장소별 별점 평균 ${value}점"
          disabled
        >
          ${routeRating >= value ? "★" : "☆"}
        </button>
      `,
    )
    .join("");
};

const renderRouteCompletionAction = () => {
  if (!completeRouteButton) {
    return;
  }

  const canCompleteRoute = isExecutionRouteComplete();
  completeRouteButton.disabled = !canCompleteRoute || hasShownRouteCompletionNotice;
  completeRouteButton.textContent = hasShownRouteCompletionNotice ? "오늘 루트 완료됨" : "오늘 루트 완료";
};

const getStopTimeInputValue = (time) => (/^\d{2}:\d{2}$/.test(time) ? time : "");

const renderRouteExecution = () => {
  if (!executionRoute) {
    return;
  }

  const routeDisplay = getRouteDisplay(executionRoute);
  const canDeleteStop = executionRoute.stops.length > minimumExecutionStops;
  executionSummary.textContent = `${routeDisplay.title} · ${routeDisplay.area} · 예상 비용 ${formatKRW(getRouteCost(executionRoute))}원`;
  renderExecutionMiniMap();
  updateExecutionProgressCopy();

  executionList.innerHTML = executionRoute.stops
    .map((stop, index) => {
      const proof = getMissionProof(index);
      const isComplete = isMissionComplete(index);

      return `
        <li class="execution-stop${isComplete ? " is-complete" : ""}" data-mission-index="${index}">
          <label class="execution-time">
            <span>시간</span>
            <input
              class="execution-time-input"
              type="time"
              value="${escapeHTML(getStopTimeInputValue(stop.time))}"
              data-execution-index="${index}"
              aria-label="${escapeHTML(getStopDisplayPlace(executionRoute, index, stop))} 시간 조절"
            />
          </label>
          <div class="execution-stop-body">
            <p class="execution-place">${escapeHTML(getStopDisplayPlace(executionRoute, index, stop))} <span>${escapeHTML(getCategoryDisplayName(stop.category))}</span></p>
            <p class="execution-note">"${escapeHTML(getStopDisplayNote(executionRoute, index, stop))}"</p>
            <p class="execution-mission">기록: ${escapeHTML(getExecutionMission(stop))}</p>
            <div class="execution-plan-controls" aria-label="${escapeHTML(getStopDisplayPlace(executionRoute, index, stop))} 계획 조정">
              <button
                class="execution-move-button"
                type="button"
                data-execution-index="${index}"
                data-execution-move="-1"
                aria-label="위로 이동"
                ${index === 0 ? "disabled" : ""}
              >
                ↑
              </button>
              <button
                class="execution-move-button"
                type="button"
                data-execution-index="${index}"
                data-execution-move="1"
                aria-label="아래로 이동"
                ${index === executionRoute.stops.length - 1 ? "disabled" : ""}
              >
                ↓
              </button>
              <button
                class="execution-delete-plan"
                type="button"
                data-execution-delete="${index}"
                ${canDeleteStop ? "" : "disabled"}
              >
                이계획 삭제
              </button>
            </div>
            <div class="mission-proof">
              <div class="photo-proof${proof.photoPreviewUrl ? " has-preview" : ""}">
                ${
                  proof.photoPreviewUrl
                    ? `<img class="mission-photo-preview" src="${escapeHTML(proof.photoPreviewUrl)}" alt="${escapeHTML(getStopDisplayPlace(executionRoute, index, stop))} 업로드 사진 미리보기" />`
                    : ""
                }
                <label class="photo-upload">
                  <input class="mission-photo-input" type="file" accept="image/*" data-mission-index="${index}" />
                  <span>${proof.photoName ? escapeHTML(proof.photoName) : "사진 올리기"}</span>
                </label>
              </div>
              <label class="review-field">
                <span class="visually-hidden">${escapeHTML(getStopDisplayPlace(executionRoute, index, stop))} 한줄평</span>
                <input
                  class="mission-review-input"
                  type="text"
                  maxlength="60"
                  value="${escapeHTML(proof.review)}"
                  placeholder="한줄평 쓰기"
                  data-mission-index="${index}"
                />
              </label>
              <div class="rating-field" role="radiogroup" aria-label="${escapeHTML(getStopDisplayPlace(executionRoute, index, stop))} 별점">
                <span>별점</span>
                ${renderRatingButtons(index, proof.rating)}
              </div>
            </div>
          </div>
        </li>
      `;
    })
    .join("");
};

const getMissionProof = (missionIndex) =>
  missionProofs[missionIndex] || {
    photoName: "",
    photoPreviewUrl: "",
    photoDataUrl: "",
    review: "",
    rating: 0,
  };

const isMissionComplete = (missionIndex) => {
  const proof = getMissionProof(missionIndex);
  return Boolean(proof.photoName && proof.review.trim() && proof.rating > 0);
};

const getCompletedMissionCount = () =>
  executionRoute?.stops.filter((_, index) => isMissionComplete(index)).length || 0;

const updateExecutionProgressCopy = () => {
  if (!executionRoute) {
    return;
  }

  const completedMissions = getCompletedMissionCount();
  const totalMissions = executionRoute.stops.length;

  if (totalMissions > 0 && completedMissions === totalMissions) {
    executionDoneText.textContent = "모든 장소 기록이 채워졌어요. 오늘 루트 완료를 누르면 루티 아이템을 받을 수 있어요.";
    renderRouteCompletionAction();
    return;
  }

  executionDoneText.textContent =
    completedMissions === 0
      ? "사진 1장, 한줄평, 별점을 남기면 장소가 자동 완료돼요."
      : "완료된 장소는 노선에 이어지고, 아직 남은 장소는 기록을 기다려요.";
  renderRouteCompletionAction();
};

const handleRouteCompletion = () => {
  if (!executionRoute || hasShownRouteCompletionNotice) {
    return;
  }

  if (!isExecutionRouteComplete()) {
    executionDoneText.textContent = "모든 장소 기록이 채워져야 오늘 루트를 완료할 수 있어요.";
    renderRouteCompletionAction();
    return;
  }

  syncRouteRatingFromMissionAverage();

  const previousState = getLootyState();
  const previousAge = getLootyAge(previousState.completedRoutes);
  const lootyReward = completeLootyRoute(previousState.completedRoutes + 1);
  currentRouteRewardItem = lootyReward.accessoryItem;
  const nextState = getLootyState();
  const nextAge = getLootyAge(nextState.completedRoutes);
  const ageProgress = nextState.completedRoutes % lootyAgeStep;
  const remainingGrowthCount = ageProgress === 0 ? lootyAgeStep : lootyAgeStep - ageProgress;
  const growthMessage = nextAge > previousAge
    ? `루티 ${nextAge}살!`
    : `${nextAge + 1}살까지 ${remainingGrowthCount}번`;
  const rewardNames = [
    ...(currentRouteRewardItem ? [currentRouteRewardItem.name] : []),
    ...Object.entries(lootyReward.foodRewards)
      .filter(([, count]) => count > 0)
      .map(([foodId, count]) => `${lootyFoodById.get(foodId)?.name || foodId} ${count}개`),
    ...(lootyReward.dyeReward ? [`${lootyReward.dyeReward.name} 1개`] : []),
  ];
  const rewardMessage = rewardNames.length
    ? `획득: ${rewardNames.join(", ")}`
    : "획득: 루티 성장";

  hasShownRouteCompletionNotice = true;
  markTodayRouteCompleted();
  renderRouteCompletionAction();

  openRouteNotice({
    kicker: "ROUTE CLEAR",
    title: "오늘 루트 완료!",
    message: `${rewardMessage}\n\n${growthMessage}`,
    rewardItems: getLootyNoticeRewardItems(currentRouteRewardItem, lootyReward.foodRewards, lootyReward.dyeReward),
    actionLabel: "확인",
  });
};

const renderExecutionMiniMap = () => {
  if (!executionRoute) {
    return;
  }

  executionMiniMap.innerHTML = executionRoute.stops
    .map((stop, index) => {
      const isComplete = isMissionComplete(index);
      const isLinked = index > 0 && isMissionComplete(index - 1) && isComplete;

      return `
        <div class="execution-mini-stop${isComplete ? " is-complete" : ""}${isLinked ? " is-linked" : ""}">
          <span class="mini-stop-time">${escapeHTML(stop.time || "시간")}</span>
          <span class="mini-stop-name">${escapeHTML(getStopDisplayPlace(executionRoute, index, stop))}</span>
        </div>
      `;
    })
    .join("");
};

const markCurrentExecutionUnsaved = () => {
  if (executionSessionId && savedExecutionSessionId === executionSessionId) {
    savedExecutionSessionId = "";
  }
};

const revokeProofPreviewUrl = (proof) => {
  if (proof?.photoPreviewUrl) {
    URL.revokeObjectURL(proof.photoPreviewUrl);
  }
};

const removeExecutionStop = (stopIndex) => {
  if (!executionRoute) {
    return;
  }

  if (!Number.isInteger(stopIndex) || !executionRoute.stops[stopIndex]) {
    return;
  }

  if (executionRoute.stops.length <= minimumExecutionStops) {
    executionDoneText.textContent = `${appDisplayName}가 고른 장소는 최소 3곳까지 남겨둘 수 있어요.`;
    return;
  }

  revokeProofPreviewUrl(missionProofs[stopIndex]);
  executionRoute.stops.splice(stopIndex, 1);
  missionProofs.splice(stopIndex, 1);
  markCurrentExecutionUnsaved();
  renderRouteExecution();
};

const moveExecutionStop = (stopIndex, direction) => {
  if (!executionRoute) {
    return;
  }

  if (!Number.isInteger(stopIndex) || !Number.isInteger(direction)) {
    return;
  }

  const nextIndex = stopIndex + direction;
  if (nextIndex < 0 || nextIndex >= executionRoute.stops.length) {
    return;
  }

  [executionRoute.stops[stopIndex], executionRoute.stops[nextIndex]] = [
    executionRoute.stops[nextIndex],
    executionRoute.stops[stopIndex],
  ];
  [missionProofs[stopIndex], missionProofs[nextIndex]] = [
    missionProofs[nextIndex],
    missionProofs[stopIndex],
  ];
  markCurrentExecutionUnsaved();
  renderRouteExecution();
};

const updateExecutionStopTime = (input) => {
  if (!executionRoute) {
    return;
  }

  const stopIndex = Number(input.dataset.executionIndex);
  const stop = executionRoute.stops[stopIndex];
  if (!Number.isInteger(stopIndex) || !stop) {
    return;
  }

  stop.time = input.value;
  markCurrentExecutionUnsaved();
  renderExecutionMiniMap();
};

const createEditableExecutionRoute = (route) => ({
  ...route,
  moveMeters: Array.isArray(route.moveMeters) ? [...route.moveMeters] : route.moveMeters,
  tags: Array.isArray(route.tags) ? [...route.tags] : route.tags,
  preferredTransports: Array.isArray(route.preferredTransports)
    ? [...route.preferredTransports]
    : route.preferredTransports,
  stops: route.stops.map((stop) => ({ ...stop })),
});

const syncMissionProofItem = (missionIndex, changedInput) => {
  const item = executionList.querySelector(`[data-mission-index="${missionIndex}"]`);
  if (!item) {
    return;
  }

  const proof = getMissionProof(missionIndex);
  const isComplete = isMissionComplete(missionIndex);
  const photoProof = item.querySelector(".photo-proof");
  const photoLabel = item.querySelector(".photo-upload span");
  const photoPreview = item.querySelector(".mission-photo-preview");
  const ratingButtons = item.querySelectorAll(".rating-button");

  item.classList.toggle("is-complete", isComplete);

  if (changedInput?.classList.contains("mission-photo-input") && photoLabel) {
    photoLabel.textContent = proof.photoName || "사진 올리기";
  }

  if (changedInput?.classList.contains("mission-photo-input") && photoProof) {
    if (proof.photoPreviewUrl && photoPreview?.tagName === "IMG") {
      photoPreview.src = proof.photoPreviewUrl;
    } else if (proof.photoPreviewUrl) {
      const previewImage = document.createElement("img");
      previewImage.className = "mission-photo-preview";
      previewImage.src = proof.photoPreviewUrl;
      previewImage.alt = "업로드 사진 미리보기";
      photoProof.prepend(previewImage);
    } else {
      photoPreview?.remove();
    }
  }

  photoProof?.classList.toggle("has-preview", Boolean(proof.photoPreviewUrl));

  ratingButtons.forEach((button) => {
    const isSelected = proof.rating >= Number(button.dataset.rating);
    button.classList.toggle("is-selected", isSelected);
    button.textContent = isSelected ? "★" : "☆";
    button.setAttribute("aria-pressed", String(proof.rating === Number(button.dataset.rating)));
  });

  renderExecutionMiniMap();
  updateExecutionProgressCopy();
};

const startRouteExecution = () => {
  if (!canOpenRouteMaking()) {
    return;
  }

  if (!activeRoute) {
    renderRoute();
  }

  executionRoute = createEditableExecutionRoute(activeRoute);
  missionProofs = executionRoute.stops.map(() => ({
    photoName: "",
    photoPreviewUrl: "",
    photoDataUrl: "",
    review: "",
    rating: 0,
  }));
  currentPhotoPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
  currentPhotoPreviewUrls = [];
  routeRating = 0;
  isRouteRatingLocked = false;
  hasShownRouteCompletionNotice = false;
  currentRouteRewardItem = null;
  routeBookTitleText = "";
  routeIntroText = "";
  executionSessionId = `execution-${Date.now()}`;
  savedExecutionSessionId = "";
  renderRouteRatingControl();
  renderRouteExecution();
  showScreen("execution");
  window.location.hash = `route-execution?route=${encodeURIComponent(executionRoute.id)}`;
};

const updateMissionProof = (input) => {
  const missionIndex = Number(input.dataset.missionIndex);
  const proof = {
    ...getMissionProof(missionIndex),
  };

  if (input.classList.contains("mission-photo-input")) {
    const photoFile = input.files?.[0];
    proof.photoName = photoFile?.name || "";

    if (proof.photoPreviewUrl) {
      URL.revokeObjectURL(proof.photoPreviewUrl);
    }

    proof.photoPreviewUrl = photoFile ? URL.createObjectURL(photoFile) : "";
    proof.photoDataUrl = "";

    if (proof.photoPreviewUrl) {
      currentPhotoPreviewUrls.push(proof.photoPreviewUrl);
    }

    if (photoFile) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const latestProof = getMissionProof(missionIndex);
        missionProofs[missionIndex] = {
          ...latestProof,
          photoDataUrl: typeof reader.result === "string" ? reader.result : "",
        };
        syncMissionProofItem(missionIndex, input);
      });
      reader.readAsDataURL(photoFile);
    }
  }

  if (input.classList.contains("mission-review-input")) {
    proof.review = input.value;
  }

  missionProofs[missionIndex] = proof;
  markCurrentExecutionUnsaved();
  syncMissionProofItem(missionIndex, input);
};

const updateMissionRating = (button) => {
  const missionIndex = Number(button.dataset.missionIndex);
  const proof = {
    ...getMissionProof(missionIndex),
    rating: Number(button.dataset.rating),
  };

  missionProofs[missionIndex] = proof;
  markCurrentExecutionUnsaved();
  syncRouteRatingFromMissionAverage();
  syncMissionProofItem(missionIndex, button);
};

const updateRouteRating = () => {
  syncRouteRatingFromMissionAverage();
  executionDoneText.textContent = routeRating
    ? "장소별 별점 평균이 루트 별점에 자동 반영됐어요."
    : "장소별 별점을 남기면 루트 별점이 자동으로 채워져요.";
};

const saveExecutionPlaceFeedback = () => {
  if (!executionRoute) {
    return;
  }

  const store = getPlaceFeedbackStore();

  executionRoute.stops.forEach((stop, index) => {
    const proof = getMissionProof(index);

    if (!proof.rating && !proof.photoName && !proof.review.trim()) {
      return;
    }

    const feedback = store[stop.place] || {
      ratingTotal: 0,
      ratingCount: 0,
      photoCount: 0,
      reviewCount: 0,
    };

    if (proof.rating > 0) {
      feedback.ratingTotal += proof.rating;
      feedback.ratingCount += 1;
    }

    if (proof.photoName) {
      feedback.photoCount += 1;
    }

    if (proof.review.trim()) {
      feedback.reviewCount += 1;
    }

    store[stop.place] = feedback;
  });

  savePlaceFeedbackStore(store);
};

const saveExecutionRouteRating = () => {
  if (!executionRoute || routeRating <= 0) {
    return;
  }

  const store = getRouteRatingStore();
  const feedback = store[executionRoute.id] || {
    ratingTotal: 0,
    ratingCount: 0,
  };

  feedback.ratingTotal += routeRating;
  feedback.ratingCount += 1;
  store[executionRoute.id] = feedback;
  saveRouteRatingStore(store);
};

const isExecutionRouteComplete = () =>
  Boolean(executionRoute && executionRoute.stops.length > 0 && getCompletedMissionCount() === executionRoute.stops.length);

const createRouteBookEntryFromExecution = (savedAt = new Date().toISOString()) => {
  const routeDisplay = getRouteDisplay(executionRoute);
  syncRouteRatingFromMissionAverage();
  const defaultBookTitle = createRouteBookTitle(routeDisplay, routeRating);
  const bookTitle = routeBookTitleText.trim() || defaultBookTitle;

  return {
    id: `${executionSessionId || "execution"}-${Date.now()}`,
    routeId: executionRoute.id,
    title: routeDisplay.title,
    bookTitle,
    area: routeDisplay.area,
    intro: routeIntroText.trim(),
    rating: routeRating,
    ratingStars: routeRating ? "★".repeat(routeRating) : "",
    savedAt,
    stops: executionRoute.stops.map((stop, index) => ({
      time: stop.time,
      place: getStopDisplayPlace(executionRoute, index, stop),
      category: getCategoryDisplayName(stop.category),
      note: getStopDisplayNote(executionRoute, index, stop),
      cost: stop.cost,
    })),
    proofs: missionProofs.map(({ photoName, photoPreviewUrl, photoDataUrl, review, rating }) => ({
      photoName,
      photoUrl: getRouteBookStoredPhotoUrl(photoDataUrl, photoPreviewUrl),
      photoDataUrl: getRouteBookStoredPhotoDataUrl(photoDataUrl),
      review: review.trim(),
      rating,
    })),
  };
};

const getCurrentExecutionRouteBookEntry = () => {
  if (!executionRoute || !executionSessionId || savedExecutionSessionId === executionSessionId) {
    return null;
  }

  if (!isExecutionRouteComplete() || !hasShownRouteCompletionNotice) {
    return null;
  }

  return createRouteBookEntryFromExecution("");
};

const saveRouteToBook = () => {
  if (!executionRoute) {
    return;
  }

  if (!isExecutionRouteComplete()) {
    executionDoneText.textContent = "모든 장소에 사진, 한줄평, 별점을 남기면 루트북에 저장할 수 있어요.";
    return;
  }

  if (!hasShownRouteCompletionNotice) {
    executionDoneText.textContent = "오늘 루트 완료를 먼저 눌러야 루트북에 저장할 수 있어요.";
    renderRouteCompletionAction();
    return;
  }

  if (executionSessionId && savedExecutionSessionId === executionSessionId) {
    renderRouteBook();
    showScreen("routebook");
    window.location.hash = "routebook";
    return;
  }

  const routeBook = getRouteBookEntries();
  const nextEntry = createRouteBookEntryFromExecution();
  const nextRouteBook = [...routeBook, nextEntry];
  const saveResult = saveRouteBookEntriesSafely(nextRouteBook);

  if (!saveResult.saved) {
    executionDoneText.textContent = "루트북 저장 공간이 부족해요. 저장된 루트를 조금 줄인 뒤 다시 저장해줘요.";
    return;
  }

  savedExecutionSessionId = executionSessionId;
  saveExecutionPlaceFeedback();
  saveExecutionRouteRating();
  executionDoneText.textContent = saveResult.reducedPhotos
    ? "루트북에 저장했어요. 사진은 가볍게 줄여서 보관했어요."
    : "루트북에 저장했어요.";
  renderRouteBook();
  showScreen("routebook");
  routeBookSummary.textContent = `${saveResult.entries.length}개의 루트가 루트북에 저장됐어요.`;
  openRouteNotice({
    kicker: "ROUTEBOOK",
    title: "루트북에 저장되었습니다.",
    message: saveResult.reducedPhotos
      ? "완료한 루트가 저장됐어요. 사진은 가볍게 줄였어요."
      : "완료한 루트가 루트북에 안전하게 들어갔어요.",
    actionLabel: "확인",
  });
  window.location.hash = "routebook";
};

const updateRangeLabels = () => {
  routeContext.distanceKm = getDistanceKmFromSlider(distanceRange.value);
  routeContext.budgetKRW = Number(budgetRange.value);
  distanceValue.textContent = formatDistanceLimit(routeContext.distanceKm);
  budgetValue.textContent = formatKRW(routeContext.budgetKRW);
};

const renderHobbyChoices = () => {
  hobbyChoices.innerHTML = hobbyOptions
    .map(
      ({ label }) => `
        <button
          class="hobby-choice"
          type="button"
          aria-pressed="${routeContext.hobbies.includes(label)}"
          data-hobby="${label}"
        >
          ${label}
        </button>
      `,
    )
    .join("");
};

const toggleHobbyChoice = (button) => {
  const hobby = button.dataset.hobby;

  if (routeContext.hobbies.includes(hobby)) {
    routeContext.hobbies = routeContext.hobbies.filter((item) => item !== hobby);
  } else {
    routeContext.hobbies = [...routeContext.hobbies, hobby];
  }

  renderHobbyChoices();
  updateDetailSummary();
};

const updateDetailSummary = () => {
  const parts = [
    routeContext.mood ? getMoodDisplayLabel(routeContext.mood) : null,
    routeContext.transport ? getTransportDisplayLabel(routeContext.transport) : null,
    `${formatDistanceLimit(routeContext.distanceKm)} 안`,
    routeContext.company ? getCompanyDisplayLabel(routeContext.company) : null,
    `${formatKRW(routeContext.budgetKRW)}원`,
  ].filter(Boolean);

  detailSummary.textContent = parts.length
    ? `${parts.join(" · ")} 으로 오늘의 루트를 찾을게요.`
    : "선택한 정보로 오늘의 루트를 찾을게요.";
};

const selectDetailOption = (button) => {
  const { group, value } = button.dataset;

  document
    .querySelectorAll(`.choice-option[data-group="${group}"]`)
    .forEach((option) => option.setAttribute("aria-checked", "false"));

  button.setAttribute("aria-checked", "true");
  detailScreen.classList.add("has-selection");
  routeContext[group] = value;
  updateDetailSummary();
};

profileButton.addEventListener("click", () => {
  const willOpen = profileMenu.hidden;
  profileMenu.hidden = !willOpen;
  profileButton.setAttribute("aria-expanded", String(willOpen));
  closeInventory();
});

inventoryButton.addEventListener("click", () => {
  toggleInventory();
});

lootyRoomBagButton.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleInventory();
});

lootyNameForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (lootyRoomOwner === "guest") {
    return;
  }

  const state = getLootyState();
  const nextName = lootyNameInput.value.trim();
  if (state.name || !nextName) {
    renderLooty();
    return;
  }

  saveLootyState({
    ...state,
    name: nextName,
  });
  renderLooty();
});

lootyRoomCharacter.addEventListener("pointerdown", (event) => {
  if (lootyRoomOwner === "guest") {
    return;
  }

  const itemElement = event.target.closest("[data-room-looty-item]");
  if (!itemElement) {
    return;
  }

  const state = getLootyState();
  const itemId = itemElement.dataset.roomLootyItem;
  const position = getLootyRoomItemPosition(state, itemId);
  lootyRoomDrag = {
    itemElement,
    itemId,
    pointerId: event.pointerId,
    startClientX: event.clientX,
    startClientY: event.clientY,
    originX: position.x,
    originY: position.y,
    currentX: position.x,
    currentY: position.y,
  };
  itemElement.classList.add("is-dragging");
  itemElement.setPointerCapture?.(event.pointerId);
  event.preventDefault();
});

lootyRoomCharacter.addEventListener("pointermove", (event) => {
  if (!lootyRoomDrag || event.pointerId !== lootyRoomDrag.pointerId) {
    return;
  }

  const x = clampLootyRoomItemOffset(lootyRoomDrag.originX + event.clientX - lootyRoomDrag.startClientX);
  const y = clampLootyRoomItemOffset(lootyRoomDrag.originY + event.clientY - lootyRoomDrag.startClientY);
  lootyRoomDrag.currentX = x;
  lootyRoomDrag.currentY = y;
  lootyRoomDrag.itemElement.style.setProperty("--item-x", `${x}px`);
  lootyRoomDrag.itemElement.style.setProperty("--item-y", `${y}px`);
});

const finishLootyRoomItemDrag = (event) => {
  if (!lootyRoomDrag || event.pointerId !== lootyRoomDrag.pointerId) {
    return;
  }

  const { itemElement, itemId, currentX, currentY } = lootyRoomDrag;
  itemElement.classList.remove("is-dragging");
  itemElement.releasePointerCapture?.(event.pointerId);
  lootyRoomDrag = null;
  saveLootyRoomItemPosition(itemId, currentX, currentY);
};

lootyRoomCharacter.addEventListener("pointerup", finishLootyRoomItemDrag);
lootyRoomCharacter.addEventListener("pointercancel", finishLootyRoomItemDrag);

backButton.addEventListener("click", goBack);

profileMenuList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-menu-action]");
  if (!button) {
    return;
  }

  handleProfileMenuAction(button.dataset.menuAction);
});

profileStatus.addEventListener("click", (event) => {
  const visitButton = event.target.closest("[data-visit-looty-room]");
  if (!visitButton) {
    return;
  }

  openLootyRoom({
    owner: "guest",
    guestName: visitButton.dataset.visitLootyRoom || "친구 루티",
  });
  closeProfileMenu();
});

louterBookList.addEventListener("click", (event) => {
  const routeDetail = event.target.closest("[data-louter-route-detail]");
  if (routeDetail) {
    const profile = louterBookProfiles.find((item) => item.id === routeDetail.dataset.louterRouteDetail);
    openLouterRouteDetail(profile);
  }
});

louterBookList.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  const routeDetail = event.target.closest("[data-louter-route-detail]");
  if (!routeDetail) {
    return;
  }

  event.preventDefault();
  const profile = louterBookProfiles.find((item) => item.id === routeDetail.dataset.louterRouteDetail);
  openLouterRouteDetail(profile);
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!profileMenu.hidden && !profileMenu.contains(target) && !profileButton.contains(target)) {
    closeProfileMenu();
  }

  if (!inventoryPanel.hidden && !inventoryPanel.contains(target) && !inventoryButton.contains(target)) {
    closeInventory();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProfileMenu();
    closeInventory();

    if (!photoModal.hidden) {
      closePhotoModal();
    }

    if (!routeNoticeModal.hidden) {
      closeRouteNotice();
    }
  }
});

inventoryList.addEventListener("click", (event) => {
  const foodButton = event.target.closest("[data-looty-food]");
  if (foodButton) {
    if (lootyRoomScreen.hidden || lootyRoomOwner === "guest") {
      openRouteNotice({
        kicker: "ROUTIE BAG",
        title: "루티룸에서만 사용할 수 있어요.",
        message: "우유와 쿠키는 루티룸에서만 루티에게 줄 수 있어요.",
        actionLabel: "확인",
      });
      return;
    }

    feedLooty(foodButton.dataset.lootyFood);
    return;
  }

  const dyeButton = event.target.closest("[data-looty-dye]");
  if (dyeButton) {
    if (lootyRoomScreen.hidden || lootyRoomOwner === "guest") {
      openRouteNotice({
        kicker: "ROUTIE BAG",
        title: "루티룸에서만 사용할 수 있어요.",
        message: "염색약은 ROUTIE ROOM에서만 루티에게 사용할 수 있어요.",
        actionLabel: "확인",
      });
      return;
    }

    useLootyDye(dyeButton.dataset.lootyDye);
    return;
  }

  const button = event.target.closest("[data-looty-item]");
  if (!button) {
    return;
  }

  toggleLootyItem(button.dataset.lootyItem);
});

moodGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".mood-option");
  if (!button) {
    return;
  }

  selectMood(button);
});

nextButton.addEventListener("click", () => {
  if (!selectedMood) {
    return;
  }

  if (!canLootyPlanToday()) {
    return;
  }

  window.location.hash = `details?mood=${encodeURIComponent(selectedMood.label)}`;
  showScreen("details");
});

detailScreen.addEventListener("click", (event) => {
  const button = event.target.closest(".choice-option");
  if (!button) {
    return;
  }

  selectDetailOption(button);
});

distanceRange.addEventListener("input", () => {
  updateRangeLabels();
  updateDetailSummary();
});

budgetRange.addEventListener("input", () => {
  updateRangeLabels();
  updateDetailSummary();
});

hobbyChoices.addEventListener("click", (event) => {
  const button = event.target.closest(".hobby-choice");
  if (!button) {
    return;
  }

  toggleHobbyChoice(button);
});

detailForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canOpenRouteMaking()) {
    return;
  }

  updateRangeLabels();
  updateDetailSummary();
  window.localStorage.setItem("root5RouteContext", JSON.stringify(routeContext));
  currentRouteIndex = 0;
  renderRoute();
  showScreen("routes");
  window.location.hash = "route-results";
});

nextRouteButton.addEventListener("click", () => {
  currentRouteIndex = (currentRouteIndex + 1) % routes.length;
  renderRoute();
});

executeRouteButton.addEventListener("click", startRouteExecution);

executionList.addEventListener("change", (event) => {
  const input = event.target.closest(".mission-photo-input");
  if (!input) {
    return;
  }

  updateMissionProof(input);
});

executionList.addEventListener("input", (event) => {
  const timeInput = event.target.closest(".execution-time-input");
  if (timeInput) {
    updateExecutionStopTime(timeInput);
    return;
  }

  const input = event.target.closest(".mission-review-input");
  if (!input) {
    return;
  }

  updateMissionProof(input);
});

executionList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-execution-delete]");
  if (deleteButton) {
    removeExecutionStop(Number(deleteButton.dataset.executionDelete));
    return;
  }

  const moveButton = event.target.closest("[data-execution-move]");
  if (moveButton) {
    moveExecutionStop(Number(moveButton.dataset.executionIndex), Number(moveButton.dataset.executionMove));
    return;
  }

  const button = event.target.closest(".rating-button");
  if (!button) {
    return;
  }

  updateMissionRating(button);
});

viewRouteBookButton.addEventListener("click", () => {
  renderRouteBook();
  showScreen("routebook");
  window.location.hash = "routebook";
});

completeRouteButton.addEventListener("click", handleRouteCompletion);

routeRatingControl.addEventListener("click", (event) => {
  const button = event.target.closest(".route-rating-button");
  if (!button) {
    return;
  }

  updateRouteRating(button);
});

routeBookToday.addEventListener("input", (event) => {
  const titleInput = event.target.closest("[data-routebook-action='title']");
  if (titleInput) {
    routeBookTitleText = titleInput.value;
    markCurrentExecutionUnsaved();
    return;
  }

  const introInput = event.target.closest("[data-routebook-action='intro']");
  if (!introInput) {
    return;
  }

  routeIntroText = introInput.value;
  markCurrentExecutionUnsaved();
});

routeBookToday.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-routebook-action='save-current']");
  if (saveButton) {
    saveRouteToBook();
    return;
  }

  const button = event.target.closest(".routebook-delete-place");
  if (!button) {
    return;
  }

  removeRouteBookStop(Number(button.dataset.routebookEntry), Number(button.dataset.routebookStop));
});

routeBookSavedList.addEventListener("submit", (event) => {
  event.preventDefault();
});

routeBookSavedList.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-routebook-action='save-entry']");
  if (saveButton) {
    saveRouteBookEntryEdit(Number(saveButton.dataset.routebookEntry), saveButton.closest(".routebook-edit-form"));
    return;
  }

  const cancelButton = event.target.closest("[data-routebook-action='cancel-entry']");
  if (cancelButton) {
    cancelRouteBookEntryEdit();
    return;
  }

  const editButton = event.target.closest("[data-routebook-action='edit-entry']");
  if (editButton) {
    editRouteBookEntry(Number(editButton.dataset.routebookEntry));
    return;
  }

  const deleteButton = event.target.closest("[data-routebook-action='delete-entry']");
  if (deleteButton) {
    removeRouteBookEntry(Number(deleteButton.dataset.routebookEntry));
  }
});

superRouteButton.addEventListener("click", () => openLootyRoom());

routeList.addEventListener("click", (event) => {
  const button = event.target.closest(".route-photo-button");
  if (!button || !activeRoute) {
    return;
  }

  const stopIndex = Number(button.dataset.stopIndex);
  const stop = activeRoute.stops[stopIndex];
  if (stop) {
    openPhotoModal(stop, getStopDisplayPlace(activeRoute, stopIndex, stop));
  }
});

photoModalBackdrop.addEventListener("click", closePhotoModal);
photoModalClose.addEventListener("click", closePhotoModal);
routeNoticeBackdrop.addEventListener("click", closeRouteNotice);
routeNoticeClose.addEventListener("click", closeRouteNotice);
routeNoticeAction.addEventListener("click", closeRouteNotice);

renderMoods();
showScreen("mood");
renderAuthState();
updateRangeLabels();
renderHobbyChoices();
