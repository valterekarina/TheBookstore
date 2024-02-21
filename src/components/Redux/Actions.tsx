import { ADD_ITEM, REMOVE_ITEM, DELETE_ITEM } from "./Reducer";
interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	imageUrl: string;
}

const addItem = (product: Product, amount: number) => ({
	type: ADD_ITEM,
	payload: { product, amount },
});

const removeItem = (product: Product, amount: number) => ({
	type: REMOVE_ITEM,
	payload: { product, amount },
});
const deleteItem = (product: Product) => ({
	type: DELETE_ITEM,
	payload: product,
});

export { addItem, removeItem, deleteItem };