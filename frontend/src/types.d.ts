export type CreateOrder = {
  nickName: string;
  itemId: number;
  price: number;
  receiptId: string;
};

export type NickName = {
  nickName: string;
};

export type UpdatePoint = {
  nickName: string;
  point: number;
};
