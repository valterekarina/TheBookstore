interface CartProduct {
	id: number;
	title: string;
	description: string;
	price: number;
	imageUrl: string;
	quantity: number;
}

interface CartState {
	items: CartProduct[];
}

const initialState: CartState = {
	items: [],
};

const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const DELETE_ITEM = "DELETE_ITEM"

const findProductIndexById = (items: CartProduct[], productId: number) => {
	return items.findIndex((item) => item.id === productId);
};

const Reducer = (state = initialState, action: any) => {
	let existingProductIndex;
	let product, amount;
	switch (action.type) {
		case ADD_ITEM:
			({ product, amount } = action.payload);
			existingProductIndex = findProductIndexById(
				state.items,
				product.id
			);
			if (existingProductIndex !== -1) {
				const updatedItems = [...state.items];
				updatedItems[existingProductIndex].quantity += amount;

				return { ...state, items: updatedItems };
			} else {
				const newItem = { ...product, quantity: amount };
				return { ...state, items: [...state.items, newItem] };
			}
		case REMOVE_ITEM:
			({ product, amount } = action.payload);
			existingProductIndex = findProductIndexById(
				state.items,
				product.id
			);
			if (existingProductIndex !== -1) {
				const updatedItems = [...state.items];
				updatedItems[existingProductIndex].quantity -= amount;

				if (updatedItems[existingProductIndex].quantity <= 0) {
					updatedItems.splice(existingProductIndex, 1);
				}

				return { ...state, items: updatedItems };
			} else {
				return state;
			}

		case DELETE_ITEM:
			const updatedItems = state.items.filter((product: CartProduct) => product.id !== action.payload.id);
			return { ...state, items: updatedItems };
		default:
			return state;
	}
};

export { Reducer, ADD_ITEM, REMOVE_ITEM, DELETE_ITEM };