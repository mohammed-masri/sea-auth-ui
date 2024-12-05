import { IContract, IContractComment, IContractItem } from "@/dto/contract";
import { ContractMock } from "@/mock";

class ContractAction {
  private static instance: ContractAction;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public static method to get the instance
  public static getInstance(): ContractAction {
    if (!ContractAction.instance) {
      ContractAction.instance = new ContractAction();
    }
    return ContractAction.instance;
  }

  public async fetchContract(id: number): Promise<IContract> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const contract = ContractMock.CONTRACTS.find((c) => c.id === id);
        if (!contract) {
          reject(`Contract with ID ${id} is not found`);
        } else {
          resolve(contract);
        }
      }, 1000);
    });
  }

  public async createNewItem(contractId: number): Promise<IContractItem> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item: IContractItem = {
          id: Date.now(),
          approvals: [],
          comments: [],
          commentsCount: 0,
          content: "New Item",
        };
        resolve(item);
      }, 1000);
    });
  }

  public async updateItemContent(
    contractId: number,
    itemId: number,
    content: string
  ) {
    return { contractId, itemId, content };
  }

  public async deleteContractItem(contractId: number, itemId: number) {
    return { contractId, itemId };
  }

  public async createNewContractItemComment(
    contractId: number,
    itemId: number,
    comment: string
  ): Promise<IContractComment> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComment: IContractComment = {
          id: Date.now(),
          comment,
          createdAt: new Date().toISOString(),
          user: {
            id: Date.now().toString(),
            name: "Mohammed",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        };
        resolve(newComment);
      }, 1000);
    });
  }
}

const ContractActionInstance = ContractAction.getInstance();

export default ContractActionInstance;
