const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC"
})

export function formatDate(isoString) {
    return dateFormatter.format(new Date(isoString)) + " UTC"
}
