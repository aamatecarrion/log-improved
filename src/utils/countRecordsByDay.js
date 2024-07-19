import formatDate from "./formatDate";

export const countRecordsByDay = (records, searchText) => {
    const counts = {};
    records.forEach((record) => {
      if (record.text === searchText) {
        const dateKey = formatDate(record.date);
        counts[dateKey] = (counts[dateKey] || 0) + 1;
      }
    });
    console.log(counts)
    return counts;
};
  