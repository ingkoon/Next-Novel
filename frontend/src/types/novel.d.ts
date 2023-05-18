export type NovelInfoType = {
  commentCount: number;
  comments: CommentType[];
  //contents
  coverImg: string;
  createdAt: string;
  //endContent
  //engGenre
  hitCount: number;
  introduction: string;
  korGenre: string;
  likeCount: number;
  liked: boolean;
  //memberId
  nickName: string;
  novelId: number;
  //originCoverImg
  //startContent
  //startImages
  title: string;
};

export type CommentType = {
  commentId: number;
  content: string;
  createdAt: string;
  memberId: number;
  nickName: string;
  novelId: number;
  profileImg: string;
};
