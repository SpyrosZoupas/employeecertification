import React, { useEffect, useState } from "react";
import { SortableHeader } from "./sortableHeader";
import './certificateList.css';

export function RequestList() {
  const [requests, setRequests] = useState([]);
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [search, setSearch] = useState('');
  console.log(search);

  const getRequests = () => {
    fetch("https://zalexinc.azure-api.net/request-list?subscription-key=0e9cb8c5b1e945e99922d8e1a3454f99")
      .then((response) => response.json())
      .then((data) => setRequests(data))
  }

  useEffect(() => {
    getRequests()
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedRequests = [...requests].sort((a, b) => {
    const keyA = a[sortKey];
    const keyB = b[sortKey];

    if (keyA < keyB) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (keyA > keyB) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <form>
        <label htmlFor="search">Search:</label>
        <input id="search" name="search" type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search individual requests"></input>
      </form>
      <table>
        <thead>
          <tr>
            <SortableHeader
              label="Reference No."
              sortKey="reference_no"
              currentSortKey={sortKey}
              currentSortDirection={sortDirection}
              onSort={handleSort}
            />
            <SortableHeader
              label="Address To"
              sortKey="address_to"
              currentSortKey={sortKey}
              currentSortDirection={sortDirection}
              onSort={handleSort}
            />
            <SortableHeader
              label="Purpose"
              sortKey="purpose"
              currentSortKey={sortKey}
              currentSortDirection={sortDirection}
              onSort={handleSort}
            />
            <SortableHeader
              label="Issued on"
              sortKey="issued_on"
              currentSortKey={sortKey}
              currentSortDirection={sortDirection}
              onSort={handleSort}
            />
            <SortableHeader
              label="Status"
              sortKey="status"
              currentSortKey={sortKey}
              currentSortDirection={sortDirection}
              onSort={handleSort}
            />
          </tr>
        </thead>
        <tbody>
          {sortedRequests
          .filter((request) => {
            const referenceNoString = request.reference_no.toString();
            const statusString = request.status.toString().toLowerCase();
            return (
              search.toLowerCase() === '' ||
              referenceNoString === search.toLowerCase() ||
              statusString === search.toLowerCase()
            );
          })
          .map((request) => (
            <tr key={request.id}>
              <td>{request.reference_no}</td>
              <td>{request.address_to}</td>
              <td>{request.purpose}</td>
              <td>{request.issued_on}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}