import { createContext } from 'react';

const defaultValue = {
  categoryList: []
};

const HomeContext = createContext(defaultValue);

export default HomeContext;
