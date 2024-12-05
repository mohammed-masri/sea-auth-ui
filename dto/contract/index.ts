import { IAccount } from "../account";

export type UserContractApprovedStatuses = "pending" | "approved" | "rejected";

export interface IUserContractApproval {
  user: IAccount;
  approvedStatus: UserContractApprovedStatuses;
  createdAt: string;
}

export interface IContractComment {
  id: number;
  comment: string;
  user: IAccount;
  createdAt: string;
}

export interface IContractItem {
  id: number;
  content: string;
  approvals: IUserContractApproval[];
  comments: IContractComment[];
  commentsCount: number;
}

export interface IContract {
  id: number;
  title: string;
  items: IContractItem[];
  createdAt: string;
}
