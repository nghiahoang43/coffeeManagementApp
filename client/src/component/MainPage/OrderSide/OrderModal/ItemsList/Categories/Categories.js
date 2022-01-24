import "./Categories.css";

const Categories = ({ categories, filterItems, activeCategory }) => {
  return (
    <div className="category-container">
      {categories.map((category, index) => {
        return (
          <button
            type="button"
            className={`${
              activeCategory === category
                ? "category active-category"
                : "category inactive-category"
            }`}
            key={index}
            onClick={() => filterItems(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
