import React, { useCallback, useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setSortId, setSortOrder, setSearch } from '../Redux/Logic/logicSlice';
import { RootState } from '../Redux/store';

interface sortType {
  name: string;
  sortProperty: string;
}

const sort = [
  { name: 'Популярности', sortProperty: 'rating' },
  { name: 'Цене', sortProperty: 'price' },
  { name: 'Алфавиту', sortProperty: 'name' },
  { name: 'Новинкам', sortProperty: 'new' },
];

export const Form = () => {
  const dispatch = useDispatch();
  const { sortOrder, search, sortId } = useSelector((state: RootState) => state.logic);
  
  const [activeKey, setActiveKey] = useState<string | number>(0);

  useEffect(() => {
    const currentIndex = sort.findIndex(s => s.sortProperty === sortId);
    if (currentIndex !== -1) {
      setActiveKey(currentIndex);
    } else {
      setActiveKey(0);
      dispatch(setSortId(sort[0].sortProperty));
    }
  }, [dispatch, sortId]);

  const ClickSort = useCallback(
    (s: sortType, index: number) => {
      dispatch(setSortId(s.sortProperty));
      setActiveKey(index);
    },
    [dispatch]
  );

  const returnClick = useCallback(() => {
    const newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    dispatch(setSortOrder(newSortOrder));
  }, [dispatch, sortOrder]);

  return (
    <div className="search-form-wrapper">
      <div className="search-container">
        <div className="search-input-group">
          <input
            className="search-input-modern"
            placeholder="Поиск блюд..."
            type="text"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
          <span className="search-border"></span>
          {!search ? (
            <svg className="search-icon" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg
              onClick={() => dispatch(setSearch(""))}
              className="close-icon"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </div>
      </div>

      <div className="sort-container">
        <Nav>
          <NavDropdown 
            title={
              <span className="sort-icon">
                ☲
              </span>
            } 
            className="sort-dropdown"
          >
            {sort.map((s, i) => (
              <NavDropdown.Item
                key={i}
                className={`sort-item ${activeKey === i ? 'active' : ''}`}
                onClick={() => ClickSort(s, i)}
                eventKey={i}
                active={activeKey === i}
              >
                {s.name}
                {activeKey === i && <span className="active-check"> ✓</span>}
              </NavDropdown.Item>
            ))}
            <hr className="divider" />
            <nav onClick={returnClick} className="sort-order-btn">
              {sortOrder === 'asc' ? 'Возрастание ↑' : 'Убывание ↓'}
            </nav>
          </NavDropdown>
        </Nav>
      </div>
    </div>
  );
};