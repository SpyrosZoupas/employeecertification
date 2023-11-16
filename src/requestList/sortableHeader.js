export const SortableHeader = ({ label, sortKey, currentSortKey, currentSortDirection, onSort }) => {
    const isCurrentSortKey = currentSortKey === sortKey;
    const isAscending = currentSortDirection === "asc";
  
    return (
      <th onClick={() => onSort(sortKey)}>
        {label} {isCurrentSortKey && (isAscending ? "▲" : "▼")}
      </th>
    );
  };