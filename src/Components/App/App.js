import React, {useState} from "react";
import styles from "./App.module.css";

function App () {
  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        {/* <!-- Add a SearchBar component --> */}
        
        <div className={styles["App-playlist"]}>
          {/* <!-- Add a SearchResults component --> */}
          {/* <!-- Add a Playlist component --> */}
        </div>
      </div>
    </div>
  );
}

export default App;