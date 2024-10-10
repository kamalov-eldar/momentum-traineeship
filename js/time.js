const MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

const DAYS = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];

let lastDay = null;

function updateTimeAndDate() {
    const date = new Date();

    // Update time
    const timeString = date.toLocaleTimeString("ru-RU");
    document.getElementById("clock").textContent = timeString;

    const currentDay = date.getDate();
    if (currentDay !== lastDay) {
        updateDate(date);
        lastDay = currentDay;
    }
}

//Update day
function updateDate(date) {
    const day = date.toLocaleDateString("ru-RU", { day: "2-digit" });
    const month = date.toLocaleDateString("ru-RU", { month: "long" });
    const weekday = date.toLocaleDateString("ru-RU", { weekday: "long" });
    const dateString = `${day} ${month}, ${weekday}`;
    document.getElementById("date").textContent = dateString;
}

updateTimeAndDate();

let timeInterval = setInterval(updateTimeAndDate, 1000);

window.addEventListener("beforeunload", () => {
    clearInterval(timeInterval);
});
