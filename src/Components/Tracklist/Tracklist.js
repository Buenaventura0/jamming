import React from "react";
import styles from "./Tracklist.module.css";

function Tracklist () {
  return (
    <div className={styles.TrackList}>
      {/* <!-- You will add a map method that renders a set of Track components  --> */}
      <li>Track1</li>
      <li>Track2</li>
      <li>Track3</li>
    </div>
  );
}

export default Tracklist;