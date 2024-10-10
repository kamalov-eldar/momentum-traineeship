const WALLPAPERS = {
    night: "img/01.jpg", // 00:00 - 05:59
    morning: "img/02.jpg", // 06:00 - 11:59
    afternoon: "img/03.jpg", // 12:00 - 17:59
    evening: "img/04.jpg", // 18:00 - 23:59
};

function getCurrentWallpaper() {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 6) {
        return WALLPAPERS.night;
    } else if (currentHour >= 6 && currentHour < 12) {
        return WALLPAPERS.morning;
    } else if (currentHour >= 12 && currentHour < 18) {
        return WALLPAPERS.afternoon;
    } else {
        return WALLPAPERS.evening;
    }
}

function changeWallpaper() {
    const imageUrl = getCurrentWallpaper();

    document.body.classList.add("fade-out");

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
        document.body.style.backgroundImage = `url('${imageUrl}')`;
        document.body.classList.remove("fade-out");
    };

    img.onerror = () => {
        console.error("Failed to load wallpaper:", imageUrl);
    };
}

// ф-ия вычисления через сколько мс сменить бэкграунд
function timeUntilNextWallpaperChange() {
    const now = new Date();
    const currentHour = now.getHours();
    let nextChangeHour;

    if (currentHour >= 0 && currentHour < 6) {
        nextChangeHour = 6;
    } else if (currentHour >= 6 && currentHour < 12) {
        nextChangeHour = 12;
    } else if (currentHour >= 12 && currentHour < 18) {
        nextChangeHour = 18;
    } else {
        nextChangeHour = 24; // Midnight
    }

    const nextChangeTime = new Date(now);
    nextChangeTime.setHours(nextChangeHour, 0, 0, 0);

    return nextChangeTime - now;
}

// рекурсивный вызов функции для смены бэкграунда
function scheduleNextWallpaperChange() {
    changeWallpaper();

    const timeUntilChange = timeUntilNextWallpaperChange();

    setTimeout(() => {
        scheduleNextWallpaperChange();
    }, timeUntilChange);
}

scheduleNextWallpaperChange();
