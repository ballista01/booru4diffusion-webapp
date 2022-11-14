import React from "react";
import { Chip } from "@mui/material";
import Tag from "../types/Tag";
import { deleteCartItem, selectCart, updateCartItem } from "../slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

interface Props {
	tag: Tag,
	inCart: boolean
}

export default function TagChip(props: Props) {
	const { tag, inCart } = props;
	const cart = useAppSelector(selectCart);
	const dispatch = useAppDispatch();

	const handleTagClick = () => {
		if (!inCart) {
			dispatch(updateCartItem(tag));
		} else {
			dispatch(deleteCartItem(tag.id));
		}
	}

	return (
		<Chip variant={inCart ? 'filled' : 'outlined'} key={tag.id} label={tag.name} onClick={handleTagClick} color={inCart ? 'success' : 'default'} />
	)
}