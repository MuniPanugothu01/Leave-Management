// // this is main code
// import { useState, useEffect } from "react";
// // import style.css

// export default function LeaveRequestComponent() {
//   const [data, setData] = useState([]);
//   const [dateFilter, setDateFilter] = useState("");
//   const [leaveTypeFilter, setLeaveTypeFilter] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Fetch Data from API
//   useEffect(() => {
//     fetch("http://localhost:3001/leaveRequest")
//       .then((response) => {
//         if (!response.ok)
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         return response.json();
//       })
//       .then((result) => {
//         setData(Array.isArray(result) ? result : []);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("API Error:", error);
//         setData([]);
//         setLoading(false);
//       });
//   }, []);

//   // Function to handle accept/reject actions
//   const handleAction = async (id, status) => {
//     try {
//       // Optimistically update UI
//       setData((prevData) =>
//         prevData.map((leave) =>
//           leave.LeaveID === id ? { ...leave, Status: status } : leave
//         )
//       );

//       // Send API request
//       const response = await fetch(`http://localhost:3001/leaveRequest/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ Status: status }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP Error! Status: ${response.status}`);
//       }

//       console.log(`Leave request ${id} updated to ${status}`);
//     } catch (error) {
//       console.error("Error updating leave:", error);
//     }
//   };

//   // Filtered data
//   const filteredData = data.filter((item) => {
//     return (
//       (dateFilter === "" || item.FromDate === dateFilter) &&
//       (leaveTypeFilter === "" || item.LeaveType === leaveTypeFilter)
//     );
//   });

//   if (loading) return <p>Loading leave requests...</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Leave Requests</h2>

//       {/* Filters */}
//       <div className="flex gap-4 mb-4">
//         <input
//           type="date"
//           className="border p-2"
//           value={dateFilter}
//           onChange={(e) => setDateFilter(e.target.value)}
//         />
//         <select
//           className="border p-2"
//           value={leaveTypeFilter}
//           onChange={(e) => setLeaveTypeFilter(e.target.value)}
//         >
//           <option value="">All Leave Types</option>
//           <option value="Casual Leave">Casual Leave</option>
//           <option value="Paid Leave">Paid Leave</option>
//           <option value="Unpaid Leave">Unpaid Leave</option>
//           <option value="Sick Leave">Sick Leave</option>
//         </select>
//       </div>

//       {/* Table */}
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Employee ID</th>
//             <th className="border p-2">From Date</th>
//             <th className="border p-2">To Date</th>
//             <th className="border p-2">From Time</th>
//             <th className="border p-2">To Time</th>
//             <th className="border p-2">Leave Type</th>
//             <th className="border p-2">Reason</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((item) => (
//             <tr key={item.LeaveID} className="border">
//               <td className="border p-2">{item.EmployeeID}</td>
//               <td className="border p-2">{item.FromDate}</td>
//               <td className="border p-2">{item.ToDate}</td>
//               <td className="border p-2">{item.FromTime}</td>
//               <td className="border p-2">{item.ToTime}</td>
//               <td className="border p-2">{item.LeaveType || "N/A"}</td>
//               <td className="border p-2">{item.Reason}</td>
//               <td className="border p-2 font-bold">
//                 {item.Status === "Accepted" ? (
//                   <span className="text-green-600">{item.Status}</span>
//                 ) : item.Status === "Rejected" ? (
//                   <span className="text-red-600">{item.Status}</span>
//                 ) : (
//                   <span className="text-yellow-600">{item.Status}</span>
//                 )}
//               </td>
//               <td className="border p-2">
//                 {item.Status === "Pending" && (
//                   <>
//                     <button
//                       className="bg-green-500 text-white px-2 py-1 mr-2"
//                       onClick={() => handleAction(item.LeaveID, "Accepted")}
//                     >
//                       Accept
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-2 py-1"
//                       onClick={() => handleAction(item.LeaveID, "Rejected")}
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import './style.css' // Import the styles

export default function LeaveRequestComponent() {
  const [data, setData] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [leaveTypeFilter, setLeaveTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/leaveRequest")
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((result) => {
        setData(Array.isArray(result) ? result : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setData([]);
        setLoading(false);
      });
  }, []);

  const handleAction = async (id, status) => {
    try {
      setData((prevData) =>
        prevData.map((leave) =>
          leave.LeaveID === id ? { ...leave, Status: status } : leave
        )
      );

      const response = await fetch(`http://localhost:3001/leaveRequest/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Status: status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      console.log(`Leave request ${id} updated to ${status}`);
    } catch (error) {
      console.error("Error updating leave:", error);
    }
  };

  const filteredData = data.filter((item) => {
    return (
      (dateFilter === "" || item.FromDate === dateFilter) &&
      (leaveTypeFilter === "" || item.LeaveType === leaveTypeFilter)
    );
  });

  if (loading) return <p>Loading leave requests...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 leave-Request" >Leave Requests</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          className="border p-2"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <select
          className="border p-2"
          value={leaveTypeFilter}
          onChange={(e) => setLeaveTypeFilter(e.target.value)}
        >
          <option value="">All Leave Types</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Paid Leave">Paid Leave</option>
          <option value="Unpaid Leave">Unpaid Leave</option>
          <option value="Sick Leave">Sick Leave</option>
        </select>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>From Time</th>
            <th>To Time</th>
            <th>Leave Type</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.LeaveID}>
              <td>{item.EmployeeID}</td>
              <td>{item.FromDate}</td>
              <td>{item.ToDate}</td>
              <td>{item.FromTime}</td>
              <td>{item.ToTime}</td>
              <td>{item.LeaveType || "N/A"}</td>
              <td>{item.Reason}</td>
              <td
                className={`
                ${item.Status === "Accepted" ? "status-accepted" : ""}
                ${item.Status === "Rejected" ? "status-rejected" : ""}
                ${item.Status === "Pending" ? "status-pending" : ""}
              `}
              >
                {item.Status}
              </td>
              <td>
                {item.Status === "Pending" && (
                  <>
                    <button
                      className="btn btn-accept"
                      onClick={() => handleAction(item.LeaveID, "Accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-reject"
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
