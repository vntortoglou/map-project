import SearchBar from "./SearchBar";

export default function SideBar({ handleSearch }) {
  return (
<div>
<SearchBar handleSearch={handleSearch}></SearchBar>
    </div>
  );
}
