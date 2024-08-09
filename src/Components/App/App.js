import React, {useState} from "react";
import styles from "./App.module.css";
import SearchResults from "../SearchResults/SearchResults";

function App () {
  const [searchResults, setSearchResults] = useState([
  {
    name: "example track name 1",
    artist: "example track artist 1",
    album: "example track album 1",
    id: 1,
  },

  {
    name: "example track name 2",
    artist: "example track artist 2",
    album: "example track album 2",
    id: 2,
  },

  {
    name: "example track name 3",
    artist: "example track artist 3",
    album: "example track album 3",
    id: 3,
  },
]);

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        {/* <!-- Add a SearchBar component --> */}
        
        <div className={styles["App-playlist"]}>
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults userSearchResults={searchResults} />
          {/* <!-- Add a Playlist component --> */}
        </div>
      </div>
    </div>
  );
}

export default App;