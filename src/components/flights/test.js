import React, { useEffect } from "react";
import { selectSearchResults } from "../../redux/features/flightSlice";
import { useSelector } from "react-redux";

function Test() {
  const searchResults = useSelector(selectSearchResults);
  //   useEffect(() => {
  //     console.log(JSON.stringify(searchResults));
  //   }, [searchResults]);

  return (
    <div>
      <p>a</p>
      {searchResults.map((result, index) => (
        <div key={index}>
          <h2>a</h2>
          <p>From: {result.fromAirportLocationId}</p>
          <p>To: {result.toAirportLocationId}</p>
          <p>Start Time: {result.startTime}</p>
          <p>End Time: {result.endTime}</p>
          <p>Seat Quantity: {result.seatQuantity}</p>
          <p>Seat Type: {result.seatTypeName}</p>
          <p>Price: {result.unitPrice}</p>
        </div>
      ))}
    </div>
  );
}

export default Test;
