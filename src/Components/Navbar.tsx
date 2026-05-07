import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import type { RootState } from '../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../Redux/Logic/logicSlice';

const categories: string[] = ['все', 'пиццы', 'роллы', 'гр.роллы', 'фастфуд', 'салаты']

export const Navbar: React.FC = () => {

  const dispatch = useDispatch()
  const {categoryId} = useSelector((state: RootState) => state.logic)

  return (
    <div className="category-nav-wrapper">
      <ButtonGroup size="sm" className="category-button-group">
        {categories.map((c, i) => (
          <Button
            key={i}
            onClick={() => dispatch(setCategoryId(i))}
            className={categoryId === i ? 'category-btn-active' : 'category-btn'}
            variant="dark"
          >
            <span className="btn-content">{c}</span>
          </Button>
        ))}
      </ButtonGroup>
    </div>
  )
}
