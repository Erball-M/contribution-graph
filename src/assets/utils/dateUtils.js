import { months } from "../constants/dateNames";

function getFirstDate() {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - 350);
    const dayOfWeek = targetDate.getDay();
    const daysUntilMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    targetDate.setDate(targetDate.getDate() - daysUntilMonday);
    return targetDate;
}
export function generateDateObjects(data = {}) {
    const firstDate = getFirstDate();
    const dateObjects = {
        months: {},
        days: [],
    };
    for (let i = 0; i < 357; i++) {
        const currentDate = new Date(new Date(firstDate).setDate(firstDate.getDate() + i))
        const monthName = months[currentDate.getMonth()];

        if (!dateObjects.months[monthName]) {
            dateObjects.months[monthName] = 0;
        }
        if (currentDate.getDay() == 1) {
            dateObjects.months[monthName] += 1;
        }

        const formattedDate = formatDate(currentDate)
        dateObjects.days.push({
            id: currentDate,
            date: new Date(currentDate),
            contributions: data[formattedDate] ?? 0,
            color: getCellColor(data[formattedDate] ?? 0)
        });
    }
    dateObjects.days = dateObjects.days.reduce((acc, item, index) => {
        if (!acc[index % 7]) {
            acc[index % 7] = []
        }
        acc[index % 7].push(item)
        return acc
    }, [])
    return dateObjects;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getCellColor(count) {
    if (count === 0) {
        return "#EDEDED";
    } else if (count >= 1 && count <= 9) {
        return "#ACD5F2";
    } else if (count >= 10 && count <= 19) {
        return "#7FA8C9";
    } else if (count >= 20 && count <= 29) {
        return "#527BA0";
    } else if (count > 30) {
        return "#254E77";
    }
}