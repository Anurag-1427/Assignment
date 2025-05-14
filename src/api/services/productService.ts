import client from '../client';

export const fetchProducts = (
    token: string,
    storeId: string,
    categoryId: string
) => {
    return client.post(
        '/products',
        {
            tabType: 'delivery',
            store_id: storeId,
            category_id: categoryId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
