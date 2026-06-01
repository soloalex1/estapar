export interface Filters {
  isDigital: boolean;
  search: string;
}

export interface GarageFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}
