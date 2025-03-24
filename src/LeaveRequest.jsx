import { useState } from "react";
import leaveRequestsData from "./db";

export default function LeaveRequestComponent() {
  const [data, setData] = useState(leaveRequestsData);
  const [dateFilter, setDateFilter] = useState("");
  const [leaveTypeFilter, setLeaveTypeFilter] = useState("");

  console.log(data, "data list from db.josn");
  console.log(leaveRequestsData, "muni");

  const handleAction = (id, status) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.LeaveID === id ? { ...item, Status: status } : item
      )
    );
  };

  const filteredData = data.filter((item) => {
    return (
      (dateFilter === "" || item.FromDate === dateFilter) &&
      (leaveTypeFilter === "" ||
        item.LeaveType.toLowerCase().includes(leaveTypeFilter.toLowerCase()))
    );
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Leave Requests</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          className="border p-2"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Leave Type"
          className="border p-2"
          value={leaveTypeFilter}
          onChange={(e) => setLeaveTypeFilter(e.target.value)}
        />
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Employee ID</th>
            <th className="border p-2">From Date</th>
            <th className="border p-2">To Date</th>
            <th className="border p-2">From Time</th>
            <th className="border p-2">To Time</th>
            <th className="border p-2">Leave Type</th>
            <th className="border p-2">Reason</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action Type</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.LeaveID} className="border">
              <td className="border p-2">{item.EmployeeID}</td>
              <td className="border p-2">{item.FromDate}</td>
              <td className="border p-2">{item.ToDate}</td>
              <td className="border p-2">{item.FromTime}</td>
              <td className="border p-2">{item.ToTime}</td>
              <td className="border p-2">{item.LeaveType || "N/A"}</td>
              <td className="border p-2">{item.Reason}</td>
              <td className="border p-2">{item.Status}</td>
              <td className="border p-2">{item.ActionType}</td>
              <td className="border p-2">
                {item.Status === "Pending" && (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 mr-2"
                      onClick={() => handleAction(item.LeaveID, "Accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1"
                      onClick={() => handleAction(item.LeaveID, "Rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
