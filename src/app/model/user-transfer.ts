export interface UserTransfer {
    id: number,
    sendOrReceive: number,
    originUser: string,
    user: string,
    receiveAccount: number,
    transferAccount: number,
    transferAmount: number,
}
