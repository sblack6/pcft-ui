export interface Transaction {
    id?: number,
    date?: string,
    account?: string,
    category?: string, 
    tags?: string,
    type?: string,
    amount?: number,
}