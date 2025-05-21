import { useState, useEffect } from "react";

type Props = {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
};

const SearchBar = ({ searchTerm, setSearchTerm }: Props) => {
  const [temp, setTemp] = useState(searchTerm);

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchTerm(temp);
    }, 400);

    return () => clearTimeout(delay);
  }, [temp]);

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search by name..."
      value={temp}
      onChange={(e) => setTemp(e.target.value)}
    />
  );
};

export default SearchBar;
