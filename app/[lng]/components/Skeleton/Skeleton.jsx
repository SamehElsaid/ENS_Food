import React from "react";

function Skeleton({ loading }) {
  return (
    <div
      className={`
                ${
                  !loading
                    ? "opacity-0 || invisible"
                    : "opacity-100 || transition-opacity || duration-300 z-10"
                } || skeleton || absolute || top-1/2 || left-1/2 || -translate-x-1/2 || -translate-y-1/2`}
    >
      <div className="skeleton-left">
        <div className="line h17 w40 m10"></div>
        <div className="line"></div>
        <div className="line h8 w50"></div>
        <div className="line  w75"></div>
      </div>
      <div className="skeleton-right">
        <div className="square"></div>
      </div>
    </div>
  );
}

export default Skeleton;
