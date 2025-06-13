import SearchBar from "./SearchBar";

export default function Sidebar({ handleSearch }) {
  return (
<div>
<SearchBar handleSearch={handleSearch}></SearchBar>
    </div>
  );
}
