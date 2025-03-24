// import { useState } from "react";
// import leaveRequestsData from "./db";

// export default function LeaveRequestComponent() {
//   const [data, setData] = useState(leaveRequestsData);
//   const [dateFilter, setDateFilter] = useState("");
//   const [leaveTypeFilter, setLeaveTypeFilter] = useState("");

//   console.log(data,'data form db.js');
//   console.log(leaveRequestsData,'muni');

//   const handleAction = (id, status) => {
//     setData((prevData) =>
//       prevData.map((item) =>
//         item.LeaveID === id ? { ...item, Status: status } : item
//       )
//     );
//   };

//   const filteredData = data.filter((item) => {
//     return (
//       (dateFilter === "" || item.FromDate === dateFilter) &&
//       (leaveTypeFilter === "" || item.LeaveType === leaveTypeFilter)
//     );
//   });

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Leave Requests</h2>
//       <div className="flex gap-4 mb-4">
//         {/* Date Filter */}
//         <input
//           type="date"
//           className="border p-2"
//           value={dateFilter}
//           onChange={(e) => setDateFilter(e.target.value)}
//         />

//         {/* Dropdown for Leave Type Filter */}
//         <select
//           className="border p-2"
//           value={leaveTypeFilter}
//           onChange={(e) => setLeaveTypeFilter(e.target.value)}
//         >
//           <option value="">All Leave Types</option>
//           <option value="Casual Leave">Casual Leave</option>
//           <option value="Paid Leave">Paid Leave</option>
//           <option value="Unpaid Leave">Unpaid Leave</option>
//         </select>
//       </div>

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
//             <th className="border p-2">Action Type</th>
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
//               <td className="border p-2">{item.Status}</td>
//               <td className="border p-2">{item.ActionType}</td>
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

// import { useState, useEffect } from "react";

// export default function LeaveRequestComponent() {
//   const [data, setData] = useState([]);
//   const [dateFilter, setDateFilter] = useState("");
//   const [leaveTypeFilter, setLeaveTypeFilter] = useState("");
//   const [loading, setLoading] = useState(true);

  
  
//   // Fetch Data from API
//   useEffect(() => {
//     fetch("http://localhost:3001/leaveRequest") // Replace with actual API URL
//       .then((response) => {return response.json()})
//       .then((result) => {
//         // if (result.status === "success") {
//           setData(result);
//         //   console.log(result,'yy');
//         // } else {
//         //   console.error("Error fetching data:", result.message);
//         // }
//         console.log(result,'dfff');
        
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("API Error:", error);
//         setLoading(false);
//       });
//   }, []);

//   console.log(data,'dd');
  
//   const handleAction = (id, status) => {
//     fetch(`http://localhost:3001/leaveRequest/${id}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status }),
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.status === "success") {
//           window.location.reload(); // Refresh page after updating status
//         } else {
//           console.error("Update failed:", result.message);
//         }
//       })
//       .catch((error) => console.error("Error updating leave:", error));
//   };

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
//         </select>
//       </div>
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
//             <th className="border p-2">Action Type</th>
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
//               <td className="border p-2">{item.Status}</td>
//               <td className="border p-2">{item.ActionType}</td>
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

export default function LeaveRequestComponent() {
  const [data, setData] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [leaveTypeFilter, setLeaveTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Data from API
  useEffect(() => {
    fetch("http://localhost:3001/leaveRequest") // ✅ Ensure this API is running
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((result) => {
        setData(result); // ✅ Removed incorrect `result.data`
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoading(false);
      });
  }, []);

  // Function to handle accept/reject actions
  const handleAction = (id, status) => {
    fetch(`http://localhost:3001/leaveRequest/${id}`, {
      method: "PATCH", // ✅ PATCH to update status
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Status: status }), // ✅ Match field name in db.json
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        return response.json();
      })
      .then(() => {
        window.location.reload(); // ✅ Force page reload after update
      })
      .catch((error) => console.error("Error updating leave:", error));
  };

  // Filter data based on user input
  const filteredData = data.filter((item) => {
    return (
      (dateFilter === "" || item.FromDate === dateFilter) &&
      (leaveTypeFilter === "" || item.LeaveType === leaveTypeFilter)
    );
  });

  if (loading) return <p>Loading leave requests...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Leave Requests</h2>

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
        </select>
      </div>

      {/* Table */}
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
