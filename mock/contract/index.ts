import { IContract } from "@/dto/contract";
import { UserMock } from "..";

export const CONTRACTS: IContract[] = [
  {
    id: 1,
    title: "Test Contract",
    items: [
      {
        id: 1,
        content: `<p>Hello from the <strong>first item</strong></p>`,
        approvals: [
          {
            approvedStatus: "pending",
            user: UserMock.USERS[0],
            createdAt: Date(),
          },
          {
            approvedStatus: "approved",
            user: UserMock.USERS[1],
            createdAt: Date(),
          },
          {
            approvedStatus: "rejected",
            user: UserMock.USERS[2],
            createdAt: Date(),
          },
        ],
        commentsCount: 1,
        comments: [
          {
            id: 1,
            comment: "Needs more detail",
            user: UserMock.USERS[0],

            createdAt: Date(),
          },
        ],
      },
      {
        id: 2,
        content: `<p>Hello from the <strong>second item</strong></p>`,
        approvals: [
          {
            approvedStatus: "pending",
            user: UserMock.USERS[0],
            createdAt: Date(),
          },
          {
            approvedStatus: "approved",
            user: UserMock.USERS[1],
            createdAt: Date(),
          },
          {
            approvedStatus: "rejected",
            user: UserMock.USERS[2],
            createdAt: Date(),
          },
        ],
        commentsCount: 1,
        comments: [
          {
            id: 2,
            comment: "Needs more detail",
            user: UserMock.USERS[0],

            createdAt: Date(),
          },
        ],
      },
    ],
    createdAt: Date(),
  },
];
