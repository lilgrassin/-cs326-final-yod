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
    grad?: Date,
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
    user_id?: User,
    check_in?: boolean,
    weight?: number,
};
export type TransactionData = {
    dataType: DataType.Transaction,
    data?: Transaction,
    criteria?: object
};

export type ObjectData =
    | UserData
    | ItemData
    | TransactionData;

export type Data =
    | User
    | Item
    | Transaction;

export interface DatabaseInterface {

    put(obj: ObjectData): Promise<boolean>;

    get(obj: ObjectData): Promise<object[] | null>;

    aggregate(obj: ObjectData): Promise<object[] | null>;

    del(obj: ObjectData): Promise<boolean>;
}