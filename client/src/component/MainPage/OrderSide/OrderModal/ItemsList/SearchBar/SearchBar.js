import "./SearchBar.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div>
      <input
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value.toLowerCase())}
        type="text"
        className="header-search"
        placeholder="Search your coffee"
        name="s"
      />
    </div>
  );
};

export default SearchBar;
