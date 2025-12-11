import React from 'react';
import { Input } from '@chakra-ui/react';

interface Props {
  query: string;
  setQuery: (q: string) => void;
  filter: string;
  setFilter: (f: string) => void;
}

/**
 * SearchFilter:
 * - Controlled input for search and a native select for filter.
 * - We use a native <select> (styled minimally) to avoid Chakra Select typing issues
 *   if Chakra types mismatch in your environment.
 */
const SearchFilter: React.FC<Props> = ({ query, setQuery, filter, setFilter }) => {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
      <Input
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ maxWidth: 300 }}
      />

      {/* native select with typed onChange */}
      <select
        value={filter}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value)}
        style={{ maxWidth: 200, padding: '8px', borderRadius: 8 }}
      >
        <option value="">All</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="devops">DevOps</option>
      </select>
    </div>
  );
};

export default SearchFilter;
