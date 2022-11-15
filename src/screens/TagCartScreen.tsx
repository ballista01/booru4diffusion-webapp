import { Typography, Stack, TextareaAutosize, Button } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectCart } from "../slices/cartSlice";
import TagChip from '../components/TagChip';
import { useNavigate } from "react-router";

export default function TagCartScreen() {
	const diapatch = useAppDispatch();
	const cart = useAppSelector(selectCart);
	const navigate = useNavigate();
	let tagStr = "";
	for (let i = 0; i < cart.cartItems.length; i++) {
		tagStr = tagStr.concat(cart.cartItems[i].name).concat(' ');
	}

	const checkOutHandler = () => {
		navigate(`/checkout?tagStr=${tagStr}`);
	};

	return (
		<Stack spacing={2} margin={10}>
			<Typography variant='h5'>Tags</Typography>
			<Stack paddingTop={2} spacing={1.5}>
				{cart.cartItems.map((tag) => {
					const existedTag = cart.cartItems.find((x) => x.id === tag.id);
					if (existedTag) return <TagChip key={tag.id} tag={tag} inCart={true} />
					else return <TagChip key={tag.id} tag={tag} inCart={false} />
				})}
			</Stack>
			<TextareaAutosize
				aria-label="minimum height"
				minRows={3}
				placeholder="Minimum 3 rows"
				style={{ width: "100 %" }}
				value={tagStr}
			/>
			<Stack paddingTop={5}>
				<Button
					disabled={cart.totalQty <= 0}
					sx={{ flexGrow: 1 }}
					onClick={checkOutHandler}
					variant={cart.totalQty <= 0 ? 'outlined' : 'contained'}
				>
					{cart.totalQty <= 0 ? 'No Tag Selected' : 'Genernate List'}
				</Button>
			</Stack>
		</Stack>
	);
}