import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  sortId: "rating",
  sortOrder: "desc",
  search: ""
}

export const logicSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload //меняем стейт тут
    },

    setSortId(state, action) {
      state.sortId = action.payload //меняем стейт тут
    },

    setSortOrder(state, action) {
      state.sortOrder = action.payload //меняем стейт тут
    },

    setSearch(state, action) {
      state.search = action.payload //меняем стейт тут
    },
    
    setFilters(state, action) {
      state.sortId = action.payload.sortId //меняем стейт тут
      state.categoryId = Number(action.payload.categoryId) //меняем стейт тут
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortId, setSortOrder, setSearch, setFilters } = logicSlice.actions

export default logicSlice.reducer