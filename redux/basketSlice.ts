import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface BasektState {
    items: Product[]
}

const initialState = { items: [] } as BasektState

const basketSlice = createSlice({
  name: 'basekt',
  initialState,
  reducers: {
    addToBasket: (state: BasektState, action: PayloadAction<Product>) => {
        state.items = [...state.items, action.payload]
    },
    removeFromBasket: (
        state: BasektState,
        action: PayloadAction<{id: string}>
    ) => {
        const index = state.items.findIndex((item: Product) => item._id === action.payload.id)
        let newBasket = [...state.items];
        if(index >= 0) {
            newBasket.splice(index, 1)
        } else {
            console.log(`Cant remove product (id: ${action.payload.id}) as its not in the basekt!`)
        }

        state.items = newBasket
    }
  },
})

export const { addToBasket, removeFromBasket } = basketSlice.actions
// Selectors => getting items in state to use in different components
export const selectBasektItems = (state: RootState) => state.basket.items
export const selectBasketItemsWithId = (state: RootState, id: string) => state.basket.items.filter((items: Product) => items._id === id)
export const selectBasketTotal = (state: RootState) => 
    state.basket.items.reduce((total: number, item: Product) => (total += item.price), 0)


export default basketSlice.reducer