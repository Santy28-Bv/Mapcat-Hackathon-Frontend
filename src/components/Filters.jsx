export default function Filters({ categories, activeFilter, onFilterChange }) {
  return (
    <div className="filters">
      {categories.map(cat => (
        <button
          key={cat.id}
          className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
          onClick={() => onFilterChange(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
