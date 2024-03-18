/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Storage {
	getItem(key: string, ...args: Array<any>): any;
	setItem(key: string, value: any, ...args: Array<any>): any;
	removeItem(key: string, ...args: Array<any>): any;
	keys?: Array<string>;
	getAllKeys(cb?: any): any;
}

const hasStorage = (storageType: string) => {
	if (typeof self !== "object" || !(storageType in self)) {
		return false;
	}

	try {
		const storage = (self as unknown as { [key: string]: Storage })[
			storageType
		] as unknown as Storage;
		const testKey = `storage ${storageType} test`;
		storage.setItem(testKey, "test");
		storage.getItem(testKey);
		storage.removeItem(testKey);
	} catch (e) {
		if (process.env.NODE_ENV !== "production") {
			console.warn(
				`storage ${storageType} test failed, persistence will be disabled.`
			);
		}
		return false;
	}
	return true;
};

const getStorage = (type: string) => {
	const storageType = `${type}Storage`;
	if (hasStorage(storageType)) {
		return (self as unknown as { [key: string]: Storage })[storageType];
	} else {
		if (process.env.NODE_ENV !== "production") {
			console.error(`failed to create sync storage`);
		}
	}
};

export const createStorage = (type: string) => {
	const storage = getStorage(type);
	return {
		getItem: (key: string): Promise<string> => {
			return new Promise((resolve) => {
				resolve(storage?.getItem(key));
			});
		},
		setItem: (key: string, item: string): Promise<void> => {
			return new Promise((resolve) => {
				resolve(storage?.setItem(key, item));
			});
		},
		removeItem: (key: string): Promise<void> => {
			return new Promise((resolve) => {
				resolve(storage?.removeItem(key));
			});
		},
	};
};
