export enum DataType {
    User = "users",
    Item = "items",
    Mail = "messages",
    Transaction = "stats",
    Shift = "shifts"
};

export type User = {
    fname?: string,
    lname?: string,
    email?: string,
    phone?: string,
    password?: string,
    grad?: string,
    admin?: boolean
};

export type UserData = {
    dataType: DataType.User,
    data?: User,
    criteria?: object
};

export type Item = {
    name?: string,
    category?: string,
    stock?: number,
    donated?: number,
    distributed?: number
};

export type ItemData = {
    dataType: DataType.Item,
    data?: Item,
    criteria?: object
};

export type Transaction = {
    created?: Date,
    user_id?: User | null,
    check_in?: boolean,
    weight?: number,
};

export type TransactionData = {
    dataType: DataType.Transaction,
    data?: Transaction,
    criteria?: object
};

export type Mail = {
    created?: Date,
    name?: string,
    email?: string,
    type?: string,
    message?: string
};

export type MailData = {
    dataType: DataType.Mail,
    data?: Mail,
    criteria?: object
};

export type ObjectData =
    | UserData
    | ItemData
    | TransactionData
    | MailData;

export type Data =
    | User
    | Item
    | Transaction
    | Mail;

export interface DatabaseInterface {

    put(obj: ObjectData): Promise<boolean>;

    get(obj: ObjectData): Promise<object[] | null>;

    aggregate(obj: ObjectData): Promise<object[] | null>;

    del(obj: ObjectData): Promise<boolean>;
}