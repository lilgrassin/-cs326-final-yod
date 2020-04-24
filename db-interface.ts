export interface DatabaseConstructor {
	new (collectionName: string) : DatabaseInterface;
}

export interface DatabaseInterface {

	put(key: string, value: string): Promise<void>;

    get(key: string) : Promise < string >;
    
    del(key: string) : Promise < void>;
    
    isFound(key: string) : Promise < boolean >;
}
