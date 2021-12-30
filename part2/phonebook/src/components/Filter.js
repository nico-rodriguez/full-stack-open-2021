const Filter = ({ query, handleQuery }) => <div>
  filter shown with <input type="text" value={query} onChange={handleQuery}/>
</div>;

export default Filter;