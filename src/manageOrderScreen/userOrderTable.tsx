import { doc } from "firebase/firestore";
import AppState from "mocks/appState";
import MenuItem from "models/menuItem";
import { OrderRequest } from "models/orderRequest";
import Shop from "models/shop";
import { FunctionComponent, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import {
	Autocomplete,
	AutocompleteChangeReason,
	Popper,
	TextField,
} from "@mui/material";
import { styled } from "@mui/styles";
import { When } from 'react-if';

const StyledAutocomplete = styled(Autocomplete)({
	"& .MuiAutocomplete-inputRoot": {
		color: "white",
	},
	"& .MuiInputLabel-outlined": { color: "white" },
});

const lodash = require("lodash");

interface UserOrderTableProps {
	requests: OrderRequest[];
	shopId: string;
	onSubmitRequest: (req: OrderRequest[] | undefined) => void;
}

const UserOrderTable: FunctionComponent<UserOrderTableProps> = (props) => {
	const [shop, setShop] = useState<Shop>();
	let [shopSnapshot, loadingCollection, shopError] = useDocument(
		doc(AppState.fireStore, `shops/${props.shopId}`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		},
	);
	useEffect(() => {
		const firebaseShop = shopSnapshot?.data() as Shop;
		if (firebaseShop) {
			firebaseShop.id = props.shopId;

			setShop(firebaseShop);
		}
	}, [shopSnapshot]);

	const [curOrderRequest, setcurReq] = useState(props.requests);
	const [newItemRequest, setNewRequest] = useState<
		OrderRequest | undefined
	>();
	const navigate = useNavigate();

	///methods
	const handleOnSelect = (event: any, item: MenuItem | null, reason) => {
		if (reason === "reset") {
			handleOnClear();
		}
		setNewRequest({
			...newItemRequest,
			item: item,
			user: AppState.activeUser,
		});
	};

	const handleOnClear = () => {
		setNewRequest({
			...newItemRequest,
			item: undefined,
		});
	};

	function addNewRequest() {
		newItemRequest.date_modified = Date.now();
		//check if item exists
		const foundIdx = curOrderRequest.findIndex(
			(req) =>
				req.item.name == newItemRequest.item.name &&
				req.item.price == newItemRequest.item.price,
		);
		if (foundIdx != -1) {
			const newQuantity =
				curOrderRequest[foundIdx].quantity + newItemRequest.quantity;
			updateRequest(foundIdx, {
				...curOrderRequest[foundIdx],
				quantity: newQuantity,
			});
		} else {
			newItemRequest.quantity = newItemRequest?.quantity || 1;
			setcurReq([...curOrderRequest, newItemRequest]);
		}
	}

	function updateRequest(index, newReq: OrderRequest) {
		curOrderRequest[index] = newReq;
		setcurReq([...curOrderRequest]);
	}

	function deleteItem(index) {
		curOrderRequest.splice(index, 1);
		setcurReq([...curOrderRequest]);
	}

	function onEditShop(id: string) {
		navigate(`/editShop/${id}`);
	}

	//UI

	function addNewItemField() {
		return (
			<Table striped bordered hover variant='dark' responsive>
				<thead>
					<tr>
						<th>Selected item</th>
						<th style={{ width: "300px" }}>item</th>
						<th style={{ width: "100px" }}>quantity</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{newItemRequest?.item?.name || "nothing"}</td>
						<td>
							<StyledAutocomplete
								sx={{ color: "white" }}
								placeholder='Search for an item'
								options={shop?.menu || []}
								getOptionLabel={(option) => {
									const item = option as MenuItem;
									return `(${item.price} EGP) ${item.name} `;
								}}
								autoSelect
								value={newItemRequest?.item || null}
								onChange={(
									event: any,
									item: unknown,
									reason: AutocompleteChangeReason,
								) =>
									handleOnSelect(
										event,
										item as MenuItem,
										reason,
									)
								}
								renderInput={(params) => (
									<TextField {...params} label='Menu Items' />
								)}
							/>
						</td>
						<td>
							<Form.Control
								type='number'
								placeholder='input quantity'
								onChange={(event) =>
									setNewRequest({
										...newItemRequest,
										quantity: Number(event.target.value),
									})
								}
								value={newItemRequest?.quantity || 1}
							/>
						</td>
						<td>
							<Button
								variant='primary'
								className='text-center me-2'
								onClick={() => {
									addNewRequest();
								}}
								disabled={!newItemRequest?.item}
							>
								Add item
							</Button>
							<Button
								variant='primary'
								className='text-center'
								onClick={() => {
									setNewRequest({} as any);
								}}
								disabled={!newItemRequest?.item}
							>
								Reset selection
							</Button>
						</td>
					</tr>
					<tr>
						<td colSpan={4}>
							<div className='d-flex justify-content-between align-items-center'>
								<span>
									Can't find an item within this shop? - add
									it to the shop then come back here and
									select it
								</span>
								<div className="d-flex">
									<Button
										variant='primary'
										onClick={() => {
											onEditShop(shop.id as string);
										}}
									>
										Edit Shop								

									</Button>
									<When condition={shop?.menu_link }>
										<Button variant="outline-info" className="ms-2">
											<a 
											href={shop?.menu_link} target="_blank">View menu</a>
										</Button>
									</When>
								</div>
								
								<div></div>
							</div>
						</td>
					</tr>
				</tbody>
			</Table>
		);
	}

	function requestTable() {
		const requestItems = curOrderRequest
			?.sort((a, b) => a.user.name.localeCompare(b.user.name))
			.map((request, index) => (
				<tr key={index + 1}>
					<td>{index + 1}</td>
					<td>{request.item?.name}</td>
					<td>
						<Form.Control
							type='number'
							onChange={(event) => {
								updateRequest(index, {
									...request,
									quantity: Number(event.target.value),
								});
							}}
							value={request.quantity || 1}
						/>
					</td>
					<td>{request.item?.price} EGP</td>
					<td>
						{new Date(
							request.date_modified as number,
						).toLocaleString()}
					</td>
					<td>
						<Button
							variant='danger'
							onClick={() => deleteItem(index)}
						>
							Delete
						</Button>
					</td>
				</tr>
			));
		return (
			<Table striped bordered hover variant='dark' responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Item</th>
						<th>Quantity</th>
						<th>Unit price</th>
						<th>Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{requestItems}
					<tr>
						<td colSpan={2}>Total</td>
						<td>
							{curOrderRequest
								.map((r) => r.quantity)
								.reduce((prev, cur) => cur + prev, 0)}{" "}
							Items
						</td>
						<td>
							{curOrderRequest
								.map((r) => r.item.price * r.quantity)
								.reduce((prev, cur) => cur + prev, 0)}{" "}
							EGP
						</td>
						<td colSpan={2}></td>
					</tr>
				</tbody>
			</Table>
		);
	}

	function submitBtn() {
		return (
			<>
				<div className='text-center w-100'>
					<Button
						variant='success'
						className='text-center'
						onClick={() => props.onSubmitRequest(curOrderRequest)}
					>
						Submit
					</Button>
				</div>
			</>
		);
	}

	function body() {
		if (loadingCollection) return <>loading..</>;
		else {
			return (
				<>
					{addNewItemField()}
					{requestTable()}
					{submitBtn()}
				</>
			);
		}
	}

	return <>{body()}</>;
};

export default UserOrderTable;
