import { IOrder, IOrderRequest, PaymentMethod, IDeliveryInfo, IContactInfo, AppEvents } from '../../types';
import { CommonModel } from './CommonModel';
import { IEvents } from '../base/events';

export class OrderModel extends CommonModel<IOrder> implements IOrder {
	protected _payment: PaymentMethod;
	protected _address: string;
	protected _email: string;
	protected _phone: string;
	constructor(data: Partial<IOrder>, events: IEvents) {
		super(data, events);
	}

	set payment(value: PaymentMethod) {
		this._payment = value;
	}

	get payment(): PaymentMethod {
		return this._payment;
	}

	set address(value: string) {
		this._address = value;
	}

	get address(): string {
		return this._address;
	}

	set email(value: string) {
		this._email = value;
	}

	get email(): string {
		return this._email;
	}

	set phone(value: string) {
		this._phone = value;
	}

	get phone(): string {
		return this._phone;
	}


	setDelivery(delivery: IDeliveryInfo): void {
		this.payment = delivery.payment;
		this.address = delivery.address;
		this.emitChanges(AppEvents.ORDER_DELIVERY_CHANGED);
	}

	setContacts(contacts: IContactInfo): void {
		this.email = contacts.email;
		this.phone = contacts.phone;
		this.emitChanges(AppEvents.ORDER_CONTACTS_CHANGED);
	}


	validateDelivery(): boolean {
		return Boolean(this._payment && this._address && this._address.length > 0);
	}

	validateContacts(): boolean {
		return Boolean(this._email && this._email.length > 0 && this._phone && this._phone.length > 0);
	}

	readyОrder(total: number, items: string[]): IOrderRequest {
		return {
			payment: this._payment,
			email: this._email,
			phone: this._phone,
			address: this._address,
			total: total,
			items: items,
		};
	}
}