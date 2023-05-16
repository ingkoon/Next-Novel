export type CreateOrder = {
  memberId: string;
  itemId: number;
  price: number;
  receiptId: string;
};

export type MemberId = {
  memberId: string;
};

export type UpdatePoint = {
  memberId: string;
  point: number;
};
